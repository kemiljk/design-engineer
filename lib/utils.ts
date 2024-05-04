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

// Define an array of colors for the gradient
const colors = [
  "#10b981",
  "#3b82f6",
  "#14b8a6",
  "#84cc16",
  "#0ea5e9",
  "#06b6d4",
];

// Function to generate a random gradient
export const getRandomGradient = () => {
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];
  return {
    backgroundImage: `linear-gradient(to bottom right, ${color1}, ${color2})`,
    cursor: "default",
  };
};
