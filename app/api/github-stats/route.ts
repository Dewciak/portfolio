import {NextResponse} from "next/server";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const LOGIN = "Dewciak";

type ContributionLevel = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";

const LEVELS: ContributionLevel[] = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
];

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
}

interface ContributionSource {
  days: ContributionDay[];
  totalContributions: number;
  /** Commits only. Available from the authenticated GraphQL API; null on the public fallback. */
  totalCommitContributions: number | null;
  source: "graphql" | "public";
}

const query = `
  query PortfolioGithubStats($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

interface GithubResponse {
  data?: {
    user?: {
      contributionsCollection: {
        totalCommitContributions: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{contributionDays: ContributionDay[]}>;
        };
      };
    };
  };
  errors?: Array<{message: string}>;
}

export const revalidate = 900;

/** Authenticated path — the only one that can separate commits from other contribution types. */
async function fetchViaGraphql(token: string, from: string, to: string): Promise<ContributionSource> {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({query, variables: {login: LOGIN, from, to}}),
    next: {revalidate: 900},
  });

  if (!response.ok) throw new Error(`GitHub GraphQL API returned ${response.status}`);

  const payload = (await response.json()) as GithubResponse;
  const contributions = payload.data?.user?.contributionsCollection;

  if (!contributions || payload.errors?.length) throw new Error("GitHub GraphQL API returned incomplete statistics");

  return {
    days: contributions.contributionCalendar.weeks.flatMap((week) => week.contributionDays),
    totalContributions: contributions.contributionCalendar.totalContributions,
    totalCommitContributions: contributions.totalCommitContributions,
    source: "graphql",
  };
}

/**
 * Tokenless fallback: the same contribution grid GitHub renders on a public profile.
 * Keeps the section working on a fresh clone with no secrets configured.
 */
async function fetchPublicContributions(from: string, to: string): Promise<ContributionSource> {
  const url = `https://github.com/users/${LOGIN}/contributions?from=${from.slice(0, 10)}&to=${to.slice(0, 10)}`;

  const response = await fetch(url, {
    headers: {Accept: "text/html", "X-Requested-With": "XMLHttpRequest"},
    next: {revalidate: 900},
  });

  if (!response.ok) throw new Error(`GitHub public calendar returned ${response.status}`);

  const html = await response.text();

  // Per-day counts live in the screen-reader tooltips keyed by the cell id.
  const countsByCellId = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const [, cellId, text] = match;
    const parsed = Number.parseInt(text, 10);
    countsByCellId.set(cellId, Number.isNaN(parsed) ? 0 : parsed);
  }

  const days: ContributionDay[] = [];
  for (const match of html.matchAll(/<td\b[^>]*>/g)) {
    const tag = match[0];
    if (!tag.includes("ContributionCalendar-day")) continue;

    const date = /\bdata-date="([^"]+)"/.exec(tag)?.[1];
    if (!date) continue;

    const cellId = /\bid="([^"]+)"/.exec(tag)?.[1];
    const level = Number.parseInt(/\bdata-level="(\d)"/.exec(tag)?.[1] ?? "0", 10);

    days.push({
      date,
      contributionCount: cellId ? countsByCellId.get(cellId) ?? 0 : 0,
      contributionLevel: LEVELS[level] ?? "NONE",
    });
  }

  if (!days.length) throw new Error("GitHub public calendar returned no days");

  return {
    days,
    totalContributions: days.reduce((total, day) => total + day.contributionCount, 0),
    totalCommitContributions: null,
    source: "public",
  };
}

function buildCalendarYear(contributionYear: number, sourceDays: ContributionDay[]) {
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const yearStartsAt = new Date(Date.UTC(contributionYear, 0, 1));
  const yearEndsAt = new Date(Date.UTC(contributionYear, 11, 31));
  const calendarStartsAt = new Date(yearStartsAt);
  const calendarEndsAt = new Date(yearEndsAt);

  calendarStartsAt.setUTCDate(calendarStartsAt.getUTCDate() - calendarStartsAt.getUTCDay());
  calendarEndsAt.setUTCDate(calendarEndsAt.getUTCDate() + (6 - calendarEndsAt.getUTCDay()));

  const daysByDate = new Map(sourceDays.map((day) => [day.date, day] as const));
  const weeks: Array<{contributionDays: Array<ContributionDay & {isOutsideYear: boolean; isFuture: boolean}>}> = [];
  let currentWeek: Array<ContributionDay & {isOutsideYear: boolean; isFuture: boolean}> = [];

  for (
    let timestamp = calendarStartsAt.getTime();
    timestamp <= calendarEndsAt.getTime();
    timestamp += dayInMilliseconds
  ) {
    const date = new Date(timestamp);
    const dateKey = date.toISOString().slice(0, 10);
    const sourceDay = daysByDate.get(dateKey);

    currentWeek.push({
      date: dateKey,
      contributionCount: sourceDay?.contributionCount ?? 0,
      contributionLevel: sourceDay?.contributionLevel ?? "NONE",
      isOutsideYear: date.getUTCFullYear() !== contributionYear,
      isFuture: timestamp > Date.now(),
    });

    if (currentWeek.length === 7) {
      weeks.push({contributionDays: currentWeek});
      currentWeek = [];
    }
  }

  const months = Array.from({length: 12}, (_, monthIndex) => {
    const monthStartsAt = Date.UTC(contributionYear, monthIndex, 1);
    return {
      monthIndex,
      // Fallback label; the client re-formats this for the active locale
      label: new Intl.DateTimeFormat("en", {month: "short", timeZone: "UTC"}).format(new Date(monthStartsAt)),
      weekIndex: Math.floor((monthStartsAt - calendarStartsAt.getTime()) / (7 * dayInMilliseconds)),
    };
  });

  return {weeks, months};
}

export async function GET() {
  const token = process.env.GH_STATS_TOKEN ?? process.env.GITHUB_TOKEN;
  const contributionYear = new Date().getUTCFullYear();
  const from = `${contributionYear}-01-01T00:00:00Z`;
  const to = new Date().toISOString();

  try {
    let contributions: ContributionSource;

    if (token) {
      try {
        contributions = await fetchViaGraphql(token, from, to);
      } catch (error) {
        console.warn(
          "GraphQL GitHub statistics failed, falling back to the public calendar:",
          error instanceof Error ? error.message : error
        );
        contributions = await fetchPublicContributions(from, to);
      }
    } else {
      contributions = await fetchPublicContributions(from, to);
    }

    const calendar = buildCalendarYear(contributionYear, contributions.days);

    return NextResponse.json(
      {
        totalContributions: contributions.totalContributions,
        totalCommitContributions: contributions.totalCommitContributions,
        weeks: calendar.weeks,
        months: calendar.months,
        contributionYear,
        source: contributions.source,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Unable to load GitHub statistics:", error instanceof Error ? error.message : error);
    return NextResponse.json({error: "Unable to load GitHub statistics."}, {status: 502});
  }
}
