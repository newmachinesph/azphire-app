'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
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

const jobSeekerBenefits = [
  'Access hundreds of remote job opportunities',
  'Get matched with jobs that fit your skills',
  'Apply to multiple jobs with one click',
  'Free to join and use forever',
];

const employerBenefits = [
  'Access top Filipino remote talent',
  'Post unlimited job listings',
  'AI-powered candidate matching',
  'Verified and vetted candidates',
];

function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultType = searchParams.get('type') === 'employer' ? 'employer' : 'jobseeker';

  const [userType, setUserType] = useState<'jobseeker' | 'employer'>(defaultType);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(AUTH-005): Call registration API with { userType, ...formData }
  };

  const benefits = userType === 'jobseeker' ? jobSeekerBenefits : employerBenefits;

  const rightPanel = (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-md"
    >
      <h2 className="text-3xl font-bold text-white mb-6">
        {userType === 'jobseeker' ? 'Start Your Remote Career Today' : 'Hire Top Filipino Talent'}
      </h2>
      <p className="text-white/70 mb-8">
        {userType === 'jobseeker'
          ? 'Join thousands of Filipino professionals working for global companies from home.'
          : 'Access a pool of skilled, English-proficient professionals ready to join your team.'}
      </p>
      <ul className="space-y-4">
        {benefits.map((benefit, index) => (
          <motion.li
            key={benefit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-3"
          >
            <CheckCircleIcon className="h-6 w-6 text-[#ED9F08] flex-shrink-0" />
            <span className="text-white">{benefit}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <AuthSplitLayout rightPanel={rightPanel}>
      <div className="mb-8">
        <Logo size="sm" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
        <p className="text-gray-600 mb-8">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0B2652] font-medium hover:underline">
            Sign in
          </Link>
        </p>

        {/* User Type Toggle */}
        <div className="flex gap-3 mb-8">
          <button
            type="button"
            onClick={() => setUserType('jobseeker')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
              userType === 'jobseeker'
                ? 'border-[#0B2652] bg-[#0B2652]/5 text-[#0B2652]'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <UserIcon className="h-5 w-5" />
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => setUserType('employer')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
              userType === 'employer'
                ? 'border-[#0B2652] bg-[#0B2652]/5 text-[#0B2652]'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <BuildingOfficeIcon className="h-5 w-5" />
            Employer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={(firstName) => setFormData({ ...formData, firstName })}
              placeholder="Juan"
              required
            />
            <InputField
              id="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={(lastName) => setFormData({ ...formData, lastName })}
              placeholder="Dela Cruz"
              required
            />
          </div>

          {/* Business Name (for employers) */}
          {userType === 'employer' && (
            <InputField
              id="companyName"
              label="Business Name"
              value={formData.companyName}
              onChange={(companyName) => setFormData({ ...formData, companyName })}
              placeholder="Your business or personal brand"
              icon={<BuildingOfficeIcon className="h-5 w-5" />}
            />
          )}

          <InputField
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(email) => setFormData({ ...formData, email })}
            placeholder="juan@example.com"
            icon={<EnvelopeIcon className="h-5 w-5" />}
            required
          />

          <PasswordField
            id="password"
            label="Password"
            value={formData.password}
            onChange={(password) => setFormData({ ...formData, password })}
            placeholder="Create a strong password"
            required
            minLength={8}
            hint="Must be at least 8 characters"
          />

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0B2652] focus:ring-[#0B2652]"
              required
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
              I agree to the{' '}
              <a href={`${LANDING_URL}/terms`} className="text-[#0B2652] hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href={`${LANDING_URL}/privacy`} className="text-[#0B2652] hover:underline">Privacy Policy</a>
            </label>
          </div>

          <SubmitButton>Create Account</SubmitButton>

          <Divider />

          <SocialLoginButtons />
        </form>
      </motion.div>
    </AuthSplitLayout>
  );
}

function RegisterFallback() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-10 h-10 rounded-xl bg-gray-200" />
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterFallback />}>
      <RegisterForm />
    </Suspense>
  );
}
