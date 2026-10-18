'use client';

import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  MagnifyingGlassIcon,
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  KeyIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  action?: () => void;
  keywords?: string[];
  group: string;
}

interface CommandPaletteProps {
  type: 'job-seeker' | 'employer';
}

export function CommandPalette({ type }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const jobSeekerItems: CommandItem[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="h-4 w-4" />, href: '/job-seeker', keywords: ['dashboard'], group: 'Navigation' },
    { id: 'jobs', label: 'Browse Jobs', icon: <BriefcaseIcon className="h-4 w-4" />, href: '/job-seeker/jobs', keywords: ['search', 'find', 'work'], group: 'Navigation' },
    { id: 'applications', label: 'My Applications', icon: <ClipboardDocumentListIcon className="h-4 w-4" />, href: '/job-seeker/applications', keywords: ['applied', 'status'], group: 'Navigation' },
    { id: 'saved', label: 'Saved Jobs', icon: <BookmarkIcon className="h-4 w-4" />, href: '/job-seeker/saved', keywords: ['bookmarks', 'favorites'], group: 'Navigation' },
    { id: 'messages', label: 'Messages', icon: <ChatBubbleLeftRightIcon className="h-4 w-4" />, href: '/job-seeker/messages', keywords: ['chat', 'inbox'], group: 'Navigation' },
    { id: 'profile', label: 'My Profile', icon: <UserCircleIcon className="h-4 w-4" />, href: '/job-seeker/profile', keywords: ['account', 'resume'], group: 'Navigation' },
    { id: 'settings', label: 'Settings', icon: <Cog6ToothIcon className="h-4 w-4" />, href: '/job-seeker/settings', keywords: ['preferences', 'config'], group: 'Navigation' },
    { id: 'logout', label: 'Log Out', icon: <ArrowRightOnRectangleIcon className="h-4 w-4" />, href: '/login', keywords: ['sign out', 'exit'], group: 'Account' },
  ];

  const employerItems: CommandItem[] = [
    { id: 'home', label: 'Dashboard', icon: <HomeIcon className="h-4 w-4" />, href: '/employer', keywords: ['home'], group: 'Navigation' },
    { id: 'jobs', label: 'My Jobs', icon: <BriefcaseIcon className="h-4 w-4" />, href: '/employer/jobs', keywords: ['listings', 'postings'], group: 'Navigation' },
    { id: 'new-job', label: 'Post New Job', icon: <PlusIcon className="h-4 w-4" />, href: '/employer/jobs/new', keywords: ['create', 'add'], group: 'Actions' },
    { id: 'candidates', label: 'Candidates', icon: <UsersIcon className="h-4 w-4" />, href: '/employer/candidates', keywords: ['applicants', 'talent'], group: 'Navigation' },
    { id: 'messages', label: 'Messages', icon: <ChatBubbleLeftRightIcon className="h-4 w-4" />, href: '/employer/messages', keywords: ['chat', 'inbox'], group: 'Navigation' },
    { id: 'api-keys', label: 'API Keys', icon: <KeyIcon className="h-4 w-4" />, href: '/employer/api-keys', keywords: ['integration', 'developer'], group: 'Navigation' },
    { id: 'settings', label: 'Settings', icon: <Cog6ToothIcon className="h-4 w-4" />, href: '/employer/settings', keywords: ['preferences', 'config'], group: 'Navigation' },
    { id: 'logout', label: 'Log Out', icon: <ArrowRightOnRectangleIcon className="h-4 w-4" />, href: '/login', keywords: ['sign out', 'exit'], group: 'Account' },
  ];

  const items = type === 'job-seeker' ? jobSeekerItems : employerItems;
  const groups = [...new Set(items.map(item => item.group))];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 w-full max-w-sm px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white/60 hover:text-white text-sm transition-colors border border-white/10"
      >
        <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0" />
        <span className="flex-1 text-left">Search pages, actions...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-white/10 rounded-md text-xs font-mono text-white/50">
          ⌘K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Menu"
        className="fixed inset-0 z-50"
      >
        <VisuallyHidden.Root>
          <Dialog.Title>Command Menu</Dialog.Title>
        </VisuallyHidden.Root>

        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        <div className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-lg px-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="flex items-center gap-3 px-4 border-b border-gray-100">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <Command.Input
                placeholder="Type a command or search..."
                className="flex-1 py-4 text-sm bg-transparent outline-none placeholder:text-gray-400"
              />
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500 font-mono">ESC</kbd>
            </div>

            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-sm text-gray-500">
                No results found.
              </Command.Empty>

              {groups.map(group => (
                <Command.Group key={group} heading={group}>
                  {items
                    .filter(item => item.group === group)
                    .map(item => (
                      <Command.Item
                        key={item.id}
                        value={`${item.label} ${item.keywords?.join(' ') || ''}`}
                        onSelect={() => {
                          if (item.href) {
                            runCommand(() => router.push(item.href!));
                          } else if (item.action) {
                            runCommand(item.action);
                          }
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-gray-700 data-[selected=true]:bg-[#0B2652] data-[selected=true]:text-white transition-colors"
                      >
                        <span className="flex-shrink-0 opacity-70">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </Command.Item>
                    ))}
                </Command.Group>
              ))}
            </Command.List>

            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-200 rounded font-mono">↵</kbd> Select
                </span>
              </div>
              <span>RemoteTalent.ph</span>
            </div>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}
