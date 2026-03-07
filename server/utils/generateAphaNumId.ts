import { customAlphabet } from 'nanoid';

// Exclude confusing characters: 0, O, I, 1, l
const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const nanoid = customAlphabet(ALPHABET, 10);

/**
 * Generates a unique, human-readable ID with an optional prefix.
 * @param prefix - Optional string to prepend (e.g., 'ORD', 'TRX')
 * @returns A string like "ORD-X8J2K4P9NQ"
 */
export const generateUniqueId = (prefix?: string): string => {
  const id = nanoid();
  return prefix ? `${prefix.toUpperCase()}-${id}` : id;
};