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
    HebelMebel: {
      header: "Hebel Mebel",
      description: "Custom furniture design.",
      tech: "Next.js TailwindCSS",
      image: "/images/Hebel.png",
      mainLink: "https://hebelmebel.com",
      secondLink: "https://video.hebelmebel.com",
    },
    DariuszDawid_KomornikSądowy: {
      header: "Court Enforcement Officer",
      description: "Official website for legal services.",
      tech: "React Firebase",
      image: "/images/Hebel.png",
      mainLink: "https://komornik.com",
      secondLink: "https://video.komornik.com",
    },
  },
  gameModeOff: {
    PatrycjaDawid_Fotografia: {
      header: "Photography Portfolio",
      description: "Showcase of creative photography projects.",
      tech: "HTML CSS",
      image: "/images/Hebel.png",
      mainLink: "https://fotografia.com",
      secondLink: "https://video.fotografia.com",
    },
    HebelMebel: {
      header: "Hebel Mebel",
      description: "Custom furniture design.",
      tech: "Next.js TailwindCSS",
      image: "/images/Hebel.png",
      mainLink: "https://hebelmebel.com",
      secondLink: "https://video.hebelmebel.com",
    },
    DariuszDawid_KomornikSądowy: {
      header: "Court Enforcement Officer",
      description: "Official website for legal services.",
      tech: "React Firebase",
      image: "/images/Hebel.png",
      mainLink: "https://komornik.com",
      secondLink: "https://video.komornik.com",
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
