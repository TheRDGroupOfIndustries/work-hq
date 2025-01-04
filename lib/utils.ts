import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const replaceHyphensWithSpaces = (text: string): string => {
  return text.replace(/-/g, " ");
};

export const capitalizeString = (title: string): string => {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const generateSlug = (name: string): string => {
  const slug = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
  return slug;
};

export const reverseSlug = (slug: string): string => {
  const name = slug
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return name;
};

export const calculateDiscount = (price: number, oldPrice: number): number => {
  // if (oldPrice <= 0) {
  //   throw new Error("Old price must be greater than zero.");
  // }
  // if (price > oldPrice) {
  //   throw new Error("Current price cannot be greater than the old price.");
  // }
  const discountPercentage = ((oldPrice - price) / oldPrice) * 100;

  return parseFloat(discountPercentage.toFixed(0));
};

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  // const options = { day: "numeric", month: "long", year: "numeric" };
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  return `${day}${suffix} ${month}, ${date.getFullYear()}`;
};

export const salaryMonth = (dateString: string) => {
  const date = new Date(dateString);
  // const options = { day: "numeric", month: "long", year: "numeric" };
  const month = date.toLocaleString("default", { month: "long" });
  
  return ` ${month}, ${date.getFullYear()}`;
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  // padding single digits with leading zeros
  const pad = (num: number) => (num < 10 ? `0${num}` : num);

  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export const extractFileKey = (url: string): string => {
  const regex = /https:\/\/utfs\.io\/f\/([^\/]+)$/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

export const convertSecureUrlToPublicId = (secureUrl: string): string => {
  if (!secureUrl) {
    console.warn("Secure URL is required");
    return "";
  }

  try {
    const segments = secureUrl.split("/");

    const fileNameWithExtension = segments.pop();

    const publicId = fileNameWithExtension?.split(".")[0];

    console.log("publicId: ", publicId);

    if (!publicId) {
      console.warn("Public ID could not be extracted");
      return "";
    }

    return publicId;
  } catch (error) {
    console.error("Error converting secure URL to public ID:", error);
    return "";
  }
};

export const formatSales = (num: number): number => {
  if (num >= 1_000_000) {
    return Math.round(num / 1_000_000); // millions (M)
  } else if (num >= 1_000) {
    return Math.round(num / 1_000); // thousands (K)
  } else {
    return num; // original number
  }
};

export const generateRandomSku = (length: number = 8): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};
