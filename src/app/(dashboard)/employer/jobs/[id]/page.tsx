'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  DocumentTextIcon,
  PauseIcon,
  PlayIcon,
  CheckCircleIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import {
  BottomNav,
  PageContainer,
  MainContent,
  GoldButton,
  GhostButton,
  FilterPills,
  SectionHeader,
  Avatar,
  getCandidateStatusStyles,
  getJobStatusStyles,
  cardStyles,
  gradients,
} from '@/components/employer';

// Mock data
const company = { name: 'TechCorp Global', initials: 'TC', industry: 'Technology', unreadMessages: 3 };

const job = {
  id: 1,
  title: 'Senior React Developer',
  location: 'Remote (US Hours)',
  type: 'Full-time',
  salary: '$3,000 - $4,500/mo',
  posted: 'Jan 22, 2025',
  expires: 'Feb 22, 2025',
  applicants: 24,
  views: 156,
  status: 'active',
  description: `We are looking for a Senior React Developer to join our growing team. You will be responsible for developing and implementing highly responsive user interface components using React concepts and workflows.

You will also be responsible for profiling and improving front-end performance and documenting our front-end codebase.`,
  responsibilities: ['Develop new user-facing features using React.js', 'Build reusable components and front-end libraries', 'Translate designs into high-quality code', 'Optimize components for maximum performance', 'Collaborate with back-end developers', 'Participate in code reviews'],
  requirements: ['5+ years of experience with React.js', 'Strong proficiency in JavaScript/TypeScript', 'Experience with RESTful APIs and GraphQL', 'Knowledge of JWT and authorization', 'Excellent problem-solving skills'],
  benefits: ['Competitive salary', 'Flexible working hours', '100% remote work', 'Health insurance', 'Professional development budget', 'Paid time off'],
};

const applicants = [
  { id: 1, name: 'Maria Santos', title: 'Senior React Developer', initials: 'MS', matchScore: 95, status: 'shortlisted', appliedDate: 'Jan 23, 2025', starred: true },
  { id: 2, name: 'John Cruz', title: 'Full Stack Developer', initials: 'JC', matchScore: 88, status: 'reviewing', appliedDate: 'Jan 24, 2025', starred: false },
  { id: 3, name: 'Ana Reyes', title: 'Frontend Engineer', initials: 'AR', matchScore: 82, status: 'new', appliedDate: 'Jan 25, 2025', starred: true },
  { id: 4, name: 'Miguel Torres', title: 'React Developer', initials: 'MT', matchScore: 79, status: 'new', appliedDate: 'Jan 25, 2025', starred: false },
];

