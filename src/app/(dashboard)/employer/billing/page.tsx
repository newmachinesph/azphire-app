'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  CreditCardIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  UsersIcon,
  BriefcaseIcon,
  ChartBarIcon,
  BoltIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import {
  BottomNav,
  PageContainer,
  MainContent,
  GoldButton,
  cardStyles,
  gradients,
} from '@/components/employer';

// Mock data
const subscription = {
  plan: 'professional',
  status: 'active',
  currentPeriodStart: 'Jan 1, 2025',
  currentPeriodEnd: 'Feb 1, 2025',
  cancelAtPeriodEnd: false,
};

const usage = {
  activeJobs: 8,
  maxActiveJobs: 10,
  teamMembers: 4,
  maxTeamMembers: 5,
  talentPoolsUsed: 3,
  applicantsThisMonth: 127,
};

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    interval: 'monthly',
    features: {
      maxActiveJobs: 3,
      maxTeamMembers: 2,
      talentPoolsEnabled: false,
      webhooksEnabled: false,
      analyticsEnabled: false,
      prioritySupport: false,
    },
    featuresList: [
      '3 active job postings',
      '2 team members',
      'Basic candidate management',
      'Email notifications',
      'Standard support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 149,
    interval: 'monthly',
    recommended: true,
    features: {
      maxActiveJobs: 10,
      maxTeamMembers: 5,
      talentPoolsEnabled: true,
      webhooksEnabled: true,
      analyticsEnabled: true,
      prioritySupport: false,
    },
    featuresList: [
      '10 active job postings',
      '5 team members',
      'Talent pools & candidate tracking',
      'Webhooks & integrations',
      'Advanced analytics',
      'Priority email support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    interval: 'monthly',
    features: {
      maxActiveJobs: -1,
      maxTeamMembers: -1,
      talentPoolsEnabled: true,
      webhooksEnabled: true,
      analyticsEnabled: true,
      prioritySupport: true,
    },
    featuresList: [
      'Unlimited job postings',
      'Unlimited team members',
      'Advanced talent pools',
      'Custom integrations',
      'Full analytics suite',
      'Dedicated account manager',
      'SLA guarantee',
    ],
  },
];

const invoices = [
  { id: 'INV-2025-001', date: 'Jan 1, 2025', amount: 149, status: 'paid', pdfUrl: '#' },
  { id: 'INV-2024-012', date: 'Dec 1, 2024', amount: 149, status: 'paid', pdfUrl: '#' },
  { id: 'INV-2024-011', date: 'Nov 1, 2024', amount: 149, status: 'paid', pdfUrl: '#' },
  { id: 'INV-2024-010', date: 'Oct 1, 2024', amount: 149, status: 'paid', pdfUrl: '#' },
];

const paymentMethod = {
  type: 'card',
  brand: 'Visa',
  last4: '4242',
  expiryMonth: 12,
  expiryYear: 2026,
  isDefault: true,
};

export default function BillingPage() {
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const currentPlan = plans.find(p => p.id === subscription.plan);

  return (
    <PageContainer>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <a href="/employer/settings" className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors">
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </a>
            <div>
              <h1 className="font-semibold text-gray-900">Billing & Subscription</h1>
              <p className="text-xs text-gray-500">Manage your plan and payments</p>
            </div>
          </div>
        </div>
      </header>

      <MainContent>
        <div className="space-y-6">
          {/* Current Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${gradients.primary} rounded-2xl p-6 text-white`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <SparklesIcon className="h-5 w-5 text-amber-300" />
                  <span className="text-sm text-amber-300 font-medium">Current Plan</span>
                </div>
                <h2 className="text-2xl font-bold">{currentPlan?.name}</h2>
                <p className="text-white/70">
                  ${currentPlan?.price}/month • Renews {subscription.currentPeriodEnd}
                </p>
              </div>
              <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full capitalize">
                {subscription.status}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <BriefcaseIcon className="h-5 w-5 text-amber-300 mb-2" />
                <p className="text-2xl font-bold">{usage.activeJobs}/{usage.maxActiveJobs}</p>
                <p className="text-sm text-white/70">Active Jobs</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <UsersIcon className="h-5 w-5 text-amber-300 mb-2" />
                <p className="text-2xl font-bold">{usage.teamMembers}/{usage.maxTeamMembers}</p>
                <p className="text-sm text-white/70">Team Members</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <BuildingOfficeIcon className="h-5 w-5 text-amber-300 mb-2" />
                <p className="text-2xl font-bold">{usage.talentPoolsUsed}</p>
                <p className="text-sm text-white/70">Talent Pools</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <ChartBarIcon className="h-5 w-5 text-amber-300 mb-2" />
                <p className="text-2xl font-bold">{usage.applicantsThisMonth}</p>
                <p className="text-sm text-white/70">Applicants</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowChangePlanModal(true)}
                className="px-6 py-2 bg-white text-[#0B2652] font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                Change Plan
              </button>
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-6 py-2 bg-white/20 text-white font-medium rounded-full hover:bg-white/30 transition-colors"
              >
                Cancel Subscription
              </button>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cardStyles.withPadding}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">Payment Method</h2>
              <button className="text-sm text-[#0B2652] font-medium hover:underline">
                + Add New
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                  {paymentMethod.brand}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {paymentMethod.brand} ending in {paymentMethod.last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {paymentMethod.isDefault && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Default
                  </span>
                )}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <CreditCardIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Invoices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cardStyles.withPadding}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">Billing History</h2>
              <button className="text-sm text-[#0B2652] font-medium hover:underline">
                Download All
              </button>
            </div>

            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{invoice.id}</p>
                      <p className="text-sm text-gray-500">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-900">${invoice.amount}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {invoice.status}
                    </span>
                    <a
                      href={invoice.pdfUrl}
                      className="p-2 text-gray-400 hover:text-[#0B2652] hover:bg-[#0B2652]/10 rounded-lg transition-colors"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Available Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-900">Available Plans</h2>
              <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-full">
                <button
                  onClick={() => setBillingInterval('monthly')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                    billingInterval === 'monthly' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingInterval('yearly')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                    billingInterval === 'yearly' ? 'bg-white shadow text-gray-900' : 'text-gray-600'
                  }`}
                >
                  Yearly (20% off)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => {
                const isCurrentPlan = plan.id === subscription.plan;
                const price = billingInterval === 'yearly' ? Math.round(plan.price * 0.8) : plan.price;

                return (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all ${
                      plan.recommended ? 'border-amber-400' : 'border-transparent'
                    } ${isCurrentPlan ? 'ring-2 ring-[#0B2652]' : ''}`}
                  >
                    {plan.recommended && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-4">
                        <BoltIcon className="h-3 w-3" />
                        Recommended
                      </div>
                    )}

                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-2 mb-4">
                      <span className="text-3xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-500">/{billingInterval === 'yearly' ? 'mo' : 'month'}</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.featuresList.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      disabled={isCurrentPlan}
                      className={`w-full py-3 rounded-xl font-medium transition-colors ${
                        isCurrentPlan
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : plan.recommended
                          ? 'bg-[#0B2652] text-white hover:bg-[#0B2652]/90'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {isCurrentPlan ? 'Current Plan' : 'Upgrade'}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </MainContent>

      <BottomNav activeNav="home" unreadMessages={3} />

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancel Subscription?</h3>
            <p className="text-gray-600 mb-6">
              Your subscription will remain active until {subscription.currentPeriodEnd}. After that, you&apos;ll lose access to premium features.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Keep Subscription
              </button>
              <button className="flex-1 px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors">
                Cancel Subscription
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </PageContainer>
  );
}
