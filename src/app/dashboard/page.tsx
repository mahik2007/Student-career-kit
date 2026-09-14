"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

export default function DashboardPage() {
  const { profileData, completionScore, documents, plan } = useApp();

  const coreTools = [
    {
      title: "ATS Resume",
      tagline: "ATS-friendly structure",
      desc: "Structured single/double column templates tailored for college placement screening.",
      icon: "description",
      href: "/generate/resume",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      title: "Cover Letter",
      tagline: "Opportunity-grounded",
      desc: "High-conviction cover letters based on your genuine college coursework and project milestones.",
      icon: "mail",
      href: "/generate/cover-letter",
      color: "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      title: "LinkedIn Content",
      tagline: "Headline & About",
      desc: "Recruiter-optimized headlines, summaries, and bullet points ready to paste into LinkedIn.",
      icon: "share",
      href: "/generate/linkedin",
      color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
    {
      title: "Outreach Email",
      tagline: "Professor & Recruiter",
      desc: "Clean cold emails for research internships, off-campus referrals, and campus placement drives.",
      icon: "send",
      href: "/generate/outreach",
      color: "bg-purple-50 text-purple-700 border-purple-100",
    },
    {
      title: "Project Descriptions",
      tagline: "STAR methodology",
      desc: "Transform class & hackathon projects into punchy resume bullet points and portfolio narratives.",
      icon: "code_blocks",
      href: "/generate/projects",
      color: "bg-amber-50 text-amber-700 border-amber-100",
    },
    {
      title: "GitHub README",
      tagline: "Production docs",
      desc: "Generate clean README.md files for your GitHub repositories with setup steps and architecture.",
      icon: "terminal",
      href: "/generate/github-readme",
      color: "bg-slate-100 text-slate-800 border-slate-200",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full">
        {/* Workspace Title & Greeting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>Your career workspace</span>
              <span>•</span>
              <span className="text-emerald-700">Grounded in Career Profile</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              {profileData.profile.full_name
                ? `Welcome back, ${profileData.profile.full_name}`
                : "Welcome to your workspace"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button variant="secondary" size="sm">
                Edit Career Profile
              </Button>
            </Link>
            {plan !== "complete" && (
              <Link href="/complete-suite">
                <Button variant="emerald" size="sm">
                  Unlock Complete Suite (₹199)
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Top Status Grid: Profile Completion + Target Goal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Profile Completion Card (Exact Stitch Workspace Feature) */}
          <Card padding="md" className="md:col-span-2 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-base text-[#0B1220]">Profile completion</h3>
                  <Badge variant={completionScore >= 80 ? "emerald" : "amber"}>
                    {completionScore}% Ready
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 max-w-md">
                  {completionScore === 100
                    ? "Your profile is fully equipped! All generators will yield maximally accurate documents."
                    : "Add your coursework, verified skills, and academic projects to unlock richer generator output."}
                </p>
              </div>

              <Link href="/profile">
                <Button variant="secondary" size="sm">
                  Complete Profile →
                </Button>
              </Link>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 mt-4 overflow-hidden">
              <div
                className="bg-[#16A34A] h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(8, completionScore)}%` }}
              />
            </div>
          </Card>

          {/* Current Target Card */}
          <Card padding="md" className="flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Target</span>
              <h4 className="font-bold text-base text-slate-900 mt-1">
                {profileData.targetGoal.target_role || "No target role set yet"}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {profileData.targetGoal.target_company
                  ? `Focusing on ${profileData.targetGoal.target_company} (${profileData.targetGoal.application_type})`
                  : "Set a target role or company in your profile to tailor documents."}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Built from your profile</span>
              <Link href="/profile#target" className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
                Update →
              </Link>
            </div>
          </Card>
        </div>

        {/* Complete Suite Upgrade Card (Matching Stitch Workspace Banner) */}
        {plan !== "complete" && (
          <div className="mb-10 rounded-2xl bg-[#0B1220] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                COMPLETE SUITE — ₹199 ONE-TIME
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Unlock Job Match Analysis & Multiple Resume Variants
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Upgrade once for ₹199 to unlock all 3 ATS templates, Job Match keyword analysis, and the full internship application tracker.
              </p>
            </div>
            <Link href="/complete-suite" className="shrink-0 w-full md:w-auto">
              <Button variant="emerald" size="lg" className="w-full">
                Get Complete Suite — ₹199
              </Button>
            </Link>
          </div>
        )}

        {/* 6 Core Tools Launcher (Direct Stitch UI Grid) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#0B1220] tracking-tight">
                Create a career document
              </h2>
              <p className="text-xs text-slate-500">
                Pick an application asset to generate directly from your profile data
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreTools.map((tool, idx) => (
              <Link key={idx} href={tool.href} className="group">
                <Card hoverEffect padding="md" className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${tool.color}`}>
                        <span className="material-symbols-outlined text-xl">{tool.icon}</span>
                      </div>
                      <Badge variant="slate" className="text-[10px]">
                        {tool.tagline}
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold text-[#0B1220] group-hover:text-emerald-700 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-emerald-700">
                    <span>Generate Now</span>
                    <span>→</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Documents Section (Stitch Empty State / Populated State) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#0B1220] tracking-tight">
                Recent documents
              </h2>
              <p className="text-xs text-slate-500">
                Your generated library stored securely in your workspace
              </p>
            </div>
            {documents.length > 0 && (
              <Link href="/documents" className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
                View all ({documents.length}) →
              </Link>
            )}
          </div>

          {documents.length === 0 ? (
            /* Stitch exact empty state */
            <Card padding="lg" className="text-center py-12 border-dashed">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-2xl">folder_open</span>
              </div>
              <h4 className="font-bold text-base text-slate-900">No documents yet.</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                New accounts start fresh. Complete your career profile and use any of the tools above to generate your first document.
              </p>
              <Link href="/generate/resume">
                <Button variant="emerald" size="sm">
                  Generate Your First Resume
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.slice(0, 3).map((doc) => (
                <Card key={doc.id} padding="md" hoverEffect className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="emerald" className="uppercase text-[10px]">
                        {doc.type.replace("_", " ")}
                      </Badge>
                      <span className="text-[11px] text-slate-400">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{doc.title}</h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link href={`/documents`} className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
                      View Document →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
