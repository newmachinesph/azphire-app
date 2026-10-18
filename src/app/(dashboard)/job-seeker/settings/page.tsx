'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  EyeIcon,
  CreditCardIcon,
  TrashIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  KeyIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import {
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';
import {
  BottomNav,
  PageContainer,
  MainContent,
  Card,
} from '@/components/job-seeker';

const user = {
  name: 'Maria Santos',
  initials: 'MS',
  title: 'Senior React Developer',
  email: 'maria.santos@email.com',
  unreadMessages: 2,
};

// 2FA Status
const twoFactorStatus = {
  enabled: true,
  method: 'authenticator', // 'authenticator' | 'sms' | null
  phoneNumber: '+63 917 ***-**67',
  backupCodesRemaining: 8,
  lastEnabled: 'Dec 15, 2024',
};

// Active sessions
const sessions = [
  {
    id: '1',
    device: 'Chrome on Windows',
    deviceType: 'desktop',
    location: 'Manila, Philippines',
    ip: '192.168.1.***',
    lastActive: 'Now',
    isCurrent: true,
  },
  {
    id: '2',
    device: 'Safari on iPhone',
    deviceType: 'mobile',
    location: 'Manila, Philippines',
    ip: '192.168.1.***',
    lastActive: '2 hours ago',
    isCurrent: false,
  },
  {
    id: '3',
    device: 'Firefox on MacOS',
    deviceType: 'desktop',
    location: 'Cebu City, Philippines',
    ip: '10.0.0.***',
    lastActive: 'Yesterday',
    isCurrent: false,
  },
];

const settingsSections = [
  {
    title: 'Account',
    items: [
      { icon: UserCircleIcon, label: 'Edit Profile', description: 'Update your personal information', href: '/job-seeker/profile' },
      { icon: ShieldCheckIcon, label: 'Password & Security', description: 'Manage your password and 2FA', href: '#' },
      { icon: EnvelopeIcon, label: 'Email Settings', description: 'Change your email address', href: '#' },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { icon: BellIcon, label: 'Push Notifications', description: 'Manage mobile and browser alerts', href: '#' },
      { icon: EnvelopeIcon, label: 'Email Notifications', description: 'Control what emails you receive', href: '#' },
    ],
  },
  {
    title: 'Privacy',
    items: [
      { icon: EyeIcon, label: 'Profile Visibility', description: 'Control who can see your profile', href: '#' },
      { icon: ShieldCheckIcon, label: 'Data & Privacy', description: 'Download or delete your data', href: '#' },
    ],
  },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    messages: true,
    applicationUpdates: true,
    marketing: false,
  });
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState<string | null>(null);

  return (
    <PageContainer>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <a
              href="/job-seeker"
              className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </a>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#0B2652]/10 rounded-xl">
                <Cog6ToothIcon className="h-5 w-5 text-[#0B2652]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Settings</h1>
                <p className="text-xs text-gray-500">Manage your account</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MainContent>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Summary */}
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0B2652] to-[#1a3a6e] flex items-center justify-center text-white text-xl font-bold">
                {user.initials}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400 mt-1">{user.title}</p>
              </div>
              <a
                href="/job-seeker/profile"
                className="px-4 py-2 text-sm font-medium text-[#0B2652] hover:bg-[#0B2652]/5 rounded-lg transition-colors"
              >
                Edit
              </a>
            </div>
          </Card>

          {/* Settings Sections */}
          {settingsSections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
                {section.title}
              </h3>
              <Card className="!p-0 overflow-hidden">
                {section.items.map((item, j) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                      j > 0 ? 'border-t border-gray-100' : ''
                    }`}
                  >
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <item.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.label}</h4>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </a>
                ))}
              </Card>
            </motion.div>
          ))}

          {/* Quick Toggles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
              Quick Settings
            </h3>
            <Card>
              <div className="space-y-4">
                {[
                  { key: 'jobAlerts', label: 'Job Alerts', description: 'Get notified about new matching jobs' },
                  { key: 'messages', label: 'Message Notifications', description: 'Receive alerts for new messages' },
                  { key: 'applicationUpdates', label: 'Application Updates', description: 'Status changes on your applications' },
                  { key: 'marketing', label: 'Marketing Emails', description: 'Tips and career resources' },
                ].map((toggle, i) => (
                  <div
                    key={toggle.key}
                    className={`flex items-center justify-between ${i > 0 ? 'pt-4 border-t border-gray-100' : ''}`}
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{toggle.label}</h4>
                      <p className="text-sm text-gray-500">{toggle.description}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({
                        ...prev,
                        [toggle.key]: !prev[toggle.key as keyof typeof prev]
                      }))}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[toggle.key as keyof typeof notifications]
                          ? 'bg-[#0B2652]'
                          : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          notifications[toggle.key as keyof typeof notifications]
                            ? 'translate-x-7'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Two-Factor Authentication */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
              Two-Factor Authentication
            </h3>
            <Card>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${twoFactorStatus.enabled ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <ShieldCheckIcon className={`h-6 w-6 ${twoFactorStatus.enabled ? 'text-green-600' : 'text-yellow-600'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {twoFactorStatus.enabled ? '2FA is Enabled' : '2FA is Disabled'}
                    </h4>
                    {twoFactorStatus.enabled ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  {twoFactorStatus.enabled ? (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        Using {twoFactorStatus.method === 'authenticator' ? 'Authenticator App' : 'SMS'}
                        {twoFactorStatus.method === 'sms' && ` (${twoFactorStatus.phoneNumber})`}
                      </p>
                      <p className="text-xs text-gray-400">
                        Enabled on {twoFactorStatus.lastEnabled} • {twoFactorStatus.backupCodesRemaining} backup codes remaining
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShow2FAModal(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    twoFactorStatus.enabled
                      ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      : 'text-white bg-[#0B2652] hover:bg-[#0B2652]/90'
                  }`}
                >
                  {twoFactorStatus.enabled ? 'Manage' : 'Enable'}
                </button>
              </div>

              {twoFactorStatus.enabled && (
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <KeyIcon className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">View Backup Codes</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Change Method</span>
                  </button>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Active Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Active Sessions
              </h3>
              <button className="text-xs text-red-600 font-medium hover:underline">
                Sign out all other sessions
              </button>
            </div>
            <Card className="!p-0 overflow-hidden">
              {sessions.map((session, i) => (
                <div
                  key={session.id}
                  className={`flex items-center gap-4 p-4 ${i > 0 ? 'border-t border-gray-100' : ''}`}
                >
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {session.deviceType === 'desktop' ? (
                      <ComputerDesktopIcon className="h-5 w-5 text-gray-600" />
                    ) : (
                      <DevicePhoneMobileIcon className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 truncate">{session.device}</h4>
                      {session.isCurrent && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <GlobeAltIcon className="h-4 w-4" />
                      <span>{session.location}</span>
                      <span className="text-gray-300">•</span>
                      <span>{session.lastActive}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">IP: {session.ip}</p>
                  </div>
                  {!session.isCurrent && (
                    <button
                      onClick={() => setShowRevokeModal(session.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Sign out this session"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-3 px-1">
              Danger Zone
            </h3>
            <Card className="border-red-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Delete Account</h4>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </Card>
          </motion.div>

          {/* App Version */}
          <p className="text-center text-xs text-gray-400 py-4">
            RemoteTalent v1.0.0
          </p>
        </div>
      </MainContent>

      <BottomNav activeNav="profile" unreadMessages={user.unreadMessages} />

      {/* 2FA Setup Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {twoFactorStatus.enabled ? 'Manage 2FA' : 'Enable Two-Factor Authentication'}
              </h3>
              <button
                onClick={() => setShow2FAModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {!twoFactorStatus.enabled ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Choose how you want to receive your verification codes:
                </p>
                <button className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#0B2652] transition-colors">
                  <div className="p-2 bg-[#0B2652]/10 rounded-lg">
                    <DevicePhoneMobileIcon className="h-6 w-6 text-[#0B2652]" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">Authenticator App</h4>
                    <p className="text-sm text-gray-500">Use Google Authenticator or similar</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#0B2652] transition-colors">
                  <div className="p-2 bg-[#0B2652]/10 rounded-lg">
                    <EnvelopeIcon className="h-6 w-6 text-[#0B2652]" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">SMS</h4>
                    <p className="text-sm text-gray-500">Receive codes via text message</p>
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">2FA is Active</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Your account is protected with {twoFactorStatus.method === 'authenticator' ? 'an authenticator app' : 'SMS verification'}.
                  </p>
                </div>
                <div className="space-y-2">
                  <button className="w-full p-3 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    Regenerate Backup Codes
                  </button>
                  <button className="w-full p-3 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    Change 2FA Method
                  </button>
                  <button className="w-full p-3 text-left text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                    Disable Two-Factor Authentication
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShow2FAModal(false)}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              {!twoFactorStatus.enabled && (
                <button className="flex-1 px-4 py-3 text-sm font-medium text-white bg-[#0B2652] rounded-xl hover:bg-[#0B2652]/90 transition-colors">
                  Continue
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Revoke Session Modal */}
      {showRevokeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign Out Session?</h3>
            <p className="text-gray-600 mb-6">
              This will immediately sign out the selected device. You'll need to sign in again on that device.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRevokeModal(null)}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowRevokeModal(null)}
                className="flex-1 px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </PageContainer>
  );
}
