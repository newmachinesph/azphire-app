'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  BellIcon,
  BuildingOfficeIcon,
  UserIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CameraIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  PlusIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ClockIcon,
  TrashIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import {
  BottomNav,
  PageContainer,
  MainContent,
  GoldButton,
  cardStyles,
  gradients,
} from '@/components/employer';

// Mock data
const company = {
  name: 'TechCorp Global',
  initials: 'TC',
  industry: 'Technology',
  unreadMessages: 3,
  email: 'hr@techcorp.com',
  website: 'https://techcorp.com',
  size: '50-200 employees',
  location: 'San Francisco, CA',
  description: 'TechCorp Global is a leading technology company specializing in enterprise software solutions.',
  timezone: 'Pacific Time (US & Canada)',
};

const user = {
  name: 'John Smith',
  email: 'john.smith@techcorp.com',
  role: 'Admin',
  initials: 'JS',
};

const initialNotificationSettings = [
  { id: 'new_applicant', label: 'New applicant', description: 'When someone applies to your job', enabled: true },
  { id: 'messages', label: 'New messages', description: 'When you receive a message from a candidate', enabled: true },
  { id: 'interview_reminder', label: 'Interview reminders', description: '24 hours before scheduled interviews', enabled: true },
  { id: 'job_expiring', label: 'Job expiring soon', description: '3 days before a job posting expires', enabled: false },
  { id: 'weekly_digest', label: 'Weekly digest', description: 'Summary of your hiring activity', enabled: true },
];

