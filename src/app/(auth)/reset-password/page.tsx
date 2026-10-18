'use client';

import { useState } from 'react';
import Link from 'next/link';
import { KeyIcon } from '@heroicons/react/24/outline';
import {
  Logo,
  AuthPageContainer,
  AuthCard,
  PasswordField,
  SubmitButton,
  SuccessState,
  IconCircle,
} from '@/components/auth';

export default function ResetPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // TODO(AUTH-002): Call reset password API
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
                <IconCircle icon={<KeyIcon className="h-8 w-8 text-[#0B2652]" />} />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Set new password</h1>
                <p className="text-gray-600">
                  Your new password must be different from previously used passwords.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <PasswordField
                  id="password"
                  label="New Password"
                  value={formData.password}
                  onChange={(password) => setFormData({ ...formData, password })}
                  placeholder="Enter new password"
                  required
                  minLength={8}
                  hint="Must be at least 8 characters"
                />

                <PasswordField
                  id="confirmPassword"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(confirmPassword) => setFormData({ ...formData, confirmPassword })}
                  placeholder="Confirm new password"
                  required
                />

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <SubmitButton>Reset Password</SubmitButton>
              </form>
            </>
          ) : (
            <SuccessState
              title="Password reset successful"
              message="Your password has been successfully reset. You can now sign in with your new password."
              action={
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0B2652] to-[#1a3a6e] text-white font-semibold shadow-lg shadow-[#0B2652]/25 hover:shadow-xl transition-all"
                >
                  Sign In
                </Link>
              }
            />
          )}
        </AuthCard>
      </div>
    </AuthPageContainer>
  );
}
