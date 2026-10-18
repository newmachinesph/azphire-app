// Auth Theme Constants
// Brand colors matching the design system

export const colors = {
  primary: '#0B2652',
  primaryLight: '#1a3a6e',
  gold: '#ED9F08',
  goldLight: '#f5b52e',
  red: '#B81D23',
} as const;

export const gradients = {
  primary: 'bg-gradient-to-br from-[#0B2652] to-[#1a3a6e]',
  primaryButton: 'bg-gradient-to-r from-[#0B2652] to-[#1a3a6e]',
  gold: 'bg-gradient-to-r from-[#ED9F08] to-[#f5b52e]',
  goldRed: 'bg-gradient-to-r from-[#ED9F08] to-[#B81D23]',
} as const;

export const LANDING_URL = process.env.NEXT_PUBLIC_LANDING_URL || 'https://remotetalent.ph';
