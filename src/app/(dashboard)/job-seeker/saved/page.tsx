'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BuildingOfficeIcon,
  TrashIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import {
  JobSeekerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  SectionHeader,
  SkillTag,
  CompanyLogo,
  JobMeta,
  MatchScore,
  EmptyState,
} from '@/components/job-seeker';
import { currentUser, allJobs } from '@/lib/job-seeker';

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState(allJobs.filter(j => j.saved));

  const removeJob = (jobId: number) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  return (
    <PageContainer>
      <JobSeekerHeader user={currentUser} />

      <MainContent>
        <SectionHeader
          title="Saved Jobs"
          icon={<BookmarkIconSolid className="h-5 w-5 text-[#ED9F08]" />}
        />

        <p className="text-sm text-gray-500 mb-6">
          {jobs.length} saved job{jobs.length !== 1 ? 's' : ''}
        </p>

        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <CompanyLogo size="lg" icon={<BuildingOfficeIcon className="h-6 w-6 text-gray-400" />} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <a href={`/job-seeker/jobs/${job.id}`} className="block group">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#0B2652] transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </a>
                      <div className="flex items-center gap-2">
                        <MatchScore score={job.matchScore} />
                        <button
                          onClick={() => removeJob(job.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <JobMeta location={job.location} salary={job.salary} posted={job.posted} type={job.type} />

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.skills.map(skill => <SkillTag key={skill} skill={skill} />)}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">Saved {job.savedAt}</span>
                      <a href={`/job-seeker/jobs/${job.id}`} className="text-sm font-medium text-[#0B2652] hover:underline">
                        View Details →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookmarkIcon className="h-12 w-12" />}
            title="No saved jobs yet"
            description="Jobs you save will appear here"
            actionLabel="Browse Jobs"
            actionHref="/job-seeker/jobs"
          />
        )}
      </MainContent>

      <BottomNav activeNav="jobs" unreadMessages={currentUser.unreadMessages} />
    </PageContainer>
  );
}
