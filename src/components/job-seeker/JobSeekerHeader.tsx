'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { CommandPalette } from '@/components/shared/CommandPalette';

interface User {
  name: string;
  initials: string;
  title: string;
  unreadNotifications?: number;
}

interface JobSeekerHeaderProps {
  user: User;
}

export function JobSeekerHeader({ user }: JobSeekerHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const firstName = user.name.split(' ')[0];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0B2652] to-[#1a3a6e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Greeting */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-gradient-to-r from-[#ED9F08] to-[#f5b52e] border-2 border-[#0B2652]" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm text-white/70">Welcome back,</p>
              <p className="font-semibold text-white">{firstName}</p>
            </div>
          </div>

          {/* Command Palette Search */}
          <div className="flex-1 max-w-md flex justify-center">
            <CommandPalette type="job-seeker" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="relative p-2.5 rounded-xl hover:bg-white/10 transition-colors">
              <BellIcon className="h-5 w-5 text-white/80" />
              {user.unreadNotifications && user.unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ED9F08] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {user.unreadNotifications}
                </span>
              )}
            </button>

            {/* User Avatar with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-semibold hover:bg-white/30 transition-all hover:scale-105 ring-2 ring-white/20"
              >
                {user.initials}
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B2652] to-[#1a3a6e] flex items-center justify-center text-white font-semibold">
                          {user.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.title}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <a href="/job-seeker/profile" className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                        View Profile
                      </a>
                      <a href="/job-seeker/settings" className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                        <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
                        Settings
                      </a>
                      <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                        <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                        Help & Support
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-2">
                      <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
