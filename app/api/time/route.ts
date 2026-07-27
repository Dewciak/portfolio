import {NextResponse} from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const city = "Kęty";

  const baseResponse = {
    time: new Date().toLocaleString("pl-PL", {
      timeZone: "Europe/Warsaw",
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: null as number | null,
    city,
  };

  // Weather is optional: without a key the footer still gets the local time.
  if (!apiKey) return NextResponse.json(baseResponse);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(url, {next: {revalidate: 600}});
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        ...baseResponse,
        temperature: Math.round(data.main.temp - 273.15),
        weather: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
      });
    }

    return NextResponse.json(baseResponse);
  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json(baseResponse);
  }
}
