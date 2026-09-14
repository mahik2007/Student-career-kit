"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

export default function CompleteSuitePage() {
  const { plan } = useApp();

  const suiteFeatures = [
    {
      title: "Job-Specific Resume Tailoring",
      desc: "Paste any target company JD to automatically emphasize your most relevant coursework and project achievements.",
      icon: "tune",
    },
    {
      title: "Multiple Resume Templates",
      desc: "Unlock Classic, Modern, and Minimal layouts tailored for different campus placement and tech interview standards.",
      icon: "style",
    },
    {
      title: "Advanced Job Match & Keyword Analysis",
      desc: "Real-time analysis comparing your genuine profile with recruiter requirements, pointing out genuine missing keywords.",
      icon: "analytics",
    },
    {
      title: "Full Application Tracker",
      desc: "Kanban board to track submissions across Saved, Applied, Interview, and Offer stages with custom follow-up dates.",
      icon: "view_kanban",
    },
    {
      title: "Portfolio Narrative & Bio Generator",
      desc: "Generates long-form case studies and bio intros perfect for your personal website or portfolio.",
      icon: "auto_stories",
    },
    {
      title: "Multiple Cover Letter Variations",
      desc: "Generate distinct technical vs. culture-focused variations for every college application.",
      icon: "dynamic_feed",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full flex-1 text-center">
        {/* Header (Stitch ab60893130194b139335a5acd57a12e4) */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            COMPREHENSIVE UPGRADE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1220] tracking-tight">
            Unlock the Complete Suite
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Take full control of campus placements and off-campus applications. Everything in Essential, plus job-specific resume tailoring, keyword analysis, and the application tracker.
          </p>
          <div className="mt-6 flex items-baseline justify-center gap-2">
            <span className="text-5xl font-extrabold text-[#16A34A]">₹199</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              One-Time Payment • Lifetime Student Access
            </span>
          </div>

          <div className="mt-6">
            <Link href="/checkout?plan=complete">
              <Button variant="emerald" size="lg" className="px-8 shadow-lg shadow-emerald-500/20">
                Get Complete Suite — ₹199
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto mb-16">
          {suiteFeatures.map((feat, i) => (
            <Card key={i} padding="lg" hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-xl">{feat.icon}</span>
                </div>
                <h3 className="font-bold text-base text-[#0B1220] mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
          <h4 className="text-sm font-bold text-slate-900 mb-1">No monthly subscription. Ever.</h4>
          <p className="text-xs text-slate-500">
            Pay once via Razorpay. Your documents and profile data remain completely accessible throughout your entire college and job search duration.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
