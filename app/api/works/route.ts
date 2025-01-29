import {NextResponse} from "next/server";

interface WorkItem {
  header: string;
  description: string;
  tech: string;
  image?: string;
  mainLink: string;
  secondLink: string;
}

interface WorksData {
  gameModeOn: Record<string, WorkItem>;
  gameModeOff: Record<string, WorkItem>;
}

const WorksDataJson: WorksData = {
  gameModeOn: {
    POE2: {
      header: "Path of Exile 2",
      description: "Action RPG game with endless build possibilities.",
      tech: "TypeScript React",
      image: "/images/Hebel.png",
      mainLink: "https://poe2.com",
      secondLink: "https://video.poe2.com",
    },
    VampireSurvivors: {
      header: "Vampire Survivors",
      description: "Custom furniture design.",
      tech: "Next.js TailwindCSS",
      image: "/images/Hebel.png",
      mainLink: "https://hebelmebel.com",
      secondLink: "https://video.hebelmebel.com",
    },
    MarvelRivals: {
      header: "Marvel Rivals",
      description: "Official website for legal services.",
      tech: "React Firebase",
      image: "/images/Hebel.png",
      mainLink: "https://komornik.com",
      secondLink: "https://video.komornik.com",
    },
  },
  gameModeOff: {
    PatrycjaDawidFotografia: {
      header: "Photography Portfolio",
      description: "Showcase of creative photography projects.",
      tech: "Javascript React Tailwindcss ",
      image: "/images/Hebel.png",
      mainLink: "https://patrycjadfotografia.pl/",
      secondLink: "https://github.com/Dewciak/PD-strona",
    },
    HebelMebel: {
      header: "Hebel Mebel",
      description: "Custom furniture design.",
      tech: "Typescript Astro Tailwindcss",
      image: "/images/Hebel.png",
      mainLink: "https://hebel-mebel.vercel.app/",
      secondLink: "https://github.com/Dewciak/HebelMebel",
    },
    DariuszDawidKomornikSądowy: {
      header: "Court Enforcement Officer",
      description: "Official website for legal services.",
      tech: "Typescript React Nextjs Tailwindcss MySQL Firebase",
      image: "/images/Hebel.png",
      mainLink: "https://bailiff-website.vercel.app/",
      secondLink: "https://github.com/Dewciak/BailiffWebsite",
    },
  },
};

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const gameMode = searchParams.get("gameMode");

  if (!gameMode) {
    return NextResponse.json({error: "Missing gameMode parameter"}, {status: 400});
  }

  const data = gameMode === "true" ? WorksDataJson.gameModeOn : WorksDataJson.gameModeOff;

  return NextResponse.json(data);
}
