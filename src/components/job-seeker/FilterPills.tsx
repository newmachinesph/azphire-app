'use client';

import { ReactNode } from 'react';

interface FilterPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'gold';
}

export function FilterPill({ label, isActive, onClick, icon, variant = 'primary' }: FilterPillProps) {
  const activeClass = variant === 'gold' ? 'bg-[#ED9F08] text-white' : 'bg-[#0B2652] text-white';
  const hoverClass = variant === 'gold' ? 'hover:border-[#ED9F08]' : 'hover:border-[#0B2652]';

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
        isActive ? activeClass : `bg-white border border-gray-200 text-gray-600 ${hoverClass}`
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

interface FilterPillsProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  children?: ReactNode;
}

export function FilterPills({ options, selected, onChange, children }: FilterPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
      {options.map(option => (
        <FilterPill
          key={option}
          label={option}
          isActive={selected === option}
          onClick={() => onChange(option)}
        />
      ))}
      {children}
    </div>
  );
}
