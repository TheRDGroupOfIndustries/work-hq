"use server";

import { convertSecureUrlToPublicId } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({
  apiKey: process.env.UPLOADTHING_SECRET! ?? "", // YOUR UPLOADTHING_SECRET
});

export const uploadNewFile = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const { data } = await utapi.uploadFiles(file);
    return data?.url || null;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed");
  }
};

export const uploadMultipleNewFiles = async (formData: FormData) => {
  try {
    const files = formData.getAll("files") as File[];
    if (!files || files.length === 0) throw new Error("No files provided");

    const uploadedFiles = await utapi.uploadFiles(files);

    const uploadedFilesUrls = uploadedFiles.map((file) => file?.data?.url);
    // console.log("uploadedFiles", uploadedFilesUrls);

    return uploadedFilesUrls;
  } catch (error) {
    console.error("Error uploading multiple files:", error);
    throw new Error("Multiple file upload failed");
  }
};

export const removeFile = async (file: string) => {
  try {
    const res = await utapi.deleteFiles(file);
    console.log(res);

    return res.success;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Deleting file failed");
  }
};

export const removeMultipleFiles = async (files: string[]) => {
  try {
    const res = await utapi.deleteFiles(files);
    return res.success;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Deleting file failed");
  }
};

// Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFileFromCD = async (secureUrl: string): Promise<boolean> => {
  if (!secureUrl) {
    console.warn("Secure URL is required");
    return false;
  }

  console.log(secureUrl);
  try {
    const publicId = convertSecureUrlToPublicId(secureUrl);
    console.log(publicId);
    if (!publicId) {
      console.warn("Public ID could not be extracted");
      return false;
    }

    const result = await cloudinary.uploader.destroy(publicId);

    console.log(result);
    if (result.result === "ok") {
      return true;
    } else {
      console.warn("Deletion failed:", result);
      return false;
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Deleting file failed");
  }
};
