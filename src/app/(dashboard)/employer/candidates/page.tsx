'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FunnelIcon,
  EnvelopeIcon,
  StarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import {
  EmployerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  PageHeader,
  FilterPills,
  SecondaryButton,
  Avatar,
  IconButton,
  StatusBadge,
  getCandidateStatusStyles,
  getMatchScoreColor,
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

const candidates = [
  { id: 1, name: 'Maria Santos', title: 'Senior React Developer', initials: 'MS', appliedFor: 'Senior React Developer', matchScore: 95, status: 'shortlisted', appliedDate: 'Jan 23, 2025', experience: '5 years', location: 'Manila, Philippines', starred: true },
  { id: 2, name: 'Juan Dela Cruz', title: 'Full Stack Engineer', initials: 'JD', appliedFor: 'Senior React Developer', matchScore: 88, status: 'new', appliedDate: 'Jan 23, 2025', experience: '4 years', location: 'Cebu, Philippines', starred: false },
  { id: 3, name: 'Anna Reyes', title: 'Frontend Developer', initials: 'AR', appliedFor: 'Senior React Developer', matchScore: 82, status: 'reviewing', appliedDate: 'Jan 22, 2025', experience: '3 years', location: 'Davao, Philippines', starred: false },
  { id: 4, name: 'Carlo Mendoza', title: 'Executive Assistant', initials: 'CM', appliedFor: 'Virtual Assistant', matchScore: 90, status: 'interview', appliedDate: 'Jan 21, 2025', experience: '6 years', location: 'Quezon City, Philippines', starred: true },
  { id: 5, name: 'Sofia Garcia', title: 'Customer Success Manager', initials: 'SG', appliedFor: 'Customer Support Specialist', matchScore: 85, status: 'offered', appliedDate: 'Jan 20, 2025', experience: '4 years', location: 'Makati, Philippines', starred: true },
  { id: 6, name: 'Miguel Torres', title: 'Virtual Assistant', initials: 'MT', appliedFor: 'Virtual Assistant', matchScore: 78, status: 'rejected', appliedDate: 'Jan 19, 2025', experience: '2 years', location: 'Pasig, Philippines', starred: false },
];

const pipelineStages = ['All', 'New', 'Reviewing', 'Shortlisted', 'Interview', 'Offered', 'Rejected'];

export default function EmployerCandidatesPage() {
  const [selectedStage, setSelectedStage] = useState('All');

  const filteredCandidates = candidates.filter(c =>
    selectedStage === 'All' || c.status.toLowerCase() === selectedStage.toLowerCase()
  );

  return (
    <PageContainer>
      <EmployerHeader
        company={company}
        pageTitle="Candidates"
        
      />

      <MainContent>
        <div className="space-y-6">
          <PageHeader
            title="Candidates"
            subtitle={`${candidates.length} total applicants`}
            action={
              <SecondaryButton>
                <FunnelIcon className="h-4 w-4" />
                Filters
              </SecondaryButton>
            }
          />

          <FilterPills
            options={pipelineStages}
            selected={selectedStage}
            onSelect={setSelectedStage}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${cardStyles.base} overflow-hidden`}
          >
            <div className="divide-y divide-gray-100">
              {filteredCandidates.map((candidate) => {
                const statusStyles = getCandidateStatusStyles(candidate.status);
                return (
                  <a
                    key={candidate.id}
                    href={`/employer/candidates/${candidate.id}`}
                    className={`block p-4 hover:bg-gray-50 transition-colors border-l-4 ${statusStyles.border}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <Avatar initials={candidate.initials} size="lg" />
                        {candidate.starred && (
                          <StarIconSolid className="absolute -top-1 -right-1 h-4 w-4 text-[#ED9F08]" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{candidate.name}</h3>
                          <StatusBadge status={candidate.status} type="candidate" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{candidate.title}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span>Applied for: <span className="text-gray-700">{candidate.appliedFor}</span></span>
                          <span>{candidate.experience}</span>
                          <span>{candidate.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`text-lg font-bold ${getMatchScoreColor(candidate.matchScore)}`}>
                            {candidate.matchScore}%
                          </p>
                          <p className="text-xs text-gray-500">match</p>
                        </div>
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <IconButton onClick={(e) => e.stopPropagation()}>
                            <EnvelopeIcon className="h-4 w-4" />
                          </IconButton>
                          <IconButton variant="gold" onClick={(e) => e.stopPropagation()}>
                            {candidate.starred ? (
                              <StarIconSolid className="h-4 w-4 text-[#ED9F08]" />
                            ) : (
                              <StarIcon className="h-4 w-4" />
                            )}
                          </IconButton>
                          <IconButton onClick={(e) => e.stopPropagation()}>
                            <CalendarIcon className="h-4 w-4" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </MainContent>

      <BottomNav activeNav="candidates" unreadMessages={company.unreadMessages} />
    </PageContainer>
  );
}
