import React, { useState } from 'react';
import { UserSkill, SkillGapAnalysis, ModuleTab } from '../types';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Clock,
  Briefcase,
  Layers,
  RefreshCw,
  Plus,
  Check,
} from 'lucide-react';

interface SkillGapViewProps {
  currentSkills: UserSkill[];
  targetRole: string;
  onAddTask?: (title: string, category: string) => void;
  setActiveTab?: (tab: ModuleTab) => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  currentSkills,
  targetRole,
  onAddTask,
  setActiveTab,
}) => {
  const defaultJd = `Role: Full Stack Software Engineer (Fresher / Early Career)
Company: High-Growth FinTech Startup
Location: Bengaluru / Hybrid

Required Technical Stack:
- Strong proficiency in modern JavaScript / TypeScript and React.js
- Solid backend fundamentals in Node.js and Express
- Database experience with relational SQL (PostgreSQL / MySQL) and NoSQL (MongoDB)
- Understanding of containerization with Docker
- Basic awareness of Cloud deployment pipelines (AWS EC2 / S3 / Lambda)
- Familiarity with Git version control, GitHub workflows, and RESTful API design`;

  const [jobDescription, setJobDescription] = useState(defaultJd);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [addedTaskSkill, setAddedTaskSkill] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SkillGapAnalysis>({
    matchPercentage: 62,
    matchedSkills: ['React 19 & Hooks', 'JavaScript (ES6+)', 'SQL & Database Design', 'Git & GitHub Workflows'],
    missingSkills: ['Node.js & Express', 'MongoDB / NoSQL', 'Docker & Containers', 'AWS Cloud Basics'],
    priorityBreakdown: [
      {
        priority: 1,
        skill: 'Node.js & Express',
        reason: 'Required for writing server-side logic and handling API endpoints in 90% of Full Stack listings.',
        timeToLearn: '2 weeks',
        recommendedResource: 'Build REST APIs with JWT authentication and middleware verification.',
      },
      {
        priority: 2,
        skill: 'MongoDB / NoSQL Database',
        reason: 'Essential document datastore for dynamic JSON payloads and modern MERN architecture.',
        timeToLearn: '1 week',
        recommendedResource: 'Study Mongoose schemas, document references, and aggregation pipelines.',
      },
      {
        priority: 3,
        skill: 'Docker & Containers',
        reason: 'Industry baseline for ensuring reproducible runtime environments and easy deployment.',
        timeToLearn: '1 week',
        recommendedResource: 'Containerize your React client and Node backend in a single docker-compose setup.',
      },
      {
        priority: 4,
        skill: 'AWS Cloud Basics',
        reason: 'Needed to host production web applications on EC2, S3 bucket assets, and configure DNS.',
        timeToLearn: '1-2 weeks',
        recommendedResource: 'Deploy your containerized project to an AWS EC2 instance with Nginx and SSL.',
      },
    ],
    overallVerdict: 'Moderate Gap - High Conversion Potential',
    readinessTimeline: '4 - 6 weeks',
    strategySummary: 'You have solid frontend foundations. By dedicating the next 4 weeks to Node.js backend architecture and containerization, you will match 90%+ of requirements for this role.',
  });

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/skill-gap/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          userSkills: currentSkills,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      }
    } catch (err) {
      console.error('Failed to run skill gap analysis:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const setPresetJd = (presetType: string) => {
    if (presetType === 'fullstack') {
      setJobDescription(defaultJd);
    } else if (presetType === 'backend') {
      setJobDescription(`Role: Backend Software Engineer
Company: Cloud Data Infrastructure
Location: Remote

Required Qualifications:
- Proficiency in Java or Python with strong Object-Oriented Design & Data Structures
- Deep understanding of Relational Databases (PostgreSQL) and schema indexing
- Experience designing scalable REST APIs and handling concurrency
- Familiarity with Message Queues (Kafka / RabbitMQ) and Redis caching
- Hands-on experience with Docker, Linux CLI, and CI/CD automation`);
    } else if (presetType === 'frontend') {
      setJobDescription(`Role: Frontend Engineer - Web Platform
Company: SaaS Unicorn
Location: Bengaluru

Requirements:
- Advanced proficiency in modern JavaScript, TypeScript, and React (Hooks, Context, Profiling)
- Deep understanding of browser rendering lifecycle, Web Performance metrics (Core Web Vitals), and responsive CSS
- Experience integrating REST & GraphQL APIs with client-side state
- Unit and integration testing using Vitest / Jest / Testing Library
- Strong Git collaboration skills and code review discipline`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">AI Skill Gap Analyzer</h1>
          <p className="text-sm text-slate-400 mt-1">
            Module 6: Instant comparison between your profile and target job descriptions with prioritized skill sequencing.
          </p>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30 cursor-pointer disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Skill Gaps...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Compare Skills with AI</span>
            </>
          )}
        </button>
      </div>

      {/* Preset JD Selectors */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400">Load sample role:</span>
        <button
          onClick={() => setPresetJd('fullstack')}
          className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors cursor-pointer"
        >
          Full Stack Dev (Fintech)
        </button>
        <button
          onClick={() => setPresetJd('backend')}
          className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors cursor-pointer"
        >
          Backend Engineer (Cloud)
        </button>
        <button
          onClick={() => setPresetJd('frontend')}
          className="px-2.5 py-1 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors cursor-pointer"
        >
          Frontend Platform (SaaS)
        </button>
      </div>

      {/* JD Input */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Job Description / Requirement Specification</span>
          </div>
          <span className="text-slate-400">Target Role: <span className="text-indigo-300">{targetRole}</span></span>
        </div>
        <textarea
          rows={5}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste any target job description here..."
          className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Verdict & Match Gauge */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Job Compatibility Verdict
          </div>
          <div className="text-lg font-bold text-white flex items-center gap-2">
            <span>{analysis.overallVerdict}</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            {analysis.strategySummary}
          </p>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-400">Est. Timeline to Close Gap</div>
            <div className="text-sm font-semibold text-indigo-400 flex items-center gap-1.5 justify-end mt-0.5">
              <Clock className="w-4 h-4" />
              <span>{analysis.readinessTimeline}</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-center min-w-[110px]">
            <div className="text-[11px] text-slate-400">Match Score</div>
            <div className="text-2xl font-bold font-mono tabular-nums text-indigo-400 mt-0.5">
              {analysis.matchPercentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Your Skills (✓) vs Missing Skills (✗) - Clean 2-column view */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Matched Skills */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Your Skills (Matched)</span>
            </div>
            <span className="text-xs text-slate-400 font-mono tabular-nums">
              {analysis.matchedSkills.length} matches
            </span>
          </div>
          <div className="space-y-2">
            {analysis.matchedSkills.map((skill, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200"
              >
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
              <XCircle className="w-4 h-4" />
              <span>Missing Requirements</span>
            </div>
            <span className="text-xs text-slate-400 font-mono tabular-nums">
              {analysis.missingSkills.length} gaps
            </span>
          </div>
          <div className="space-y-2">
            {analysis.missingSkills.map((skill, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200"
              >
                <span className="text-amber-400 font-bold">✗</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Breakdown (Priority 1 -> Priority 4) */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <div>
            <h2 className="text-base font-semibold text-white">AI Skill Prioritization Hierarchy</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Sequence in which you should learn missing technologies to maximize immediate hiring ROI.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {analysis.priorityBreakdown.map((item) => (
            <div
              key={item.priority}
              className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-md bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-mono font-bold text-indigo-300 shrink-0 mt-0.5">
                  P{item.priority}
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>Priority {item.priority} → {item.skill}</span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    {item.reason}
                  </p>
                  <div className="text-[11px] text-slate-400 pt-1">
                    <span className="text-indigo-400 font-semibold">Recommended Practice:</span> {item.recommendedResource}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs shrink-0 self-end md:self-center">
                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Time to Bridge</div>
                  <div className="font-mono text-white font-medium">{item.timeToLearn}</div>
                </div>

                <div className="flex items-center gap-2">
                  {onAddTask && (
                    <button
                      type="button"
                      onClick={() => {
                        onAddTask(`Study & build project with ${item.skill}`, 'Technical Skill');
                        setAddedTaskSkill(item.skill);
                        setTimeout(() => setAddedTaskSkill(null), 2500);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 cursor-pointer transition-colors"
                      title="Add this skill task to Today's Action Plan"
                    >
                      {addedTaskSkill === item.skill ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Added to Today!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Plan</span>
                        </>
                      )}
                    </button>
                  )}

                  {setActiveTab && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('roadmap')}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                      title="View in Career Roadmap"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
