'use client';

import { useState } from 'react';
import {
  JobSeekerHeader,
  BottomNav,
  PageContainer,
  MainContent,
} from '@/components/job-seeker';
import {
  MessagingContainer,
  ConversationList,
  ChatArea,
  Conversation,
  Message,
} from '@/components/messaging';

const user = {
  name: 'Maria Santos',
  initials: 'MS',
  title: 'Senior React Developer',
  unreadNotifications: 3,
  unreadMessages: 2,
};

const allConversations: Conversation[] = [
  { id: 1, name: 'TechCorp Global', subtitle: 'Sarah Johnson • Senior Frontend Developer', avatar: 'TC', lastMessage: 'Hi Maria! We were impressed by your profile and would love to schedule an interview.', time: '2h ago', unread: true, online: true },
  { id: 2, name: 'StartupXYZ', subtitle: 'Mike Chen • React Native Developer', avatar: 'SX', lastMessage: 'Thank you for your application! Can you share your availability for next week?', time: '5h ago', unread: true, online: true },
  { id: 3, name: 'Digital Agency Co', subtitle: 'Emma Wilson • Full Stack Engineer', avatar: 'DA', lastMessage: 'Looking forward to speaking with you!', time: '1d ago', unread: false, online: false },
  { id: 4, name: 'Design Studio Inc', subtitle: 'Alex Rodriguez • UI/UX Developer', avatar: 'DS', lastMessage: 'Thanks for getting back to me. The team is excited about your background.', time: '3d ago', unread: false, online: false },
  { id: 5, name: 'Enterprise Corp', subtitle: 'David Kim • Frontend Team Lead', avatar: 'EC', lastMessage: 'We would like to extend an offer. Please review the attached document.', time: '5d ago', unread: false, online: true },
  { id: 6, name: 'CloudTech Solutions', subtitle: 'Jennifer Lee • Senior React Developer', avatar: 'CT', lastMessage: 'Great chatting with you! We will get back to you within 48 hours.', time: '1w ago', unread: false, online: false },
];

const messagesData: Message[] = [
  { id: 1, sender: 'them', content: 'Hi Maria! We were impressed by your profile and would love to schedule an interview.', time: '2:30 PM' },
  { id: 2, sender: 'me', content: 'Thank you so much! I am very interested in the Senior Frontend Developer position.', time: '2:35 PM' },
  { id: 3, sender: 'them', content: 'Great! Would you be available for a video call this Thursday at 3 PM?', time: '2:40 PM' },
  { id: 4, sender: 'me', content: 'Yes, that works perfectly for me. I will be ready!', time: '2:45 PM' },
  { id: 5, sender: 'them', content: 'Perfect! I will send you the meeting link shortly. Looking forward to it!', time: '2:47 PM' },
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const filteredConversations = allConversations
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 6);

  const activeConversation = allConversations.find(c => c.id === selectedId) || null;
  const unreadCount = allConversations.filter(c => c.unread).length;

  return (
    <PageContainer>
      <JobSeekerHeader user={user} />

      <MainContent>
        <MessagingContainer>
          <ConversationList
            conversations={filteredConversations}
            selectedId={selectedId}
            onSelect={setSelectedId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            unreadCount={unreadCount}
          />
          <ChatArea
            conversation={activeConversation}
            messages={messagesData}
            messageValue={message}
            onMessageChange={setMessage}
            onBack={() => setSelectedId(null)}
            isVisible={selectedId !== null}
          />
        </MessagingContainer>
      </MainContent>

      <BottomNav activeNav="messages" unreadMessages={user.unreadMessages} />
    </PageContainer>
  );
}
