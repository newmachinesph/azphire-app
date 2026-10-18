'use client';

import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

// Page Container
export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50 pb-24">{children}</div>;
}

// Main Content wrapper
export function MainContent({ children }: { children: React.ReactNode }) {
  return <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>;
}

// Card component with animation
interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Section Header with optional action
interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function SectionHeader({ title, icon, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      {action}
    </div>
  );
}

// View All Link
export function ViewAllLink({ href, label = 'View All' }: { href: string; label?: string }) {
  return (
    <a href={href} className="text-sm text-[#0B2652] font-medium hover:underline flex items-center gap-1">
      {label} <ChevronRightIcon className="h-4 w-4" />
    </a>
  );
}

// Profile Completion Card
interface ProfileCompletionProps {
  completion: number;
  items: { label: string; complete: boolean }[];
  className?: string;
}

export function ProfileCompletionCard({ completion, items, className = '' }: ProfileCompletionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-[#0B2652] to-[#1a3a6e] rounded-2xl p-6 text-white relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Profile Strength</h3>
          <span className="text-2xl font-bold">{completion}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/20 rounded-full mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-[#ED9F08] to-[#f5b52e] rounded-full"
          />
        </div>

        {/* Checklist */}
        <div className="space-y-2 mb-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {item.complete ? (
                <CheckCircleIcon className="h-4 w-4 text-green-400" />
              ) : (
                <ExclamationCircleIcon className="h-4 w-4 text-yellow-400" />
              )}
              <span className={item.complete ? 'text-white/70' : 'text-white'}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <a href="/job-seeker/profile" className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
          Complete Profile
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}

// Quick Stat Card
interface QuickStatProps {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function QuickStat({ label, value, change, icon: Icon }: QuickStatProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <Icon className="h-5 w-5 text-gray-400" />
        <span className="text-xs text-green-600 font-medium">{change}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

// Gold/Primary Button
interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'gold' | 'primary' | 'ghost';
}

export function Button({ children, href, onClick, className = '', variant = 'primary' }: ButtonProps) {
  const baseStyles = 'inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full transition-all';

  const variantStyles = {
    gold: 'bg-gradient-to-r from-[#ED9F08] to-[#f5b52e] text-white shadow-lg shadow-[#ED9F08]/25 hover:shadow-xl hover:scale-105',
    primary: 'bg-[#0B2652] text-white hover:bg-[#0a2040]',
    ghost: 'text-[#0B2652] hover:bg-[#0B2652]/10',
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return <a href={href} className={styles}>{children}</a>;
  }

  return <button onClick={onClick} className={styles}>{children}</button>;
}

// Avatar component
interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ initials, size = 'md', className = '' }: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div
      className={`rounded-full bg-gradient-to-br from-[#0B2652] to-[#1a3a6e] flex items-center justify-center text-white font-semibold ${sizeStyles[size]} ${className}`}
    >
      {initials}
    </div>
  );
}

// Company Logo placeholder
interface CompanyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export function CompanyLogo({ size = 'md', icon }: CompanyLogoProps) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizeStyles[size]} rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0`}>
      {icon}
    </div>
  );
}

// Skill Tag
export function SkillTag({ skill }: { skill: string }) {
  return (
    <span className="px-2 py-0.5 bg-[#0B2652]/5 text-[#0B2652] text-xs rounded-md">
      {skill}
    </span>
  );
}

// Status Badge
interface StatusBadgeProps {
  status: string;
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
  const statusColors: Record<string, string> = {
    interview: 'bg-green-100 text-green-700',
    reviewing: 'bg-yellow-100 text-yellow-700',
    applied: 'bg-blue-100 text-blue-700',
    rejected: 'bg-red-100 text-red-700',
    offer: 'bg-purple-100 text-purple-700',
  };

  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-700'} ${className}`}>
      {label}
    </span>
  );
}
