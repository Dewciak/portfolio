// pages/api/time.ts

import {NextApiRequest, NextApiResponse} from "next";

interface TimeResponse {
  time: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<TimeResponse>) {
  const krakowTime = new Date().toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  res.status(200).json({
    time: krakowTime,
  });
}
