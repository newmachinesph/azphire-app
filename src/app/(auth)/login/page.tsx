'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import {
  Logo,
  AuthSplitLayout,
  InputField,
  PasswordField,
  SubmitButton,
  Divider,
  SocialLoginButtons,
  LANDING_URL,
} from '@/components/auth';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(AUTH-004): Call login API with formData
  };

  const rightPanel = (
    <>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ED9F08] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-md"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-2xl">R</span>
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#ED9F08] to-[#B81D23] border-2 border-[#0B2652]" />
          </div>
          <span className="text-2xl font-bold text-white">RemoteTalent</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Welcome Back</h2>
        <p className="text-white/70 text-lg">
          Connect with global opportunities and take your career to new heights.
        </p>
      </motion.div>
    </>
  );

  return (
    <AuthSplitLayout rightPanel={rightPanel}>
      {/* Mobile Logo */}
      <div className="lg:hidden mb-8">
        <Logo size="sm" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in to your account</h1>
        <p className="text-gray-600 mb-8">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#0B2652] font-medium hover:underline">
            Create one free
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(email) => setFormData({ ...formData, email })}
            placeholder="you@example.com"
            icon={<EnvelopeIcon className="h-5 w-5" />}
            required
          />

          <PasswordField
            id="password"
            label="Password"
            value={formData.password}
            onChange={(password) => setFormData({ ...formData, password })}
            placeholder="Enter your password"
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-[#0B2652] focus:ring-[#0B2652]"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-[#0B2652] font-medium hover:underline">
              Forgot password?
            </Link>
          </div>

          <SubmitButton>Sign In</SubmitButton>

          <Divider />

          <SocialLoginButtons />
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          <a href={LANDING_URL} className="hover:text-[#0B2652] transition-colors">
            &larr; Back to Home
          </a>
        </p>
      </motion.div>
    </AuthSplitLayout>
  );
}
