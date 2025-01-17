import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { createVideoToken } from "@/utils/serverClient";
import { CustomUser } from "@/lib/types";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({
      status: 401,
      success: false,
      error: "Unauthorized",
    });
  }

  const user = session.user as CustomUser;
  
  if (!user._id) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: "User ID not found",
    });
  }

  const token = createVideoToken(user._id.toString());

  return NextResponse.json({
    status: 200,
    success: true,
    token,
  });
}