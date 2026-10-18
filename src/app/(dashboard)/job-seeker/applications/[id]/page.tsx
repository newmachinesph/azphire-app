'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  VideoCameraIcon,
  LinkIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  GiftIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import {
  JobSeekerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  StatusBadge,
  CompanyLogo,
  getApplicationStatusStyles,
} from '@/components/job-seeker';
import { currentUser, ApplicationStatus } from '@/lib/job-seeker';

// Mock application detail data
const applicationDetails = {
  id: '1',
  title: 'Senior Frontend Developer',
  company: 'TechCorp Global',
  companyLogo: null,
  location: 'Remote (Philippines)',
  salary: '$4,000 - $6,000/mo',
  type: 'Full-time',
  status: 'offer' as ApplicationStatus,
  appliedDate: 'Jan 15, 2025',
  lastUpdate: '2 hours ago',

  // Timeline/history
  statusHistory: [
    { status: 'applied', date: 'Jan 15, 2025', note: 'Application submitted' },
    { status: 'reviewing', date: 'Jan 17, 2025', note: 'Application under review by hiring team' },
    { status: 'interview', date: 'Jan 20, 2025', note: 'Interview scheduled with Sarah Johnson' },
    { status: 'offer', date: 'Jan 24, 2025', note: 'Congratulations! You received an offer' },
  ],

  // Interview details (if status is interview)
  interview: {
    date: 'Jan 26, 2025',
    time: '10:00 AM',
    timezone: 'Philippine Time (PHT)',
    type: 'Video Call',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    interviewer: 'Sarah Johnson',
    interviewerTitle: 'Engineering Manager',
    duration: '45 minutes',
    notes: 'Please prepare to discuss your experience with React and Next.js.',
  },

  // Offer details (if status is offer)
  offer: {
    salary: 5500,
    salaryCurrency: 'USD',
    salaryPeriod: 'monthly',
    startDate: 'Feb 10, 2025',
    expiresAt: 'Jan 30, 2025',
    benefits: [
      'Health Insurance (HMO)',
      '15 days Paid Time Off',
      'Remote work setup allowance',
      'Annual performance bonus',
      'Learning & development budget',
    ],
    notes: 'We are excited to have you join our team! Please respond by the expiration date.',
  },

  // Cover letter
  coverLetter: 'I am excited to apply for the Senior Frontend Developer position at TechCorp Global. With 5+ years of experience in React and Next.js...',

  // Resume
  resume: {
    name: 'John_Doe_Resume.pdf',
    url: '#',
  },
};

const statusColors: Record<ApplicationStatus, string> = {
  offer: 'border-purple-500 bg-purple-50',
  interview: 'border-green-500 bg-green-50',
  reviewing: 'border-yellow-500 bg-yellow-50',
  rejected: 'border-red-500 bg-red-50',
  applied: 'border-blue-500 bg-blue-50',
};

const statusTimelineColors: Record<string, string> = {
  applied: 'bg-blue-500',
  reviewing: 'bg-yellow-500',
  interview: 'bg-green-500',
  offer: 'bg-purple-500',
  rejected: 'bg-red-500',
  hired: 'bg-emerald-500',
};

