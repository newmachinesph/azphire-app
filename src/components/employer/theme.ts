// Employer Dashboard Theme Constants

export const colors = {
  // Primary brand colors
  primary: {
    DEFAULT: '#0B2652',
    light: '#1a3a6e',
    dark: '#071a3a',
    bg: 'bg-[#0B2652]',
    bgLight: 'bg-[#1a3a6e]',
    text: 'text-[#0B2652]',
    border: 'border-[#0B2652]',
    ring: 'ring-[#0B2652]',
  },

  // Gold accent colors
  gold: {
    DEFAULT: '#ED9F08',
    light: '#f5b52e',
    bg: 'bg-[#ED9F08]',
    text: 'text-[#ED9F08]',
    gradient: 'from-[#ED9F08] to-[#f5b52e]',
  },
} as const;

// Gradient styles
export const gradients = {
  gold: 'bg-gradient-to-r from-[#ED9F08] to-[#f5b52e]',
  primary: 'bg-gradient-to-br from-[#0B2652] to-[#1a3a6e]',
} as const;

// Status colors for jobs
export const jobStatusStyles = {
  active: {
    badge: 'bg-green-100 text-green-700',
    border: 'border-l-green-500',
  },
  closed: {
    badge: 'bg-gray-100 text-gray-600',
    border: 'border-l-gray-300',
  },
  draft: {
    badge: 'bg-amber-100 text-amber-700',
    border: 'border-l-amber-400',
  },
} as const;

// Status colors for candidates
export const candidateStatusStyles = {
  new: {
    badge: 'bg-blue-100 text-blue-700',
    border: 'border-l-blue-500',
    label: 'New',
  },
  reviewing: {
    badge: 'bg-amber-100 text-amber-700',
    border: 'border-l-amber-400',
    label: 'Reviewing',
  },
  shortlisted: {
    badge: 'bg-purple-100 text-purple-700',
    border: 'border-l-purple-500',
    label: 'Shortlisted',
  },
  interview: {
    badge: 'bg-green-100 text-green-700',
    border: 'border-l-green-500',
    label: 'Interview',
  },
  offered: {
    badge: 'bg-emerald-100 text-emerald-700',
    border: 'border-l-emerald-500',
    label: 'Offered',
  },
  rejected: {
    badge: 'bg-red-100 text-red-700',
    border: 'border-l-red-400',
    label: 'Rejected',
  },
} as const;

// Helper functions
export function getJobStatusStyles(status: string) {
  return jobStatusStyles[status as keyof typeof jobStatusStyles] || jobStatusStyles.closed;
}

export function getCandidateStatusStyles(status: string) {
  return candidateStatusStyles[status as keyof typeof candidateStatusStyles] || {
    badge: 'bg-gray-100 text-gray-600',
    border: 'border-l-gray-300',
    label: status,
  };
}

export function getMatchScoreColor(score: number) {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-yellow-600';
  return 'text-gray-500';
}

// Common button styles
export const buttonStyles = {
  goldCta: 'flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#ED9F08] to-[#f5b52e] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#ED9F08]/25 hover:shadow-xl hover:scale-105 transition-all',
  secondary: 'flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-[#0B2652] hover:text-[#0B2652] transition-all',
  ghost: 'px-4 py-2 bg-[#0B2652]/5 hover:bg-[#0B2652]/10 rounded-full text-[#0B2652] text-sm font-medium transition-colors',
  icon: 'p-2 text-gray-400 hover:text-[#0B2652] hover:bg-gray-100 rounded-lg transition-colors',
  iconDanger: 'p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors',
} as const;

// Card styles
export const cardStyles = {
  base: 'bg-white rounded-2xl shadow-sm border border-gray-100',
  withPadding: 'bg-white rounded-2xl shadow-sm border border-gray-100 p-6',
} as const;

// Navigation items for employer dashboard
export const employerNavItems = [
  { id: 'home', label: 'Home', href: '/employer' },
  { id: 'jobs', label: 'Jobs', href: '/employer/jobs' },
  { id: 'candidates', label: 'Candidates', href: '/employer/candidates' },
  { id: 'messages', label: 'Messages', href: '/employer/messages' },
  { id: 'api', label: 'API', href: '/employer/api-keys' },
] as const;
