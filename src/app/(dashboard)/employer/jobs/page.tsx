'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  MapPinIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import {
  EmployerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  PageHeader,
  FilterPills,
  GoldButton,
  IconButton,
  StatusBadge,
  StatusBorderItem,
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

const jobs = [
  {
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
  },
  {
    id: 2,
    title: 'Virtual Assistant',
    location: 'Remote (Flexible)',
    type: 'Full-time',
    salary: '$800 - $1,200/mo',
    posted: 'Jan 18, 2025',
    expires: 'Feb 18, 2025',
    applicants: 45,
    views: 320,
    status: 'active',
  },
  {
    id: 3,
    title: 'Customer Support Specialist',
    location: 'Remote (EU Hours)',
    type: 'Contract',
    salary: '$1,000 - $1,500/mo',
    posted: 'Jan 10, 2025',
    expires: 'Feb 10, 2025',
    applicants: 38,
    views: 245,
    status: 'active',
  },
  {
    id: 4,
    title: 'Content Writer',
    location: 'Remote (Any Timezone)',
    type: 'Part-time',
    salary: '$500 - $800/mo',
    posted: 'Dec 15, 2024',
    expires: 'Jan 15, 2025',
    applicants: 62,
    views: 410,
    status: 'closed',
  },
  {
    id: 5,
    title: 'UI/UX Designer',
    location: 'Remote (US Hours)',
    type: 'Full-time',
    salary: '$2,500 - $3,500/mo',
    posted: 'Jan 20, 2025',
    expires: 'Feb 20, 2025',
    applicants: 12,
    views: 89,
    status: 'draft',
  },
];

const statusFilters = ['All', 'Active', 'Closed', 'Draft'];

export default function EmployerJobsPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredJobs = jobs.filter(job =>
    selectedStatus === 'All' || job.status.toLowerCase() === selectedStatus.toLowerCase()
  );

  return (
    <PageContainer>
      <EmployerHeader
        company={company}
        pageTitle="Job Postings"
        
      />

      <MainContent>
        <div className="space-y-6">
          <PageHeader
            title="Job Postings"
            subtitle={`${jobs.length} total jobs`}
            action={
              <GoldButton href="/employer/jobs/new">
                <PlusIcon className="h-4 w-4" />
                Post New Job
              </GoldButton>
            }
          />

          <FilterPills
            options={statusFilters}
            selected={selectedStatus}
            onSelect={setSelectedStatus}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${cardStyles.base} overflow-hidden`}
          >
            <div className="divide-y divide-gray-100">
              {filteredJobs.map((job) => (
                <StatusBorderItem
                  key={job.id}
                  status={job.status}
                  type="job"
                  onClick={() => window.location.href = `/employer/jobs/${job.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <StatusBadge status={job.status} type="job" />
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span>{job.type}</span>
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <UserGroupIcon className="h-4 w-4" />
                          <span>{job.applicants} applicants</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <EyeIcon className="h-4 w-4" />
                          <span>{job.views} views</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <ClockIcon className="h-4 w-4" />
                          <span>Posted {job.posted}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <IconButton
                        href={`/employer/jobs/${job.id}/edit`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                      <IconButton
                        variant="danger"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </div>
                </StatusBorderItem>
              ))}
            </div>
          </motion.div>
        </div>
      </MainContent>

      <BottomNav activeNav="jobs" unreadMessages={company.unreadMessages} />
    </PageContainer>
  );
}
