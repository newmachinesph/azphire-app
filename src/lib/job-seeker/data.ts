import { User, Job, Application } from './types';

export const currentUser: User = {
  name: 'Maria Santos',
  initials: 'MS',
  title: 'Senior React Developer',
  unreadNotifications: 3,
  unreadMessages: 2,
};

export const allJobs: Job[] = [
  { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Global', location: 'Remote (US Hours)', salary: '$3,000 - $4,500/mo', type: 'Full-time', posted: '2h ago', matchScore: 95, skills: ['React', 'TypeScript', 'Next.js'], saved: false },
  { id: 2, title: 'React Native Developer', company: 'StartupXYZ', location: 'Remote (Flexible)', salary: '$2,500 - $3,500/mo', type: 'Full-time', posted: '5h ago', matchScore: 88, skills: ['React Native', 'JavaScript', 'Redux'], saved: true, savedAt: 'Today' },
  { id: 3, title: 'Full Stack Engineer', company: 'Digital Agency Co', location: 'Remote (AU Hours)', salary: '$2,800 - $4,000/mo', type: 'Contract', posted: '1d ago', matchScore: 82, skills: ['React', 'Node.js', 'PostgreSQL'], saved: false },
  { id: 4, title: 'UI/UX Developer', company: 'Design Studio Inc', location: 'Remote (EU Hours)', salary: '$2,200 - $3,200/mo', type: 'Full-time', posted: '2d ago', matchScore: 78, skills: ['React', 'Figma', 'CSS', 'Tailwind'], saved: false },
  { id: 5, title: 'Frontend Team Lead', company: 'Enterprise Corp', location: 'Remote (US Hours)', salary: '$4,500 - $6,000/mo', type: 'Full-time', posted: '3d ago', matchScore: 85, skills: ['React', 'TypeScript', 'Leadership'], saved: true, savedAt: 'Yesterday' },
  { id: 6, title: 'Senior Vue.js Developer', company: 'Tech Innovators', location: 'Remote (EU Hours)', salary: '$3,200 - $4,200/mo', type: 'Full-time', posted: '1w ago', matchScore: 72, skills: ['Vue.js', 'JavaScript', 'Node.js'], saved: true, savedAt: '3 days ago' },
];

export const applications: Application[] = [
  { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp Global', location: 'Remote (US Hours)', salary: '$3,000 - $4,500/mo', status: 'interview', appliedDate: 'Jan 20, 2024', lastUpdate: '2 hours ago', nextStep: 'Technical interview scheduled for Jan 28' },
  { id: 2, title: 'React Developer', company: 'Tech Solutions', location: 'Remote (Flexible)', salary: '$2,500 - $3,500/mo', status: 'reviewing', appliedDate: 'Jan 18, 2024', lastUpdate: '1 day ago', nextStep: 'Application under review' },
  { id: 3, title: 'UI Engineer', company: 'DesignHub', location: 'Remote (EU Hours)', salary: '$2,800 - $3,800/mo', status: 'applied', appliedDate: 'Jan 15, 2024', lastUpdate: '3 days ago', nextStep: 'Waiting for employer response' },
  { id: 4, title: 'Full Stack Developer', company: 'StartupXYZ', location: 'Remote (AU Hours)', salary: '$3,200 - $4,200/mo', status: 'offer', appliedDate: 'Jan 10, 2024', lastUpdate: '5 hours ago', nextStep: 'Offer received! Review and respond by Feb 1' },
  { id: 5, title: 'Frontend Developer', company: 'Agency Co', location: 'Remote (US Hours)', salary: '$2,200 - $3,000/mo', status: 'rejected', appliedDate: 'Jan 5, 2024', lastUpdate: '1 week ago', nextStep: 'Position filled' },
];

export const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Freelance'];
export const statusFilters = ['All', 'Applied', 'Reviewing', 'Interview', 'Offer', 'Rejected'];
