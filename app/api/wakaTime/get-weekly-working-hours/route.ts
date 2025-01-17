import { NextRequest, NextResponse } from "next/server";

interface Day {
  range: {
    date: string;
  };
  grand_total: {
    total_seconds: number;
  };
}

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

    const encodedToken = Buffer.from(`${accessToken}:`).toString("base64");

    const response = await fetch(
      `https://wakatime.com/api/v1/users/current/summaries?start=${
        startDate.toISOString().split("T")[0]
      }&end=${today.toISOString().split("T")[0]}`,
      {
        headers: {
          Authorization: `Basic ${encodedToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // Fetch detailed error
      throw new Error(`Error fetching data: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    const resData = data.data.map((day: Day) => ({
      parameter: new Date(day.range.date)
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase(),
      hours: Math.round(day.grand_total.total_seconds / 3600),
    }));

    return NextResponse.json(resData, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    console.error("Error fetching WakaTime data:", error);
    return NextResponse.json(
      { error: error.message || "Error fetching data" },
      { status: 500 }
    );
  }
};
