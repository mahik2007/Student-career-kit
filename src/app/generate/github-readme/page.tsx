"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { generateReadmeContent } from "@/lib/generationEngine";

export default function ReadmeGeneratorPage() {
  const { profileData, addDocument } = useApp();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const selectedProj = profileData.projects[selectedProjectIndex] || {
    id: "demo",
    name: "Sample Project (Add your real project in Profile)",
    description: "Full-stack application",
    problem_solved: "Demonstrates reliable caching and transactional database architecture.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    features: [],
    role: "Full-Stack Engineer",
    github_url: "https://github.com/username/project",
    live_demo_url: "https://demo.vercel.app",
  };

  const readmeMarkdown = generateReadmeContent(selectedProj);

  const handleCopy = () => {
    navigator.clipboard.writeText(readmeMarkdown);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([readmeMarkdown], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `README_${selectedProj.name.replace(/\s+/g, "_")}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = () => {
    addDocument({
      user_id: profileData.profile.id,
      type: "readme",
      title: `README.md - ${selectedProj.name}`,
      content: { markdown: readmeMarkdown },
      metadata: { project_name: selectedProj.name },
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/dashboard" className="hover:text-slate-900">Workspace</Link>
              <span>/</span>
              <span className="text-[#16A34A] font-bold">GitHub README</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              GitHub README Generator
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Generate structured, recruiter-ready README.md files for your GitHub repositories.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={handleSave}>
              {savedNotice ? "Saved!" : "Save Document"}
            </Button>
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copiedNotice ? "Copied Markdown!" : "Copy Markdown"}
            </Button>
            <Button variant="emerald" size="sm" onClick={handleDownload}>
              Download .md File
            </Button>
          </div>
        </div>

        {/* Project Selector (Stitch 84c5b33ccab0446296773ed8ac336984) */}
        {profileData.projects.length > 0 ? (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {profileData.projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedProjectIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                  selectedProjectIndex === idx
                    ? "bg-[#0B1220] text-white border-[#0B1220]"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        ) : (
          <Card padding="sm" className="mb-6 bg-amber-50 border-amber-200 text-xs text-amber-900 flex justify-between items-center">
            <span>Using demonstration project. Add your real GitHub repository details in Profile.</span>
            <Link href="/profile#projects">
              <Button variant="secondary" size="sm">Add Real Project →</Button>
            </Link>
          </Card>
        )}

        {/* Live Markdown Preview Canvas */}
        <Card padding="lg" className="bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre-wrap leading-relaxed">
            {readmeMarkdown}
          </pre>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
