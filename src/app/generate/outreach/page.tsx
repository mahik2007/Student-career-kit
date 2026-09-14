"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { generateOutreachContent } from "@/lib/generationEngine";

export default function OutreachGeneratorPage() {
  const { profileData, addDocument } = useApp();
  const [type, setType] = useState<"professor" | "recruiter">("professor");
  const [recipientName, setRecipientName] = useState("");
  const [organization, setOrganization] = useState("");
  const [opportunityDetails, setOpportunityDetails] = useState("");
  const [tone, setTone] = useState("Respectful & Academic");

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const emailData = generateOutreachContent(profileData, {
    type,
    recipientName,
    organization,
    opportunityDetails,
    tone,
  });

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = () => {
    addDocument({
      user_id: profileData.profile.id,
      type: "outreach",
      title: `${type === "professor" ? "Professor" : "Recruiter"} Outreach - ${recipientName || organization || "Contact"}`,
      content: emailData,
      metadata: { type, organization, opportunityDetails },
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
              <span className="text-[#16A34A] font-bold">Cold Outreach</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              Write a professional outreach email
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Grounded, concise cold communication for research fellowships, internships, and off-campus referrals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={handleSave}>
              {copiedKey === "saved" ? "Saved!" : "Save to Documents"}
            </Button>
            <Button
              variant="emerald"
              size="sm"
              onClick={() => copyToClipboard(`Subject: ${emailData.subject}\n\n${emailData.body}`, "full")}
            >
              {copiedKey === "full" ? "Copied Email!" : "Copy Full Email"}
            </Button>
          </div>
        </div>

        {/* Outreach Mode Switcher (Stitch 1d4ce0461e27424592758b1311e98cf2) */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setType("professor")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              type === "professor"
                ? "bg-[#0B1220] text-white border-[#0B1220] shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            🎓 Professor / Research Lab Outreach
          </button>
          <button
            onClick={() => setType("recruiter")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              type === "recruiter"
                ? "bg-[#0B1220] text-white border-[#0B1220] shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            💼 Recruiter / Engineering Lead Outreach
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <Card padding="md">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1220] mb-4">
                Who are you contacting?
              </h2>

              <div className="space-y-4">
                <Input
                  label={type === "professor" ? "Professor / Faculty Name" : "Recruiter / Engineer Name"}
                  placeholder={type === "professor" ? "e.g. Dr. Mukherjee" : "e.g. Priya Sharma"}
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
                <Input
                  label={type === "professor" ? "University / Lab Name" : "Company / Tech Startup"}
                  placeholder={type === "professor" ? "e.g. IIT Madras / AI Lab" : "e.g. Swiggy"}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
                <Input
                  label={type === "professor" ? "Research Topic / Field" : "Target Role / Job Opening"}
                  placeholder={type === "professor" ? "e.g. Computer Vision / Graph Neural Networks" : "e.g. Backend SDE Intern"}
                  value={opportunityDetails}
                  onChange={(e) => setOpportunityDetails(e.target.value)}
                />
              </div>
            </Card>
          </div>

          {/* Right Live Preview */}
          <div className="lg:col-span-7 space-y-4">
            <Card padding="md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Subject Line
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(emailData.subject, "subj")}
                >
                  {copiedKey === "subj" ? "Copied" : "Copy Subject"}
                </Button>
              </div>
              <p className="text-sm font-bold text-slate-900">{emailData.subject}</p>
            </Card>

            <Card padding="lg" className="min-h-[450px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Email Body
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(emailData.body, "body")}
                >
                  {copiedKey === "body" ? "Copied" : "Copy Body"}
                </Button>
              </div>
              <pre className="font-sans text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {emailData.body}
              </pre>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