export default function JobDetailPage() {
  const [activeTab, setActiveTab] = useState('details');
  const jobStatusStyles = getJobStatusStyles(job.status);

  return (
    <PageContainer>
      {/* Header with Back Button */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <a href="/employer/jobs" className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors">
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-gray-900">{job.title}</h1>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${jobStatusStyles.badge}`}>
                  {job.status}
                </span>
              </div>
              <p className="text-xs text-gray-500">Job Details</p>
            </div>
          </div>
        </div>
      </header>

      <MainContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Job Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Summary Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cardStyles.withPadding}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPinIcon className="h-4 w-4" />{job.location}</span>
                    <span className="flex items-center gap-1"><BriefcaseIcon className="h-4 w-4" />{job.type}</span>
                    <span className="flex items-center gap-1"><CurrencyDollarIcon className="h-4 w-4" />{job.salary}</span>
                  </div>
                </div>
                <a href={`/employer/jobs/${job.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0B2652] bg-[#0B2652]/10 rounded-full hover:bg-[#0B2652]/20 transition-colors">
                  <PencilIcon className="h-4 w-4" />Edit
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Applicants', value: job.applicants },
                  { label: 'Views', value: job.views },
                  { label: 'Apply Rate', value: `${Math.round((job.applicants / job.views) * 100)}%` },
                  { label: 'Days Left', value: '28' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4" />Posted: {job.posted}</span>
                <span className="flex items-center gap-1"><ClockIcon className="h-4 w-4" />Expires: {job.expires}</span>
              </div>
            </motion.div>

            {/* Tabs */}
            <FilterPills
              options={['details', `applicants (${job.applicants})`]}
              selected={activeTab === 'details' ? 'details' : `applicants (${job.applicants})`}
              onSelect={(val) => setActiveTab(val === 'details' ? 'details' : 'applicants')}
            />

            {/* Tab Content */}
            {activeTab === 'details' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className={cardStyles.withPadding}>
                  <SectionHeader title="Job Description" />
                  <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
                </div>

                <div className={cardStyles.withPadding}>
                  <SectionHeader title="Responsibilities" />
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0B2652] mt-2 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={cardStyles.withPadding}>
                  <SectionHeader title="Requirements" />
                  <ul className="space-y-2">
                    {job.requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={cardStyles.withPadding}>
                  <SectionHeader title="Benefits" />
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, i) => (
                      <span key={i} className="px-3 py-1.5 bg-green-50 text-green-700 text-sm rounded-full">{benefit}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'applicants' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${cardStyles.base} overflow-hidden`}>
                <div className="divide-y divide-gray-100">
                  {applicants.map((applicant) => {
                    const statusStyles = getCandidateStatusStyles(applicant.status);
                    return (
                      <a key={applicant.id} href={`/employer/candidates/${applicant.id}`} className={`block p-4 hover:bg-gray-50 transition-colors border-l-4 ${statusStyles.border}`}>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar initials={applicant.initials} size="lg" />
                              {applicant.starred && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                                  <StarIconSolid className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900">{applicant.name}</h4>
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${statusStyles.badge}`}>{statusStyles.label}</span>
                              </div>
                              <p className="text-sm text-gray-500">{applicant.title}</p>
                              <p className="text-xs text-gray-400">Applied {applicant.appliedDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-[#0B2652]">{applicant.matchScore}%</div>
                            <div className="text-xs text-gray-500">Match</div>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
                <div className="p-4 border-t border-gray-100 text-center">
                  <a href="/employer/candidates" className="text-sm font-medium text-[#0B2652] hover:underline">View All Applicants</a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardStyles.withPadding}>
              <SectionHeader title="Actions" />
              <div className="space-y-3">
                <GoldButton href={`/employer/jobs/${job.id}/edit`} className="w-full justify-center">
                  <PencilIcon className="h-4 w-4" />Edit Job Posting
                </GoldButton>
                {job.status === 'active' ? (
                  <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full hover:bg-orange-200 transition-colors">
                    <PauseIcon className="h-4 w-4" />Pause Job
                  </button>
                ) : (
                  <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-100 text-green-700 text-sm font-semibold rounded-full hover:bg-green-200 transition-colors">
                    <PlayIcon className="h-4 w-4" />Activate Job
                  </button>
                )}
                <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors">
                  <DocumentTextIcon className="h-4 w-4" />Duplicate Job
                </button>
                <button className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-600 text-sm font-semibold rounded-full hover:bg-red-50 transition-colors">
                  <TrashIcon className="h-4 w-4" />Delete Job
                </button>
              </div>
            </motion.div>

            {/* Top Applicants */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cardStyles.withPadding}>
              <SectionHeader title="Top Matches" action={<a href="/employer/candidates" className="text-sm text-[#0B2652] hover:underline">View all</a>} />
              <div className="space-y-3">
                {applicants.slice(0, 3).map((applicant) => (
                  <a key={applicant.id} href={`/employer/candidates/${applicant.id}`} className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <Avatar initials={applicant.initials} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{applicant.name}</p>
                      <p className="text-xs text-gray-500 truncate">{applicant.title}</p>
                    </div>
                    <div className="text-sm font-bold text-[#0B2652]">{applicant.matchScore}%</div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Share Job */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`${gradients.primary} rounded-2xl shadow-lg p-6 text-white`}>
              <h3 className="font-semibold mb-2">Share this job</h3>
              <p className="text-sm text-white/70 mb-4">Get more qualified applicants by sharing your job posting.</p>
              <div className="bg-white/10 rounded-xl p-3 mb-4">
                <p className="text-xs text-white/50 mb-1">Job URL</p>
                <p className="text-sm truncate">remotetalent.ph/jobs/senior-react-developer</p>
              </div>
              <button className="w-full px-4 py-2.5 bg-white text-[#0B2652] text-sm font-semibold rounded-full hover:bg-white/90 transition-colors">
                Copy Link
              </button>
            </motion.div>
          </div>
        </div>
      </MainContent>

      <BottomNav activeNav="jobs" unreadMessages={company.unreadMessages} />
    </PageContainer>
  );
}
