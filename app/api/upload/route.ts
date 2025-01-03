import { NextRequest, NextResponse } from "next/server";
import { utapi } from "@/server/uploadthing";

// Define the response type manually if not provided by the library
interface UploadFileResponse {
  data?: {
    url: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const uploadedFile = await utapi.uploadFiles(file) as UploadFileResponse;

    if (!uploadedFile.data) {
      return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }

    const fileUrl = uploadedFile.data.url;

    if (!fileUrl) {
      return NextResponse.json({ error: "File URL not available" }, { status: 500 });
    }

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}