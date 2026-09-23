import React, { useState } from 'react';
import { UserProfile, ModuleTab } from '../types';
import {
  Orbit,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  BrainCircuit,
  ArrowRight,
  Activity,
  Sliders,
} from 'lucide-react';

interface CareerDigitalTwinViewProps {
  profile: UserProfile;
  setActiveTab: (tab: ModuleTab) => void;
}

export const CareerDigitalTwinView: React.FC<CareerDigitalTwinViewProps> = ({
  profile,
  setActiveTab,
}) => {
  const [simulateNode, setSimulateNode] = useState(true);
  const [simulateDocker, setSimulateDocker] = useState(true);
  const [simulateSystemDesign, setSimulateSystemDesign] = useState(false);

  // Dynamic simulation calculation
  let simulatedScore = 74;
  if (simulateNode) simulatedScore += 5;
  if (simulateDocker) simulatedScore += 4;
  if (simulateSystemDesign) simulatedScore += 6;

  const radarMetrics = [
    { label: 'Core CS Fundamentals', value: 85, benchmark: 80 },
    { label: 'Frontend Engineering', value: 88, benchmark: 75 },
    { label: 'Backend Systems', value: simulateNode ? 72 : 58, benchmark: 75 },
    { label: 'Cloud & DevOps', value: simulateDocker ? 62 : 42, benchmark: 70 },
    { label: 'System Design', value: simulateSystemDesign ? 70 : 52, benchmark: 65 },
    { label: 'Interview Readiness', value: simulateNode && simulateDocker ? 78 : 66, benchmark: 75 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Module 14</span>
            <span aria-hidden="true">·</span>
            <span>Predictive Career Digital Twin</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Career Digital Twin Engine
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Continuously updated neural model representing your skills, learning velocity, cognitive strengths, and market readiness.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-950/40 border border-indigo-500/30 px-3 py-1.5 rounded-lg">
          <Orbit className="w-4 h-4 animate-spin-slow" />
          <span>Synchronized with 7 active profile vectors</span>
        </div>
      </div>

      {/* Hero Visual & Readiness Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Twin Avatar & Network Visualization */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 uppercase tracking-wider">
                Neural Model Topology
              </span>
              <span className="font-mono text-indigo-400">ID: DT-9842</span>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 aspect-[4/3]">
              <img
                src="/src/assets/images/career_digital_twin_art_1790160028909.jpg"
                alt="Career Digital Twin interconnected network visualization"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-4">
                <div>
                  <div className="text-xs font-semibold text-white">
                    {profile.name} · Digital Twin v1.4
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Calibrated for {profile.targetRole}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Twin Cognitive Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-500 text-[10px] uppercase">Learning Velocity</div>
              <div className="font-mono text-emerald-400 font-bold mt-0.5">1.25x Cohort</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-500 text-[10px] uppercase">Sprint Streak</div>
              <div className="font-mono text-amber-400 font-bold mt-0.5">5 Consecutive Days</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-500 text-[10px] uppercase">Core Strength</div>
              <div className="text-slate-300 truncate mt-0.5">React & Algorithms</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-slate-500 text-[10px] uppercase">Primary Growth Gap</div>
              <div className="text-indigo-400 truncate mt-0.5">Node.js + Docker</div>
            </div>
          </div>
        </div>

        {/* Right: Competency Radar Metrics & Benchmarking */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">6-Axis Market Readiness Matrix</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time assessment against {profile.targetRole} hiring expectations.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">Baseline: 75%</span>
          </div>

          <div className="space-y-3.5 pt-1">
            {radarMetrics.map((m) => (
              <div key={m.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-medium">{m.label}</span>
                  <span className="font-mono tabular-nums text-slate-400">
                    <span
                      className={`font-semibold ${
                        m.value >= m.benchmark ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {m.value}%
                    </span>{' '}
                    <span className="text-slate-600">/ {m.benchmark}% target</span>
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      m.value >= m.benchmark ? 'bg-emerald-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Core CS & Frontend exceed tier-1 fresher benchmarks.</span>
            </span>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="text-indigo-400 hover:text-indigo-300 cursor-pointer flex items-center gap-1"
            >
              <span>Bridge Backend Gaps</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Future Simulation Engine (From Module 14 Spec) */}
      <div className="p-6 rounded-xl bg-indigo-950/30 border border-indigo-500/40 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300">
              <Zap className="w-4 h-4" />
              <span>Future Trajectory Simulation</span>
            </div>
            <h2 className="text-base font-bold text-white">
              Simulate Sprint Impact on Job Readiness
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              &ldquo;अगर तुम 2 week Node.js और Docker पढ़ोगे तो तुम्हारी job readiness 74% से 83% हो जाएगी।&rdquo;
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center shrink-0 min-w-[130px]">
            <div className="text-[11px] text-slate-400">Projected Readiness</div>
            <div className="text-3xl font-bold font-mono tabular-nums text-emerald-400 mt-0.5">
              {simulatedScore}%
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
              +{simulatedScore - 74}% Growth
            </div>
          </div>
        </div>

        {/* Interactive Simulation Switches */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <label
            className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
              simulateNode
                ? 'bg-slate-900 border-indigo-500 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="space-y-0.5">
              <div className="text-xs font-semibold">Node.js & JWT Auth</div>
              <div className="text-[11px] text-slate-400">+5% Market Readiness</div>
            </div>
            <input
              type="checkbox"
              checked={simulateNode}
              onChange={(e) => setSimulateNode(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700"
            />
          </label>

          <label
            className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
              simulateDocker
                ? 'bg-slate-900 border-indigo-500 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="space-y-0.5">
              <div className="text-xs font-semibold">Docker Containerization</div>
              <div className="text-[11px] text-slate-400">+4% Market Readiness</div>
            </div>
            <input
              type="checkbox"
              checked={simulateDocker}
              onChange={(e) => setSimulateDocker(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700"
            />
          </label>

          <label
            className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
              simulateSystemDesign
                ? 'bg-slate-900 border-indigo-500 text-white'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}
          >
            <div className="space-y-0.5">
              <div className="text-xs font-semibold">System Design Sprint</div>
              <div className="text-[11px] text-slate-400">+6% Market Readiness</div>
            </div>
            <input
              type="checkbox"
              checked={simulateSystemDesign}
              onChange={(e) => setSimulateSystemDesign(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700"
            />
          </label>
        </div>

        {/* Projected Impact Callout */}
        <div className="p-4 bg-slate-950/80 rounded-lg border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-semibold text-white">Projected Recruiter Callback Surge:</span>
            <p className="text-slate-300">
              Reaching <span className="font-mono text-emerald-400 font-semibold">{simulatedScore}%</span> market readiness unlocks eligibility for <span className="font-semibold text-white">88% of tech startup openings</span> in Bengaluru and remote listings.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30 shrink-0 cursor-pointer"
          >
            Execute This Sprint
          </button>
        </div>
      </div>
    </div>
  );
};
