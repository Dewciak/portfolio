"use client";
import Me from "@/public/images/Me.webp";
import {useLocale, useTranslations} from "next-intl";
import Image from "next/image";
import {useEffect, useMemo, useRef, useState} from "react";
import CountUp from "react-countup";
import {FaGithub, FaRegUserCircle} from "react-icons/fa";

interface AboutProps {
  gameMode: boolean;
}

type ContributionLevel = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";

interface GithubStats {
  /** Commits only — null when the API fell back to the public (tokenless) calendar. */
  totalCommitContributions: number | null;
  totalContributions: number;
  source: "graphql" | "public";
  weeks: Array<{
    contributionDays: Array<{
      date: string;
      contributionCount: number;
      contributionLevel: ContributionLevel;
      isOutsideYear: boolean;
      isFuture: boolean;
    }>;
  }>;
  months: Array<{label: string; monthIndex: number; weekIndex: number}>;
  contributionYear: number;
  updatedAt: string;
}

const About = ({gameMode}: AboutProps) => {
  const t = useTranslations("about");
  const [githubStats, setGithubStats] = useState<GithubStats | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadGithubStats = async () => {
      try {
        const response = await fetch("/api/github-stats", {signal: controller.signal, cache: "no-store"});
        if (!response.ok) return;

        setGithubStats((await response.json()) as GithubStats);
      } catch (error) {
        if ((error as Error).name !== "AbortError") console.error("Unable to refresh GitHub statistics:", error);
      }
    };

    loadGithubStats();
    const intervalId = window.setInterval(loadGithubStats, 15 * 60 * 1000);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  const stats = [
    {id: "age", end: 22, label: t("stats.age")},
    {id: "semester", end: 7, label: t("stats.semester")},
    // totalContributions is the one figure both the authenticated and the public
    // source can report, so the counter works with or without GH_STATS_TOKEN.
    {id: "commits", end: githubStats?.totalContributions ?? null, label: t("stats.commits")},
    {id: "dog", end: 1, label: t("stats.dog")},
  ];

  // react-countup's `enableScrollSpy` binds to a ref that is not in the DOM on
  // first render, which logged "[CountUp] target is null or undefined" four
  // times and left every counter stuck at 0. We drive the start ourselves.
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const element = statsRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasEnteredView(true);
        observer.disconnect();
      },
      {threshold: 0.3}
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='About'
      className='max-w-[1250px]  mx-auto flex flex-col overflow-hidden mt-32 justify-start space-y-16   '
    >
      <div className='flex space-x-4 w-full text-center  items-center justify-center xl:justify-start'>
        <FaRegUserCircle size={30} className='hidden xl:block' />
        <h2 className='font-bold xl:text-3xl text-5xl'>{t("heading")}</h2>
      </div>

      <div className='flex xl:space-x-32 items-center justify-center flex-col xl:flex-row px-6 xl:px-0'>
        <Image
          src={Me}
          alt={t("imageAlt")}
          sizes='(min-width: 768px) 650px, 100vw'
          className=' md:h-[650px] md:w-[650px] h-[600px]  object-cover rounded-lg xl:rotate-2 xl:p-20 md:hover:scale-105 hover:rotate-0 duration-300'
        />
        <div className=' flex flex-col xl:max-w-[450px] text-justify mt-10 xl:mt-0  max-w-[400px]'>
          <div ref={statsRef} className='flex flex-wrap justify-center xl:justify-between '>
            {stats.map((stat) => (
              <div key={stat.id} className='flex flex-col items-center text-center py-4 w-1/2 xl:w-auto'>
                <strong className='text-4xl' style={{color: "var(--theme-accent-middle)"}}>
                  {stat.end === null ? (
                    <span className='inline-block animate-pulse'>—</span>
                  ) : hasEnteredView ? (
                    <CountUp key={`${stat.id}-${stat.end}`} start={0} end={stat.end} duration={2} />
                  ) : (
                    0
                  )}
                </strong>
                <div className='mt-1 max-w-[120px] leading-tight'>{stat.label}</div>
              </div>
            ))}
          </div>
          <p className='mt-10'>{t("firstParagraph")}</p>
          <p className='mt-10'>{t("secondParagraph")}</p>
          <p className='mt-10'>{t("thirdParagraph")}</p>
        </div>
      </div>

      <GithubActivity stats={githubStats} />
    </section>
  );
};

export default About;

function GithubActivity({stats}: {stats: GithubStats | null}) {
  const t = useTranslations("about.github");
  const locale = useLocale();

  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, {month: "short", timeZone: "UTC"}),
    [locale]
  );
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, {day: "numeric", month: "long", year: "numeric", timeZone: "UTC"}),
    [locale]
  );

  return (
    <div className='github-activity mx-6 xl:mx-0'>
      <div className='github-activity__header'>
        <div className='flex min-w-0 items-center gap-3'>
          <FaGithub aria-hidden='true' className='shrink-0 text-2xl' />
          <div className='min-w-0'>
            <h3 className='font-semibold text-white'>{t("heading")}</h3>
            <p className='text-sm text-white/45'>{t("subheading", {year: String(stats?.contributionYear ?? "")})}</p>
          </div>
        </div>

        <a href='https://github.com/Dewciak' target='_blank' rel='noreferrer' className='github-activity__profile'>
          {t("viewProfile")}
        </a>
      </div>

      {stats ? (
        <>
          <div className='github-activity__summary'>
            <strong>{stats.totalContributions}</strong>
            <span>{t("contributions")}</span>
          </div>

          <div className='github-activity__scroller'>
            <div className='github-calendar'>
              <div className='github-months' aria-hidden='true'>
                {stats.months.map((month) => (
                  <span key={month.label} style={{left: `${(month.weekIndex / stats.weeks.length) * 100}%`}}>
                    {monthFormatter.format(new Date(Date.UTC(stats.contributionYear, month.monthIndex, 1)))}
                  </span>
                ))}
              </div>

              <div
                className='github-grid'
                aria-label={t("calendarLabel", {
                  count: stats.totalContributions,
                  year: String(stats.contributionYear),
                })}
              >
                {stats.weeks.map((week, weekIndex) => (
                  <div className='github-week' key={`${week.contributionDays[0]?.date ?? "week"}-${weekIndex}`}>
                    {week.contributionDays.map((day) => {
                      const readableDate = dateFormatter.format(new Date(`${day.date}T00:00:00Z`));

                      return (
                        <span
                          className='github-day'
                          data-level={day.contributionLevel}
                          data-empty={day.isFuture || day.isOutsideYear ? "true" : undefined}
                          key={day.date}
                          title={
                            day.isFuture || day.isOutsideYear
                              ? readableDate
                              : t("dayTitle", {date: readableDate, count: day.contributionCount})
                          }
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='github-activity__footer'>
            <span>{t("less")}</span>
            {(["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"] as const).map(
              (level) => (
                <i className='github-day' data-level={level} key={level} />
              )
            )}
            <span>{t("more")}</span>
          </div>
        </>
      ) : (
        <div className='github-activity__loading' aria-label={t("loading")}>
          <div className='github-activity__loading-line' />
          <div className='github-activity__loading-grid' />
        </div>
      )}
    </div>
  );
}
