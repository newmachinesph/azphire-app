'use client';

import { motion } from 'framer-motion';
import {
  HomeIcon,
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  ClipboardDocumentListIcon as ClipboardIconSolid,
  ChatBubbleLeftRightIcon as ChatIconSolid,
  UserCircleIcon as UserIconSolid,
} from '@heroicons/react/24/solid';

export type NavId = 'home' | 'jobs' | 'applications' | 'messages' | 'profile';

interface NavItem {
  id: NavId;
  label: string;
  icon: typeof HomeIcon;
  iconSolid: typeof HomeIconSolid;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: HomeIcon, iconSolid: HomeIconSolid, href: '/job-seeker' },
  { id: 'jobs', label: 'Jobs', icon: BriefcaseIcon, iconSolid: BriefcaseIconSolid, href: '/job-seeker/jobs' },
  { id: 'applications', label: 'Applied', icon: ClipboardDocumentListIcon, iconSolid: ClipboardIconSolid, href: '/job-seeker/applications' },
  { id: 'messages', label: 'Messages', icon: ChatBubbleLeftRightIcon, iconSolid: ChatIconSolid, href: '/job-seeker/messages' },
  { id: 'profile', label: 'Profile', icon: UserCircleIcon, iconSolid: UserIconSolid, href: '/job-seeker/profile' },
];

interface BottomNavProps {
  activeNav: NavId;
  unreadMessages?: number;
}

export function BottomNav({ activeNav, unreadMessages = 0 }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl shadow-gray-900/20 border border-gray-200/50 px-2 py-2"
        >
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              const Icon = isActive ? item.iconSolid : item.icon;
              const badge = item.id === 'messages' ? unreadMessages : undefined;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative flex flex-col items-center py-2 px-4 rounded-xl transition-all ${
                    isActive ? 'text-[#0B2652]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="jobSeekerNavIndicator"
                      className="absolute inset-0 bg-[#0B2652]/10 rounded-xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="h-6 w-6 relative z-10" />
                  <span className="text-[10px] font-medium mt-1 relative z-10">{item.label}</span>
                  {badge && badge > 0 && (
                    <span className="absolute top-1 right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
