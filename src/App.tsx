import React, { useState, useEffect } from 'react';
import {
  ModuleTab,
  UserProfile,
  TodayTask,
  ResumeAnalysis,
  LearningRoadmap,
  ProjectSpec,
  OpportunityItem,
  JobApplication,
  BrainDocument,
  ChatMessage,
  ApplicationStatus,
  AchievementBadge,
} from './types';
import {
  initialProfile,
  initialTodayTasks,
  initialResumeAnalysis,
  initialRoadmap,
  initialProjectSpec,
  initialOpportunities,
  initialApplications,
  initialBrainDocuments,
  initialChatMessages,
  initialAchievements,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { AiProfileView } from './components/AiProfileView';
import { ResumeAnalyzerView } from './components/ResumeAnalyzerView';
import { SkillGapView } from './components/SkillGapView';
import { RoadmapView } from './components/RoadmapView';
import { ProjectsView } from './components/ProjectsView';
import { AiMentorView } from './components/AiMentorView';
import { OpportunitiesView } from './components/OpportunitiesView';
import { KnowledgeBrainView } from './components/KnowledgeBrainView';
import { CareerDigitalTwinView } from './components/CareerDigitalTwinView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ModuleTab>('dashboard');

  // Unified State with local persistence fallback
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('lifeos_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [todayTasks, setTodayTasks] = useState<TodayTask[]>(() => {
    const saved = localStorage.getItem('lifeos_today_tasks');
    return saved ? JSON.parse(saved) : initialTodayTasks;
  });

  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis>(initialResumeAnalysis);

  const [roadmap, setRoadmap] = useState<LearningRoadmap>(() => {
    const saved = localStorage.getItem('lifeos_roadmap');
    return saved ? JSON.parse(saved) : initialRoadmap;
  });

  const [projectSpec, setProjectSpec] = useState<ProjectSpec>(() => {
    const saved = localStorage.getItem('lifeos_project_spec');
    return saved ? JSON.parse(saved) : initialProjectSpec;
  });

  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(() => {
    const saved = localStorage.getItem('lifeos_opportunities');
    return saved ? JSON.parse(saved) : initialOpportunities;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('lifeos_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [documents, setDocuments] = useState<BrainDocument[]>(() => {
    const saved = localStorage.getItem('lifeos_documents');
    return saved ? JSON.parse(saved) : initialBrainDocuments;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('lifeos_chat_messages');
    return saved ? JSON.parse(saved) : initialChatMessages;
  });

  const [achievements, setAchievements] = useState<AchievementBadge[]>(() => {
    const saved = localStorage.getItem('lifeos_achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [recentUnlockedBadge, setRecentUnlockedBadge] = useState<AchievementBadge | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('lifeos_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('lifeos_today_tasks', JSON.stringify(todayTasks));
  }, [todayTasks]);

  useEffect(() => {
    localStorage.setItem('lifeos_roadmap', JSON.stringify(roadmap));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem('lifeos_project_spec', JSON.stringify(projectSpec));
  }, [projectSpec]);

  useEffect(() => {
    localStorage.setItem('lifeos_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('lifeos_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('lifeos_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('lifeos_chat_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('lifeos_achievements', JSON.stringify(achievements));
  }, [achievements]);

  const handleIncrementStreak = () => {
    const nextStreak = (profile.streakDays || 5) + 1;
    setProfile((p) => ({
      ...p,
      streakDays: nextStreak,
      totalXp: p.totalXp + 50,
    }));

    // Check Learning Streak 7 Days badge milestone
    setAchievements((prev) =>
      prev.map((b) => {
        if (b.id === 'badge-streak-7') {
          const newProgress = Math.min(b.maxProgress, nextStreak);
          if (newProgress >= b.maxProgress && !b.unlocked) {
            const unlockedBadge: AchievementBadge = {
              ...b,
              progress: newProgress,
              unlocked: true,
              unlockedDate: new Date().toISOString().split('T')[0],
            };
            setRecentUnlockedBadge(unlockedBadge);
            setProfile((p) => ({
              ...p,
              totalXp: p.totalXp + b.rewardXp,
            }));
            return unlockedBadge;
          }
          return { ...b, progress: newProgress };
        }
        return b;
      })
    );
  };

  // Handlers
  const handleToggleTask = (taskId: string) => {
    setTodayTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedCompleted = !t.completed;
          // Dynamically increment readiness score on completion
          if (updatedCompleted) {
            setProfile((p) => ({
              ...p,
              marketReadiness: Math.min(100, p.marketReadiness + 1),
              totalXp: p.totalXp + 25,
            }));

            // Check if completing this task helps unlock Skill Gap Conqueror
            if (t.category === 'Backend' || t.title.toLowerCase().includes('auth') || t.title.toLowerCase().includes('node')) {
              setAchievements((achPrev) =>
                achPrev.map((badge) => {
                  if (badge.id === 'badge-skill-bridger' && !badge.unlocked) {
                    const nextProg = Math.min(badge.maxProgress, badge.progress + 1);
                    if (nextProg >= badge.maxProgress) {
                      const unlocked: AchievementBadge = {
                        ...badge,
                        progress: nextProg,
                        unlocked: true,
                        unlockedDate: new Date().toISOString().split('T')[0],
                      };
                      setRecentUnlockedBadge(unlocked);
                      setProfile((prof) => ({ ...prof, totalXp: prof.totalXp + badge.rewardXp }));
                      return unlocked;
                    }
                    return { ...badge, progress: nextProg };
                  }
                  return badge;
                })
              );
            }
          }
          return { ...t, completed: updatedCompleted };
        }
        return t;
      })
    );
  };

  const handleAddTask = (title: string, category: string) => {
    const newTask: TodayTask = {
      id: `task-${Date.now()}`,
      title,
      category,
      priority: 'High',
      completed: false,
      estimatedMinutes: 45,
    };
    setTodayTasks((prev) => [newTask, ...prev]);
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          profile,
          history: [...messages, userMsg],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const mentorMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'mentor',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionPrompt: data.reply.includes('Action') || data.reply.includes('Step')
            ? 'Add to Today\'s Plan'
            : undefined,
        };
        setMessages((prev) => [...prev, mentorMsg]);
      }
    } catch (err) {
      console.error('Failed to communicate with mentor:', err);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `mentor-welcome-${Date.now()}`,
        sender: 'mentor',
        text: `Namaste ${profile.name}! I am your LifeOS AI Career Mentor. I've reloaded your current goals (${profile.targetRole}) and 74% market readiness context. What would you like to master today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleApplyOpportunity = (oppId: string) => {
    const opp = opportunities.find((o) => o.id === oppId);
    if (!opp) return;

    // Update opportunity item
    setOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, applied: true } : o))
    );

    // Auto add to Application Tracker
    const newApp: JobApplication = {
      id: `app-auto-${Date.now()}`,
      company: opp.company,
      role: opp.title,
      dateApplied: new Date().toISOString().split('T')[0],
      status: 'Applied',
      salaryRange: opp.stipendOrSalary,
      notes: `Applied via LifeOS Opportunity Radar. Match score: ${opp.matchScore}%.`,
    };

    setApplications((prev) => [newApp, ...prev]);
  };

  const handleAddApplication = (app: JobApplication) => {
    setApplications((prev) => [app, ...prev]);
  };

  const handleUpdateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status } : a))
    );
  };

  const handleAddDocument = (doc: BrainDocument) => {
    setDocuments((prev) => [doc, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Strict 3-zone Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        targetRole={profile.targetRole}
        marketReadiness={profile.marketReadiness}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Module Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          targetRole={profile.targetRole}
          readinessScore={profile.marketReadiness}
        />

        {/* Main Content Workspace Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          {activeTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              todayTasks={todayTasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              roadmap={roadmap}
              achievements={achievements}
              onIncrementStreak={handleIncrementStreak}
              recentUnlockedBadge={recentUnlockedBadge}
              onDismissCelebration={() => setRecentUnlockedBadge(null)}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'mentor' && (
            <AiMentorView
              profile={profile}
              messages={messages}
              onSendMessage={handleSendMessage}
              onAddTask={handleAddTask}
              setActiveTab={setActiveTab}
              onResetChat={handleResetChat}
            />
          )}

          {activeTab === 'profile' && (
            <AiProfileView
              profile={profile}
              achievements={achievements}
              onIncrementStreak={handleIncrementStreak}
              onUpdateProfile={setProfile}
            />
          )}

          {activeTab === 'resume' && (
            <ResumeAnalyzerView
              initialAnalysis={resumeAnalysis}
              targetRole={profile.targetRole}
            />
          )}

          {activeTab === 'skill-gap' && (
            <SkillGapView
              currentSkills={profile.currentSkills}
              targetRole={profile.targetRole}
              onAddTask={handleAddTask}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapView
              roadmap={roadmap}
              onUpdateRoadmap={setRoadmap}
              targetRole={profile.targetRole}
              onAddTask={handleAddTask}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              projectSpec={projectSpec}
              onUpdateProjectSpec={setProjectSpec}
              targetRole={profile.targetRole}
            />
          )}

          {activeTab === 'opportunities' && (
            <OpportunitiesView
              opportunities={opportunities}
              applications={applications}
              onApplyOpportunity={handleApplyOpportunity}
              onAddApplication={handleAddApplication}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
              targetRole={profile.targetRole}
            />
          )}

          {activeTab === 'knowledge-brain' && (
            <KnowledgeBrainView
              documents={documents}
              onAddDocument={handleAddDocument}
            />
          )}

          {activeTab === 'digital-twin' && (
            <CareerDigitalTwinView
              profile={profile}
              setActiveTab={setActiveTab}
            />
          )}
        </main>
      </div>
    </div>
  );
}
