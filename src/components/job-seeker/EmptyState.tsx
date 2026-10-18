'use client';

import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
      <div className="text-gray-300 mx-auto mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {actionLabel && actionHref && (
        <a
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0B2652] to-[#1a3a6e] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}
