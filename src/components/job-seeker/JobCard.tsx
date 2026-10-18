'use client';

import { motion } from 'framer-motion';
import {
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  BookmarkIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { Job } from '@/lib/job-seeker';
import { CompanyLogo, SkillTag } from './ui';

interface JobMetaProps {
  location: string;
  salary: string;
  posted: string;
  type: string;
}

export function JobMeta({ location, salary, posted, type }: JobMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
      <span className="flex items-center gap-1">
        <MapPinIcon className="h-3.5 w-3.5" />{location}
      </span>
      <span className="flex items-center gap-1">
        <CurrencyDollarIcon className="h-3.5 w-3.5" />{salary}
      </span>
      <span className="flex items-center gap-1">
        <ClockIcon className="h-3.5 w-3.5" />{posted}
      </span>
      <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600">{type}</span>
    </div>
  );
}

interface MatchScoreProps {
  score: number;
}

export function MatchScore({ score }: MatchScoreProps) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-lg">
      <SparklesIcon className="h-3.5 w-3.5 text-green-600" />
      <span className="text-xs font-semibold text-green-700">{score}%</span>
    </div>
  );
}

interface SaveButtonProps {
  saved: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function SaveButton({ saved, onClick }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      {saved ? (
        <BookmarkIconSolid className="h-5 w-5 text-[#ED9F08]" />
      ) : (
        <BookmarkIcon className="h-5 w-5 text-gray-400" />
      )}
    </button>
  );
}

interface JobCardProps {
  job: Job;
  index: number;
  isSaved: boolean;
  onToggleSave: (jobId: number) => void;
  showSavedAt?: boolean;
}

export function JobCard({ job, index, isSaved, onToggleSave, showSavedAt }: JobCardProps) {
  return (
    <motion.a
      href={`/job-seeker/jobs/${job.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="block bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-[#0B2652]/20 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-4">
        <CompanyLogo size="lg" icon={<BuildingOfficeIcon className="h-6 w-6 text-gray-400" />} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 hover:text-[#0B2652] transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
            <div className="flex items-center gap-2">
              <MatchScore score={job.matchScore} />
              <SaveButton
                saved={isSaved}
                onClick={(e) => { e.preventDefault(); onToggleSave(job.id); }}
              />
            </div>
          </div>

          <JobMeta location={job.location} salary={job.salary} posted={job.posted} type={job.type} />

          <div className="flex flex-wrap gap-1.5 mt-3">
            {job.skills.map(skill => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>

          {showSavedAt && job.savedAt && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Saved {job.savedAt}</span>
              <span className="text-sm font-medium text-[#0B2652]">View Details →</span>
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
}
