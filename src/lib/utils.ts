import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const isDev = process.env.NODE_ENV === "development";
export const isMastraPlayground = process.env.MASTRA_DEV;

const simulateCall = async (duration = 1000, { failureRate = 0 } = {}) => {
  if (!isDev) return;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(new Error("Simulated failure"));
      } else {
        resolve(undefined);
      }
    }, duration);
  });
};

/**
 * These utils are only available in development environment.
 * @returns *null* in production environment.
 */
export const devUtils = {
  simulateCall,
};
