// User
export interface User {
  name: string;
  initials: string;
  title: string;
  unreadNotifications: number;
  unreadMessages: number;
}

// Job
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  matchScore: number;
  skills: string[];
  saved?: boolean;
  savedAt?: string;
}

// Application
export type ApplicationStatus = 'applied' | 'reviewing' | 'interview' | 'offer' | 'rejected';

export interface Application {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdate: string;
  nextStep: string;
}
