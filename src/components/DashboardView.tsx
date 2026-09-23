import React, { useState } from 'react';
import { UserProfile, TodayTask, ModuleTab, LearningRoadmap, AchievementBadge } from '../types';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Plus,
  Flame,
  Clock,
  Compass,
  FileCheck2,
  BookOpen,
  Trophy,
  X,
} from 'lucide-react';
import { CareerAchievements } from './CareerAchievements';

interface DashboardViewProps {
  profile: UserProfile;
  todayTasks: TodayTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string, category: string) => void;
  roadmap: LearningRoadmap;
  achievements: AchievementBadge[];
  onIncrementStreak?: () => void;
  recentUnlockedBadge?: AchievementBadge | null;
  onDismissCelebration?: () => void;
  setActiveTab: (tab: ModuleTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  todayTasks,
  onToggleTask,
  onAddTask,
  roadmap,
  achievements,
  onIncrementStreak,
  recentUnlockedBadge,
  onDismissCelebration,
  setActiveTab,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const completedCount = todayTasks.filter((t) => t.completed).length;
  const currentWeek = roadmap.weeks.find((w) => w.status === 'in-progress') || roadmap.weeks[2];
  const unlockedBadgesCount = achievements.filter((a) => a.unlocked).length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle.trim(), 'Sprint');
    setNewTaskTitle('');
    setShowAddForm(false);
  };

  // Skill gap data with percentages
  const skillGaps = [
    { name: 'Node.js & Express', current: 35, target: 80 },
    { name: 'Docker & Containers', current: 25, target: 75 },
    { name: 'AWS Cloud Basics', current: 20, target: 70 },
    { name: 'System Design & Scalability', current: 30, target: 75 },
    { name: 'MongoDB / NoSQL', current: 40, target: 75 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Welcome & Career Goal Hero Header */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{profile.currentLevel}</span>
              <span aria-hidden="true">·</span>
              <span>{profile.education}</span>
              <span aria-hidden="true">·</span>
              <span>Class of {profile.graduationYear}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Good Morning, {profile.name}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Target Goal: <span className="text-indigo-400 font-semibold">{profile.targetRole}</span>.
              Your system is calibrated to transition you from core fundamentals to production readiness.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 min-w-[130px]">
              <div className="text-xs text-slate-400">Profile Progress</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-indigo-400 mt-1">
                {profile.profileCompletion}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">ATS Calibrated</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 min-w-[130px]">
              <div className="text-xs text-slate-400">Skill Progress</div>
              <div className="text-2xl font-bold font-mono tabular-nums text-emerald-400 mt-1">
                {profile.marketReadiness}%
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Market Ready</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 min-w-[130px] hidden sm:block">
              <div className="text-xs text-slate-400">Active Sprint</div>
              <div className="text-lg font-bold text-white mt-1">
                Week {currentWeek.weekNumber}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[110px]">
                {currentWeek.title}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 min-w-[130px] hidden md:block">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Achievements</span>
                <Trophy className="w-3 h-3 text-amber-400" />
              </div>
              <div className="text-lg font-bold font-mono tabular-nums text-amber-400 mt-1">
                {unlockedBadgesCount}/{achievements.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {profile.totalXp.toLocaleString()} XP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Unlocked Toast / Celebration Banner */}
      {recentUnlockedBadge && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-indigo-950/40 to-slate-900 border border-amber-500/40 shadow-lg shadow-amber-500/10 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-sm shadow-amber-500/20">
              <Trophy className="w-5 h-5 animate-bounce" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Achievement Unlocked!</span>
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  +{recentUnlockedBadge.rewardXp} XP
                </span>
              </div>
              <div className="text-sm font-bold text-white mt-0.5 truncate">
                {recentUnlockedBadge.title}
              </div>
              <p className="text-xs text-slate-300 truncate">
                {recentUnlockedBadge.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('profile')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors cursor-pointer shadow-sm shadow-amber-600/30"
            >
              View Badge Cabinet
            </button>
            {onDismissCelebration && (
              <button
                onClick={onDismissCelebration}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Primary AI Recommendation Banner */}
      <div className="p-5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              AI Priority Recommendation
            </div>
            <div className="text-sm font-semibold text-white">
              Complete Node.js Authentication & JWT Middleware
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Node.js backend auth is the primary blocker separating you from 85% of Full Stack job listings. Completing today&apos;s JWT exercise will boost your market readiness from <span className="font-mono tabular-nums text-indigo-300 font-semibold">74%</span> to <span className="font-mono tabular-nums text-indigo-300 font-semibold">79%</span>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            View Week 3 Roadmap
          </button>
          <button
            onClick={() => setActiveTab('mentor')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer shadow-sm shadow-indigo-600/30"
          >
            <span>Ask Mentor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2-Column Grid: Today's Action Plan + Skill Gap Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: TODAY's Action Plan */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">Today&apos;s Action Plan</h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  <span className="font-mono tabular-nums">{completedCount}</span> of{' '}
                  <span className="font-mono tabular-nums">{todayTasks.length}</span> actions completed
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleCreateTask} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <input
                  type="text"
                  placeholder="e.g. Implement refresh token route in Express"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md"
                  >
                    Add Action
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`group p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    task.completed
                      ? 'bg-slate-950/60 border-slate-800/60 text-slate-500'
                      : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      className="shrink-0 focus:outline-none"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <div className={`text-xs font-medium truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                        {task.title}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>{task.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{task.priority} Priority</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{task.estimatedMinutes}m</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{profile.streakDays}-Day Learning Streak</span>
                </span>
                {onIncrementStreak && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncrementStreak();
                    }}
                    className="px-2 py-0.5 text-[11px] font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 rounded cursor-pointer transition-colors"
                    title="Log daily study session to extend streak"
                  >
                    +1 Day Check-in
                  </button>
                )}
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                className="hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View All Project Tasks</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: SKILL GAP Visualizer */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">Skill Gap Analysis</h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  Compared against {profile.targetRole} baseline
                </div>
              </div>
              <button
                onClick={() => setActiveTab('skill-gap')}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer font-medium"
              >
                Run Deep JD Scan →
              </button>
            </div>

            <div className="space-y-3.5">
              {skillGaps.map((skill) => (
                <button
                  key={skill.name}
                  onClick={() => setActiveTab('skill-gap')}
                  className="w-full text-left space-y-1.5 p-2 -mx-2 rounded-lg hover:bg-slate-950/80 transition-colors group cursor-pointer"
                  title={`Click to analyze ${skill.name} in Skill Gap Analyzer`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200 group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                      <span>{skill.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                    </span>
                    <span className="font-mono tabular-nums text-slate-400">
                      {skill.current}% <span className="text-slate-600">/ {skill.target}% target</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex border border-slate-800/60">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.current}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('roadmap')}
              className="w-full p-3 bg-slate-950 hover:bg-slate-900/80 rounded-lg border border-slate-800 hover:border-indigo-500/40 text-xs text-slate-400 space-y-1 transition-all text-left cursor-pointer group"
            >
              <div className="font-medium text-slate-300 flex items-center justify-between">
                <span>Recommended Skill Progression:</span>
                <span className="text-[11px] text-indigo-400 group-hover:underline">Open Roadmap →</span>
              </div>
              <div className="font-mono text-[11px] text-indigo-300">
                {profile.recommendedPath}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Career Achievements & Digital Badges Widget */}
      <CareerAchievements
        achievements={achievements}
        streakDays={profile.streakDays}
        totalXp={profile.totalXp}
        onIncrementStreak={onIncrementStreak}
        variant="compact"
        setActiveTab={setActiveTab}
      />

      {/* Quick Launchpad to Other Modules */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          System Launchpad
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveTab('resume')}
            className="p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <FileCheck2 className="w-5 h-5 text-indigo-400" />
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="text-sm font-semibold text-white mt-3">Resume Intelligence</div>
            <p className="text-xs text-slate-400 mt-1">
              Score: <span className="font-mono tabular-nums text-indigo-300 font-semibold">74%</span> · 8 critical keywords missing for ATS pass.
            </p>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className="p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <Compass className="w-5 h-5 text-emerald-400" />
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
            </div>
            <div className="text-sm font-semibold text-white mt-3">12-Week Roadmap</div>
            <p className="text-xs text-slate-400 mt-1">
              Week 3 of 12 in progress · Node.js runtime & streams.
            </p>
          </button>

          <button
            onClick={() => setActiveTab('knowledge-brain')}
            className="p-4 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
            </div>
            <div className="text-sm font-semibold text-white mt-3">Personal Knowledge Brain</div>
            <p className="text-xs text-slate-400 mt-1">
              5 indexed course docs · Ask RAG Q&A on DBMS, OS & System Design.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
