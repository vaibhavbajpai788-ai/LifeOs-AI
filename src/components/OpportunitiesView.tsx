import React, { useState } from 'react';
import { OpportunityItem, JobApplication, ApplicationStatus } from '../types';
import {
  Briefcase,
  ExternalLink,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building,
  MapPin,
  Calendar,
  Check,
} from 'lucide-react';

interface OpportunitiesViewProps {
  opportunities: OpportunityItem[];
  applications: JobApplication[];
  onApplyOpportunity: (oppId: string) => void;
  onAddApplication: (app: JobApplication) => void;
  onUpdateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  targetRole: string;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  opportunities,
  applications,
  onApplyOpportunity,
  onAddApplication,
  onUpdateApplicationStatus,
  targetRole,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'opportunities' | 'tracker'>('opportunities');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Internship' | 'Full-time' | 'Hackathon'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Application Form State
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState(targetRole);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Applied');
  const [newSalary, setNewSalary] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const filteredOpportunities = opportunities.filter((opp) => {
    if (typeFilter === 'all') return true;
    return opp.type === typeFilter;
  });

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) return;

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      company: newCompany.trim(),
      role: newRole.trim(),
      dateApplied: new Date().toISOString().split('T')[0],
      status: newStatus,
      salaryRange: newSalary.trim() || undefined,
      notes: newNotes.trim() || 'Direct application tracked via LifeOS.',
    };

    onAddApplication(newApp);
    setNewCompany('');
    setNewNotes('');
    setNewSalary('');
    setShowAddModal(false);
  };

  const statusColumns: ApplicationStatus[] = [
    'Saved',
    'Applied',
    'Assessment',
    'Interview',
    'Offer',
    'Rejected',
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Modules 11 & 12</span>
            <span aria-hidden="true">·</span>
            <span>Opportunity Intelligence & Pipeline Tracker</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Career Pipeline & Market Radar
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time job matching calibrated to your current skillset and active application pipeline.
          </p>
        </div>

        {/* Subtab Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('opportunities')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'opportunities'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Curated Opportunities ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveSubTab('tracker')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeSubTab === 'tracker'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Application Tracker ({applications.length})
          </button>
        </div>
      </div>

      {/* SUBTAB 1: CURATED OPPORTUNITIES */}
      {activeSubTab === 'opportunities' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Filter by:</span>
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  typeFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTypeFilter('Internship')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  typeFilter === 'Internship' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Internships
              </button>
              <button
                onClick={() => setTypeFilter('Full-time')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  typeFilter === 'Full-time' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Full-time
              </button>
              <button
                onClick={() => setTypeFilter('Hackathon')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  typeFilter === 'Hackathon' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Hackathons
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="space-y-3.5">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5 text-xs text-slate-400">
                    <span className="font-semibold text-white">{opp.company}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{opp.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{opp.type}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-indigo-300 font-medium">{opp.stipendOrSalary}</span>
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {opp.title}
                  </h3>

                  {/* Skills Match Overview */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs pt-1">
                    <span className="text-slate-400">Matched:</span>
                    {opp.matchedSkills.map((s, i) => (
                      <span key={i} className="text-emerald-400 font-medium">
                        ✓ {s}
                      </span>
                    ))}
                    {opp.missingSkills.length > 0 && (
                      <>
                        <span className="text-slate-600">|</span>
                        <span className="text-slate-400">Missing:</span>
                        {opp.missingSkills.map((s, i) => (
                          <span key={i} className="text-amber-400 font-medium">
                            ✗ {s}
                          </span>
                        ))}
                      </>
                    )}
                  </div>

                  <div className="text-xs text-slate-400 pt-1">
                    <span className="text-indigo-400 font-semibold">AI Recommendation:</span>{' '}
                    {opp.recommendedAction}
                  </div>
                </div>

                {/* Match Score & Action */}
                <div className="flex items-center gap-5 shrink-0 self-end lg:self-center">
                  <div className="text-center p-3 bg-slate-950 rounded-lg border border-slate-800 min-w-[95px]">
                    <div className="text-[10px] text-slate-400">Match Score</div>
                    <div
                      className={`text-xl font-bold font-mono tabular-nums ${
                        opp.matchScore >= 80 ? 'text-emerald-400' : 'text-indigo-400'
                      }`}
                    >
                      {opp.matchScore}%
                    </div>
                  </div>

                  <button
                    onClick={() => onApplyOpportunity(opp.id)}
                    className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      opp.applied
                        ? 'bg-slate-800 text-slate-400 cursor-default'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30'
                    }`}
                  >
                    {opp.applied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>In Tracker</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Track Application</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: APPLICATION TRACKER PIPELINE */}
      {activeSubTab === 'tracker' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Pipeline stages: Saved → Applied → Assessment → Interview → Offer / Rejected
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Application</span>
            </button>
          </div>

          {/* Pipeline Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
            {statusColumns.map((colStatus) => {
              const colApps = applications.filter((a) => a.status === colStatus);
              return (
                <div
                  key={colStatus}
                  className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col min-w-[200px]"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs font-semibold">
                    <span className="text-slate-300">{colStatus}</span>
                    <span className="font-mono text-slate-500 text-[11px] tabular-nums">
                      {colApps.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1 min-h-[260px]">
                    {colApps.map((app) => (
                      <div
                        key={app.id}
                        className="p-3 bg-slate-950 rounded-lg border border-slate-800/90 space-y-2 text-xs"
                      >
                        <div>
                          <div className="font-semibold text-white">{app.company}</div>
                          <div className="text-slate-400 text-[11px] truncate">{app.role}</div>
                        </div>

                        {app.salaryRange && (
                          <div className="font-mono text-[11px] text-indigo-300">
                            {app.salaryRange}
                          </div>
                        )}

                        <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-900">
                          <span>{app.dateApplied}</span>
                          {app.interviewDate && (
                            <span className="text-amber-400 font-medium">
                              {app.interviewDate}
                            </span>
                          )}
                        </div>

                        {/* Status Mover Selector */}
                        <div className="pt-1">
                          <select
                            value={app.status}
                            onChange={(e) =>
                              onUpdateApplicationStatus(app.id, e.target.value as ApplicationStatus)
                            }
                            className="w-full px-2 py-1 text-[11px] bg-slate-900 border border-slate-800 rounded text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                          >
                            {statusColumns.map((st) => (
                              <option key={st} value={st}>
                                → {st}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Log Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Log Job Application</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Stripe, Swiggy, Google"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Role Title</label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    {statusColumns.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Compensation</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="e.g. ₹15 LPA"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Notes & Next Steps</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Referral from LinkedIn alumni, online assessment next week"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
