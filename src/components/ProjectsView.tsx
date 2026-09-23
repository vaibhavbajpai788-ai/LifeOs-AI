import React, { useState } from 'react';
import { ProjectSpec, ProjectTask } from '../types';
import {
  FolderKanban,
  Sparkles,
  Layers,
  Database,
  Terminal,
  Code2,
  Copy,
  Check,
  Plus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  FileCode,
} from 'lucide-react';

interface ProjectsViewProps {
  projectSpec: ProjectSpec;
  onUpdateProjectSpec: (updated: ProjectSpec) => void;
  targetRole: string;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projectSpec,
  onUpdateProjectSpec,
  targetRole,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'kanban' | 'blueprint' | 'readme'>('kanban');
  const [projectPrompt, setProjectPrompt] = useState(
    'Give me an industry-grade Full Stack monitoring & API telemetry project that will prove my Node.js, PostgreSQL and Docker skills.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [copiedResumeBullet, setCopiedResumeBullet] = useState<number | null>(null);

  // New task state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Backend');
  const [showAddTask, setShowAddTask] = useState(false);

  const handleGenerateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/project/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: projectPrompt,
          targetRole,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onUpdateProjectSpec(data);
      }
    } catch (err) {
      console.error('Failed to generate project:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMoveTaskStatus = (taskId: string, newStatus: ProjectTask['status']) => {
    const updatedTasks = projectSpec.developmentTasks.map((t) =>
      t.id === taskId ? { ...t, status: newStatus } : t
    );
    onUpdateProjectSpec({ ...projectSpec, developmentTasks: updatedTasks });
  };

  const handleCreateCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: ProjectTask = {
      id: `custom-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      status: 'TODO',
    };
    onUpdateProjectSpec({
      ...projectSpec,
      developmentTasks: [...projectSpec.developmentTasks, newTask],
    });
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(projectSpec.githubReadme);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedResumeBullet(idx);
    setTimeout(() => setCopiedResumeBullet(null), 2000);
  };

  const todoTasks = projectSpec.developmentTasks.filter((t) => t.status === 'TODO');
  const inProgressTasks = projectSpec.developmentTasks.filter((t) => t.status === 'IN PROGRESS');
  const completedTasks = projectSpec.developmentTasks.filter((t) => t.status === 'COMPLETED');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Modules 8 & 9</span>
            <span aria-hidden="true">·</span>
            <span>Project Generator & Execution System</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {projectSpec.projectName}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{projectSpec.tagline}</p>
        </div>

        {/* Subtab Segmented Control (Interactive Filter Tabs) */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('kanban')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'kanban'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Execution Kanban
          </button>
          <button
            onClick={() => setActiveSubTab('blueprint')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'blueprint'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Architecture Blueprint
          </button>
          <button
            onClick={() => setActiveSubTab('readme')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'readme'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Resume & README
          </button>
        </div>
      </div>

      {/* AI Project Idea Generator Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
        <form onSubmit={handleGenerateProject} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={projectPrompt}
              onChange={(e) => setProjectPrompt(e.target.value)}
              placeholder="Ask AI for a project: 'Give me a project to improve my resume for Full Stack roles...'"
              className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isGenerating}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30 shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Designing Project...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Project Spec</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* SUBTAB 1: KANBAN EXECUTION BOARD */}
      {activeSubTab === 'kanban' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Breakdown of development milestones from setup to cloud deployment:
            </div>
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Milestone</span>
            </button>
          </div>

          {showAddTask && (
            <form onSubmit={handleCreateCustomTask} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Milestone title (e.g. Add rate-limiting with Redis)"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-md text-white focus:outline-none focus:border-indigo-500"
                    autoFocus
                  />
                </div>
                <div>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-md text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Auth">Auth</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Testing">Testing</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md"
                >
                  Add Milestone
                </button>
              </div>
            </form>
          )}

          {/* 3 Columns Kanban */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: TODO */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    TODO
                  </span>
                </div>
                <span className="font-mono text-xs text-slate-500 tabular-nums">
                  {todoTasks.length}
                </span>
              </div>

              <div className="space-y-2.5 min-h-[300px]">
                {todoTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-medium text-slate-200">{task.title}</div>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                      <span>{task.category}</span>
                      <button
                        onClick={() => handleMoveTaskStatus(task.id, 'IN PROGRESS')}
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium cursor-pointer"
                        title="Move to In Progress"
                      >
                        <span>Start</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: IN PROGRESS */}
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-indigo-500/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                    IN PROGRESS
                  </span>
                </div>
                <span className="font-mono text-xs text-indigo-400 tabular-nums">
                  {inProgressTasks.length}
                </span>
              </div>

              <div className="space-y-2.5 min-h-[300px]">
                {inProgressTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-slate-950 rounded-lg border border-indigo-500/40 space-y-2"
                  >
                    <div className="text-xs font-medium text-white">{task.title}</div>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <button
                        onClick={() => handleMoveTaskStatus(task.id, 'TODO')}
                        className="text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                      >
                        <ArrowLeft className="w-3 h-3" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={() => handleMoveTaskStatus(task.id, 'COMPLETED')}
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <span>Complete</span>
                        <CheckCircle2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: COMPLETED */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    COMPLETED
                  </span>
                </div>
                <span className="font-mono text-xs text-emerald-400 tabular-nums">
                  {completedTasks.length}
                </span>
              </div>

              <div className="space-y-2.5 min-h-[300px]">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 space-y-2"
                  >
                    <div className="text-xs font-medium text-slate-400 line-through">
                      {task.title}
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                      <span>{task.category}</span>
                      <button
                        onClick={() => handleMoveTaskStatus(task.id, 'IN PROGRESS')}
                        className="text-slate-500 hover:text-slate-300 cursor-pointer"
                      >
                        Reopen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: ARCHITECTURE BLUEPRINT */}
      {activeSubTab === 'blueprint' && (
        <div className="space-y-6">
          {/* Tech Stack Grid */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-base font-semibold text-white">Full-Stack Tech Architecture</h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">Frontend</div>
                <div className="text-xs font-medium text-slate-200 mt-1">{projectSpec.techStack.frontend}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">Backend</div>
                <div className="text-xs font-medium text-slate-200 mt-1">{projectSpec.techStack.backend}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">Database</div>
                <div className="text-xs font-medium text-slate-200 mt-1">{projectSpec.techStack.database}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">DevOps & Deploy</div>
                <div className="text-xs font-medium text-slate-200 mt-1">{projectSpec.techStack.devops}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[11px] text-slate-400">Authentication</div>
                <div className="text-xs font-medium text-slate-200 mt-1">{projectSpec.techStack.auth}</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 pt-1 leading-relaxed">
              {projectSpec.architectureOverview}
            </p>
          </div>

          {/* Database Schema Tables */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-semibold text-white">Database Schema Design</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectSpec.databaseSchema.map((schema, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-mono text-xs font-bold text-indigo-300 pb-1 border-b border-slate-800">
                    table: {schema.table}
                  </div>
                  <ul className="space-y-1 font-mono text-[11px] text-slate-400">
                    {schema.columns.map((col, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-1.5">
                        <span className="text-slate-600">▪</span>
                        <span>{col}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* REST API Endpoints Table */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h2 className="text-base font-semibold text-white">RESTful API Contract</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">Method</th>
                    <th className="py-2.5 px-3">Endpoint Path</th>
                    <th className="py-2.5 px-3">Purpose & Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {projectSpec.apiEndpoints.map((ep, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/40">
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                            ep.method === 'GET'
                              ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/30'
                              : 'text-indigo-400 bg-indigo-950/60 border border-indigo-500/30'
                          }`}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-200">{ep.path}</td>
                      <td className="py-2.5 px-3 font-sans text-slate-400">{ep.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: RESUME BULLETS & GITHUB README */}
      {activeSubTab === 'readme' && (
        <div className="space-y-6">
          {/* Resume Bullets */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-white">
                Ready-to-Paste Resume Bullets
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Quantified, recruiter-vetted bullet points formatted for your Project section.
              </p>
            </div>

            <div className="space-y-2.5">
              {projectSpec.resumeDescription.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="text-slate-200 leading-relaxed">
                    <span className="text-indigo-400 font-bold mr-2">•</span>
                    {bullet}
                  </div>
                  <button
                    onClick={() => handleCopyBullet(bullet, idx)}
                    className="text-slate-400 hover:text-white p-1 shrink-0 transition-colors cursor-pointer"
                    title="Copy bullet"
                  >
                    {copiedResumeBullet === idx ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub README Preview & Exporter */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <h2 className="text-base font-semibold text-white">GitHub README.md Generator</h2>
              </div>

              <button
                onClick={handleCopyReadme}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                {copiedReadme ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Markdown</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[420px]">
              {projectSpec.githubReadme}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
