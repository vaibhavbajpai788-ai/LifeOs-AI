import React, { useState } from 'react';
import { UserProfile, UserSkill, AchievementBadge } from '../types';
import { Sparkles, Plus, Trash2, CheckCircle2, ArrowRight, Trophy, Flame } from 'lucide-react';
import { CareerAchievements } from './CareerAchievements';

interface AiProfileViewProps {
  profile: UserProfile;
  achievements: AchievementBadge[];
  onIncrementStreak?: () => void;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const AiProfileView: React.FC<AiProfileViewProps> = ({
  profile,
  achievements,
  onIncrementStreak,
  onUpdateProfile,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<UserSkill['category']>('Backend');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [saveNotification, setSaveNotification] = useState(false);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newSkill: UserSkill = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      level: 'Intermediate',
      percentage: 70,
      category: newSkillCategory,
    };

    const updatedSkills = [...formData.currentSkills, newSkill];
    setFormData((prev) => ({ ...prev, currentSkills: updatedSkills }));
    setNewSkillName('');
  };

  const handleRemoveSkill = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      currentSkills: prev.currentSkills.filter((s) => s.id !== id),
    }));
  };

  const handleSaveAndAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/profile/generate-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: formData }),
      });

      if (response.ok) {
        const insights = await response.json();
        const updated: UserProfile = {
          ...formData,
          currentLevel: insights.currentLevel || formData.currentLevel,
          targetRole: insights.targetRole || formData.targetRole,
          skillGaps: insights.skillGaps || formData.skillGaps,
          recommendedPath: insights.recommendedPath || formData.recommendedPath,
          marketReadiness: insights.readinessScore || formData.marketReadiness,
        };
        onUpdateProfile(updated);
        setFormData(updated);
      } else {
        onUpdateProfile(formData);
      }
    } catch (err) {
      console.error('Failed to run AI profile analysis:', err);
      onUpdateProfile(formData);
    } finally {
      setIsAnalyzing(false);
      setSaveNotification(true);
      setTimeout(() => setSaveNotification(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">AI Profile Intelligence</h1>
          <p className="text-sm text-slate-400 mt-1">
            Module 1: Unified input system for academic background, skills, and target career trajectories.
          </p>
        </div>

        <button
          onClick={handleSaveAndAnalyze}
          disabled={isAnalyzing}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAnalyzing ? 'Analyzing with LifeOS AI...' : 'Save & Run AI Profile Analysis'}</span>
        </button>
      </div>

      {saveNotification && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Profile updated and AI Career Analysis regenerated successfully!</span>
        </div>
      )}

      {/* Grid: Inputs (Left) and AI Output Profile (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Editable Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Personal & Academic Details */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h2 className="text-base font-semibold text-white">Personal & Academic Foundation</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Education Institution</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Degree & Major</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => handleInputChange('degree', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">CGPA / Percentage</label>
                <input
                  type="text"
                  value={formData.cgpa}
                  onChange={(e) => handleInputChange('cgpa', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Graduation Year</label>
                <input
                  type="text"
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Career Target & Preferences */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h2 className="text-base font-semibold text-white">Target Career & Intent</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Target Job Role</label>
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) => handleInputChange('targetRole', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Location Preference</label>
                <input
                  type="text"
                  value={formData.locationPreference}
                  onChange={(e) => handleInputChange('locationPreference', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Primary Career Goal</label>
              <textarea
                rows={2}
                value={formData.careerGoal}
                onChange={(e) => handleInputChange('careerGoal', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Current Skills Matrix */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Skills & Technologies</h2>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {formData.currentSkills.length} logged
              </span>
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. Next.js, Redis, Docker)"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
              <select
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value as any)}
                className="px-2.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="DevOps">DevOps</option>
                <option value="Core CS">Core CS</option>
                <option value="Tools">Tools</option>
              </select>
              <button
                type="submit"
                className="px-3 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {formData.currentSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-slate-200 truncate">{skill.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {skill.category} · {skill.level} ·{' '}
                      <span className="font-mono tabular-nums">{skill.percentage}%</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Output Card (As defined in Section 4 of user spec) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-indigo-500/30 space-y-5 sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  AI Generated Professional Profile
                </h3>
              </div>
              <span className="text-[11px] text-indigo-400 font-mono">Live Engine</span>
            </div>

            {/* Current Level */}
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Current Level:
              </div>
              <div className="text-sm font-semibold text-white">
                {formData.currentLevel}
              </div>
            </div>

            {/* Target Role */}
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Target Role:
              </div>
              <div className="text-sm font-semibold text-indigo-400">
                {formData.targetRole}
              </div>
            </div>

            {/* Current Skills */}
            <div className="space-y-1.5">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Current Skills:
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-300">
                {formData.currentSkills.map((s, idx) => (
                  <span key={s.id}>
                    {s.name}
                    {idx < formData.currentSkills.length - 1 && (
                      <span className="text-slate-600 ml-2" aria-hidden="true">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Skill Gaps */}
            <div className="space-y-1.5">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Skill Gaps:
              </div>
              <div className="space-y-1 text-xs text-amber-300/90 font-mono">
                {formData.skillGaps.map((gap) => (
                  <div key={gap} className="flex items-center gap-2">
                    <span className="text-amber-500">✗</span>
                    <span>{gap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Path */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Recommended Path:
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-indigo-300 leading-relaxed">
                {formData.recommendedPath}
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
              <span>Overall Readiness:</span>
              <span className="font-mono tabular-nums text-white font-bold">
                {formData.marketReadiness}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Career Achievements & Milestone Badges Showcase */}
      <CareerAchievements
        achievements={achievements}
        streakDays={formData.streakDays}
        totalXp={formData.totalXp}
        onIncrementStreak={onIncrementStreak}
        variant="full"
      />
    </div>
  );
};
