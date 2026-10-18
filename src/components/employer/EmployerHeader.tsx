'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BellIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { gradients } from './theme';
import { CommandPalette } from '@/components/shared/CommandPalette';

interface CompanyInfo {
  name: string;
  initials: string;
  industry?: string;
  verified?: boolean;
  unreadNotifications?: number;
}

interface EmployerHeaderProps {
  company: CompanyInfo;
  pageTitle?: string;
}

export function EmployerHeader({ company, pageTitle }: EmployerHeaderProps) {
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

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0B2652] to-[#1a3a6e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Company */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-gradient-to-r from-[#ED9F08] to-[#f5b52e] border-2 border-[#0B2652]" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-white">{company.name}</p>
                {company.verified && <CheckCircleIcon className="h-4 w-4 text-[#ED9F08]" />}
              </div>
              {pageTitle && <p className="text-xs text-white/70">{pageTitle}</p>}
            </div>
          </div>

          {/* Command Palette Search */}
          <div className="flex-1 max-w-md flex justify-center">
            <CommandPalette type="employer" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="relative p-2.5 rounded-xl hover:bg-white/10 transition-colors">
              <BellIcon className="h-5 w-5 text-white/80" />
              {company.unreadNotifications && company.unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ED9F08] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {company.unreadNotifications}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-semibold hover:bg-white/30 transition-all hover:scale-105 ring-2 ring-white/20"
              >
                {company.initials}
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${gradients.primary} flex items-center justify-center text-white font-semibold`}>
                          {company.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{company.name}</p>
                          {company.industry && (
                            <p className="text-xs text-gray-500">{company.industry}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <a href="/employer/settings" className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                        Company Profile
                      </a>
                      <a href="/employer/settings" className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <UserCircleIcon className="h-5 w-5 text-gray-400" />
                        Team Members
                      </a>
                      <a href="/employer/settings" className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
                        Settings
                      </a>
                      <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400" />
                        Help & Support
                      </button>
                    </div>
                    <div className="border-t border-gray-100 pt-2">
                      <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
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