export default function ApplicationDetailPage() {
  const params = useParams();
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerResponse, setOfferResponse] = useState<'accept' | 'decline' | null>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const app = applicationDetails;
  const statusStyles = getApplicationStatusStyles(app.status);

  const handleOfferResponse = async () => {
    setIsSubmitting(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowOfferModal(false);
    // In real app, would redirect or update state
  };

  const addToCalendar = (type: 'google' | 'outlook' | 'ical') => {
    const interview = app.interview;
    const eventTitle = `Interview: ${app.title} at ${app.company}`;
    const eventDetails = `Interview with ${interview.interviewer}`;

    if (type === 'google') {
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDetails)}`;
      window.open(url, '_blank');
    }
    // Add outlook and ical handlers
  };

  return (
    <PageContainer>
      <JobSeekerHeader user={currentUser} />

      <MainContent>
        {/* Back Button & Header */}
        <div className="mb-6">
          <a href="/job-seeker/applications" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0B2652] mb-4">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Applications
          </a>

          <div className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${statusColors[app.status]}`}>
            <div className="flex items-start gap-4">
              <CompanyLogo size="lg" icon={<BuildingOfficeIcon className="h-8 w-8 text-gray-400" />} />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{app.title}</h1>
                    <p className="text-gray-600">{app.company}</p>
                  </div>
                  <StatusBadge status={app.status} label={statusStyles.label} />
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />{app.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <CurrencyDollarIcon className="h-4 w-4" />{app.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />Applied {app.appliedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Offer Card - Show if status is offer */}
            {app.status === 'offer' && app.offer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <GiftIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">You Have an Offer!</h2>
                    <p className="text-sm text-purple-200">Respond by {app.offer.expiresAt}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-purple-200 text-sm mb-1">
                      <BanknotesIcon className="h-4 w-4" />
                      Salary
                    </div>
                    <p className="text-2xl font-bold">${app.offer.salary.toLocaleString()}</p>
                    <p className="text-sm text-purple-200">per {app.offer.salaryPeriod}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-purple-200 text-sm mb-1">
                      <CalendarDaysIcon className="h-4 w-4" />
                      Start Date
                    </div>
                    <p className="text-2xl font-bold">{app.offer.startDate.split(',')[0].split(' ')[1]}</p>
                    <p className="text-sm text-purple-200">{app.offer.startDate}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-purple-200 mb-2">Benefits Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {app.offer.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircleIcon className="h-4 w-4 text-purple-300" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {app.offer.notes && (
                  <div className="bg-white/10 rounded-xl p-4 mb-6">
                    <p className="text-sm italic">&quot;{app.offer.notes}&quot;</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => { setOfferResponse('accept'); setShowOfferModal(true); }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-colors"
                  >
                    <CheckIcon className="h-5 w-5" />
                    Accept Offer
                  </button>
                  <button
                    onClick={() => { setOfferResponse('decline'); setShowOfferModal(true); }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                    Decline
                  </button>
                </div>
              </motion.div>
            )}

            {/* Interview Card - Show if status is interview */}
            {app.status === 'interview' && app.interview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <VideoCameraIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Upcoming Interview</h2>
                    <p className="text-sm text-green-200">{app.interview.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <CalendarIcon className="h-5 w-5 text-green-200 mb-1" />
                    <p className="font-semibold">{app.interview.date}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <ClockIcon className="h-5 w-5 text-green-200 mb-1" />
                    <p className="font-semibold">{app.interview.time}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <ClockIcon className="h-5 w-5 text-green-200 mb-1" />
                    <p className="font-semibold">{app.interview.duration}</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 mb-4">
                  <p className="text-sm text-green-200 mb-1">Interviewer</p>
                  <p className="font-semibold">{app.interview.interviewer}</p>
                  <p className="text-sm text-green-200">{app.interview.interviewerTitle}</p>
                </div>

                {app.interview.notes && (
                  <div className="bg-white/10 rounded-xl p-4 mb-6">
                    <p className="text-sm text-green-200 mb-1">Notes</p>
                    <p className="text-sm">{app.interview.notes}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <a
                    href={app.interview.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white text-green-700 font-medium rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Join Meeting
                  </a>
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-colors">
                      <CalendarDaysIcon className="h-4 w-4" />
                      Add to Calendar
                    </button>
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block">
                      <div className="bg-white rounded-xl shadow-lg p-2 min-w-[160px]">
                        <button onClick={() => addToCalendar('google')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Google Calendar</button>
                        <button onClick={() => addToCalendar('outlook')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Outlook</button>
                        <button onClick={() => addToCalendar('ical')} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">Download iCal</button>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-colors">
                    <CheckCircleIcon className="h-4 w-4" />
                    Confirm Attendance
                  </button>
                </div>
              </motion.div>
            )}

            {/* Application Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="font-semibold text-gray-900 mb-6">Application Timeline</h2>
              <div className="space-y-4">
                {app.statusHistory.map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${statusTimelineColors[event.status]}`} />
                      {i < app.statusHistory.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 capitalize">{event.status}</h3>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{event.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cover Letter */}
            {app.coverLetter && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h2 className="font-semibold text-gray-900 mb-4">Your Cover Letter</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{app.coverLetter}</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium">Message Recruiter</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium">View Job Posting</span>
                </a>
                {app.resume && (
                  <a
                    href={app.resume.url}
                    className="flex items-center gap-3 w-full p-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium">View Resume Sent</span>
                  </a>
                )}
                {app.status !== 'rejected' && app.status !== 'offer' && (
                  <button className="flex items-center gap-3 w-full p-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                    <XCircleIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">Withdraw Application</span>
                  </button>
                )}
              </div>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="font-semibold text-gray-900 mb-4">About the Company</h2>
              <div className="flex items-center gap-3 mb-4">
                <CompanyLogo icon={<BuildingOfficeIcon className="h-6 w-6 text-gray-400" />} />
                <div>
                  <h3 className="font-medium text-gray-900">{app.company}</h3>
                  <p className="text-sm text-gray-500">Technology</p>
                </div>
              </div>
              <a
                href={`/company/${app.company.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-[#0B2652] font-medium hover:underline"
              >
                View Company Profile →
              </a>
            </motion.div>
          </div>
        </div>
      </MainContent>

      <BottomNav activeNav="applications" unreadMessages={currentUser.unreadMessages} />

      {/* Offer Response Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {offerResponse === 'accept' ? 'Accept Offer' : 'Decline Offer'}
              </h3>
              <button
                onClick={() => setShowOfferModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              {offerResponse === 'accept'
                ? 'Congratulations! Are you sure you want to accept this offer?'
                : 'Are you sure you want to decline this offer? This action cannot be undone.'}
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to Employer (Optional)
              </label>
              <textarea
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows={3}
                placeholder={offerResponse === 'accept' ? 'Thank you for this opportunity...' : 'Thank you for the offer, but...'}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowOfferModal(false)}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleOfferResponse}
                disabled={isSubmitting}
                className={`flex-1 px-4 py-3 text-sm font-medium text-white rounded-xl transition-colors disabled:opacity-50 ${
                  offerResponse === 'accept'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : offerResponse === 'accept' ? 'Accept Offer' : 'Decline Offer'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </PageContainer>
  );
}
