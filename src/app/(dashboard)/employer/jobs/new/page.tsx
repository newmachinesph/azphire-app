'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import {
  BottomNav,
  PageContainer,
  MainContent,
  GoldButton,
  cardStyles,
} from '@/components/employer';

// Mock data
const company = { name: 'TechCorp Global', initials: 'TC', industry: 'Technology', unreadMessages: 3 };

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Executive'];
const locationTypes = ['Remote (Any Timezone)', 'Remote (US Hours)', 'Remote (EU Hours)', 'Remote (Asia Hours)', 'Hybrid', 'On-site'];

const steps = [
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Description' },
  { id: 3, label: 'Requirements' },
  { id: 4, label: 'Benefits' },
];

export default function NewJobPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-time',
    experience: 'Mid Level',
    location: 'Remote (Any Timezone)',
    salaryMin: '',
    salaryMax: '',
    description: '',
    responsibilities: [''],
    requirements: [''],
    benefits: [''],
  });

  const addListItem = (field: 'responsibilities' | 'requirements' | 'benefits') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeListItem = (field: 'responsibilities' | 'requirements' | 'benefits', index: number) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const updateListItem = (field: 'responsibilities' | 'requirements' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].map((item, i) => i === index ? value : item) }));
  };

  return (
    <PageContainer>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <a href="/employer/jobs" className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors">
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </a>
            <div>
              <h1 className="font-semibold text-gray-900">Post New Job</h1>
              <p className="text-xs text-gray-500">Create a new job posting</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-2 ${activeStep === step.id ? 'text-[#0B2652]' : activeStep > step.id ? 'text-green-600' : 'text-gray-400'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    activeStep === step.id ? 'bg-[#0B2652] text-white' : activeStep > step.id ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {activeStep > step.id ? '✓' : step.id}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-1 rounded-full ${activeStep > step.id ? 'bg-green-500' : 'bg-gray-200'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <motion.div key={activeStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className={cardStyles.withPadding}>
          {/* Step 1: Basic Info */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Basic Information</h2>
                <p className="text-sm text-gray-500">Start with the essential details about the position</p>
              </div>
              <div className="space-y-4">
                <FormField label="Job Title" required>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Senior React Developer"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all"
                  />
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Employment Type" required>
                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all appearance-none bg-white">
                      {jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Experience Level" required>
                    <select value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all appearance-none bg-white">
                      {experienceLevels.map((level) => <option key={level} value={level}>{level}</option>)}
                    </select>
                  </FormField>
                </div>
                <FormField label="Work Location" required>
                  <select value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all appearance-none bg-white">
                    {locationTypes.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </FormField>
                <FormField label="Monthly Salary Range (USD)" required>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input type="number" value={formData.salaryMin} onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })} placeholder="Min" className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all" />
                    </div>
                    <span className="text-gray-400">to</span>
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input type="number" value={formData.salaryMax} onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })} placeholder="Max" className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all" />
                    </div>
                  </div>
                </FormField>
              </div>
            </div>
          )}

          {/* Step 2: Description */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Job Description</h2>
                <p className="text-sm text-gray-500">Describe the role and responsibilities</p>
              </div>
              <FormField label="Description" required>
                <textarea rows={6} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the role, team, and what makes this opportunity exciting..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all resize-none" />
              </FormField>
              <ListField label="Key Responsibilities" items={formData.responsibilities} placeholder="e.g., Develop and maintain React applications" onAdd={() => addListItem('responsibilities')} onRemove={(i) => removeListItem('responsibilities', i)} onUpdate={(i, v) => updateListItem('responsibilities', i, v)} addLabel="Add Responsibility" />
            </div>
          )}

          {/* Step 3: Requirements */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Requirements</h2>
                <p className="text-sm text-gray-500">List the qualifications and skills needed</p>
              </div>
              <ListField label="Required Qualifications" items={formData.requirements} placeholder="e.g., 5+ years of experience with React.js" onAdd={() => addListItem('requirements')} onRemove={(i) => removeListItem('requirements', i)} onUpdate={(i, v) => updateListItem('requirements', i, v)} addLabel="Add Requirement" />
            </div>
          )}

          {/* Step 4: Benefits */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Benefits & Perks</h2>
                <p className="text-sm text-gray-500">Highlight what you offer to attract top talent</p>
              </div>
              <ListField label="Benefits" items={formData.benefits} placeholder="e.g., Competitive salary, Health insurance" onAdd={() => addListItem('benefits')} onRemove={(i) => removeListItem('benefits', i)} onUpdate={(i, v) => updateListItem('benefits', i, v)} addLabel="Add Benefit" />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${activeStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
              disabled={activeStep === 1}
            >
              Previous
            </button>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <DocumentDuplicateIcon className="h-4 w-4" />Save as Draft
              </button>
              {activeStep < 4 ? (
                <button onClick={() => setActiveStep(activeStep + 1)} className="px-6 py-2.5 bg-[#0B2652] text-white text-sm font-semibold rounded-full hover:bg-[#0a2040] transition-colors">
                  Continue
                </button>
              ) : (
                <GoldButton>Publish Job</GoldButton>
              )}
            </div>
          </div>
        </motion.div>

        {/* Preview Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`mt-6 ${cardStyles.withPadding}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Preview</h3>
            <button className="flex items-center gap-2 text-sm text-[#0B2652] font-medium hover:underline">
              <EyeIcon className="h-4 w-4" />Full Preview
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-1">{formData.title || 'Job Title'}</h4>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>{formData.type}</span><span>•</span><span>{formData.location}</span>
              {formData.salaryMin && formData.salaryMax && (<><span>•</span><span>${formData.salaryMin} - ${formData.salaryMax}/mo</span></>)}
            </div>
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

function ListField({ label, items, placeholder, onAdd, onRemove, onUpdate, addLabel }: {
  label: string;
  items: string[];
  placeholder: string;
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
            <input
              type="text"
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent transition-all"
            />
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
