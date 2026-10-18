'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import {
  BottomNav,
  PageContainer,
  MainContent,
  GoldButton,
  FilterPills,
  getJobStatusStyles,
  cardStyles,
} from '@/components/employer';

// Mock data
const company = { name: 'TechCorp Global', initials: 'TC', unreadMessages: 3 };

const existingJob = {
  id: 1,
  title: 'Senior React Developer',
  type: 'Full-time',
  experience: 'Senior Level',
  location: 'Remote (US Hours)',
  salaryMin: '3000',
  salaryMax: '4500',
  status: 'active',
  description: `We are looking for a Senior React Developer to join our growing team. You will be responsible for developing and implementing highly responsive user interface components using React concepts and workflows.

You will also be responsible for profiling and improving front-end performance and documenting our front-end codebase.`,
  responsibilities: ['Develop new user-facing features using React.js', 'Build reusable components and front-end libraries', 'Translate designs into high-quality code', 'Optimize components for maximum performance', 'Collaborate with back-end developers', 'Participate in code reviews'],
  requirements: ['5+ years of experience with React.js', 'Strong proficiency in JavaScript/TypeScript', 'Experience with RESTful APIs and GraphQL', 'Knowledge of JWT and authorization', 'Excellent problem-solving skills'],
  benefits: ['Competitive salary', 'Flexible working hours', '100% remote work', 'Health insurance', 'Professional development budget', 'Paid time off'],
};

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Executive'];
const locationTypes = ['Remote (Any Timezone)', 'Remote (US Hours)', 'Remote (EU Hours)', 'Remote (Asia Hours)', 'Hybrid', 'On-site'];
const tabs = ['basic', 'description', 'requirements', 'benefits'];

