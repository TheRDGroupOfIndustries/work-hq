import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import User from "@/models/User";
import connectToMongoDB from "@/utils/db";
import Project from "@/models/Project";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const projectId = searchParams.get("projectId");
  const role = searchParams.get("role");

  await connectToMongoDB();

  try {
    let users;
    if (projectId && role === "developer") {
      const project = await Project.findById(projectId);
      if (!project) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }

      users = await User.find({
        _id: { $in: project.developmentDetails.teams },
        role: "developer",
      }).select("_id firstName lastName role profile_image");
    } else if (query) {
      users = await User.find({
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
          { role: { $regex: query, $options: "i" } },
        ],
        _id: { $ne: session.user._id },
      }).select("_id firstName lastName role profile_image");
    } else {
      users = await User.find({ _id: { $ne: session.user._id } })
        .select("_id firstName lastName role profile_image")
        .limit(20);
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
