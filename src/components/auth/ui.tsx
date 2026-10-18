'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { LANDING_URL } from './theme';

// Logo Component
export function Logo({ centered = false, size = 'md' }: { centered?: boolean; size?: 'sm' | 'md' }) {
  const sizeStyles = {
    sm: { box: 'w-10 h-10', text: 'text-lg', dot: 'w-4 h-4 -bottom-1 -right-1', brand: 'text-xl' },
    md: { box: 'w-14 h-14', text: 'text-2xl', dot: 'w-5 h-5 -bottom-1.5 -right-1.5', brand: 'text-2xl' },
  };
  const s = sizeStyles[size];

  return (
    <a href={LANDING_URL} className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
      <div className="relative">
        <div className={`${s.box} rounded-xl bg-gradient-to-br from-[#0B2652] to-[#1a3a6e] flex items-center justify-center shadow-lg`}>
          <span className={`text-white font-bold ${s.text}`}>R</span>
        </div>
        <div className={`absolute ${s.dot} rounded-full bg-gradient-to-r from-[#ED9F08] to-[#B81D23] border-2 border-white`} />
      </div>
      <span className={`${s.brand} font-bold text-[#0B2652]`}>RemoteTalent</span>
    </a>
  );
}

// Auth Page Container
export function AuthPageContainer({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">{children}</main>;
}

// Auth Split Layout (form on one side, branding on other)
export function AuthSplitLayout({ children, rightPanel }: { children: React.ReactNode; rightPanel?: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50 flex">
      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
      {/* Branding Side */}
      {rightPanel && (
        <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-[#0B2652] to-[#1a3a6e] p-12 xl:p-20 items-center justify-center relative overflow-hidden">
          {rightPanel}
        </div>
      )}
    </main>
  );
}

// Auth Card
export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8"
    >
      {children}
    </motion.div>
  );
}

// Input Field with Icon
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  hint?: string;
  minLength?: number;
}

export function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  required = false,
  hint,
  minLength,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${icon ? 'pl-12' : 'px-4'} pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent`}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
        />
      </div>
      {hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

// Password Field with Show/Hide Toggle
interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  minLength?: number;
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder = 'Enter your password',
  required = false,
  hint,
  minLength,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent"
          placeholder={placeholder}
          required={required}
          minLength={minLength}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
      {hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

// Primary Submit Button
export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0B2652] to-[#1a3a6e] text-white font-semibold shadow-lg shadow-[#0B2652]/25 hover:shadow-xl transition-all"
    >
      {children}
    </button>
  );
}

// Divider with text
export function Divider({ text = 'or continue with' }: { text?: string }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-gray-500">{text}</span>
      </div>
    </div>
  );
}

// Social Login Buttons
export function SocialLoginButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Google
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
        LinkedIn
      </button>
    </div>
  );
}

// Success State Card
interface SuccessStateProps {
  title: string;
  message: string;
  action?: React.ReactNode;
}

export function SuccessState({ title, message, action }: SuccessStateProps) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
      >
        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      {action}
    </div>
  );
}

// Icon Circle (for page headers)
interface IconCircleProps {
  icon: React.ReactNode;
  size?: 'md' | 'lg';
}

export function IconCircle({ icon, size = 'md' }: IconCircleProps) {
  const sizeStyles = {
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  return (
    <div className={`${sizeStyles[size]} rounded-full bg-[#0B2652]/10 flex items-center justify-center mx-auto mb-4`}>
      {icon}
    </div>
  );
}

// Back Link
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#0B2652] transition-colors">
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      {label}
    </Link>
  );
}

// Back to Home Link
export function BackToHome() {
  return (
    <p className="mt-6 text-center text-sm text-gray-500">
      <a href={LANDING_URL} className="hover:text-[#0B2652] transition-colors">
        &larr; Back to Home
      </a>
    </p>
  );
}
