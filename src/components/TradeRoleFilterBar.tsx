import React from 'react';

export type TradeRole =
  | 'All'
  | 'Electrician'
  | 'Plumber'
  | 'Painter'
  | 'Carpenter'
  | 'Civil & General Contractor';

export interface TradeRoleFilterBarProps {
  activeRole: TradeRole;
  onSelectRole: (role: TradeRole) => void;
  className?: string;
}

const TRADE_ROLES: { id: TradeRole; label: string; icon: React.ReactNode }[] = [
  {
    id: 'All',
    label: 'All',
    icon: (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        <path d="M4 20l4-4" />
      </svg>
    ),
  },
  {
    id: 'Electrician',
    label: 'Electrician',
    icon: (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22v-5" />
        <path d="M9 8V2" />
        <path d="M15 8V2" />
        <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" fill="currentColor" fillOpacity="0.15" />
      </svg>
    ),
  },
  {
    id: 'Plumber',
    label: 'Plumber',
    icon: (
      <svg
        className="w-5 h-4 sm:w-6 sm:h-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="3" height="10" rx="0.5" fill="currentColor" fillOpacity="0.15" />
        <rect x="19" y="7" width="3" height="10" rx="0.5" fill="currentColor" fillOpacity="0.15" />
        <path d="M5 9h14M5 15h14" />
      </svg>
    ),
  },
  {
    id: 'Painter',
    label: 'Painter',
    icon: (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="3" width="16" height="6" rx="2" fill="currentColor" fillOpacity="0.15" />
        <path d="M12 9v3a2 2 0 0 1-2 2H8a2 2 0 0 0-2 2v5" />
      </svg>
    ),
  },
  {
    id: 'Carpenter',
    label: 'Carpenter',
    icon: (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="7" width="18" height="13" rx="2" fill="currentColor" fillOpacity="0.15" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <rect x="10.5" y="11" width="3" height="2" rx="0.5" />
      </svg>
    ),
  },
  {
    id: 'Civil & General Contractor',
    label: 'Civil & General Contractor',
    icon: (
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        <path d="M4 20l5-5" />
        <path d="M14 4l6 6" />
      </svg>
    ),
  },
];

export const TradeRoleFilterBar: React.FC<TradeRoleFilterBarProps> = ({
  activeRole,
  onSelectRole,
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-x-auto no-scrollbar scroll-smooth bg-white ${className}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex items-stretch w-full min-w-max md:min-w-full">
        {TRADE_ROLES.map((role) => {
          const isActive = activeRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelectRole(role.id)}
              className={`flex-1 flex items-center justify-center gap-2 sm:gap-2.5 px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap select-none text-center border-b-2 ${
                isActive
                  ? 'bg-orange-50/80 text-[#0b1d3a] font-bold border-[#ff6b00] shadow-2xs'
                  : 'text-gray-600 hover:text-[#0b1d3a] hover:bg-gray-50/90 border-transparent hover:border-gray-200'
              }`}
            >
              <span
                className={`transition-colors shrink-0 ${
                  isActive ? 'text-[#ff6b00]' : 'text-gray-500'
                }`}
              >
                {role.icon}
              </span>
              <span className="leading-tight">{role.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
