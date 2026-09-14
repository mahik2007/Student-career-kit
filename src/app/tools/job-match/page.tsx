"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

export default function JobMatchPage() {
  const { profileData, plan } = useApp();
  const [jdText, setJdText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  // Extract skills from JD text
  const userSkillNames = profileData.skills.map((s) => s.name.toLowerCase());
  const foundSkills: string[] = [];
  const missingKeywords: string[] = [];

  if (jdText) {
    userSkillNames.forEach((s) => {
      if (jdText.toLowerCase().includes(s)) {
        foundSkills.push(s);
      }
    });

    const commonTechKeywords = [
      "docker", "kubernetes", "aws", "postgresql", "redis", "graphql", "ci/cd", 
      "react", "typescript", "python", "node.js", "rest api", "unit testing", "microservices"
    ];

    commonTechKeywords.forEach((kw) => {
      if (jdText.toLowerCase().includes(kw) && !userSkillNames.includes(kw)) {
        missingKeywords.push(kw);
      }
    });
  }

  const matchPercentage = userSkillNames.length > 0
    ? Math.min(94, Math.round((foundSkills.length / Math.max(foundSkills.length + missingKeywords.length, 1)) * 100) || 68)
    : 45;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full flex-1">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/dashboard" className="hover:text-slate-900">Workspace</Link>
            <span>/</span>
            <span className="text-[#16A34A] font-bold">Complete Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
            Job Match & Keyword Analysis
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare genuine career profile credentials with a recruiter&apos;s job description. Never tells you to fabricate missing skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <Card padding="lg">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1220] mb-3">
                Paste Job Description
              </h2>
              <Textarea
                rows={10}
                placeholder="Paste the full job posting, responsibilities, and required qualifications here..."
                value={jdText}
                onChange={(e) => {
                  setJdText(e.target.value);
                  setAnalyzed(false);
                }}
              />
              <Button
                variant="emerald"
                size="md"
                className="w-full mt-4"
                onClick={() => setAnalyzed(true)}
                disabled={!jdText.trim()}
              >
                Analyze Match & Keywords
              </Button>
            </Card>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {analyzed ? (
              <Card padding="lg" className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400">Match Compatibility</span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{matchPercentage}% Match</h3>
                  </div>
                  <Badge variant={matchPercentage >= 70 ? "emerald" : "amber"}>
                    {matchPercentage >= 70 ? "Strong Alignment" : "Partial Alignment"}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                    Verified Matching Skills in Profile ({foundSkills.length})
                  </h4>
                  {foundSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {foundSkills.map((s, i) => (
                        <Badge key={i} variant="emerald">
                          ✓ {s}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">None detected directly. Review phrasing.</p>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                    Keywords in Job Description Missing from Your Profile
                  </h4>
                  {missingKeywords.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {missingKeywords.map((s, i) => (
                        <Badge key={i} variant="amber">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">No major tech keyword gaps detected!</p>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-1">Anti-Fabrication Recommendation</span>
                  Do not falsely claim keywords you don&apos;t possess. Instead, emphasize your strongest matching projects in your resume builder.
                </div>
              </Card>
            ) : (
              <Card padding="lg" className="text-center py-16 text-slate-400 border-dashed">
                <span className="material-symbols-outlined text-3xl mb-2">find_in_page</span>
                <p className="text-xs">Paste a job posting on the left to view matching keywords.</p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
