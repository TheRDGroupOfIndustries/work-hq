import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
// interface Day {
//   range: {
//     date: string;
//   };
//   grand_total: {
//     total_seconds: number;
//   };
// }

export const GET = async (req: NextRequest) => {
  try {
    const accessToken = req.nextUrl.searchParams.get("accessToken");
    if (!accessToken) {
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 400 }
      );
    }

    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 6);

    // const encodedToken = Buffer.from(`${accessToken}:`).toString("base64");

    // const response = await axios.get(`https://wakatime.com/api/v1/users/current/summaries?start=${
    //     startDate.toISOString().split("T")[0]
    //   }&end=${today.toISOString().split("T")[0]}`, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });

    const response = await axios.get(`https://wakatime.com/api/v1/77f019bb-defe-4480-b091-5c1741170189/current/summaries?scope=read_summaries.categories&start=2025-01-18&end=2025-01-18`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      scopes: "read_summaries.categories"
    },
  });

    console.log('WakaTime data:', response.data);
  

    // const resData = data.data.map((day: Day) => ({
    //   parameter: new Date(day.range.date)
    //     .toLocaleDateString("en-US", { weekday: "short" })
    //     .toUpperCase(),
    //   hours: Math.round(day.grand_total.total_seconds / 3600),
    // }));

    return NextResponse.json(response.data, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    console.error("Error fetching WakaTime data:", error);
    return NextResponse.json(
      { error: error.message || "Error fetching data" },
      { status: 500 }
    );
  }
};
