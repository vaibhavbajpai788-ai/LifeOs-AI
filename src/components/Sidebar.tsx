import React from 'react';
import { ModuleTab } from '../types';
import {
  LayoutDashboard,
  Bot,
  UserCheck,
  FileText,
  Split,
  Milestone,
  FolderKanban,
  Briefcase,
  BookOpen,
  Orbit,
} from 'lucide-react';

interface SidebarProps {
  activeTab: ModuleTab;
  setActiveTab: (tab: ModuleTab) => void;
  targetRole: string;
  readinessScore: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  targetRole,
  readinessScore,
}) => {
  const menuItems: { id: ModuleTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mentor', label: 'AI Mentor', icon: Bot },
    { id: 'profile', label: 'AI Profile', icon: UserCheck },
    { id: 'resume', label: 'Resume Intelligence', icon: FileText },
    { id: 'skill-gap', label: 'Skill Gap Analyzer', icon: Split },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Milestone },
    { id: 'projects', label: 'Projects & Tasks', icon: FolderKanban },
    { id: 'opportunities', label: 'Opportunities & Jobs', icon: Briefcase },
    { id: 'knowledge-brain', label: 'Knowledge Brain (RAG)', icon: BookOpen },
    { id: 'digital-twin', label: 'Career Digital Twin', icon: Orbit },
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between min-h-[calc(100vh-57px)]">
      <div className="p-3.5 space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          System Modules
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Mini Status Summary */}
      <button
        onClick={() => setActiveTab('digital-twin')}
        className="p-4 m-3.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 space-y-2.5 text-left cursor-pointer transition-colors group"
        title="Open Career Digital Twin Engine"
      >
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 group-hover:text-slate-300">Readiness</span>
          <span className="font-mono tabular-nums text-indigo-400 font-semibold">{readinessScore}%</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${readinessScore}%` }}
          />
        </div>
        <div className="text-[11px] text-slate-400 truncate flex items-center justify-between">
          <span className="truncate">Goal: <span className="text-slate-200">{targetRole}</span></span>
          <span className="text-indigo-400 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Simulate →</span>
        </div>
      </button>
    </aside>
  );
};
