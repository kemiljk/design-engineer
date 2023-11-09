import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getThumbnail(youtubeUrl: string) {
  let videoId = "";
  const videoIdIndex = youtubeUrl.indexOf("v=");

  if (videoIdIndex !== -1) {
    videoId = youtubeUrl.substring(videoIdIndex + 2);
    const ampersandPosition = videoId.indexOf("&");

    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
  }

  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
