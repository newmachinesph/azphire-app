'use client';

import { motion } from 'framer-motion';
import {
  PlusIcon,
  KeyIcon,
  ClipboardDocumentIcon,
  EyeSlashIcon,
  TrashIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import {
  EmployerHeader,
  BottomNav,
  PageContainer,
  MainContent,
  PageHeader,
  Card,
  GoldButton,
  SectionHeader,
  cardStyles,
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

const apiKeys = [
  { id: '1', name: 'Production MCP', key: 'sk_live_rtp_a1b2••••••••••••••••••••••••', created: 'Jan 20, 2025', lastUsed: 'Jan 25, 2025', requests: '1,247' },
  { id: '2', name: 'Development', key: 'sk_test_rtp_x9y8••••••••••••••••••••••••', created: 'Jan 15, 2025', lastUsed: 'Jan 24, 2025', requests: '89' },
];

const quickStats = [
  { label: 'Active Keys', value: '2', icon: KeyIcon },
  { label: 'Total Requests', value: '1,336', icon: ChartBarIcon },
  { label: 'Rate Limit', value: '1000/min', icon: ShieldCheckIcon },
];

const availableTools = [
  { name: 'search_candidates', desc: 'Search candidate database' },
  { name: 'get_applications', desc: 'List job applications' },
  { name: 'update_application', desc: 'Update application status' },
  { name: 'send_message', desc: 'Message candidates' },
  { name: 'get_analytics', desc: 'View hiring analytics' },
  { name: 'schedule_interview', desc: 'Schedule interviews' },
];

export default function EmployerApiKeysPage() {
  return (
    <PageContainer>
      <EmployerHeader
        company={company}
        pageTitle="API Keys"
        
      />

      <MainContent>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <div className="lg:col-span-12">
            <PageHeader
              title="API Keys"
              subtitle="Manage your MCP integration credentials"
            />
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-12 grid grid-cols-3 gap-4"
          >
            {quickStats.map((stat, i) => (
              <div key={i} className={`${cardStyles.withPadding}`}>
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* API Keys List */}
          <Card delay={0.2} padding={false} className="lg:col-span-12">
            <div className="px-6 pt-6">
              <SectionHeader
                title="Your API Keys"
                action={
                  <GoldButton>
                    <PlusIcon className="h-4 w-4" />
                    Create New Key
                  </GoldButton>
                }
              />
            </div>

            <div className="divide-y divide-gray-100">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className={`p-4 border-l-4 ${apiKey.name.includes('Production') ? 'border-l-green-500' : 'border-l-amber-400'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{apiKey.name}</h3>
                      <p className="text-xs text-gray-500">
                        Created {apiKey.created} • Last used {apiKey.lastUsed}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{apiKey.requests} requests</span>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                    <code className="flex-1 text-sm font-mono text-gray-700">
                      {apiKey.key}
                    </code>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                      <EyeSlashIcon className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* MCP Setup Guide */}
          <Card delay={0.3} className="lg:col-span-8">
            <SectionHeader title="MCP Setup Guide" />

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">1. Set Environment Variable</h4>
                <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                  <code className="text-sm text-green-400 font-mono">
                    export REMOTETALENT_API_KEY=sk_live_rtp_your_key_here
                  </code>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">2. Configure MCP Server</h4>
                <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                  <pre className="text-sm text-green-400 font-mono whitespace-pre">
{`{
  "mcpServers": {
    "remotetalent": {
      "command": "remotetalent-mcp",
      "env": {
        "REMOTETALENT_API_KEY": "\${REMOTETALENT_API_KEY}"
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B2652]/5 hover:bg-[#0B2652]/10 rounded-full text-[#0B2652] text-sm font-medium transition-colors"
              >
                <BookOpenIcon className="w-4 h-4" />
                View Full Documentation
              </a>
            </div>
          </Card>

          {/* Available Tools */}
          <Card delay={0.4} className="lg:col-span-4">
            <SectionHeader title="Available Tools" />

            <div className="space-y-2">
              {availableTools.map((tool) => (
                <div key={tool.name} className="bg-gray-50 rounded-lg p-2">
                  <code className="text-[#0B2652] font-medium text-sm">{tool.name}</code>
                  <p className="text-gray-500 text-xs mt-0.5">{tool.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-12 bg-amber-50 border border-amber-200 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <ShieldCheckIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900">Keep your API keys secure</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Never share your API keys in public repositories, client-side code, or chat applications.
                  Store them securely as environment variables.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </MainContent>

      <BottomNav activeNav="api" unreadMessages={company.unreadMessages} />
    </PageContainer>
  );
}