const initialTeamMembers = [
  { id: '1', name: 'John Smith', email: 'john.smith@techcorp.com', role: 'owner', initials: 'JS', status: 'active', joinedAt: 'Jan 1, 2025' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@techcorp.com', role: 'admin', initials: 'SJ', status: 'active', joinedAt: 'Jan 10, 2025' },
  { id: '3', name: 'Mike Chen', email: 'mike.chen@techcorp.com', role: 'recruiter', initials: 'MC', status: 'active', joinedAt: 'Jan 15, 2025' },
];

const initialPendingInvites = [
  { id: '1', email: 'anna.garcia@techcorp.com', role: 'recruiter', invitedAt: 'Jan 20, 2025', expiresAt: 'Jan 27, 2025' },
];

const roleOptions = [
  { value: 'admin', label: 'Admin', description: 'Full access to all features' },
  { value: 'recruiter', label: 'Recruiter', description: 'Manage jobs and candidates' },
  { value: 'viewer', label: 'Viewer', description: 'View-only access' },
];

const roleColors: Record<string, string> = {
  owner: 'bg-purple-100 text-purple-700',
  admin: 'bg-blue-100 text-blue-700',
  recruiter: 'bg-green-100 text-green-700',
  viewer: 'bg-gray-100 text-gray-700',
};

const sections = [
  { id: 'company', label: 'Company Profile', icon: BuildingOfficeIcon },
  { id: 'team', label: 'Team', icon: UserGroupIcon },
  { id: 'account', label: 'Account', icon: UserIcon },
  { id: 'notifications', label: 'Notifications', icon: BellIcon },
  { id: 'security', label: 'Security', icon: ShieldCheckIcon },
];

export default function EmployerSettingsPage() {
  const [activeSection, setActiveSection] = useState('company');
  const [notifications, setNotifications] = useState(initialNotificationSettings);
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [pendingInvites, setPendingInvites] = useState(initialPendingInvites);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('recruiter');

  const toggleNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n)
    );
  };

  const handleInvite = () => {
    if (!inviteEmail) return;
    setPendingInvites(prev => [...prev, {
      id: Date.now().toString(),
      email: inviteEmail,
      role: inviteRole,
      invitedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }]);
    setInviteEmail('');
    setInviteRole('recruiter');
    setShowInviteModal(false);
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleCancelInvite = (id: string) => {
    setPendingInvites(prev => prev.filter(i => i.id !== id));
  };

  const handleChangeRole = (id: string, newRole: string) => {
    setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, role: newRole } : m));
  };

  return (
    <PageContainer>
      {/* Simple Header with Back Button */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <a href="/employer" className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors">
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </a>
            <div>
              <h1 className="font-semibold text-gray-900">Settings</h1>
              <p className="text-xs text-gray-500">Manage your account</p>
            </div>
          </div>
        </div>
      </header>

      <MainContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${cardStyles.base} p-2`}
            >
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        isActive ? 'bg-[#0B2652]/10 text-[#0B2652]' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-[#0B2652]' : 'text-gray-400'}`} />
                      <span className="font-medium text-sm">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Company Profile Section */}
            {activeSection === 'company' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Company Logo */}
                <div className={cardStyles.withPadding}>
                  <h2 className="font-semibold text-gray-900 mb-4">Company Logo</h2>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className={`w-24 h-24 rounded-2xl ${gradients.primary} flex items-center justify-center text-white text-3xl font-bold`}>
                        {company.initials}
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <CameraIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Upload a logo for your company. Recommended size: 400x400px.</p>
                      <button className="px-4 py-2 text-sm font-medium text-[#0B2652] bg-[#0B2652]/10 rounded-full hover:bg-[#0B2652]/20 transition-colors">
                        Upload Logo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Company Details */}
                <div className={cardStyles.withPadding}>
                  <h2 className="font-semibold text-gray-900 mb-6">Company Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Company Name" defaultValue={company.name} />
                    <SelectField label="Industry" defaultValue={company.industry} options={['Technology', 'Healthcare', 'Finance', 'Education', 'Other']} />
                    <SelectField label="Company Size" defaultValue={company.size} options={['1-10 employees', '11-50 employees', '50-200 employees', '200-500 employees', '500+ employees']} />
                    <InputField label="Location" defaultValue={company.location} />
                    <InputField label="Website" defaultValue={company.website} icon={<GlobeAltIcon className="h-5 w-5 text-gray-400" />} />
                    <InputField label="Contact Email" defaultValue={company.email} type="email" icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />} />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                      <textarea
                        rows={4}
                        defaultValue={company.description}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <GoldButton>Save Changes</GoldButton>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Team Section */}
            {activeSection === 'team' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Team Header */}
                <div className={cardStyles.withPadding}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-semibold text-gray-900">Team Members</h2>
                      <p className="text-sm text-gray-500">{teamMembers.length} member{teamMembers.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button
                      onClick={() => setShowInviteModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B2652] text-white text-sm font-medium rounded-full hover:bg-[#0B2652]/90 transition-colors"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Invite Member
                    </button>
                  </div>

                  {/* Team Members List */}
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${gradients.primary} flex items-center justify-center text-white text-sm font-bold`}>
                            {member.initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-gray-900">{member.name}</h4>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${roleColors[member.role]}`}>
                                {member.role}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {member.role !== 'owner' && (
                            <>
                              <select
                                value={member.role}
                                onChange={(e) => handleChangeRole(member.id, e.target.value)}
                                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2652] bg-white"
                              >
                                {roleOptions.map((option) => (
                                  <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleRemoveMember(member.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          {member.role === 'owner' && (
                            <span className="text-xs text-gray-400">Owner cannot be changed</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Invites */}
                {pendingInvites.length > 0 && (
                  <div className={cardStyles.withPadding}>
                    <div className="flex items-center gap-2 mb-4">
                      <ClockIcon className="h-5 w-5 text-amber-500" />
                      <h2 className="font-semibold text-gray-900">Pending Invites</h2>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                        {pendingInvites.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {pendingInvites.map((invite) => (
                        <div key={invite.id} className="flex items-center justify-between p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                          <div>
                            <div className="flex items-center gap-2">
                              <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-gray-900">{invite.email}</span>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${roleColors[invite.role]}`}>
                                {invite.role}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Invited {invite.invitedAt} • Expires {invite.expiresAt}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 text-xs font-medium text-[#0B2652] hover:bg-[#0B2652]/10 rounded-lg transition-colors">
                              Resend
                            </button>
                            <button
                              onClick={() => handleCancelInvite(invite.id)}
                              className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Role Permissions Info */}
                <div className={cardStyles.withPadding}>
                  <h2 className="font-semibold text-gray-900 mb-4">Role Permissions</h2>
                  <div className="space-y-3">
                    {roleOptions.map((role) => (
                      <div key={role.value} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${roleColors[role.value]}`}>
                          {role.label}
                        </span>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Invite Modal */}
            {showInviteModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Invite Team Member</h3>
                    <button
                      onClick={() => setShowInviteModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="colleague@company.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <select
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent bg-white"
                      >
                        {roleOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label} - {option.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setShowInviteModal(false)}
                      className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleInvite}
                      disabled={!inviteEmail}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-[#0B2652] rounded-xl hover:bg-[#0B2652]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PaperAirplaneIcon className="h-4 w-4" />
                      Send Invite
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Account Section */}
            {activeSection === 'account' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className={cardStyles.withPadding}>
                  <h2 className="font-semibold text-gray-900 mb-6">Account Information</h2>
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className={`w-16 h-16 rounded-full ${gradients.primary} flex items-center justify-center text-white text-xl font-bold`}>
                      {user.initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" defaultValue={user.name} />
                    <InputField label="Email Address" defaultValue={user.email} type="email" />
                    <SelectField label="Timezone" defaultValue={company.timezone} options={['Pacific Time (US & Canada)', 'Mountain Time (US & Canada)', 'Central Time (US & Canada)', 'Eastern Time (US & Canada)', 'Philippine Time (PHT)']} />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <GoldButton>Save Changes</GoldButton>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <div>
                      <h2 className="font-semibold text-red-600">Danger Zone</h2>
                      <p className="text-sm text-gray-500">Irreversible actions</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Delete Account</h4>
                      <p className="text-sm text-gray-500">Permanently delete your company account and all data</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cardStyles.withPadding}>
                <h2 className="font-semibold text-gray-900 mb-6">Email Notifications</h2>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-medium text-gray-900">{notification.label}</h4>
                        <p className="text-sm text-gray-500">{notification.description}</p>
                      </div>
                      <button
                        onClick={() => toggleNotification(notification.id)}
                        className={`relative w-12 h-7 rounded-full transition-colors ${notification.enabled ? 'bg-[#0B2652]' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${notification.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <GoldButton>Save Preferences</GoldButton>
                </div>
              </motion.div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Password */}
                <div className={cardStyles.withPadding}>
                  <h2 className="font-semibold text-gray-900 mb-6">Change Password</h2>
                  <div className="space-y-4 max-w-md">
                    <InputField label="Current Password" type="password" />
                    <InputField label="New Password" type="password" />
                    <InputField label="Confirm New Password" type="password" />
                    <GoldButton>Update Password</GoldButton>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className={cardStyles.withPadding}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-semibold text-gray-900">Two-Factor Authentication</h2>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">Not Enabled</span>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-[#0B2652] bg-[#0B2652]/10 rounded-full hover:bg-[#0B2652]/20 transition-colors">
                    Enable 2FA
                  </button>
                </div>

                {/* Active Sessions */}
                <div className={cardStyles.withPadding}>
                  <h2 className="font-semibold text-gray-900 mb-4">Active Sessions</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-l-4 border-l-green-500">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900">Current Session</h4>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                        </div>
                        <p className="text-sm text-gray-500">Chrome on Windows • San Francisco, CA</p>
                        <p className="text-xs text-gray-400">Started Jan 25, 2025 at 10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-l-gray-300">
                      <div>
                        <h4 className="font-medium text-gray-900">Mobile App</h4>
                        <p className="text-sm text-gray-500">iOS App • Manila, Philippines</p>
                        <p className="text-xs text-gray-400">Last active Jan 24, 2025</p>
                      </div>
                      <button className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-full transition-colors">
                        Revoke
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-sm font-medium text-red-600 hover:underline">
                      Sign out of all other sessions
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </MainContent>

      <BottomNav activeNav="home" unreadMessages={company.unreadMessages} />
    </PageContainer>
  );
}

// Helper Components
function InputField({ label, defaultValue, type = 'text', icon }: { label: string; defaultValue?: string; type?: string; icon?: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>}
        <input
          type={type}
          defaultValue={defaultValue}
          className={`w-full ${icon ? 'pl-12' : 'px-4'} pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all`}
        />
      </div>
    </div>
  );
}

function SelectField({ label, defaultValue, options }: { label: string; defaultValue?: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        defaultValue={defaultValue}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all appearance-none bg-white"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
