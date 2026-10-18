'use client';

import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showFilter?: boolean;
  filterActive?: boolean;
  onFilterClick?: () => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  showFilter = false,
  filterActive = false,
  onFilterClick,
}: SearchBarProps) {
  return (
    <div className="flex gap-3">
      <div className="flex-1 relative">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent"
        />
      </div>
      {showFilter && (
        <button
          onClick={onFilterClick}
          className={`px-4 py-3 rounded-xl border transition-colors flex items-center gap-2 ${
            filterActive
              ? 'bg-[#0B2652] text-white border-[#0B2652]'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      )}
    </div>
  );
}
