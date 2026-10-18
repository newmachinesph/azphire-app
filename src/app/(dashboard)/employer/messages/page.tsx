'use client';

import { useState } from 'react';
import {
  EmployerHeader,
  BottomNav,
  PageContainer,
  MainContent,
} from '@/components/employer';
import {
  MessagingContainer,
  ConversationList,
  ChatArea,
  Conversation,
  Message,
} from '@/components/messaging';

const company = {
  name: 'TechCorp Global',
  initials: 'TC',
  industry: 'Technology',
  unreadNotifications: 5,
  unreadMessages: 3,
  verified: true,
};

const allConversations: Conversation[] = [
  { id: 1, name: 'Maria Santos', subtitle: 'Senior React Developer', avatar: 'MS', lastMessage: 'Thank you for the opportunity! I am very excited about the role.', time: '2 min ago', unread: 2, online: true },
  { id: 2, name: 'Carlo Mendoza', subtitle: 'Executive Assistant', avatar: 'CM', lastMessage: 'Yes, I can start next Monday. Looking forward to it!', time: '1 hour ago', unread: 1, online: true },
  { id: 3, name: 'Anna Reyes', subtitle: 'Frontend Developer', avatar: 'AR', lastMessage: 'I have attached my portfolio as requested.', time: '3 hours ago', unread: 0, online: false },
  { id: 4, name: 'Juan Dela Cruz', subtitle: 'Full Stack Engineer', avatar: 'JD', lastMessage: 'Could you provide more details about the tech stack?', time: 'Yesterday', unread: 0, online: false },
  { id: 5, name: 'Sofia Garcia', subtitle: 'Customer Success Manager', avatar: 'SG', lastMessage: 'The interview time works for me. See you then!', time: 'Yesterday', unread: 0, online: true },
  { id: 6, name: 'Miguel Torres', subtitle: 'Backend Developer', avatar: 'MT', lastMessage: 'I have experience with Node.js and PostgreSQL.', time: '2 days ago', unread: 0, online: false },
];

const messagesData: Message[] = [
  { id: 1, sender: 'them', content: 'Hi! Thank you for reaching out about the Senior React Developer position.', time: '10:30 AM' },
  { id: 2, sender: 'me', content: 'Hi Maria! We were impressed by your application. Would you be available for a technical interview this week?', time: '10:35 AM' },
  { id: 3, sender: 'them', content: 'Yes, absolutely! I am available on Wednesday or Thursday afternoon.', time: '10:40 AM' },
  { id: 4, sender: 'me', content: "Perfect! Let's schedule it for Thursday at 2 PM (PHT). I'll send you a calendar invite with the meeting link.", time: '10:45 AM' },
  { id: 5, sender: 'them', content: 'Thank you for the opportunity! I am very excited about the role.', time: '10:47 AM' },
];

export default function EmployerMessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [message, setMessage] = useState('');

  const filteredConversations = allConversations
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 6);

  const activeConversation = allConversations.find(c => c.id === selectedId) || null;
  const unreadCount = allConversations.reduce((sum, c) => sum + (typeof c.unread === 'number' ? c.unread : 0), 0);

  return (
    <PageContainer>
      <EmployerHeader company={company} pageTitle="Messages"  />

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

      <BottomNav activeNav="messages" unreadMessages={company.unreadMessages} />
    </PageContainer>
  );
}
