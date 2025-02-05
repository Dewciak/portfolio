import {NextResponse} from "next/server";

interface WorkItem {
  header: string;
  description: string;
  tech: string;
  image?: string;
  mainLink: string;
  secondLink?: string;
}

interface WorksData {
  gameModeOn: Record<string, WorkItem>;
  gameModeOff: Record<string, WorkItem>;
}

const WorksDataJson: WorksData = {
  gameModeOn: {
    POE2: {
      header: "Path of Exile 2",
      description:
        "The first Path of Exile never fully grabbed me, but Path of Exile 2 captivated me with its well-designed combat system, making each encounter feel impactful. As a fan of Souls-like games, I appreciate the game’s mechanical difficulty, especially early on. It adds to the sense of achievement, making each victory feel earned. I'm excited to see how it evolves.",
      tech: "ActionRPG Fantasy Loot Multiplayer Strategy",
      image: "https://www.youtube.com/embed/QpbGfihd0_Q?si=W7ObzsY-_tAFmK6D&mute=1",
      mainLink: "https://store.steampowered.com/app/2694490/Path_of_Exile_2/",
      secondLink: "https://github.com/Dewciak/PD-strona",
    },
    VampireSurvivors: {
      header: "Vampire Survivors",
      description:
        "Lately, I've been loving to pick up my Steam Deck in my free time and mindlessly kill vampires in Vampire Survivors. It’s amazing how enjoyable just walking around becomes, as the game’s focus is all about walking and killing thousands of vampires. The goal is to take out as many as possible within the 30-minute timer, and it's really fun to watch the entire screen explode with chaos as you take down massive waves of enemies",
      tech: "Roguelike Survival Action Arcade",
      image: "https://www.youtube.com/embed/6HXNxWbRgsg?si=MwKc5o3jKFk4XAmg&mute=1",
      mainLink: "https://store.steampowered.com/app/1794680/Vampire_Survivors/",
      secondLink: "https://github.com/Dewciak/PD-strona",
    },
    MarvelRivals: {
      header: "Marvel Rivals",
      description:
        "Marvel Rivals has really impressed me as a fan of the Marvel universe. The game offers a fresh experience with its dynamic hero synergies, where you can combine the abilities of characters to create powerful combos. I enjoy how every match feels different, thanks to the destructible environments and constantly evolving gameplay. ",
      tech: "Hero-Shooter Strategy Multiplayer Action",
      image: "https://www.youtube.com/embed/-b0veB7q9P4?si=acKQnEGDGDf4XzeY&mute=1",
      mainLink: "https://store.steampowered.com/app/2767030/Marvel_Rivals/",
      secondLink: "https://github.com/Dewciak/PD-strona",
    },
  },
  gameModeOff: {
    Photography: {
      header: "Photography Portfolio",
      description:
        "This is the first real website I created for my cousin, an animal photographer. The purpose of the website is to showcase her work, introduce her personality, and, most importantly, highlight the quality of her photos. She wanted the design to be simple and aligned with the colors of her logo.",
      tech: "Javascript React Tailwindcss ",
      image: "https://www.youtube.com/embed/e_xILU5eubU?si=bWv8m6wddfqPsw1k",
      mainLink: "https://patrycjadfotografia.pl/",
      secondLink: "https://github.com/Dewciak/PD-strona",
    },
    Carpenter: {
      header: "Hebel Mebel",
      description:
        "HebelMebel is a website created for a carpenter who specializes in solid wood furniture. The goal was to make the design clear and minimalistic while conveying a sense of 'solidness.' Due to the simplicity of the website, I chose Astro as the framework, which is perfect for this type of project – simple yet powerful.",
      tech: "Typescript Astro Tailwindcss",
      image: "https://www.youtube.com/embed/e_xILU5eubU?si=bWv8m6wddfqPsw1k",
      mainLink: "https://hebel-mebel.vercel.app/",
      secondLink: "https://github.com/Dewciak/HebelMebel",
    },
    Bailiff: {
      header: "Dariusz Dawid, Court Enforcement Officer at the District Court in Bielsko-Biała.",
      description:
        "This is the most advanced website I’ve created so far. From the design, which had to be purely informative due to legal constraints, to the technical aspects, it involved building an API that connects to a database, fetches data, and handles other CRUD operations. Additionally, it includes Firebase authentication for user credentials.",
      tech: "Typescript React Nextjs Tailwindcss MySQL Firebase",
      image: "https://www.youtube.com/embed/e_xILU5eubU?si=bWv8m6wddfqPsw1k",
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
