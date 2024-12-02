import { NextResponse } from "next/server";

const CLIENT_ID = 'Rtq2awbhLAs6cYVUZmOPgF1L'; // Replace with your WakaTime client ID
const REDIRECT_URI = 'http://localhost:3000'; // Replace with your redirect URI

export const GET = () => {
  const url = `https://wakatime.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  console.log('Redirecting to:', url);
  return NextResponse.redirect(url);
}; 