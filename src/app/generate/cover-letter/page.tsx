"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { generateCoverLetterContent } from "@/lib/generationEngine";

export default function CoverLetterGeneratorPage() {
  const { profileData, addDocument } = useApp();
  const [company, setCompany] = useState(profileData.targetGoal.target_company || "");
  const [role, setRole] = useState(profileData.targetGoal.target_role || "Software Engineering Intern");
  const [jobDescription, setJobDescription] = useState(profileData.targetGoal.job_description || "");
  const [applicationType, setApplicationType] = useState("Internship");
  const [tone, setTone] = useState("Professional & Confident");
  const [copyNotice, setCopyNotice] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  // Generate grounded content
  const letter = generateCoverLetterContent(profileData, {
    company,
    role,
    jobDescription,
    applicationType,
    tone,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(letter.body);
    setCopyNotice(true);
    setTimeout(() => setCopyNotice(false), 2000);
  };

  const handleSave = () => {
    addDocument({
      user_id: profileData.profile.id,
      type: "cover_letter",
      title: `Cover Letter - ${role} at ${company || "Target Co."}`,
      content: letter,
      metadata: { company, role, applicationType, tone },
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
              <span className="text-[#16A34A] font-bold">Cover Letter</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              Personalized Cover Letter Generator
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Creates high-conviction application narratives referencing your actual projects and degree.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={handleSave}>
              {savedNotice ? "Saved!" : "Save Document"}
            </Button>
            <Button variant="emerald" size="sm" onClick={handleCopy}>
              {copyNotice ? "Copied to Clipboard!" : "Copy Letter"}
            </Button>
          </div>
        </div>

        {/* Split Layout: Left Inputs, Right Document Preview (Stitch abc1da2599ea43bab68b50e3c1c93b40) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <Card padding="md">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1220] mb-4">
                Opportunity Details
              </h2>
              <div className="space-y-4">
                <Input
                  label="Target Company / Organization"
                  placeholder="e.g. Zerodha or Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <Input
                  label="Role Title"
                  placeholder="e.g. Backend Developer Intern"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                <Select
                  label="Application Category"
                  value={applicationType}
                  onChange={(e) => setApplicationType(e.target.value)}
                  options={[
                    { label: "Summer / Winter Internship", value: "Internship" },
                    { label: "Campus Placement Full-Time", value: "Campus Placement" },
                    { label: "Off-Campus Application", value: "Off-Campus" },
                    { label: "Research Assistantship", value: "Research Assistantship" },
                  ]}
                />
                <Select
                  label="Tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  options={[
                    { label: "Professional & Confident", value: "Professional & Confident" },
                    { label: "Direct & Technical", value: "Direct & Technical" },
                    { label: "Enthusiastic Student", value: "Enthusiastic Student" },
                  ]}
                />
                <Textarea
                  label="Job Description Snippet (Optional)"
                  placeholder="Paste requirements from the posting to align focus."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-7">
            <Card padding="lg" className="min-h-[600px] font-sans text-slate-800 text-sm leading-relaxed whitespace-pre-line shadow-sm border-slate-200">
              <div className="border-b border-slate-100 pb-3 mb-4 text-xs font-semibold text-slate-400 uppercase tracking-wider flex justify-between">
                <span>Preview</span>
                <span>{letter.date}</span>
              </div>
              {letter.body}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
