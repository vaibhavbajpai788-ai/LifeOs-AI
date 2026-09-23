import React, { useState } from 'react';
import { ResumeAnalysis } from '../types';
import { sampleResumeText } from '../data/initialData';
import {
  Sparkles,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';

interface ResumeAnalyzerViewProps {
  initialAnalysis: ResumeAnalysis;
  targetRole: string;
}

export const ResumeAnalyzerView: React.FC<ResumeAnalyzerViewProps> = ({
  initialAnalysis,
  targetRole,
}) => {
  const [resumeText, setResumeText] = useState(sampleResumeText);
  const [analysis, setAnalysis] = useState<ResumeAnalysis>(initialAnalysis);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState<number | null>(null);

  const handleAnalyzeResume = async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/resume/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, targetRole }),
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      }
    } catch (err) {
      console.error('Failed to analyze resume:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  const scoreItems = [
    { label: 'Technical Skills', value: analysis.scores.technicalSkills },
    { label: 'Projects', value: analysis.scores.projects },
    { label: 'Experience', value: analysis.scores.experience },
    { label: 'ATS Keywords', value: analysis.scores.atsKeywords },
    { label: 'Overall Profile', value: analysis.scores.overall },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Resume Intelligence</h1>
          <p className="text-sm text-slate-400 mt-1">
            Module 5: Diagnostic analysis for ATS compatibility, technical impact quantification, and keyword coverage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setResumeText(sampleResumeText)}
            className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Reset Sample
          </button>
          <button
            onClick={handleAnalyzeResume}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30 cursor-pointer disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning Resume...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze with AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resume Input Editor */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Resume Text Source</span>
          </div>
          <span className="text-slate-400">Target Role: <span className="text-indigo-300 font-medium">{targetRole}</span></span>
        </div>
        <textarea
          rows={6}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste full resume markdown or plain text here..."
          className="w-full px-3.5 py-3 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Resume Diagnostic Scores Card */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
        <div>
          <h2 className="text-base font-semibold text-white">Diagnostic Scorecard</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Diagnostic index calibrated for tier-1 tech recruiting filters and ATS parsers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {scoreItems.map((item) => (
            <div
              key={item.label}
              className={`p-3.5 rounded-lg border text-center ${
                item.label === 'Overall Profile'
                  ? 'bg-indigo-950/40 border-indigo-500/40'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="text-[11px] text-slate-400 truncate">{item.label}</div>
              <div
                className={`text-2xl font-bold font-mono tabular-nums mt-1 ${
                  item.value >= 80
                    ? 'text-emerald-400'
                    : item.value >= 70
                    ? 'text-indigo-400'
                    : 'text-amber-400'
                }`}
              >
                {item.value}%
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full rounded-full ${
                    item.value >= 80
                      ? 'bg-emerald-500'
                      : item.value >= 70
                      ? 'bg-indigo-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* AI Summary Prose */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-indigo-400">Diagnostic Summary: </span>
          {analysis.summary}
        </div>
      </div>

      {/* Strengths, Critical Gaps, and Missing ATS Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strengths */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Strengths</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Critical Gaps */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Improvement Areas</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {analysis.criticalGaps.map((g, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">✗</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Keywords */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-sm text-white">Missing ATS Keywords</div>
            <span className="text-[11px] font-mono text-slate-400">Essential for {targetRole}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.missingKeywords.map((kw, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(kw);
                  setResumeText((prev) =>
                    prev.includes(kw)
                      ? prev
                      : prev + `\n- Technical Experience: Proficient in ${kw}`
                  );
                  setCopiedBulletIdx(1000 + i);
                  setTimeout(() => setCopiedBulletIdx(null), 1800);
                }}
                className="px-2.5 py-1 bg-slate-950 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/50 rounded text-xs font-mono text-indigo-300 transition-colors cursor-pointer flex items-center gap-1 group"
                title={`Click to copy & append "${kw}" to resume draft`}
              >
                {copiedBulletIdx === 1000 + i ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">{kw} Added!</span>
                  </>
                ) : (
                  <>
                    <span className="text-indigo-400 group-hover:text-indigo-200">+</span>
                    <span>{kw}</span>
                  </>
                )}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Click any keyword to instantly copy and inject into your resume text source above.
          </p>
        </div>
      </div>

      {/* Bullet-by-Bullet Quantified Rewriter */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-white">Quantified Bullet-by-Bullet Rewriter</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Transform generic statements into high-impact Google XYZ bullet points (Accomplished [X] as measured by [Y] by doing [Z]).
          </p>
        </div>

        <div className="space-y-4">
          {analysis.bulletImprovements.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-slate-950 border border-slate-800/90 space-y-2.5"
            >
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Original Bullet
                </div>
                <div className="text-xs text-slate-400 line-through mt-0.5">
                  &ldquo;{item.original}&rdquo;
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">
                    Optimized High-Impact Rewrite
                  </span>
                  <button
                    onClick={() => handleCopyBullet(item.improved, idx)}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    {copiedBulletIdx === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-xs text-white font-medium leading-relaxed">
                  &ldquo;{item.improved}&rdquo;
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  <span className="text-indigo-400 font-semibold">Why this works:</span> {item.reason}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
