import React, { useState } from 'react';
import { LearningRoadmap, RoadmapWeek } from '../types';
import {
  Milestone,
  CheckCircle2,
  Clock,
  Circle,
  ExternalLink,
  Sparkles,
  RefreshCw,
  FolderGit2,
  Plus,
  Check,
} from 'lucide-react';

interface RoadmapViewProps {
  roadmap: LearningRoadmap;
  onUpdateRoadmap: (updated: LearningRoadmap) => void;
  targetRole: string;
  onAddTask?: (title: string, category: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  onUpdateRoadmap,
  targetRole,
  onAddTask,
}) => {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed' | 'pending'>('all');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customRole, setCustomRole] = useState(targetRole);
  const [customWeeks, setCustomWeeks] = useState(12);
  const [isGenerating, setIsGenerating] = useState(false);
  const [addedWeekTask, setAddedWeekTask] = useState<number | null>(null);

  const completedWeeks = roadmap.weeks.filter((w) => w.status === 'completed').length;
  const progressPercentage = Math.round((completedWeeks / roadmap.weeks.length) * 100);

  const handleStatusChange = (weekNumber: number, newStatus: RoadmapWeek['status']) => {
    const updatedWeeks = roadmap.weeks.map((w) =>
      w.weekNumber === weekNumber ? { ...w, status: newStatus } : w
    );
    onUpdateRoadmap({ ...roadmap, weeks: updatedWeeks });
  };

  const handleGenerateCustomRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await fetch('/api/roadmap/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: customRole,
          durationWeeks: customWeeks,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onUpdateRoadmap(data);
        setShowCustomModal(false);
      }
    } catch (err) {
      console.error('Failed to generate custom roadmap:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredWeeks = roadmap.weeks.filter((w) => {
    if (filter === 'all') return true;
    return w.status === filter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{roadmap.title}</h1>
          <p className="text-sm text-slate-400 mt-1">{roadmap.overview}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCustomModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Custom Roadmap</span>
          </button>
        </div>
      </div>

      {/* Progress & Summary Bar */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5 flex-1 max-w-lg">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Roadmap Completion Velocity</span>
            <span className="font-mono tabular-nums text-indigo-400 font-bold">
              {completedWeeks} of {roadmap.totalWeeks} Weeks ({progressPercentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Filter Tabs (Buttons adhering to design constitution) */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Weeks ({roadmap.weeks.length})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'in-progress'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'completed'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'pending'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending
          </button>
        </div>
      </div>

      {/* 12-Week Interactive Timeline Cards */}
      <div className="space-y-4">
        {filteredWeeks.map((week) => (
          <div
            key={week.weekNumber}
            className={`p-5 rounded-xl border transition-all ${
              week.status === 'in-progress'
                ? 'bg-indigo-950/20 border-indigo-500/40 shadow-sm shadow-indigo-950/50'
                : week.status === 'completed'
                ? 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                {/* Week Header & Unboxed Metadata */}
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <span className="font-mono font-bold text-indigo-400">
                    WEEK {week.weekNumber.toString().padStart(2, '0')}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{week.focus}</span>
                </div>

                <h3 className="text-base font-semibold text-white">
                  {week.title}
                </h3>

                {/* Key Topics Unboxed List */}
                <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-xs text-slate-300 pt-1">
                  <span className="text-slate-400 font-medium">Topics:</span>
                  {week.topics.map((topic, i) => (
                    <span key={i} className="text-slate-300">
                      {topic}
                      {i < week.topics.length - 1 && (
                        <span className="text-slate-600 ml-2" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Hands-on Task & Deliverable */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex flex-col justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider block mb-0.5">
                        Hands-on Sprint Task
                      </span>
                      <span className="text-slate-200">{week.handsOnTask}</span>
                    </div>
                    {onAddTask && (
                      <button
                        type="button"
                        onClick={() => {
                          onAddTask(`Week ${week.weekNumber}: ${week.handsOnTask}`, 'Sprint Roadmap');
                          setAddedWeekTask(week.weekNumber);
                          setTimeout(() => setAddedWeekTask(null), 2500);
                        }}
                        className="self-start flex items-center gap-1 px-2 py-1 text-[11px] font-medium rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 cursor-pointer transition-colors"
                        title="Add this hands-on sprint task to Today's Action Plan"
                      >
                        {addedWeekTask === week.weekNumber ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-300">Added to Today&apos;s Plan!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Add to Today&apos;s Plan</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-0.5">
                        Deliverable Target
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(week.deliverable);
                          setAddedWeekTask(100 + week.weekNumber);
                          setTimeout(() => setAddedWeekTask(null), 1800);
                        }}
                        className="font-mono text-xs text-slate-300 hover:text-indigo-300 text-left truncate max-w-[220px] block cursor-pointer group"
                        title="Click to copy deliverable target name"
                      >
                        {addedWeekTask === 100 + week.weekNumber ? (
                          <span className="text-emerald-400 font-sans">Copied to Clipboard!</span>
                        ) : (
                          <span>{week.deliverable}</span>
                        )}
                      </button>
                    </div>
                    <FolderGit2 className="w-4 h-4 text-slate-500 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-1.5 shrink-0 self-start p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  onClick={() => handleStatusChange(week.weekNumber, 'completed')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    week.status === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Mark Completed"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Done</span>
                </button>

                <button
                  onClick={() => handleStatusChange(week.weekNumber, 'in-progress')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    week.status === 'in-progress'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Mark In Progress"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Active</span>
                </button>

                <button
                  onClick={() => handleStatusChange(week.weekNumber, 'pending')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    week.status === 'pending'
                      ? 'bg-slate-800 text-slate-200'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Mark Pending"
                >
                  <Circle className="w-3.5 h-3.5" />
                  <span>Queue</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Roadmap Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Generate Custom AI Roadmap</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGenerateCustomRoadmap} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Target Engineering Role
                </label>
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="e.g. Full Stack Developer, DevOps Engineer, AI Engineer"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Roadmap Duration (Weeks)
                </label>
                <select
                  value={customWeeks}
                  onChange={(e) => setCustomWeeks(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={8}>8-Week Accelerated Sprint</option>
                  <option value={12}>12-Week Comprehensive Master Plan</option>
                  <option value={16}>16-Week Deep Production Track</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate Roadmap</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
