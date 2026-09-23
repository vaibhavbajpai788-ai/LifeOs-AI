import React, { useState } from 'react';
import { BrainDocument } from '../types';
import {
  BookOpen,
  Search,
  UploadCloud,
  FileText,
  Sparkles,
  ExternalLink,
  Plus,
  RefreshCw,
  FolderLock,
  Tag,
} from 'lucide-react';

interface KnowledgeBrainViewProps {
  documents: BrainDocument[];
  onAddDocument: (doc: BrainDocument) => void;
}

export const KnowledgeBrainView: React.FC<KnowledgeBrainViewProps> = ({
  documents,
  onAddDocument,
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [ragAnswer, setRagAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<{ title: string; type: string }[]>([]);
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [selectedDocForRead, setSelectedDocForRead] = useState<BrainDocument | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // New Doc Form
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState<BrainDocument['type']>('Notes');
  const [newDocContent, setNewDocContent] = useState('');
  const [newDocTags, setNewDocTags] = useState('React, Architecture');

  const sampleQueries = [
    'Mere DBMS notes me normalization kaise explain kiya gaya hai?',
    'What are the ACID properties and transaction isolation levels?',
    'Explain difference between horizontal vs vertical scaling and caching strategies',
    'What are the 4 Coffman conditions for deadlock in Operating Systems?',
  ];

  const handleQuery = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const queryText = (customQuery || query).trim();
    if (!queryText || isSearching) return;

    if (customQuery) setQuery(customQuery);
    setIsSearching(true);
    setRagAnswer(null);

    try {
      const res = await fetch('/api/brain/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          documents,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRagAnswer(data.answer);
        setSources(data.sources || []);
      }
    } catch (err) {
      console.error('Failed to query knowledge brain:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim() || !newDocContent.trim()) return;

    const newDoc: BrainDocument = {
      id: `doc-${Date.now()}`,
      title: newDocTitle.trim(),
      type: newDocType,
      size: `${Math.round(newDocContent.length / 100)} KB`,
      tags: newDocTags.split(',').map((t) => t.trim()),
      summary: newDocContent.slice(0, 150) + '...',
      contentSnippet: newDocContent,
      uploadedDate: new Date().toISOString().split('T')[0],
    };

    onAddDocument(newDoc);
    setNewDocTitle('');
    setNewDocContent('');
    setShowAddDocModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Module 13</span>
            <span aria-hidden="true">·</span>
            <span>Personal Knowledge Brain (RAG Engine)</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Personal Knowledge Brain
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Vector-indexed semantic repository of your academic notes, PDFs, course materials, and interview prep sheets.
          </p>
        </div>

        <button
          onClick={() => setShowAddDocModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm shadow-indigo-600/30 cursor-pointer self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Notes / Doc</span>
        </button>
      </div>

      {/* RAG Query Console */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
          <Sparkles className="w-4 h-4" />
          <span>Semantic Q&A Over Uploaded Material</span>
        </div>

        <form onSubmit={handleQuery} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything from your uploaded study notes (e.g. 'Mere DBMS notes me normalization kaise explain kiya gaya hai?')..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors disabled:opacity-50 shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Searching Brain...</span>
              </>
            ) : (
              <span>Query Brain</span>
            )}
          </button>
        </form>

        {/* Query Presets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 shrink-0 text-[11px]">Quick Prompts:</span>
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuery(undefined, q)}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Synthesized Answer Output */}
        {ragAnswer && (
          <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <BookOpen className="w-4 h-4" />
                <span>RAG Synthesized Answer with Document Grounding</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Grounded Context</span>
            </div>

            <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
              {ragAnswer}
            </div>

            {sources.length > 0 && (
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Verified Sources:</span>
                {sources.slice(0, 3).map((src, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800 text-indigo-300 font-mono"
                  >
                    [{src.type}] {src.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Indexed Documents Library */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Indexed Documents & Knowledge Base</h2>
          <span className="text-xs text-slate-400 font-mono tabular-nums">
            {documents.length} documents vectorized
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDocForRead(doc)}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer group"
              title="Click to read full vectorized notes"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-[10px] text-indigo-300">
                    {doc.type}
                  </span>
                  <span className="font-mono tabular-nums">{doc.size}</span>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {doc.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1 truncate max-w-[170px]">
                  <Tag className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">{doc.tags.join(', ')}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDocForRead(doc);
                  }}
                  className="text-indigo-400 group-hover:text-indigo-300 font-medium hover:underline text-[11px] cursor-pointer"
                >
                  Read Doc →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View/Read Document Snippet Modal */}
      {selectedDocForRead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-indigo-300">
                    {selectedDocForRead.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Indexed {selectedDocForRead.uploadedDate} · {selectedDocForRead.size}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {selectedDocForRead.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocForRead(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedDocForRead.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Full Vector Snippet / Notes
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[340px] overflow-y-auto">
                {selectedDocForRead.contentSnippet}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(selectedDocForRead.contentSnippet);
                  setCopiedSnippet(true);
                  setTimeout(() => setCopiedSnippet(false), 2000);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                {copiedSnippet ? (
                  <span className="text-emerald-400">✓ Copied Notes</span>
                ) : (
                  <span>Copy Notes Text</span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setSelectedDocForRead(null)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors cursor-pointer"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showAddDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Index New Document to Knowledge Brain</h3>
              <button
                onClick={() => setShowAddDocModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="e.g. Distributed System Caching Strategies.pdf"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Document Type
                  </label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Markdown">Markdown (.md)</option>
                    <option value="Notes">Study Notes</option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newDocTags}
                    onChange={(e) => setNewDocTags(e.target.value)}
                    placeholder="e.g. Cache, Redis, System Design"
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Document Text / Notes Content
                </label>
                <textarea
                  rows={6}
                  value={newDocContent}
                  onChange={(e) => setNewDocContent(e.target.value)}
                  placeholder="Paste notes, lecture transcript, summary or excerpt here..."
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDocModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                >
                  Index to Vector Brain
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
