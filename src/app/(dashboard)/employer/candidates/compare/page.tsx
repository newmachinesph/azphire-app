'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  XMarkIcon,
  PlusIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import {
  BottomNav,
  PageContainer,
  MainContent,
  GoldButton,
  Avatar,
  cardStyles,
  gradients,
} from '@/components/employer';

// Mock candidates for comparison
const candidatesPool = [
  {
    id: '1',
    name: 'John Doe',
    initials: 'JD',
    title: 'Senior Frontend Developer',
    location: 'Manila, Philippines',
    matchScore: 95,
    experience: '5 years',
    expectedSalary: '$5,000/mo',
    availability: 'Immediately',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'GraphQL', level: 70 },
    ],
    education: 'BS Computer Science, University of the Philippines',
    workHistory: [
      { title: 'Senior Frontend Developer', company: 'TechStartup Inc', years: '2022-Present' },
      { title: 'Frontend Developer', company: 'WebAgency PH', years: '2019-2022' },
    ],
    status: 'shortlisted',
    starred: true,
  },
  {
    id: '2',
    name: 'Maria Santos',
    initials: 'MS',
    title: 'Full Stack Developer',
    location: 'Cebu, Philippines',
    matchScore: 88,
    experience: '4 years',
    expectedSalary: '$4,500/mo',
    availability: '2 weeks',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'Node.js', level: 90 },
      { name: 'GraphQL', level: 85 },
    ],
    education: 'BS Information Technology, Ateneo de Manila',
    workHistory: [
      { title: 'Full Stack Developer', company: 'Digital Solutions', years: '2021-Present' },
      { title: 'Junior Developer', company: 'CodeFactory', years: '2020-2021' },
    ],
    status: 'interview',
    starred: false,
  },
  {
    id: '3',
    name: 'Carlos Reyes',
    initials: 'CR',
    title: 'React Developer',
    location: 'Davao, Philippines',
    matchScore: 82,
    experience: '3 years',
    expectedSalary: '$4,000/mo',
    availability: '1 month',
    skills: [
      { name: 'React', level: 85 },
      { name: 'TypeScript', level: 75 },
      { name: 'Next.js', level: 70 },
      { name: 'Node.js', level: 65 },
      { name: 'GraphQL', level: 60 },
    ],
    education: 'BS Computer Engineering, De La Salle University',
    workHistory: [
      { title: 'React Developer', company: 'AppWorks', years: '2022-Present' },
      { title: 'Frontend Intern', company: 'StartupHub', years: '2021-2022' },
    ],
    status: 'reviewing',
    starred: true,
  },
];

const comparisonMetrics = ['Skills', 'Experience', 'Education', 'Availability', 'Salary'];

