'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  DocumentDuplicateIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  BottomNav,
  PageContainer,
  MainContent,
  GoldButton,
  cardStyles,
} from '@/components/employer';

// Mock data
const templates = [
  {
    id: '1',
    name: 'Senior Frontend Developer',
    title: 'Senior Frontend Developer',
    type: 'Full-time',
    experience: 'Senior',
    location: 'Remote (Philippines)',
    salaryMin: 4000,
    salaryMax: 6000,
    category: 'Engineering',
    usageCount: 5,
    createdAt: 'Jan 10, 2025',
    lastUsed: 'Jan 20, 2025',
  },
  {
    id: '2',
    name: 'Backend Engineer Template',
    title: 'Backend Engineer',
    type: 'Full-time',
    experience: 'Mid',
    location: 'Remote',
    salaryMin: 3500,
    salaryMax: 5500,
    category: 'Engineering',
    usageCount: 3,
    createdAt: 'Jan 5, 2025',
    lastUsed: 'Jan 18, 2025',
  },
  {
    id: '3',
    name: 'UI/UX Designer',
    title: 'UI/UX Designer',
    type: 'Full-time',
    experience: 'Mid',
    location: 'Remote (Worldwide)',
    salaryMin: 3000,
    salaryMax: 5000,
    category: 'Design',
    usageCount: 2,
    createdAt: 'Dec 15, 2024',
    lastUsed: 'Jan 12, 2025',
  },
  {
    id: '4',
    name: 'DevOps Engineer',
    title: 'DevOps Engineer',
    type: 'Contract',
    experience: 'Senior',
    location: 'Remote',
    salaryMin: 5000,
    salaryMax: 8000,
    category: 'Engineering',
    usageCount: 1,
    createdAt: 'Dec 1, 2024',
    lastUsed: 'Dec 20, 2024',
  },
];

const categories = ['All', 'Engineering', 'Design', 'Marketing', 'Sales', 'Operations'];

export default function JobTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);

  const filteredTemplates = templates.filter(t =>
    selectedCategory === 'All' || t.category === selectedCategory
  );

  const handleCreateJob = (templateId: string) => {
    // In real app, would navigate to job creation with template data
    window.location.href = `/employer/jobs/new?template=${templateId}`;
  };

  const handleEditTemplate = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setShowCreateModal(true);
    setOpenMenuId(null);
  };

  const handleDeleteTemplate = (templateId: string) => {
    // In real app, would call API to delete
    console.log('Delete template:', templateId);
    setOpenMenuId(null);
  };

  return (
    <PageContainer>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/employer" className="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors">
                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
              </a>
              <div>
                <h1 className="font-semibold text-gray-900">Job Templates</h1>
                <p className="text-xs text-gray-500">{templates.length} templates</p>
              </div>
            </div>
            <button
              onClick={() => { setSelectedTemplate(null); setShowCreateModal(true); }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B2652] text-white text-sm font-medium rounded-full hover:bg-[#0B2652]/90 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
              Create Template
            </button>
          </div>
        </div>
      </header>

      <MainContent>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[#0B2652] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`${cardStyles.withPadding} relative`}
            >
              {/* Menu Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setOpenMenuId(openMenuId === template.id ? null : template.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                </button>

                {openMenuId === template.id && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[140px] z-10">
                    <button
                      onClick={() => handleEditTemplate(template)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <PencilIcon className="h-4 w-4" />
                      Edit Template
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Template Content */}
              <div className="pr-8">
                <span className="inline-block px-2 py-1 bg-[#0B2652]/10 text-[#0B2652] text-xs font-medium rounded-full mb-3">
                  {template.category}
                </span>
                <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{template.title}</p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                    <span>{template.type} • {template.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-gray-400" />
                    <span>{template.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                    <span>${template.salaryMin.toLocaleString()} - ${template.salaryMax.toLocaleString()}/mo</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    <div>Used {template.usageCount} times</div>
                    <div>Last used: {template.lastUsed}</div>
                  </div>
                  <button
                    onClick={() => handleCreateJob(template.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded-full hover:bg-amber-600 transition-colors"
                  >
                    <DocumentDuplicateIcon className="h-4 w-4" />
                    Use
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <DocumentDuplicateIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-500 mb-4">
              {selectedCategory === 'All'
                ? 'Create your first job template to save time'
                : `No templates in ${selectedCategory} category`}
            </p>
            <button
              onClick={() => { setSelectedTemplate(null); setShowCreateModal(true); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B2652] text-white font-medium rounded-full hover:bg-[#0B2652]/90 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              Create Template
            </button>
          </div>
        )}

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white"
        >
          <h3 className="font-semibold mb-3">Save Time with Templates</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li className="flex items-start gap-2">
              <span>•</span>
              Create templates for frequently posted positions
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              Include standard requirements, benefits, and job descriptions
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              Quickly create consistent job postings with one click
            </li>
          </ul>
        </motion.div>
      </MainContent>

      <BottomNav activeNav="jobs" unreadMessages={3} />

      {/* Create/Edit Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 my-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedTemplate ? 'Edit Template' : 'Create Template'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                <input
                  type="text"
                  defaultValue={selectedTemplate?.name || ''}
                  placeholder="e.g., Senior Frontend Developer Template"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    defaultValue={selectedTemplate?.title || ''}
                    placeholder="e.g., Senior Frontend Developer"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    defaultValue={selectedTemplate?.category || 'Engineering'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent bg-white"
                  >
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Operations</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    defaultValue={selectedTemplate?.type || 'Full-time'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent bg-white"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select
                    defaultValue={selectedTemplate?.experience || 'Mid'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent bg-white"
                  >
                    <option>Entry</option>
                    <option>Mid</option>
                    <option>Senior</option>
                    <option>Lead</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  defaultValue={selectedTemplate?.location || ''}
                  placeholder="e.g., Remote (Philippines)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary (USD/month)</label>
                  <input
                    type="number"
                    defaultValue={selectedTemplate?.salaryMin || ''}
                    placeholder="3000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary (USD/month)</label>
                  <input
                    type="number"
                    defaultValue={selectedTemplate?.salaryMax || ''}
                    placeholder="5000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                <textarea
                  rows={4}
                  placeholder="Enter the standard job description..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <GoldButton className="flex-1">
                {selectedTemplate ? 'Save Changes' : 'Create Template'}
              </GoldButton>
            </div>
          </motion.div>
        </div>
      )}
    </PageContainer>
  );
}
