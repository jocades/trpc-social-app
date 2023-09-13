import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes
 * @param classes - Tailwind classes
 * @returns Merged Tailwind classes
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes))
}

/**
 * I'm just a box
 * @param size - Size in rem
 * @returns Tailwind width and height
 */
export function size(size: number | string) {
  return `w-${size} h-${size}`
}

export const center = 'justify-center items-center'

/**
 * Delay for a number of seconds
 * @param seconds - Number of seconds to delay
 */
export function delay(seconds = 2) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}
