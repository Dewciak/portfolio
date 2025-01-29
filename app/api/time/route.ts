import {NextResponse} from "next/server";

export async function GET(request: Request) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const city = "Kraków";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const krakowTime = new Date().toLocaleString("pl-PL", {
      timeZone: "Europe/Warsaw",
      hour: "2-digit",
      minute: "2-digit",
    });

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        time: krakowTime,
        temperature: Math.round(data.main.temp - 273.15),
        weather: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
      });
    } else {
      return NextResponse.json({error: "Failed to fetch weather data"}, {status: 500});
    }
  } catch (error) {
    console.error("Error fetching time or weather:", error);
    return NextResponse.json({error: "Error fetching time or weather"}, {status: 500});
  }
}
