import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import User from "@/models/User";
import connectToDatabase from "@/utils/db"; // Replace with your DB connection utility
import { getServerSession } from "next-auth"; // Replace with your session management library
import { CustomUser } from "@/lib/types";
import { authOptions } from "@/lib/authOptions";

export const GET = async (req: NextRequest) => {
  try {
    // Connect to the database
    await connectToDatabase();

    // Retrieve server session to check if user is logged in
    const session = await getServerSession(authOptions);
    console.log("session: ", session);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized. Please log in." }),
        { status: 401 }
      );
    }

    const sessionUser = session.user as CustomUser;
    // Get user ID from session and fetch the user
    const userId = sessionUser.id; // Adjust based on how you store session user info
    console.log("User ID:", userId);
    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    // Check if the user's role is 'developer'
    if (user.role !== "developer") {
      return new NextResponse(
        JSON.stringify({ message: "Forbidden. User is not a developer." }),
        { status: 403 }
      );
    }

    // Extract authorization code from query parameters
    const code = req.nextUrl.searchParams.get("code"); // Use get method

    if (!code) {
      return new NextResponse(
        JSON.stringify({ message: "Authorization code is missing." }),
        { status: 400 }
      );
    }

    // Exchange authorization code for access token
    // const response = await axios.post("https://wakatime.com/oauth/token", {
    //   client_id: process.env.WAKATIME_CLIENT_ID,
    //   client_secret: process.env.WAKATIME_CLIENT_SECRET,
    //   redirect_uri: 'http://localhost:3000/api/auth/wakatime/callback',
    //   grant_type: "authorization_code",
    //   code,
    // });

    const response = await axios.post("https://wakatime.com/oauth/token", {
      client_id: process.env.WAKATIME_CLIENT_ID,
      client_secret: process.env.WAKATIME_CLIENT_SECRET,
      redirect_uri: 'http://localhost:3000/api/auth/wakatime/callback',
      grant_type: "authorization_code",
      code,
    });
    const responseData = new URLSearchParams(response.data);
    const access_token = responseData.get("access_token");
    const refresh_token = responseData.get("refresh_token");
    const expires_at = responseData.get("expires_at");
    const uid = responseData.get("uid");
    
    // Log the parsed data
    console.log("WakaTime data:", {
      access_token,
      refresh_token,
      expires_at,
      uid,
    });
    
    // Update WakaTime data in the user's document
    user.wakaTime = {
      user_id: uid,
      access_token,
      refresh_token,
      expires_at: expires_at ? new Date(expires_at) : null, // Check for null before creating Date
    };


    // Save the updated user document
    await user.save();
    console.log("Saved user:", user);
    // Respond with success
    return NextResponse.redirect('http://localhost:3000/dev/all-projects');

  } catch (error) {
    console.error("Error updating WakaTime data:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
};