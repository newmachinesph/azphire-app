'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  Logo,
  AuthPageContainer,
  AuthCard,
  InputField,
  SubmitButton,
  SuccessState,
  IconCircle,
} from '@/components/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(AUTH-003): Call forgot password API with email
    setIsSubmitted(true);
  };

  return (
    <AuthPageContainer>
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Logo centered />
        </div>

        <AuthCard>
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <IconCircle icon={<EnvelopeIcon className="h-8 w-8 text-[#0B2652]" />} />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot your password?</h1>
                <p className="text-gray-600">
                  No worries! Enter your email and we&apos;ll send you reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  icon={<EnvelopeIcon className="h-5 w-5" />}
                  required
                />

                <SubmitButton>Send Reset Link</SubmitButton>
              </form>
            </>
          ) : (
            <SuccessState
              title="Check your email"
              message={`We've sent a password reset link to ${email}`}
              action={
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Didn&apos;t receive the email? Check your spam folder or{' '}
                    <button onClick={() => setIsSubmitted(false)} className="text-[#0B2652] font-medium hover:underline">
                      try another email
                    </button>
                  </p>
                  <Link href="/login" className="inline-flex items-center gap-2 text-[#0B2652] font-medium hover:underline">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Sign In
                  </Link>
                </div>
              }
            />
          )}
        </AuthCard>

        {!isSubmitted && (
          <p className="mt-6 text-center text-sm text-gray-500">
            <Link href="/login" className="inline-flex items-center gap-1 hover:text-[#0B2652] transition-colors">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Sign In
            </Link>
          </p>
        )}
      </div>
    </AuthPageContainer>
  );
}
