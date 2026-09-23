import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ChatMessage, ModuleTab } from '../types';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Plus,
  ArrowRight,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

interface AiMentorViewProps {
  profile: UserProfile;
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  onAddTask: (title: string, category: string) => void;
  setActiveTab: (tab: ModuleTab) => void;
  onResetChat?: () => void;
}

export const AiMentorView: React.FC<AiMentorViewProps> = ({
  profile,
  messages,
  onSendMessage,
  onAddTask,
  setActiveTab,
  onResetChat,
}) => {
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'आज मुझे क्या पढ़ना चाहिए?',
    'How do I explain my DevPulse project in an interview?',
    'What is the fastest way to master Node.js authentication?',
    'My DSA is intermediate, how should I balance it with backend dev?',
    'Review my current skill gaps and suggest this week’s priority',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSubmit = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isSending) return;

    setInputText('');
    setIsSending(true);
    try {
      await onSendMessage(textToSend);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 flex flex-col h-[calc(100vh-130px)]">
      {/* Mentor Header Card */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <span>LifeOS AI Mentor</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </h1>
            <div className="text-xs text-slate-400 mt-0.5">
              Personal growth advisor calibrated for {profile.name} ({profile.targetRole})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] text-slate-400">Context State</div>
            <div className="font-mono text-xs text-indigo-300 font-medium">
              Readiness {profile.marketReadiness}% · Week 3 Active
            </div>
          </div>
          {onResetChat && (
            <button
              onClick={onResetChat}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors border border-slate-800 text-xs flex items-center gap-1 cursor-pointer"
              title="Reset Chat Session"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Restart Session</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-0">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-xl p-4 text-xs leading-relaxed space-y-2.5 ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.actionPrompt && (
                  <div className="pt-2 flex items-center gap-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        onAddTask(msg.actionPrompt!, 'Sprint');
                        setActiveTab('dashboard');
                      }}
                      className="px-2.5 py-1 text-[11px] font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add &quot;{msg.actionPrompt}&quot; to Today&apos;s Plan</span>
                    </button>
                  </div>
                )}

                <div
                  className={`text-[10px] font-mono ${
                    isUser ? 'text-indigo-200' : 'text-slate-500'
                  } text-right`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isSending && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-1">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-400 rounded-bl-none flex items-center gap-2">
              <span className="animate-pulse">LifeOS Mentor is formulating personalized advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-500 shrink-0 text-[11px] font-medium">Try:</span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(undefined, prompt)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-full border border-slate-800 text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="shrink-0 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask AI Mentor anything (Hindi, Hinglish or English)..."
          className="flex-1 px-4 py-3 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || !inputText.trim()}
          className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors cursor-pointer disabled:opacity-40 flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
