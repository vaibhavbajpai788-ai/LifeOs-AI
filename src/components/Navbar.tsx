import React from 'react';
import { ModuleTab } from '../types';
import { Sparkles, BrainCircuit } from 'lucide-react';

interface NavbarProps {
  activeTab: ModuleTab;
  setActiveTab: (tab: ModuleTab) => void;
  targetRole: string;
  marketReadiness: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  targetRole,
  marketReadiness,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-500/30">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            LifeOS AI
          </span>
        </button>
      </div>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeTab === 'dashboard' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-0.5' : ''
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('mentor')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeTab === 'mentor' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-0.5' : ''
          }`}
        >
          AI Mentor
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeTab === 'roadmap' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-0.5' : ''
          }`}
        >
          Roadmap
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeTab === 'projects' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-0.5' : ''
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeTab === 'opportunities' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-0.5' : ''
          }`}
        >
          Opportunities
        </button>
        <button
          onClick={() => setActiveTab('knowledge-brain')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeTab === 'knowledge-brain' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-400 pb-0.5' : ''
          }`}
        >
          Knowledge Brain
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={() => setActiveTab('digital-twin')}
          className="hidden sm:flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
          title="View Market Readiness in Digital Twin"
        >
          <span>Target: {targetRole}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono tabular-nums text-indigo-400 font-medium">{marketReadiness}% Ready</span>
        </button>

        <button
          onClick={() => setActiveTab('digital-twin')}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30 whitespace-nowrap cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Digital Twin</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700 hover:border-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          title="View & Edit AI Profile"
        >
          <img
            src="/src/assets/images/avatar_user_profile_1790160012653.jpg"
            alt="User profile avatar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-200">
            AS
          </div>
        </button>
      </div>
    </header>
  );
};
