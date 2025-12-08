import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @notice Merge conditional class strings while deduplicating Tailwind tokens.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
