import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const CLIENT_ID = 'waka_2f97483c-cc98-4ebf-aaf5-0ee15d3ec085'; // Replace with your WakaTime client ID
const CLIENT_SECRET = 'waka_sec_7NQqKQvDAJTNjSnTcNePObNUXCbxk4O1KHvH3BRmECPxoPLH1zGxrJ2LUvgKCTsMSpToR0vo5hRQPVjS'; // Replace with your WakaTime client secret
const REDIRECT_URI = 'http://localhost:3000'; // Replace with your redirect URI

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: "Authorization code is required" }, { status: 400 });
  }

  try {
    // Exchange the authorization code for an access token
    const response = await axios.post('https://wakatime.com/oauth/token', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
        code: code,
      },
    });

    const { access_token } = response.data;

    // Store the access token securely (e.g., in a database or session)
    // For demonstration, we'll just return it in the response
    return NextResponse.json({ access_token });
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    return NextResponse.json({ error: 'Failed to exchange code for access token' }, { status: 500 });
  }
}; 