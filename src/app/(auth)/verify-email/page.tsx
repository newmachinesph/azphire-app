'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import {
  Logo,
  AuthPageContainer,
  AuthCard,
  BackToHome,
  IconCircle,
  LANDING_URL,
} from '@/components/auth';

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsResending(false);
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <AuthPageContainer>
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Logo centered />
        </div>

        <AuthCard>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <IconCircle icon={<EnvelopeIcon className="h-10 w-10 text-[#0B2652]" />} size="lg" />
            </motion.div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h1>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleResend}
                disabled={isResending}
                className="w-full py-3.5 rounded-xl border-2 border-[#0B2652] text-[#0B2652] font-semibold hover:bg-[#0B2652]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isResending ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : resent ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    Email Sent!
                  </>
                ) : (
                  'Resend Verification Email'
                )}
              </button>

              <Link
                href="/login"
                className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0B2652] to-[#1a3a6e] text-white font-semibold text-center shadow-lg shadow-[#0B2652]/25 hover:shadow-xl transition-all"
              >
                Back to Sign In
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Didn&apos;t receive the email? Check your spam folder or{' '}
                <a href={`${LANDING_URL}/contact`} className="text-[#0B2652] font-medium hover:underline">
                  contact support
                </a>
              </p>
            </div>
          </div>
        </AuthCard>

        <BackToHome />
      </div>
    </AuthPageContainer>
  );
}
