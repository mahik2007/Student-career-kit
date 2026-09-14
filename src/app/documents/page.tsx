"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { DocumentRecord } from "@/types";

export default function DocumentsPage() {
  const { documents, deleteDocument } = useApp();
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalDoc, setActiveModalDoc] = useState<DocumentRecord | null>(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesType = filterType === "all" || doc.type === filterType;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filterTabs = [
    { id: "all", label: "All Documents" },
    { id: "resume", label: "Resumes" },
    { id: "cover_letter", label: "Cover Letters" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "outreach", label: "Outreach Emails" },
    { id: "project_desc", label: "Project Descriptions" },
    { id: "readme", label: "READMEs" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full flex-1">
        {/* Header (Stitch 51ff0b9eeffc4aed8cb45cd235521a79) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>Document Repository</span>
              <span>•</span>
              <span className="text-emerald-700">Stored in Supabase</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              Your career documents
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Every document you have created across all six career tools in one organized hub.
            </p>
          </div>

          <Link href="/generate/resume">
            <Button variant="emerald" size="sm">
              + Generate New Document
            </Button>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Category Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterType === tab.id
                    ? "bg-[#0B1220] text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Documents Grid / Empty State */}
        {filteredDocs.length === 0 ? (
          <Card padding="lg" className="text-center py-16 border-dashed">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-2xl">description</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">No documents found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
              {searchQuery
                ? "No documents matched your query. Try clearing your search."
                : "You haven't saved any documents in this category yet. Head to a generator to create one!"}
            </p>
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">
                Open Generator Hub →
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocs.map((doc) => (
              <Card key={doc.id} padding="md" hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="emerald" className="uppercase text-[10px]">
                      {doc.type.replace("_", " ")}
                    </Badge>
                    <span className="text-[11px] text-slate-400">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{doc.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {(() => {
                      const content = doc.content;
                      if (!content) return "No content available.";
                      if (typeof content === "string") return (content as string).slice(0, 150);
                      if (typeof content === "object") {
                        const body = (content as Record<string, unknown>).body ||
                                     (content as Record<string, unknown>).markdown ||
                                     (content as Record<string, unknown>).about;
                        if (typeof body === "string") return body.slice(0, 150);
                        return JSON.stringify(content).slice(0, 120);
                      }
                      return "Click to inspect full document payload.";
                    })()}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalDoc(doc)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    View & Copy
                  </button>
                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="text-xs text-slate-400 hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Modal for Viewing Full Document */}
        {activeModalDoc && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <Card padding="lg" className="max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
                <div>
                  <Badge variant="emerald" className="uppercase text-[10px] mb-1">
                    {activeModalDoc.type}
                  </Badge>
                  <h3 className="font-bold text-base text-slate-900">{activeModalDoc.title}</h3>
                </div>
                <button
                  onClick={() => setActiveModalDoc(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-2 bg-slate-50 rounded-lg text-xs font-mono text-slate-800 leading-relaxed mb-4">
                <pre className="whitespace-pre-wrap font-sans">
                  {typeof activeModalDoc.content === "string"
                    ? activeModalDoc.content
                    : JSON.stringify(activeModalDoc.content, null, 2)}
                </pre>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      typeof activeModalDoc.content === "string"
                        ? activeModalDoc.content
                        : JSON.stringify(activeModalDoc.content, null, 2)
                    );
                    alert("Copied to clipboard!");
                  }}
                >
                  Copy Document
                </Button>
                <Button variant="emerald" size="sm" onClick={() => setActiveModalDoc(null)}>
                  Done
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
