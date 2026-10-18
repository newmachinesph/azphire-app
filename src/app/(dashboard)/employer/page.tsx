'use client';

import { motion } from 'framer-motion';
import {
  PlusIcon,
  MapPinIcon,
  ClockIcon,
  EyeIcon,
  ChevronRightIcon,
  StarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import {
  EmployerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  Card,
  GoldButton,
  GhostButton,
  Avatar,
  SectionHeader,
  getCandidateStatusStyles,
  cardStyles,
} from '@/components/employer';

// Mock data
const company = {
  name: 'TechCorp Global',
  initials: 'TC',
  industry: 'Technology',
  unreadNotifications: 5,
  unreadMessages: 3,
  verified: true,
};

const activeJobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    location: 'Remote (US Hours)',
    type: 'Full-time',
    salary: '$3,000 - $4,500/mo',
    posted: '3 days ago',
    applicants: 24,
    newApplicants: 8,
    views: 156,
  },
  {
    id: 2,
    title: 'Virtual Assistant',
    location: 'Remote (Flexible)',
    type: 'Full-time',
    salary: '$800 - $1,200/mo',
    posted: '1 week ago',
    applicants: 45,
    newApplicants: 12,
    views: 320,
  },
  {
    id: 3,
    title: 'Customer Support Specialist',
    location: 'Remote (EU Hours)',
    type: 'Contract',
    salary: '$1,000 - $1,500/mo',
    posted: '2 weeks ago',
    applicants: 38,
    newApplicants: 3,
    views: 245,
  },
];

const recentCandidates = [
  { id: 1, name: 'Maria Santos', initials: 'MS', title: 'Senior React Developer', appliedFor: 'Senior React Developer', matchScore: 95, status: 'shortlisted', appliedDate: '2 hours ago' },
  { id: 2, name: 'Juan Dela Cruz', initials: 'JD', title: 'Full Stack Engineer', appliedFor: 'Senior React Developer', matchScore: 88, status: 'new', appliedDate: '5 hours ago' },
  { id: 3, name: 'Anna Reyes', initials: 'AR', title: 'Frontend Developer', appliedFor: 'Senior React Developer', matchScore: 82, status: 'reviewing', appliedDate: '1 day ago' },
  { id: 4, name: 'Carlo Mendoza', initials: 'CM', title: 'Executive Assistant', appliedFor: 'Virtual Assistant', matchScore: 90, status: 'interview', appliedDate: '2 days ago' },
];

const pipelineStages = [
  { label: 'New Applications', count: 23, color: 'bg-blue-500' },
  { label: 'Reviewing', count: 15, color: 'bg-yellow-500' },
  { label: 'Shortlisted', count: 8, color: 'bg-purple-500' },
  { label: 'Interview', count: 4, color: 'bg-green-500' },
  { label: 'Offer Sent', count: 1, color: 'bg-[#ED9F08]' },
];

const quickStats = [
  { label: 'Total Applicants', value: '107', change: '+24 this week', icon: UserGroupIcon },
  { label: 'Active Jobs', value: '3', change: '1 expiring soon', icon: BriefcaseIcon },
  { label: 'Job Views', value: '721', change: '+18%', icon: EyeIcon },
  { label: 'Messages', value: '8', change: '3 new', icon: ChatBubbleLeftRightIcon },
];

export default function EmployerDashboard() {
  return (
    <PageContainer>
      <EmployerHeader
        company={company}
        pageTitle="Employer Dashboard"
        
      />

      <MainContent>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Active Job Postings */}
          <Card delay={0.1} className="lg:col-span-12">
            <SectionHeader
              title="Active Job Postings"
              action={
                <GoldButton href="/employer/jobs/new">
                  <PlusIcon className="h-4 w-4" />
                  Post New Job
                </GoldButton>
              }
            />

            <div className="space-y-3">
              {activeJobs.map((job, i) => (
                <motion.a
                  key={job.id}
                  href={`/employer/jobs/${job.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="block group p-4 rounded-xl border border-gray-100 hover:border-[#0B2652]/20 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-[#0B2652] transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span>{job.type}</span>
                        <span>{job.salary}</span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-3.5 w-3.5" />
                          {job.posted}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <UserGroupIcon className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold text-gray-900">{job.applicants}</span>
                        </div>
                        <p className="text-[10px] text-gray-500">Applicants</p>
                        {job.newApplicants > 0 && (
                          <span className="text-[10px] text-green-600 font-medium">+{job.newApplicants} new</span>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <EyeIcon className="h-4 w-4 text-gray-400" />
                          <span className="font-semibold text-gray-900">{job.views}</span>
                        </div>
                        <p className="text-[10px] text-gray-500">Views</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <a href="/employer/jobs" className="w-full mt-4 py-3 border-2 border-dashed border-gray-200 rounded-full text-sm text-gray-500 hover:border-[#0B2652] hover:text-[#0B2652] transition-colors flex items-center justify-center gap-2">
              View All Job Postings
            </a>
          </Card>

          {/* Recent Candidates */}
          <Card delay={0.2} className="lg:col-span-8">
            <SectionHeader
              title="Recent Candidates"
              action={
                <a href="/employer/candidates" className="text-sm text-[#0B2652] font-medium hover:underline flex items-center gap-1">
                  View All <ChevronRightIcon className="h-4 w-4" />
                </a>
              }
            />

            <div className="space-y-3">
              {recentCandidates.map((candidate, i) => {
                const statusStyles = getCandidateStatusStyles(candidate.status);
                return (
                  <motion.a
                    key={candidate.id}
                    href={`/employer/candidates/${candidate.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`group flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-l-4 ${statusStyles.border}`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar initials={candidate.initials} size="md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900 text-sm">{candidate.name}</h4>
                          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-green-50 rounded text-[10px] font-semibold text-green-700">
                            <StarIcon className="h-3 w-3" />
                            {candidate.matchScore}%
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {candidate.title} • Applied for {candidate.appliedFor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{candidate.appliedDate}</span>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusStyles.badge}`}>
                        {statusStyles.label}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </Card>

          {/* Hiring Pipeline */}
          <Card delay={0.3} className="lg:col-span-4">
            <SectionHeader title="Hiring Pipeline" />

            <div className="space-y-3">
              {pipelineStages.map((stage, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                    <span className="text-sm text-gray-700">{stage.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{stage.count}</span>
                </div>
              ))}
            </div>

            <GhostButton href="/employer/candidates" className="w-full mt-4 justify-center">
              View Full Pipeline
            </GhostButton>
          </Card>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {quickStats.map((stat, i) => (
              <div key={i} className={`${cardStyles.base} p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-gray-400" />
                  <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </MainContent>

      <BottomNav activeNav="home" unreadMessages={company.unreadMessages} />
    </PageContainer>
  );
}
