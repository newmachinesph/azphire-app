'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  PhotoIcon,
  CheckIcon,
  ArrowLeftIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

// Types
export interface Conversation {
  id: number;
  name: string;
  subtitle: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean | number;
  online: boolean;
}

export interface Message {
  id: number;
  sender: 'me' | 'them';
  content: string;
  time: string;
}

// Avatar Component
interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
}

export function Avatar({ initials, size = 'md', online }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-sm',
  };

  return (
    <div className="relative flex-shrink-0">
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#0B2652] to-[#1a3a6e] flex items-center justify-center text-white font-semibold`}>
        {initials}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
}

// Messaging Container
interface MessagingContainerProps {
  children: ReactNode;
  height?: string;
}

export function MessagingContainer({ children, height = 'calc(100vh - 180px)' }: MessagingContainerProps) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex"
      style={{ height, minHeight: '500px' }}
    >
      {children}
    </div>
  );
}

// Conversation List
interface ConversationListProps {
  conversations: Conversation[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  unreadCount: number;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
  unreadCount,
}: ConversationListProps) {
  return (
    <div className={`${selectedId ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-gray-100`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <ChatBubbleLeftRightIcon className="h-5 w-5 text-[#0B2652]" />
          <h2 className="font-semibold text-gray-900">Conversations</h2>
          {unreadCount > 0 && (
            <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2652]"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv, i) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            isSelected={selectedId === conv.id}
            onSelect={() => onSelect(conv.id)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

// Conversation Item
interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

function ConversationItem({ conversation, isSelected, onSelect, index }: ConversationItemProps) {
  const hasUnread = typeof conversation.unread === 'number' ? conversation.unread > 0 : conversation.unread;
  const unreadCount = typeof conversation.unread === 'number' ? conversation.unread : 0;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onSelect}
      className={`w-full p-4 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-[#0B2652]/5' : ''
      } ${hasUnread ? 'bg-blue-50/50' : ''}`}
    >
      <div className="flex gap-3">
        <Avatar initials={conversation.avatar} size="lg" online={conversation.online} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className={`font-semibold text-gray-900 truncate ${hasUnread ? 'text-[#0B2652]' : ''}`}>
              {conversation.name}
            </h4>
            <span className="text-xs text-gray-400 flex-shrink-0">{conversation.time}</span>
          </div>
          <p className="text-xs text-gray-500 truncate">{conversation.subtitle}</p>
          <p className={`text-sm truncate mt-1 ${hasUnread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            {conversation.lastMessage}
          </p>
        </div>
        {hasUnread && (
          unreadCount > 0 ? (
            <span className="flex-shrink-0 w-5 h-5 bg-[#0B2652] text-white text-xs font-bold rounded-full flex items-center justify-center mt-1">
              {unreadCount}
            </span>
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-[#0B2652] flex-shrink-0 mt-2" />
          )
        )}
      </div>
    </motion.button>
  );
}

// Chat Area
interface ChatAreaProps {
  conversation: Conversation | null;
  messages: Message[];
  messageValue: string;
  onMessageChange: (value: string) => void;
  onBack: () => void;
  isVisible: boolean;
}

export function ChatArea({
  conversation,
  messages,
  messageValue,
  onMessageChange,
  onBack,
  isVisible,
}: ChatAreaProps) {
  return (
    <div className={`${isVisible ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
      {conversation ? (
        <>
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
              </button>
              <Avatar initials={conversation.avatar} size="md" online={conversation.online} />
              <div>
                <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
                <p className="text-xs text-gray-500">
                  {conversation.subtitle} • {conversation.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  avatar={conversation.avatar}
                />
              ))}
            </div>
          </div>

          {/* Input */}
          <MessageInput value={messageValue} onChange={onMessageChange} />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

// Message Bubble
interface MessageBubbleProps {
  message: Message;
  avatar: string;
}

function MessageBubble({ message, avatar }: MessageBubbleProps) {
  const isMe = message.sender === 'me';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B2652] to-[#1a3a6e] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0 mr-2">
          {avatar}
        </div>
      )}
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
          isMe
            ? 'bg-gradient-to-r from-[#0B2652] to-[#1a3a6e] text-white rounded-br-sm'
            : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : ''}`}>
          <span className={`text-xs ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
            {message.time}
          </span>
          {isMe && <CheckIcon className="h-3 w-3 text-blue-200" />}
        </div>
      </div>
    </div>
  );
}

// Message Input
interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
}

function MessageInput({ value, onChange }: MessageInputProps) {
  return (
    <div className="p-4 border-t border-gray-100 bg-white">
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <PaperClipIcon className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <PhotoIcon className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2652] focus:bg-white transition-all"
        />
        <button className="p-2.5 bg-gradient-to-r from-[#0B2652] to-[#1a3a6e] text-white rounded-full hover:shadow-lg transition-all">
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

// Empty State
function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center text-center p-8 bg-gray-50">
      <div>
        <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-200 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
        <p className="text-gray-500">Choose a conversation from the list to view messages</p>
      </div>
    </div>
  );
}
