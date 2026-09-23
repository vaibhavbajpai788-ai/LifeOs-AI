import React, { useState } from 'react';
import { AchievementBadge, ModuleTab } from '../types';
import {
  Trophy,
  Flame,
  Award,
  ShieldCheck,
  Zap,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  Star,
} from 'lucide-react';

interface CareerAchievementsProps {
  achievements: AchievementBadge[];
  streakDays: number;
  totalXp: number;
  onIncrementStreak?: () => void;
  variant?: 'full' | 'compact';
  setActiveTab?: (tab: ModuleTab) => void;
}

export const CareerAchievements: React.FC<CareerAchievementsProps> = ({
  achievements,
  streakDays,
  totalXp,
  onIncrementStreak,
  variant = 'full',
  setActiveTab,
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'in-progress'>('all');

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const nextBadge = achievements.find((a) => !a.unlocked);

  const getBadgeIcon = (iconType: AchievementBadge['iconType'], unlocked: boolean) => {
    const className = `w-5 h-5 ${unlocked ? 'text-amber-400' : 'text-slate-500'}`;
    switch (iconType) {
      case 'project':
        return <Trophy className={className} />;
      case 'streak':
        return <Flame className={`w-5 h-5 ${unlocked ? 'text-orange-400' : 'text-slate-500'}`} />;
      case 'roadmap':
        return <Award className={className} />;
      case 'resume':
        return <ShieldCheck className={`w-5 h-5 ${unlocked ? 'text-emerald-400' : 'text-slate-500'}`} />;
      case 'skill':
        return <Zap className={`w-5 h-5 ${unlocked ? 'text-indigo-400' : 'text-slate-500'}`} />;
      case 'application':
        return <Briefcase className={`w-5 h-5 ${unlocked ? 'text-sky-400' : 'text-slate-500'}`} />;
      case 'knowledge':
        return <BookOpen className={`w-5 h-5 ${unlocked ? 'text-purple-400' : 'text-slate-500'}`} />;
      default:
        return <Star className={className} />;
    }
  };

  // Compact Variant (Used inside Dashboard)
  if (variant === 'compact') {
    return (
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Career Achievements</h3>
              <div className="text-xs text-slate-400">
                <span className="font-mono tabular-nums text-amber-400 font-medium">{unlockedCount}</span> of{' '}
                <span className="font-mono tabular-nums">{achievements.length}</span> Badges Unlocked
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Total XP</div>
              <div className="font-mono tabular-nums text-xs font-bold text-amber-400">
                {totalXp.toLocaleString()} XP
              </div>
            </div>

            {setActiveTab && (
              <button
                onClick={() => setActiveTab('profile')}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Trophy Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {achievements.slice(0, 4).map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-lg border flex flex-col justify-between transition-all ${
                badge.unlocked
                  ? 'bg-slate-950 border-amber-500/20 hover:border-amber-500/40'
                  : 'bg-slate-950/60 border-slate-800/80 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-1.5 rounded-md ${badge.unlocked ? 'bg-amber-500/10' : 'bg-slate-800'}`}>
                  {getBadgeIcon(badge.iconType, badge.unlocked)}
                </div>
                <span className="font-mono text-[10px] text-slate-400">+{badge.rewardXp} XP</span>
              </div>

              <div className="mt-2 space-y-0.5">
                <div className="text-xs font-semibold text-white truncate">{badge.title}</div>
                <div className="text-[10px] text-slate-400">
                  {badge.unlocked ? (
                    <span className="text-emerald-400 font-medium">Unlocked ✓</span>
                  ) : (
                    <span>
                      {badge.progress} / {badge.maxProgress}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next closest milestone preview */}
        {nextBadge && (
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800 shrink-0">
                {getBadgeIcon(nextBadge.iconType, false)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">Next Target: {nextBadge.title}</span>
                  <span className="text-slate-400 text-[11px]">+{nextBadge.rewardXp} XP</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">{nextBadge.criteria}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <div className="w-24 bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (nextBadge.progress / nextBadge.maxProgress) * 100)}%` }}
                />
              </div>
              <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                {nextBadge.progress}/{nextBadge.maxProgress}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full Showcase Variant (Used inside Profile View)
  const filteredAchievements = achievements.filter((a) => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'in-progress') return !a.unlocked;
    return true;
  });

  return (
    <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800 space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Career Achievements & Milestone Badges
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Earn digital badges and XP as you finish projects, maintain learning consistency, and advance your career readiness.
          </p>
        </div>

        {/* Stats & Streak Check-in */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center min-w-[100px]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Badges</div>
            <div className="text-lg font-bold font-mono text-amber-400 tabular-nums">
              {unlockedCount} / {achievements.length}
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center min-w-[110px]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Total XP</div>
            <div className="text-lg font-bold font-mono text-indigo-400 tabular-nums">
              {totalXp.toLocaleString()}
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center min-w-[110px]">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" />
              <span>Streak</span>
            </div>
            <div className="text-lg font-bold font-mono text-orange-400 tabular-nums">
              {streakDays} Days
            </div>
          </div>

          {onIncrementStreak && (
            <button
              onClick={onIncrementStreak}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors cursor-pointer shadow-sm shadow-orange-600/30 shrink-0"
              title="Log daily study session to extend streak"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Log Day +1</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Badges ({achievements.length})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filter === 'unlocked'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Unlocked ({unlockedCount})
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filter === 'in-progress'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            In Progress ({achievements.length - unlockedCount})
          </button>
        </div>

        <div className="text-xs text-slate-400 hidden sm:block">
          Next Tier Milestone:{' '}
          <span className="text-amber-400 font-semibold">
            {streakDays < 7 ? 'Learning Streak 7 Days' : 'Full Stack Master'}
          </span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((badge) => {
          const isUnlocked = badge.unlocked;
          const progressPercent = Math.min(100, Math.round((badge.progress / badge.maxProgress) * 100));

          return (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                isUnlocked
                  ? 'bg-gradient-to-b from-slate-950 to-slate-900 border-amber-500/30 shadow-sm shadow-amber-950/20'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="space-y-2.5">
                {/* Header with Icon, Category & Status */}
                <div className="flex items-start justify-between">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isUnlocked
                        ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-sm shadow-amber-500/20'
                        : 'bg-slate-900 border border-slate-800 text-slate-500'
                    }`}
                  >
                    {getBadgeIcon(badge.iconType, isUnlocked)}
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      +{badge.rewardXp} XP
                    </span>
                    <div className="text-[10px] text-slate-500">{badge.category}</div>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3
                    className={`text-sm font-bold flex items-center gap-1.5 ${
                      isUnlocked ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    <span>{badge.title}</span>
                    {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Footer: Status or Progress */}
              <div className="pt-3 border-t border-slate-800/80">
                {isUnlocked ? (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Unlocked</span>
                    </span>
                    <span className="font-mono text-slate-400">
                      {badge.unlockedDate ? `Awarded ${badge.unlockedDate}` : 'Awarded'}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-500" />
                        <span>Progress</span>
                      </span>
                      <span className="font-mono text-slate-300 tabular-nums">
                        {badge.progress} / {badge.maxProgress} ({progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      Criteria: {badge.criteria}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
