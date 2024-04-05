import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CardInfo {
  uid: string;
  atr: string;
}

export const contractAddress = '0x0F68D53B7AD492c6e87d1F3A3175293992125ad1';

export const paymasterEndpoint = 'http://localhost:3002';
