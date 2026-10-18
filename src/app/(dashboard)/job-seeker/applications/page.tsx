'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import {
  JobSeekerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  SectionHeader,
  StatusBadge,
  CompanyLogo,
  EmptyState,
  getApplicationStatusStyles,
} from '@/components/job-seeker';
import { currentUser, applications, statusFilters, ApplicationStatus } from '@/lib/job-seeker';

const statusBorderColors: Record<ApplicationStatus, string> = {
  offer: 'border-l-purple-500',
  interview: 'border-l-green-500',
  reviewing: 'border-l-yellow-500',
  rejected: 'border-l-red-500',
  applied: 'border-l-blue-500',
};

export default function ApplicationsPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredApplications = applications.filter(app =>
    selectedStatus === 'All' || app.status.toLowerCase() === selectedStatus.toLowerCase()
  );

  const statusCounts = {
    all: applications.length,
    applied: applications.filter(a => a.status === 'applied').length,
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offer: applications.filter(a => a.status === 'offer').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <PageContainer>
      <JobSeekerHeader user={currentUser} />

      <MainContent>
        <SectionHeader
          title="My Applications"
          icon={<BriefcaseIcon className="h-5 w-5 text-[#0B2652]" />}
        />

        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
          {statusFilters.map(status => {
            const count = statusCounts[status.toLowerCase() as keyof typeof statusCounts] || 0;
            const isActive = selectedStatus === status;
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`p-3 rounded-xl text-center transition-all ${
                  isActive
                    ? 'bg-[#0B2652] text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#0B2652]'
                }`}
              >
                <span className="block text-xl font-bold">{count}</span>
                <span className="text-xs">{status}</span>
              </button>
            );
          })}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app, i) => {
            const statusStyles = getApplicationStatusStyles(app.status);
            return (
              <motion.a
                key={app.id}
                href={`/job-seeker/applications/${app.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`block bg-white rounded-2xl p-5 shadow-sm border-l-4 transition-all hover:shadow-md ${statusBorderColors[app.status]}`}
              >
                <div className="flex items-start gap-4">
                  <CompanyLogo size="lg" icon={<BuildingOfficeIcon className="h-6 w-6 text-gray-400" />} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="font-semibold text-gray-900">{app.title}</h3>
                        <p className="text-sm text-gray-600">{app.company}</p>
                      </div>
                      <StatusBadge status={app.status} label={statusStyles.label} />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="h-3.5 w-3.5" />{app.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <CurrencyDollarIcon className="h-3.5 w-3.5" />{app.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3.5 w-3.5" />Applied {app.appliedDate}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-400">Next Step</p>
                          <p className="text-sm text-gray-700">{app.nextStep}</p>
                        </div>
                        <span className="text-xs text-gray-400">Updated {app.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {filteredApplications.length === 0 && (
          <EmptyState
            icon={<BriefcaseIcon className="h-12 w-12" />}
            title="No applications found"
            description={selectedStatus === 'All' ? "You haven't applied to any jobs yet" : `No applications with "${selectedStatus}" status`}
            actionLabel="Browse Jobs"
            actionHref="/job-seeker/jobs"
          />
        )}
      </MainContent>

      <BottomNav activeNav="applications" unreadMessages={currentUser.unreadMessages} />
    </PageContainer>
  );
}
