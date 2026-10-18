'use client';

import { motion } from 'framer-motion';
import {
  PencilIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  TrophyIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import {
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import {
  JobSeekerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  Card,
  SectionHeader,
  SkillTag,
} from '@/components/job-seeker';

const user = {
  name: 'Maria Santos',
  initials: 'MS',
  title: 'Senior React Developer',
  unreadNotifications: 3,
  unreadMessages: 2,
};

const profile = {
  name: 'Maria Santos',
  title: 'Senior React Developer',
  location: 'Manila, Philippines',
  email: 'maria.santos@email.com',
  phone: '+63 917 123 4567',
  linkedin: 'linkedin.com/in/mariasantos',
  portfolio: 'mariasantos.dev',
  bio: 'Passionate frontend developer with 5+ years of experience building scalable web applications. Specialized in React, TypeScript, and modern frontend architecture. I love creating beautiful, performant user experiences.',
  skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS'],
  experience: [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc',
      location: 'Remote',
      period: 'Jan 2022 - Present',
      description: 'Led frontend development for a SaaS platform serving 100k+ users. Implemented design system and improved performance by 40%.',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Agency PH',
      location: 'Makati City',
      period: 'Mar 2019 - Dec 2021',
      description: 'Built responsive web applications for various clients. Mentored junior developers and established coding standards.',
    },
  ],
  education: [
    {
      id: 1,
      degree: 'BS Computer Science',
      school: 'University of the Philippines',
      period: '2015 - 2019',
    },
  ],
  certifications: [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: 'Mar 2023',
      expiryDate: 'Mar 2026',
      credentialId: 'AWS-SAA-C03-12345',
      credentialUrl: 'https://aws.amazon.com/verification/12345',
    },
    {
      id: 2,
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta (Coursera)',
      issueDate: 'Jan 2023',
      expiryDate: null,
      credentialId: 'META-FE-67890',
      credentialUrl: 'https://coursera.org/verify/67890',
    },
    {
      id: 3,
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      issueDate: 'Sep 2022',
      expiryDate: 'Sep 2024',
      credentialId: 'GCP-PD-11111',
      credentialUrl: null,
    },
  ],
  profileCompletion: 85,
  profileItems: [
    { label: 'Work Experience', complete: true },
    { label: 'Skills & Expertise', complete: true },
    { label: 'Education', complete: true },
    { label: 'Certifications', complete: true },
    { label: 'Portfolio/Projects', complete: false },
    { label: 'Profile Photo', complete: false },
  ],
};

export default function ProfilePage() {
  return (
    <PageContainer>
      <JobSeekerHeader user={user} />

      <MainContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0B2652] to-[#1a3a6e] flex items-center justify-center text-white text-3xl font-bold">
                    {user.initials}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <PencilIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600">{profile.title}</p>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                  <MapPinIcon className="h-4 w-4" /> {profile.location}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#0B2652]">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  {profile.email}
                </a>
                <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#0B2652]">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  {profile.phone}
                </a>
                <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#0B2652]">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                  {profile.linkedin}
                </a>
                <a href={`https://${profile.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#0B2652]">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                  {profile.portfolio}
                </a>
              </div>

              <a
                href="/job-seeker/settings"
                className="mt-6 w-full py-2.5 border-2 border-[#0B2652] text-[#0B2652] rounded-xl font-medium text-sm hover:bg-[#0B2652]/5 transition-colors flex items-center justify-center gap-2"
              >
                <PencilIcon className="h-4 w-4" />
                Edit Profile
              </a>
            </Card>

            {/* Profile Completion */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Profile Strength</h3>
                <span className="text-lg font-bold text-[#0B2652]">{profile.profileCompletion}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${profile.profileCompletion}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#ED9F08] to-[#f5b52e] rounded-full"
                />
              </div>
              <div className="space-y-2">
                {profile.profileItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    {item.complete ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <ExclamationCircleIcon className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className={item.complete ? 'text-gray-500' : 'text-gray-900'}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">About</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <PencilIcon className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
            </Card>

            {/* Skills */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Skills</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <PencilIcon className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-[#0B2652]/5 text-[#0B2652] text-sm rounded-lg font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>

            {/* Certifications */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <SectionHeader
                  title="Certifications"
                  icon={<TrophyIcon className="h-5 w-5 text-[#0B2652]" />}
                />
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <PlusIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                {profile.certifications.map((cert, i) => (
                  <div key={cert.id} className={`${i > 0 ? 'pt-4 border-t border-gray-100' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0B2652] hover:text-[#0B2652]/80"
                            >
                              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">
                            Issued: {cert.issueDate}
                          </span>
                          {cert.expiryDate && (
                            <>
                              <span className="text-xs text-gray-300">•</span>
                              <span className={`text-xs ${
                                new Date(cert.expiryDate) < new Date()
                                  ? 'text-red-500'
                                  : 'text-gray-400'
                              }`}>
                                Expires: {cert.expiryDate}
                              </span>
                            </>
                          )}
                          {!cert.expiryDate && (
                            <>
                              <span className="text-xs text-gray-300">•</span>
                              <span className="text-xs text-green-600">No Expiration</span>
                            </>
                          )}
                        </div>
                        {cert.credentialId && (
                          <p className="text-xs text-gray-400 mt-1">
                            Credential ID: {cert.credentialId}
                          </p>
                        )}
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <PencilIcon className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Experience */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <SectionHeader
                  title="Experience"
                  icon={<BriefcaseIcon className="h-5 w-5 text-[#0B2652]" />}
                />
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <PlusIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <div className="space-y-6">
                {profile.experience.map((exp, i) => (
                  <div key={exp.id} className={`${i > 0 ? 'pt-6 border-t border-gray-100' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                        <p className="text-sm text-gray-600">{exp.company} • {exp.location}</p>
                        <p className="text-xs text-gray-400 mt-1">{exp.period}</p>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <PencilIcon className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Education */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <SectionHeader
                  title="Education"
                  icon={<AcademicCapIcon className="h-5 w-5 text-[#0B2652]" />}
                />
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <PlusIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <div className="space-y-4">
                {profile.education.map(edu => (
                  <div key={edu.id} className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-sm text-gray-600">{edu.school}</p>
                      <p className="text-xs text-gray-400 mt-1">{edu.period}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <PencilIcon className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </MainContent>

      <BottomNav activeNav="profile" unreadMessages={user.unreadMessages} />
    </PageContainer>
  );
}
