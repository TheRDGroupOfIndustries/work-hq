import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async (req: NextRequest) => {
  try {
    const accessToken = req.nextUrl.searchParams.get('accessToken'); // Correct
    if (!accessToken) {
      return NextResponse.json({ error: 'Missing access token' }, { status: 400 });
    }

    const response = await axios.get('https://wakatime.com/api/v1/users/current/all_time_since_today', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('WakaTime data:', response.data);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching WakaTime data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
};
