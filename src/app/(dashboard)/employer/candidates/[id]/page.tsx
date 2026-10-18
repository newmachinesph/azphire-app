'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  StarIcon,
  AcademicCapIcon,
  ClockIcon,
  ChevronDownIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import {
  BottomNav,
  PageContainer,
  MainContent,
  Avatar,
  GoldButton,
  SecondaryButton,
  SectionHeader,
  getCandidateStatusStyles,
  getMatchScoreColor,
  cardStyles,
  gradients,
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

const candidate = {
  id: 1,
  name: 'Maria Santos',
  title: 'Senior React Developer',
  initials: 'MS',
  email: 'maria.santos@email.com',
  phone: '+63 917 123 4567',
  location: 'Manila, Philippines',
  timezone: 'GMT+8 (Philippine Time)',
  appliedFor: 'Senior React Developer',
  matchScore: 95,
  status: 'shortlisted',
  appliedDate: 'Jan 23, 2025',
  availability: 'Immediate',
  expectedSalary: '$3,500 - $4,500/mo',
  starred: true,
  about: 'Passionate frontend developer with 5+ years of experience building scalable web applications. I specialize in React, TypeScript, and modern frontend architecture. I love creating intuitive user interfaces and am always eager to learn new technologies.',
  skills: [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Node.js', level: 75 },
    { name: 'GraphQL', level: 70 },
  ],
  experience: [
    { id: 1, title: 'Senior Frontend Developer', company: 'Tech Solutions Inc.', location: 'Remote', period: 'Jan 2022 - Present', description: 'Lead frontend development for enterprise SaaS platform. Built component library used across 5 product teams. Reduced page load times by 40%.' },
    { id: 2, title: 'Frontend Developer', company: 'StartupXYZ', location: 'Makati, Philippines', period: 'Jun 2019 - Dec 2021', description: 'Developed React-based e-commerce platform handling 10k+ daily transactions. Implemented real-time inventory tracking and payment integrations.' },
    { id: 3, title: 'Junior Developer', company: 'WebAgency PH', location: 'Manila, Philippines', period: 'Jan 2018 - May 2019', description: 'Built responsive websites for various clients. Learned React and modern frontend development practices.' },
  ],
  education: [{ id: 1, degree: 'BS Computer Science', school: 'University of the Philippines', year: '2017' }],
  portfolio: 'https://mariasantos.dev',
  linkedin: 'https://linkedin.com/in/mariasantos',
  github: 'https://github.com/mariasantos',
};

const pipelineStages = ['New', 'Reviewing', 'Shortlisted', 'Interview', 'Offered', 'Rejected'];

export default function CandidateDetailPage() {
  const [isStarred, setIsStarred] = useState(candidate.starred);
  const [currentStatus, setCurrentStatus] = useState(candidate.status);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const statusMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusMenuRef.current && !statusMenuRef.current.contains(event.target as Node)) {
        setShowStatusMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusStyles = getCandidateStatusStyles(currentStatus);

  return (
    <PageContainer>
      {/* Simple Header with Back Button */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <a href="/employer/candidates" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </a>
            <div>
              <p className="font-semibold text-gray-900">Candidate Profile</p>
              <p className="text-xs text-gray-500">Applied for {candidate.appliedFor}</p>
            </div>
          </div>
        </div>
      </header>

      <MainContent>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Profile Card */}
            <div className={cardStyles.withPadding}>
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className={`w-24 h-24 rounded-full ${gradients.primary} flex items-center justify-center text-white font-bold text-3xl mx-auto`}>
                    {candidate.initials}
                  </div>
                  <button
                    onClick={() => setIsStarred(!isStarred)}
                    className="absolute -top-1 -right-1 p-1.5 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    {isStarred ? (
                      <StarIconSolid className="h-5 w-5 text-[#ED9F08]" />
                    ) : (
                      <StarIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mt-4">{candidate.name}</h1>
                <p className="text-gray-600">{candidate.title}</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusStyles.badge}`}>
                    {statusStyles.label}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchScoreColor(candidate.matchScore)} bg-opacity-10`}>
                    {candidate.matchScore}% match
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                  <a href={`mailto:${candidate.email}`} className="text-gray-700 hover:text-[#0B2652]">{candidate.email}</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <PhoneIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPinIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{candidate.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <ClockIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{candidate.timezone}</span>
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-2 border-t border-gray-100 pt-4 mt-4">
                {[
                  { label: 'Portfolio', href: candidate.portfolio },
                  { label: 'LinkedIn', href: candidate.linkedin },
                  { label: 'GitHub', href: candidate.github },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 text-center transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className={cardStyles.withPadding}>
              <SectionHeader title="Application Details" />
              <div className="space-y-3">
                {[
                  { label: 'Applied', value: candidate.appliedDate },
                  { label: 'Position', value: candidate.appliedFor },
                  { label: 'Availability', value: candidate.availability, className: 'text-green-600 font-medium' },
                  { label: 'Expected Salary', value: candidate.expectedSalary },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.label}</span>
                    <span className={item.className || 'text-gray-900'}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className={cardStyles.withPadding}>
              <SectionHeader title="Actions" />
              <div className="space-y-3">
                <GoldButton className="w-full justify-center">
                  <CalendarIcon className="h-4 w-4" />
                  Schedule Interview
                </GoldButton>
                <SecondaryButton className="w-full justify-center">
                  <EnvelopeIcon className="h-4 w-4" />
                  Send Message
                </SecondaryButton>

                {/* Status Dropdown */}
                <div className="relative" ref={statusMenuRef}>
                  <button
                    onClick={() => setShowStatusMenu(!showStatusMenu)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-[#0B2652] transition-colors"
                  >
                    <span>Update Status</span>
                    <ChevronDownIcon className={`h-4 w-4 transition-transform ${showStatusMenu ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showStatusMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10"
                      >
                        {pipelineStages.map((stage) => (
                          <button
                            key={stage}
                            onClick={() => {
                              setCurrentStatus(stage.toLowerCase());
                              setShowStatusMenu(false);
                            }}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                              currentStatus === stage.toLowerCase() ? 'text-[#0B2652] font-medium' : 'text-gray-700'
                            }`}
                          >
                            {stage}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* About */}
            <div className={cardStyles.withPadding}>
              <SectionHeader title="About" />
              <p className="text-gray-600 text-sm leading-relaxed">{candidate.about}</p>
            </div>

            {/* Skills */}
            <div className={cardStyles.withPadding}>
              <SectionHeader title="Skills" />
              <div className="space-y-4">
                {candidate.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`h-full rounded-full ${
                          skill.level >= 90 ? 'bg-green-500' : skill.level >= 80 ? 'bg-blue-500' : 'bg-amber-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className={cardStyles.withPadding}>
              <div className="flex items-center gap-2 mb-4">
                <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                <h3 className="font-semibold text-gray-900">Experience</h3>
              </div>
              <div className="space-y-6">
                {candidate.experience.map((exp, index) => (
                  <div key={exp.id} className={`relative pl-6 ${index !== candidate.experience.length - 1 ? 'pb-6 border-l-2 border-gray-100' : ''}`}>
                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[5px] rounded-full bg-[#0B2652]" />
                    <h4 className="font-medium text-gray-900">{exp.title}</h4>
                    <p className="text-sm text-[#0B2652]">{exp.company}</p>
                    <p className="text-xs text-gray-500 mt-1">{exp.location} • {exp.period}</p>
                    <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className={cardStyles.withPadding}>
              <div className="flex items-center gap-2 mb-4">
                <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                <h3 className="font-semibold text-gray-900">Education</h3>
              </div>
              <div className="space-y-4">
                {candidate.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                    <p className="text-xs text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </MainContent>

      <BottomNav activeNav="candidates" unreadMessages={company.unreadMessages} />
    </PageContainer>
  );
}
