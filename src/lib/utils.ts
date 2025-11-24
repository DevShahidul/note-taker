import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function getCurrentTimeAsNumber(): number {
  const now = new Date();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return minutes * 100 + seconds; // MMSS format number
}


export function formatTime(num: number): string {
  const minutes = Math.floor(num / 100);     // first part
  const seconds = num % 100;                 // last part
  return `${minutes}:${seconds}`;
}
