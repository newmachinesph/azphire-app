// Job Seeker Theme Constants
// Brand colors matching the design system

export const colors = {
  primary: '#0B2652',
  primaryLight: '#1a3a6e',
  gold: '#ED9F08',
  goldLight: '#f5b52e',
} as const;

export const gradients = {
  primary: 'bg-gradient-to-br from-[#0B2652] to-[#1a3a6e]',
  gold: 'bg-gradient-to-r from-[#ED9F08] to-[#f5b52e]',
} as const;

export const cardStyles = {
  base: 'bg-white rounded-2xl shadow-sm border border-gray-100',
  withPadding: 'bg-white rounded-2xl shadow-sm border border-gray-100 p-6',
} as const;

// Application status styles
export function getApplicationStatusStyles(status: string): { badge: string; label: string } {
  switch (status) {
    case 'interview':
      return { badge: 'bg-green-100 text-green-700', label: 'Interview' };
    case 'reviewing':
      return { badge: 'bg-yellow-100 text-yellow-700', label: 'Under Review' };
    case 'applied':
      return { badge: 'bg-blue-100 text-blue-700', label: 'Applied' };
    case 'rejected':
      return { badge: 'bg-red-100 text-red-700', label: 'Not Selected' };
    case 'offer':
      return { badge: 'bg-purple-100 text-purple-700', label: 'Offer Received' };
    default:
      return { badge: 'bg-gray-100 text-gray-700', label: status };
  }
}

// Match score color
export function getMatchScoreColor(score: number): string {
  if (score >= 90) return 'text-green-700 bg-green-50';
  if (score >= 75) return 'text-blue-700 bg-blue-50';
  if (score >= 60) return 'text-yellow-700 bg-yellow-50';
  return 'text-gray-700 bg-gray-50';
}
