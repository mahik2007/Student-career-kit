"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { generateLinkedInContent } from "@/lib/generationEngine";

export default function LinkedInGeneratorPage() {
  const { profileData, addDocument } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const linkedin = generateLinkedInContent(profileData);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveAll = () => {
    addDocument({
      user_id: profileData.profile.id,
      type: "linkedin",
      title: "LinkedIn Profile Assets",
      content: linkedin,
      metadata: { created_via: "LinkedIn Generator Final" },
    });
    setCopiedKey("saved_all");
    setTimeout(() => setCopiedKey(null), 2500);
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
              <span className="text-[#16A34A] font-bold">LinkedIn Content</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              LinkedIn Profile Generator
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Professional headline variants, engagement-focused 'About' summary, and project showcase suggestions.
            </p>
          </div>

          <Button variant="emerald" size="sm" onClick={handleSaveAll}>
            {copiedKey === "saved_all" ? "Saved to Documents!" : "Save to Documents"}
          </Button>
        </div>

        {/* Section 1: Headline Variants */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1220] mb-3">
            01. High-Impact Headlines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {linkedin.headlineVariants.map((hl, i) => (
              <Card key={i} padding="md" className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Option {i + 1}
                  </span>
                  <p className="text-sm font-medium text-slate-800 mt-2">{hl}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(hl, `hl_${i}`)}
                  >
                    {copiedKey === `hl_${i}` ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 2: About / Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1220]">
              02. 'About' Narrative
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => copyToClipboard(linkedin.about, "about")}
            >
              {copiedKey === "about" ? "Copied About!" : "Copy Full About"}
            </Button>
          </div>
          <Card padding="lg">
            <pre className="font-sans text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
              {linkedin.about}
            </pre>
          </Card>
        </div>

        {/* Section 3: Featured Section Recommendations */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1220] mb-3">
            03. Recommended Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {linkedin.featured.map((f, i) => (
              <Card key={i} padding="md">
                <Badge variant="emerald" className="mb-2">Project Pin</Badge>
                <h4 className="font-bold text-sm text-slate-900">{f.title}</h4>
                <p className="text-xs text-slate-600 mt-1 mb-3">{f.description}</p>
                {f.link && (
                  <span className="text-xs text-slate-400 truncate block">URL: {f.link}</span>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