export default function CandidateComparePage() {
  const [selectedCandidates, setSelectedCandidates] = useState<typeof candidatesPool>(
    candidatesPool.slice(0, 2)
  );
  const [showAddModal, setShowAddModal] = useState(false);

  const handleRemoveCandidate = (candidateId: string) => {
    setSelectedCandidates(prev => prev.filter(c => c.id !== candidateId));
  };

  const handleAddCandidate = (candidate: typeof candidatesPool[0]) => {
    if (selectedCandidates.length < 4 && !selectedCandidates.find(c => c.id === candidate.id)) {
      setSelectedCandidates(prev => [...prev, candidate]);
    }
    setShowAddModal(false);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getSkillBarColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  // Find common and unique skills
  const allSkills = [...new Set(selectedCandidates.flatMap(c => c.skills.map(s => s.name)))];
  const commonSkills = allSkills.filter(skill =>
    selectedCandidates.every(c => c.skills.find(s => s.name === skill))
  );

  return (
    <PageContainer>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/employer/candidates" className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors">
                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
              </a>
              <div>
                <h1 className="font-semibold text-gray-900">Compare Candidates</h1>
                <p className="text-xs text-gray-500">{selectedCandidates.length} of 4 candidates selected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                disabled={selectedCandidates.length >= 4}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B2652] text-white text-sm font-medium rounded-full hover:bg-[#0B2652]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon className="h-4 w-4" />
                Add Candidate
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
                <ArrowDownTrayIcon className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      <MainContent>
        {selectedCandidates.length < 2 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select candidates to compare</h3>
            <p className="text-gray-500 mb-4">Choose 2-4 candidates to compare side by side</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B2652] text-white font-medium rounded-full hover:bg-[#0B2652]/90 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              Add Candidates
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 px-4">
            {/* Comparison Grid */}
            <div className="min-w-[800px]">
              {/* Header Row - Candidate Cards */}
              <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${selectedCandidates.length}, 1fr)` }}>
                <div /> {/* Empty cell for labels */}
                {selectedCandidates.map((candidate, i) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm relative"
                  >
                    <button
                      onClick={() => handleRemoveCandidate(candidate.id)}
                      className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <XMarkIcon className="h-4 w-4 text-gray-400" />
                    </button>

                    <div className="text-center">
                      <div className="relative inline-block mb-3">
                        <Avatar initials={candidate.initials} size="lg" />
                        {candidate.starred && (
                          <StarSolidIcon className="absolute -top-1 -right-1 h-5 w-5 text-amber-400" />
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{candidate.title}</p>
                      <span className={`inline-block px-3 py-1 text-sm font-bold rounded-full ${getMatchScoreColor(candidate.matchScore)}`}>
                        {candidate.matchScore}% Match
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-[#0B2652] bg-[#0B2652]/10 rounded-lg hover:bg-[#0B2652]/20 transition-colors">
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                        Message
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors">
                        <CalendarIcon className="h-4 w-4" />
                        Schedule
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Basic Info Row */}
              <ComparisonSection title="Basic Info">
                <ComparisonRow label="Location" icon={<MapPinIcon className="h-4 w-4" />}>
                  {selectedCandidates.map(c => (
                    <div key={c.id} className="text-sm text-gray-900">{c.location}</div>
                  ))}
                </ComparisonRow>
                <ComparisonRow label="Experience" icon={<BriefcaseIcon className="h-4 w-4" />}>
                  {selectedCandidates.map(c => (
                    <div key={c.id} className="text-sm text-gray-900">{c.experience}</div>
                  ))}
                </ComparisonRow>
                <ComparisonRow label="Availability" icon={<ClockIcon className="h-4 w-4" />}>
                  {selectedCandidates.map(c => (
                    <div key={c.id} className={`text-sm font-medium ${c.availability === 'Immediately' ? 'text-green-600' : 'text-gray-900'}`}>
                      {c.availability}
                    </div>
                  ))}
                </ComparisonRow>
                <ComparisonRow label="Expected Salary" icon={<CurrencyDollarIcon className="h-4 w-4" />}>
                  {selectedCandidates.map(c => (
                    <div key={c.id} className="text-sm font-semibold text-gray-900">{c.expectedSalary}</div>
                  ))}
                </ComparisonRow>
              </ComparisonSection>

              {/* Skills Section */}
              <ComparisonSection title="Skills">
                {allSkills.map(skillName => (
                  <ComparisonRow key={skillName} label={skillName} isCommon={commonSkills.includes(skillName)}>
                    {selectedCandidates.map(c => {
                      const skill = c.skills.find(s => s.name === skillName);
                      return (
                        <div key={c.id}>
                          {skill ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${getSkillBarColor(skill.level)} rounded-full`}
                                  style={{ width: `${skill.level}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-600 w-8">{skill.level}%</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-400">
                              <XCircleIcon className="h-4 w-4" />
                              <span className="text-xs">N/A</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </ComparisonRow>
                ))}
              </ComparisonSection>

              {/* Education Section */}
              <ComparisonSection title="Education">
                <ComparisonRow label="Degree" icon={<AcademicCapIcon className="h-4 w-4" />}>
                  {selectedCandidates.map(c => (
                    <div key={c.id} className="text-sm text-gray-900">{c.education}</div>
                  ))}
                </ComparisonRow>
              </ComparisonSection>

              {/* Work History Section */}
              <ComparisonSection title="Work History">
                {[0, 1].map(idx => (
                  <ComparisonRow key={idx} label={idx === 0 ? 'Current/Recent' : 'Previous'}>
                    {selectedCandidates.map(c => {
                      const job = c.workHistory[idx];
                      return (
                        <div key={c.id}>
                          {job ? (
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">{job.title}</div>
                              <div className="text-gray-500">{job.company}</div>
                              <div className="text-xs text-gray-400">{job.years}</div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </div>
                      );
                    })}
                  </ComparisonRow>
                ))}
              </ComparisonSection>

              {/* Common Skills Summary */}
              {commonSkills.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-2xl"
                >
                  <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5" />
                    Common Skills ({commonSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {commonSkills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </MainContent>

      <BottomNav activeNav="candidates" unreadMessages={3} />

      {/* Add Candidate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add Candidate to Compare</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              {candidatesPool.filter(c => !selectedCandidates.find(sc => sc.id === c.id)).map(candidate => (
                <button
                  key={candidate.id}
                  onClick={() => handleAddCandidate(candidate)}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <Avatar initials={candidate.initials} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                    <p className="text-sm text-gray-500">{candidate.title}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${getMatchScoreColor(candidate.matchScore)}`}>
                    {candidate.matchScore}%
                  </span>
                </button>
              ))}

              {candidatesPool.filter(c => !selectedCandidates.find(sc => sc.id === c.id)).length === 0 && (
                <p className="text-center text-gray-500 py-4">All candidates are already selected</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </PageContainer>
  );
}

// Helper Components
function ComparisonSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

function ComparisonRow({
  label,
  icon,
  children,
  isCommon,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isCommon?: boolean;
}) {
  const childrenArray = Array.isArray(children) ? children : [children];
  const count = childrenArray.length;

  return (
    <div className="grid border-b border-gray-100 last:border-0" style={{ gridTemplateColumns: `200px repeat(${count}, 1fr)` }}>
      <div className="p-4 bg-gray-50 flex items-center gap-2">
        {icon && <span className="text-gray-400">{icon}</span>}
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {isCommon && (
          <CheckCircleIcon className="h-4 w-4 text-green-500" />
        )}
      </div>
      {childrenArray.map((child, i) => (
        <div key={i} className="p-4 border-l border-gray-100">
          {child}
        </div>
      ))}
    </div>
  );
}
