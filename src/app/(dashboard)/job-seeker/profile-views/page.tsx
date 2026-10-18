'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  EyeIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import {
  JobSeekerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  SectionHeader,
  CompanyLogo,
} from '@/components/job-seeker';
import { currentUser } from '@/lib/job-seeker';

// Mock data for profile views
const profileViewsData = {
  summary: {
    totalViews: 127,
    viewsThisWeek: 23,
    viewsThisMonth: 89,
    trend: '+15%',
  },
  views: [
    {
      id: '1',
      viewerName: 'Sarah Johnson',
      viewerTitle: 'HR Manager',
      companyName: 'TechCorp Global',
      companyLogo: null,
      industry: 'Technology',
      viewedAt: '2 hours ago',
      viewedDate: 'Jan 25, 2025',
    },
    {
      id: '2',
      viewerName: 'Mike Chen',
      viewerTitle: 'Technical Recruiter',
      companyName: 'InnovateTech Solutions',
      companyLogo: null,
      industry: 'Software',
      viewedAt: '5 hours ago',
      viewedDate: 'Jan 25, 2025',
    },
    {
      id: '3',
      viewerName: 'Emily Davis',
      viewerTitle: 'Talent Acquisition Lead',
      companyName: 'Digital Ventures Inc',
      companyLogo: null,
      industry: 'Digital Marketing',
      viewedAt: 'Yesterday',
      viewedDate: 'Jan 24, 2025',
    },
    {
      id: '4',
      viewerName: 'James Wilson',
      viewerTitle: 'Engineering Manager',
      companyName: 'CloudScale Systems',
      companyLogo: null,
      industry: 'Cloud Computing',
      viewedAt: '2 days ago',
      viewedDate: 'Jan 23, 2025',
    },
    {
      id: '5',
      viewerName: 'Lisa Thompson',
      viewerTitle: 'Hiring Manager',
      companyName: 'StartupHub PH',
      companyLogo: null,
      industry: 'Startups',
      viewedAt: '3 days ago',
      viewedDate: 'Jan 22, 2025',
    },
    {
      id: '6',
      viewerName: 'Robert Garcia',
      viewerTitle: 'CTO',
      companyName: 'AppWorks Studio',
      companyLogo: null,
      industry: 'Mobile Development',
      viewedAt: '4 days ago',
      viewedDate: 'Jan 21, 2025',
    },
  ],
};

const timeFilters = ['All Time', 'This Week', 'This Month', 'Last 3 Months'];

export default function ProfileViewsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All Time');

  const { summary, views } = profileViewsData;

  return (
    <PageContainer>
      <JobSeekerHeader user={currentUser} />

      <MainContent>
        {/* Back Button */}
        <a href="/job-seeker" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0B2652] mb-6">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Dashboard
        </a>

        <SectionHeader
          title="Who Viewed Your Profile"
          icon={<EyeIcon className="h-5 w-5 text-[#0B2652]" />}
        />

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#0B2652]/10 rounded-xl">
                <EyeIcon className="h-5 w-5 text-[#0B2652]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{summary.totalViews}</p>
            <p className="text-sm text-gray-500">Total Views</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-xl">
                <CalendarIcon className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{summary.viewsThisWeek}</p>
            <p className="text-sm text-gray-500">This Week</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-xl">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{summary.viewsThisMonth}</p>
            <p className="text-sm text-gray-500">This Month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-xl">
                <ChartBarIcon className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600">{summary.trend}</p>
            <p className="text-sm text-gray-500">vs Last Month</p>
          </motion.div>
        </div>

        {/* Time Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-[#0B2652] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Views List */}
        <div className="space-y-4">
          {views.map((view, i) => (
            <motion.div
              key={view.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <CompanyLogo
                  size="lg"
                  icon={<BuildingOfficeIcon className="h-6 w-6 text-gray-400" />}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="font-semibold text-gray-900">{view.viewerName}</h3>
                      <p className="text-sm text-gray-600">{view.viewerTitle}</p>
                      <p className="text-sm text-[#0B2652] font-medium">{view.companyName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{view.viewedAt}</p>
                      <p className="text-xs text-gray-400">{view.viewedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {view.industry}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#0B2652] bg-[#0B2652]/10 rounded-full hover:bg-[#0B2652]/20 transition-colors">
                      <ChatBubbleLeftRightIcon className="h-4 w-4" />
                      Message
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <EyeIcon className="h-4 w-4" />
                      View Company
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                      <BookmarkIcon className="h-4 w-4" />
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {views.length === 0 && (
          <div className="text-center py-12">
            <EyeIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No profile views yet</h3>
            <p className="text-gray-500 mb-4">Complete your profile to get noticed by employers</p>
            <a
              href="/job-seeker/profile"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B2652] text-white font-medium rounded-full hover:bg-[#0B2652]/90 transition-colors"
            >
              Complete Profile
            </a>
          </div>
        )}

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-[#0B2652] to-[#1a4078] rounded-2xl p-6 text-white"
        >
          <h3 className="font-semibold mb-3">Tips to Get More Profile Views</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Complete all sections of your profile (skills, experience, education)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Add a professional photo to increase visibility by 14x
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Keep your profile updated with recent projects and certifications
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              Apply to jobs actively - active profiles appear higher in search
            </li>
          </ul>
        </motion.div>
      </MainContent>

      <BottomNav activeNav="home" unreadMessages={currentUser.unreadMessages} />
    </PageContainer>
  );
}
