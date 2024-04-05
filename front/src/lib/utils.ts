import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CardInfo {
  uid: string;
  atr: string;
}

export const contractAddress = '0xAB952be45398Bc263034167b9cd8Df401a49e9fF';
