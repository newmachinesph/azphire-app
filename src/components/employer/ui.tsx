'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { gradients, buttonStyles, cardStyles, getJobStatusStyles, getCandidateStatusStyles } from './theme';

// Avatar Component
interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const avatarSizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export function Avatar({ initials, size = 'md', className = '' }: AvatarProps) {
  return (
    <div
      className={`rounded-full ${gradients.primary} flex items-center justify-center text-white font-semibold ${avatarSizes[size]} ${className}`}
    >
      {initials}
    </div>
  );
}

// Status Badge Component
interface StatusBadgeProps {
  status: string;
  type: 'job' | 'candidate';
  className?: string;
}

export function StatusBadge({ status, type, className = '' }: StatusBadgeProps) {
  const styles = type === 'job'
    ? getJobStatusStyles(status)
    : getCandidateStatusStyles(status);

  const label = type === 'candidate'
    ? getCandidateStatusStyles(status).label
    : status;

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${styles.badge} ${className}`}>
      {label}
    </span>
  );
}

// Card Component
interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  padding?: boolean;
  delay?: number;
}

export function Card({ children, padding = true, delay = 0, className = '', ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`${padding ? cardStyles.withPadding : cardStyles.base} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Gold CTA Button Component
interface GoldButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export function GoldButton({ children, href, onClick, className = '', type = 'button' }: GoldButtonProps) {
  const classes = `${buttonStyles.goldCta} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

// Secondary Button Component
interface SecondaryButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function SecondaryButton({ children, href, onClick, className = '' }: SecondaryButtonProps) {
  const classes = `${buttonStyles.secondary} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

// Ghost Button Component
interface GhostButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function GhostButton({ children, href, onClick, className = '' }: GhostButtonProps) {
  const classes = `${buttonStyles.ghost} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

// Icon Button Component
interface IconButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'default' | 'danger' | 'gold';
  className?: string;
}

export function IconButton({ children, href, onClick, variant = 'default', className = '' }: IconButtonProps) {
  const variantStyles = {
    default: buttonStyles.icon,
    danger: buttonStyles.iconDanger,
    gold: 'p-2 text-gray-400 hover:text-[#ED9F08] hover:bg-yellow-50 rounded-lg transition-colors',
  };

  const classes = `${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

// Page Container Component
interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {children}
    </div>
  );
}

// Main Content Component
interface MainContentProps {
  children: ReactNode;
  className?: string;
}

export function MainContent({ children, className = '' }: MainContentProps) {
  return (
    <main className={`max-w-7xl mx-auto px-4 sm:px-6 py-6 ${className}`}>
      {children}
    </main>
  );
}

// Page Header Component
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// Filter Pills Component
interface FilterPillsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export function FilterPills({ options, selected, onSelect }: FilterPillsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 -mx-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selected === option
              ? 'bg-[#0B2652]/10 text-[#0B2652] ring-1 ring-[#0B2652]/20'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

// Section Header Component
interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      {action}
    </div>
  );
}

// List Item with Status Border
interface StatusBorderItemProps {
  children: ReactNode;
  status: string;
  type: 'job' | 'candidate';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function StatusBorderItem({ children, status, type, href, onClick, className = '' }: StatusBorderItemProps) {
  const styles = type === 'job'
    ? getJobStatusStyles(status)
    : getCandidateStatusStyles(status);

  const baseClasses = `p-4 hover:bg-gray-50 transition-colors border-l-4 ${styles.border} ${className}`;

  if (href) {
    return (
      <a href={href} className={`block ${baseClasses}`}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <div onClick={onClick} className={`cursor-pointer ${baseClasses}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}
