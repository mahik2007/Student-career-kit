"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { generateProjectDescContent } from "@/lib/generationEngine";

export default function ProjectsGeneratorPage() {
  const { profileData, addDocument } = useApp();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedProj = profileData.projects[selectedProjectIndex] || {
    id: "demo",
    name: "Sample Project (Add your real project in Profile)",
    description: "Full-stack project",
    problem_solved: "Demonstrates microservice communication and high throughput.",
    technologies: ["React", "TypeScript", "Node.js"],
    features: [],
    role: "Lead Developer",
    github_url: "",
    live_demo_url: "",
  };

  const descriptions = generateProjectDescContent(selectedProj);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = () => {
    addDocument({
      user_id: profileData.profile.id,
      type: "project_desc",
      title: `Project Descriptions - ${selectedProj.name}`,
      content: descriptions,
      metadata: { project_name: selectedProj.name },
    });
    setCopiedKey("saved");
    setTimeout(() => setCopiedKey(null), 2000);
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
              <span className="text-[#16A34A] font-bold">Project Descriptions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              Project Description Generator
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Turn your repository into STAR resume bullet points, portfolio narratives, and LinkedIn announcements.
            </p>
          </div>

          <Button variant="emerald" size="sm" onClick={handleSave}>
            {copiedKey === "saved" ? "Saved to Documents!" : "Save All to Documents"}
          </Button>
        </div>

        {/* Project Selector (Stitch 61ffaa50a7204977b35040ed15e9d078) */}
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
                {p.name || `Project ${idx + 1}`}
              </button>
            ))}
          </div>
        ) : (
          <Card padding="sm" className="mb-6 bg-amber-50 border-amber-200 text-xs text-amber-900 flex justify-between items-center">
            <span>No custom projects added to profile yet. Showing sample output.</span>
            <Link href="/profile#projects">
              <Button variant="secondary" size="sm">Add Real Project →</Button>
            </Link>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Format 1: Resume Bullet Points (STAR Format) */}
          <Card padding="lg" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="emerald">Resume Format (STAR)</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(descriptions.resumeBullets.join("\n"), "bullets")}
                >
                  {copiedKey === "bullets" ? "Copied" : "Copy Bullets"}
                </Button>
              </div>
              <ul className="space-y-3 text-xs text-slate-700 list-disc list-inside leading-relaxed">
                {descriptions.resumeBullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Format 2: LinkedIn Launch Post */}
          <Card padding="lg" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="navy">LinkedIn Post Format</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(descriptions.linkedInPost, "post")}
                >
                  {copiedKey === "post" ? "Copied" : "Copy Post"}
                </Button>
              </div>
              <pre className="font-sans text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                {descriptions.linkedInPost}
              </pre>
            </div>
          </Card>

          {/* Format 3: Portfolio Case Study Narrative */}
          <Card padding="lg" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="slate">Portfolio Narrative</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(descriptions.portfolioNarrative, "narrative")}
                >
                  {copiedKey === "narrative" ? "Copied" : "Copy Narrative"}
                </Button>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {descriptions.portfolioNarrative}
              </p>
            </div>
          </Card>

          {/* Format 4: GitHub Overview Summary */}
          <Card padding="lg" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="amber">GitHub Quick Summary</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(descriptions.githubOverview, "overview")}
                >
                  {copiedKey === "overview" ? "Copied" : "Copy Overview"}
                </Button>
              </div>
              <pre className="font-sans text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
                {descriptions.githubOverview}
              </pre>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