export default function EditJobPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    title: existingJob.title,
    type: existingJob.type,
    experience: existingJob.experience,
    location: existingJob.location,
    salaryMin: existingJob.salaryMin,
    salaryMax: existingJob.salaryMax,
    description: existingJob.description,
    responsibilities: [...existingJob.responsibilities],
    requirements: [...existingJob.requirements],
    benefits: [...existingJob.benefits],
  });

  const updateFormData = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const addListItem = (field: 'responsibilities' | 'requirements' | 'benefits') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    setHasChanges(true);
  };

  const removeListItem = (field: 'responsibilities' | 'requirements' | 'benefits', index: number) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
    setHasChanges(true);
  };

  const updateListItem = (field: 'responsibilities' | 'requirements' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].map((item, i) => i === index ? value : item) }));
    setHasChanges(true);
  };

  const jobStatusStyles = getJobStatusStyles(existingJob.status);

  return (
    <PageContainer>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a href={`/employer/jobs/${existingJob.id}`} className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors">
                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
              </a>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-gray-900">Edit Job</h1>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${jobStatusStyles.badge}`}>{existingJob.status}</span>
                </div>
                <p className="text-xs text-gray-500">{existingJob.title}</p>
              </div>
            </div>
            {hasChanges && <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Unsaved changes</span>}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Tab Navigation */}
        <div className="mb-6">
          <FilterPills
            options={tabs.map(t => t === 'basic' ? 'Basic Info' : t === 'description' ? 'Description' : t === 'requirements' ? 'Requirements' : 'Benefits')}
            selected={activeTab === 'basic' ? 'Basic Info' : activeTab === 'description' ? 'Description' : activeTab === 'requirements' ? 'Requirements' : 'Benefits'}
            onSelect={(val) => setActiveTab(val === 'Basic Info' ? 'basic' : val === 'Description' ? 'description' : val === 'Requirements' ? 'requirements' : 'benefits')}
          />
        </div>

        {/* Form Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cardStyles.withPadding}>
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Basic Information</h2>
                <p className="text-sm text-gray-500">Update the essential details about the position</p>
              </div>
              <div className="space-y-4">
                <FormField label="Job Title" required>
                  <input type="text" value={formData.title} onChange={(e) => updateFormData('title', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all" />
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Employment Type">
                    <select value={formData.type} onChange={(e) => updateFormData('type', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all appearance-none bg-white">
                      {jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Experience Level">
                    <select value={formData.experience} onChange={(e) => updateFormData('experience', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all appearance-none bg-white">
                      {experienceLevels.map((level) => <option key={level} value={level}>{level}</option>)}
                    </select>
                  </FormField>
                </div>
                <FormField label="Work Location">
                  <select value={formData.location} onChange={(e) => updateFormData('location', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all appearance-none bg-white">
                    {locationTypes.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </FormField>
                <FormField label="Monthly Salary Range (USD)">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input type="number" value={formData.salaryMin} onChange={(e) => updateFormData('salaryMin', e.target.value)} className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all" />
                    </div>
                    <span className="text-gray-400">to</span>
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input type="number" value={formData.salaryMax} onChange={(e) => updateFormData('salaryMax', e.target.value)} className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all" />
                    </div>
                  </div>
                </FormField>
              </div>
            </div>
          )}

          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Job Description</h2>
                <p className="text-sm text-gray-500">Update the role description and responsibilities</p>
              </div>
              <FormField label="Description">
                <textarea rows={6} value={formData.description} onChange={(e) => updateFormData('description', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all resize-none" />
              </FormField>
              <ListField label="Key Responsibilities" items={formData.responsibilities} onAdd={() => addListItem('responsibilities')} onRemove={(i) => removeListItem('responsibilities', i)} onUpdate={(i, v) => updateListItem('responsibilities', i, v)} addLabel="Add Responsibility" />
            </div>
          )}

          {/* Requirements Tab */}
          {activeTab === 'requirements' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Requirements</h2>
                <p className="text-sm text-gray-500">Update qualifications and skills needed</p>
              </div>
              <ListField label="Required Qualifications" items={formData.requirements} onAdd={() => addListItem('requirements')} onRemove={(i) => removeListItem('requirements', i)} onUpdate={(i, v) => updateListItem('requirements', i, v)} addLabel="Add Requirement" />
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Benefits & Perks</h2>
                <p className="text-sm text-gray-500">Update what you offer to attract top talent</p>
              </div>
              <ListField label="Benefits" items={formData.benefits} onAdd={() => addListItem('benefits')} onRemove={(i) => removeListItem('benefits', i)} onUpdate={(i, v) => updateListItem('benefits', i, v)} addLabel="Add Benefit" />
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`mt-6 ${cardStyles.withPadding}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <EyeIcon className="h-4 w-4" />Preview
              </button>
              <a href={`/employer/jobs/${existingJob.id}`} className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                Cancel
              </a>
            </div>
            <button className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${hasChanges ? 'bg-gradient-to-r from-[#ED9F08] to-[#f5b52e] text-white shadow-lg shadow-[#ED9F08]/25 hover:shadow-xl hover:scale-105' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`} disabled={!hasChanges}>
              Save Changes
            </button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 bg-white rounded-2xl shadow-sm border border-red-200 p-6">
          <div className="flex items-start gap-3 mb-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-600">Danger Zone</h3>
              <p className="text-sm text-gray-500">Irreversible actions for this job posting</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 text-sm font-medium text-orange-600 border border-orange-200 rounded-full hover:bg-orange-50 transition-colors">Close Job Posting</button>
            <button className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-colors">Delete Job</button>
          </div>
        </motion.div>
      </main>

      <BottomNav activeNav="jobs" unreadMessages={company.unreadMessages} />
    </PageContainer>
  );
}

// Helper Components
function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function ListField({ label, items, onAdd, onRemove, onUpdate, addLabel }: {
  label: string;
  items: string[];
  onAdd: () => void;
  onRemove: (i: number) => void;
  onUpdate: (i: number, v: string) => void;
  addLabel: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="text" value={item} onChange={(e) => onUpdate(index, e.target.value)} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all" />
            {items.length > 1 && (
              <button onClick={() => onRemove(index)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button onClick={onAdd} className="flex items-center gap-2 text-sm text-[#0B2652] font-medium hover:underline">
          <PlusIcon className="h-4 w-4" />{addLabel}
        </button>
      </div>
    </div>
  );
}
