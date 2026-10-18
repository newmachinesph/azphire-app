'use client';

import { motion } from 'framer-motion';
import {
  BriefcaseIcon,
  BookmarkIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import {
  JobSeekerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  Card,
  SectionHeader,
  ViewAllLink,
  ProfileCompletionCard,
  QuickStat,
  CompanyLogo,
  SkillTag,
  StatusBadge,
  getApplicationStatusStyles,
} from '@/components/job-seeker';

// Mock data
const user = {
  name: 'Maria Santos',
  initials: 'MS',
  title: 'Senior React Developer',
  profileCompletion: 75,
  unreadNotifications: 3,
  unreadMessages: 2,
};

const profileItems = [
  { label: 'Work Experience', complete: true },
  { label: 'Skills & Expertise', complete: true },
  { label: 'Education', complete: true },
  { label: 'Portfolio/Projects', complete: false },
  { label: 'Profile Photo', complete: false },
];

const recommendedJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Global',
    location: 'Remote (US Hours)',
    salary: '$3,000 - $4,500/mo',
    type: 'Full-time',
    posted: '2h ago',
    matchScore: 95,
    skills: ['React', 'TypeScript', 'Next.js'],
  },
  {
    id: 2,
    title: 'React Native Developer',
    company: 'StartupXYZ',
    location: 'Remote (Flexible)',
    salary: '$2,500 - $3,500/mo',
    type: 'Full-time',
    posted: '5h ago',
    matchScore: 88,
    skills: ['React Native', 'JavaScript', 'Redux'],
  },
  {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'Digital Agency Co',
    location: 'Remote (AU Hours)',
    salary: '$2,800 - $4,000/mo',
    type: 'Contract',
    posted: '1d ago',
    matchScore: 82,
    skills: ['React', 'Node.js', 'PostgreSQL'],
  },
];

const recentApplications = [
  { id: 1, title: 'Frontend Developer', company: 'Acme Inc', status: 'reviewing', appliedDate: 'Jan 20' },
  { id: 2, title: 'React Developer', company: 'Tech Solutions', status: 'interview', appliedDate: 'Jan 18' },
  { id: 3, title: 'UI Engineer', company: 'DesignHub', status: 'applied', appliedDate: 'Jan 15' },
];

const savedJobs = [
  { id: 1, title: 'Product Designer', company: 'Figma', saved: 'Yesterday' },
  { id: 2, title: 'Senior Developer', company: 'Vercel', saved: '2 days ago' },
];

const quickStats = [
  { label: 'Profile Views', value: '127', change: '+12%', icon: UserCircleIcon },
  { label: 'Applications', value: '8', change: '+3', icon: BriefcaseIcon },
  { label: 'Saved Jobs', value: '15', change: '+5', icon: BookmarkIcon },
  { label: 'Messages', value: '4', change: '2 new', icon: ChatBubbleLeftRightIcon },
];

export default function JobSeekerDashboard() {
  return (
    <PageContainer>
      <JobSeekerHeader user={user} />

      <MainContent>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Profile Completion Card */}
          <ProfileCompletionCard
            completion={user.profileCompletion}
            items={profileItems}
            className="lg:col-span-4"
          />

          {/* Recommended Jobs */}
          <Card delay={0.1} className="lg:col-span-8">
            <SectionHeader
              title="Recommended for You"
              icon={<SparklesIcon className="h-5 w-5 text-[#ED9F08]" />}
              action={<ViewAllLink href="/job-seeker/jobs" />}
            />

            <div className="space-y-3">
              {recommendedJobs.map((job, i) => (
                <motion.a
                  key={job.id}
                  href={`/job-seeker/jobs/${job.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="group block p-4 rounded-xl border border-gray-100 hover:border-[#0B2652]/20 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <CompanyLogo size="lg" icon={<BuildingOfficeIcon className="h-6 w-6 text-gray-400" />} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-[#0B2652] transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-lg">
                          <SparklesIcon className="h-3.5 w-3.5 text-green-600" />
                          <span className="text-xs font-semibold text-green-700">{job.matchScore}%</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-3.5 w-3.5" />{job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <CurrencyDollarIcon className="h-3.5 w-3.5" />{job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-3.5 w-3.5" />{job.posted}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {job.skills.map((skill) => (
                          <SkillTag key={skill} skill={skill} />
                        ))}
                      </div>
                    </div>

                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={(e) => e.preventDefault()}>
                      <BookmarkIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </motion.a>
              ))}
            </div>
          </Card>

          {/* Recent Applications */}
          <Card delay={0.2} className="lg:col-span-6">
            <SectionHeader
              title="Recent Applications"
              icon={<BriefcaseIcon className="h-5 w-5 text-[#0B2652]" />}
              action={<ViewAllLink href="/job-seeker/applications" label="View All" />}
            />

            <div className="space-y-3">
              {recentApplications.map((app) => {
                const statusStyles = getApplicationStatusStyles(app.status);
                return (
                  <a
                    key={app.id}
                    href={`/job-seeker/applications/${app.id}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{app.title}</h4>
                      <p className="text-xs text-gray-500">{app.company} &bull; {app.appliedDate}</p>
                    </div>
                    <StatusBadge status={app.status} label={statusStyles.label} />
                  </a>
                );
              })}
            </div>
          </Card>

          {/* Saved Jobs */}
          <Card delay={0.3} className="lg:col-span-6">
            <SectionHeader
              title="Saved Jobs"
              icon={<BookmarkIcon className="h-5 w-5 text-[#ED9F08]" />}
              action={<ViewAllLink href="/job-seeker/saved" label="View All" />}
            />

            <div className="space-y-3">
              {savedJobs.map((job) => (
                <a
                  key={job.id}
                  href={`/job-seeker/jobs/${job.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CompanyLogo size="md" icon={<BuildingOfficeIcon className="h-5 w-5 text-gray-500" />} />
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{job.title}</h4>
                      <p className="text-xs text-gray-500">{job.company}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{job.saved}</span>
                </a>
              ))}

              <a
                href="/job-seeker/jobs"
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-[#0B2652] hover:text-[#0B2652] transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                Browse More Jobs
              </a>
            </div>
          </Card>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {quickStats.map((stat, i) => (
              <QuickStat key={i} {...stat} />
            ))}
          </motion.div>
        </div>
      </MainContent>

      <BottomNav activeNav="home" unreadMessages={user.unreadMessages} />
    </PageContainer>
  );
}
