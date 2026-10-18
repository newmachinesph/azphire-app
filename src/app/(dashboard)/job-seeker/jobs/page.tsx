'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {
  JobSeekerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  SearchBar,
  FilterPills,
  FilterPill,
  JobCard,
  EmptyState,
} from '@/components/job-seeker';
import { currentUser, allJobs, jobTypes } from '@/lib/job-seeker';

const experienceLevels = ['All Levels', 'Entry', 'Mid', 'Senior', 'Lead'];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<number[]>([2, 5]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const toggleSave = (jobId: number) => {
    setSavedJobs(prev => prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]);
  };

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesSaved = !showSavedOnly || savedJobs.includes(job.id);
    return matchesSearch && matchesType && matchesSaved;
  });

  return (
    <PageContainer>
      <JobSeekerHeader user={currentUser} />

      <MainContent>
        <div className="mb-6">
          <div className="mb-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search jobs, skills, companies..."
              showFilter
              filterActive={showFilters}
              onFilterClick={() => setShowFilters(!showFilters)}
            />
          </div>

          <FilterPills options={jobTypes} selected={selectedType} onChange={setSelectedType}>
            <FilterPill
              label={`Saved (${savedJobs.length})`}
              isActive={showSavedOnly}
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              icon={showSavedOnly ? <BookmarkIconSolid className="h-4 w-4" /> : <BookmarkIcon className="h-4 w-4" />}
              variant="gold"
            />
          </FilterPills>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-4 bg-white rounded-xl border border-gray-200"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2652]">
                    {experienceLevels.map(level => <option key={level}>{level}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2652]">
                    <option>Any</option>
                    <option>$1,000 - $2,000</option>
                    <option>$2,000 - $3,000</option>
                    <option>$3,000 - $5,000</option>
                    <option>$5,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2652]">
                    <option>Any</option>
                    <option>US Hours</option>
                    <option>EU Hours</option>
                    <option>AU Hours</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Posted</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2652]">
                    <option>Any time</option>
                    <option>Last 24 hours</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">Showing {filteredJobs.length} jobs</p>

        <div className="space-y-4">
          {filteredJobs.map((job, i) => (
            <JobCard
              key={job.id}
              job={job}
              index={i}
              isSaved={savedJobs.includes(job.id)}
              onToggleSave={toggleSave}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <EmptyState
            icon={<MagnifyingGlassIcon className="h-12 w-12" />}
            title="No jobs found"
            description="Try adjusting your search or filters"
          />
        )}
      </MainContent>

      <BottomNav activeNav="jobs" unreadMessages={currentUser.unreadMessages} />
    </PageContainer>
  );
}
