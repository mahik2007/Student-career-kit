"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge, Card } from "@/components/ui/Card";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="pt-16 pb-24 md:pt-24 md:pb-36 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tracking-widest uppercase">
              For College Students &amp; Freshers
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
            Create once.{" "}
            <span className="text-[#16A34A] dark:text-emerald-400">
              Apply everywhere.
            </span>
          </h1>

          {/* Sub-text */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Enter your college education, projects, skills, and coursework{" "}
            <strong className="text-slate-900 dark:text-white">once</strong>.
            Student Career Kit turns your profile into recruiter-ready ATS
            resumes, tailored cover letters, LinkedIn assets, outreach emails,
            and GitHub READMEs in seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button variant="emerald" size="lg" className="w-full sm:w-auto shadow-lg shadow-emerald-500/20">
                Build My Career Kit — Free Preview
              </Button>
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto dark:bg-[#141414] dark:border-slate-700 dark:text-slate-200 dark:hover:bg-[#1e1e1e]"
              >
                Explore How It Works
              </Button>
            </Link>
          </div>

          {/* Degree badges */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest">
            <span>B.Tech / B.E</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>BS &amp; MS</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>BSc &amp; MSc</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>BBA / MBA</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Fresh Graduates</span>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-20 bg-slate-50 dark:bg-[#111111] border-y border-slate-200 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="emerald" className="mb-3">Simplicity First</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              One Profile. Six Recruiter-Grade Assets.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
              Stop re-typing your college details into twenty different tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Build Career Profile",
                desc: "Add your university, GPA, 10th / 12th percentages, projects, verified technical skills, and target roles once.",
                accent: false,
              },
              {
                step: "02",
                title: "Generate Every Asset",
                desc: "Our grounded generation engine creates your ATS resume, cover letter, LinkedIn about section, and emails without fabricating facts.",
                accent: true,
              },
              {
                step: "03",
                title: "Tailor & Apply",
                desc: "Paste any internship or job description to instantly tailor your highlights, verify keyword alignment, and track applications.",
                accent: false,
              },
            ].map(({ step, title, desc, accent }) => (
              <Card
                key={step}
                padding="lg"
                className={
                  accent
                    ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161616]"
                }
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-sm font-bold ${
                    accent
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                  }`}
                >
                  {step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 Core Tools ─────────────────────────────────── */}
      <section id="tools" className="py-20 bg-white dark:bg-[#0a0a0a] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="navy" className="mb-3">Comprehensive Suite</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Six essential generators in one workspace
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
              Every tool strictly references your verified profile data — no fake
              metrics or invented experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "description", label: "ATS-Friendly Resume", color: "emerald", desc: "Clean single-column & double-column layouts that parse smoothly through ATS screeners. Download as PDF.", href: "/generate/resume" },
              { icon: "mail", label: "Personalized Cover Letter", color: "blue", desc: "Context-aware cover letters matching specific job descriptions and company cultures without generic clichés.", href: "/generate/cover-letter" },
              { icon: "share", label: "LinkedIn Profile Suite", color: "indigo", desc: "Punchy headlines, high-engagement About section, structured experience writeups, and featured project prompts.", href: "/generate/linkedin" },
              { icon: "send", label: "Cold Outreach Emails", color: "purple", desc: "Tailored templates for Professor Research opportunities and Recruiter outreach that respect brevity.", href: "/generate/outreach" },
              { icon: "code_blocks", label: "Project Descriptions", color: "amber", desc: "Convert raw GitHub repos into structured STAR bullet points, LinkedIn announcements, and portfolio narratives.", href: "/generate/projects" },
              { icon: "terminal", label: "GitHub README Generator", color: "slate", desc: "Professional READMEs complete with tech stacks, architecture overview, setup steps, and contribution guides.", href: "/generate/github-readme" },
            ].map(({ icon, label, color, desc, href }) => {
              const colorMap: Record<string, string> = {
                emerald: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400",
                blue: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400",
                indigo: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400",
                purple: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400",
                amber: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400",
                slate: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
              };
              return (
                <Card key={href} hoverEffect padding="lg" className="flex flex-col justify-between bg-white dark:bg-[#141414] border-slate-200 dark:border-slate-800">
                  <div>
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorMap[color]}`}>
                      <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{label}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{desc}</p>
                  </div>
                  <Link
                    href={href}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                  >
                    Open Generator →
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────── */}
      <section
        id="pricing"
        className="py-20 bg-slate-50 dark:bg-[#111111] border-t border-slate-200 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="emerald" className="mb-3">Affordable Student Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              One-time investment. No monthly trap.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
              Pay once, keep your profile, and apply with confidence all placement season.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Essential */}
            <div className="bg-white dark:bg-[#141414] rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Essential</h3>
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full">
                    Starter Kit
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl font-extrabold text-slate-900 dark:text-white">₹79</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">One-time</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Everything a student needs to build a solid entry-level application kit.
                </p>
                <div className="space-y-3 pt-5 border-t border-slate-100 dark:border-slate-800 text-sm">
                  {[
                    "ATS-Friendly Single-Column Resume",
                    "Personalized Cover Letter Generator",
                    "LinkedIn Headline & About Generator",
                    "Professor & Recruiter Outreach Email",
                    "Project Descriptions (STAR)",
                    "GitHub README Generator",
                    "Unlimited Profile Edits",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-base">check_circle</span>
                      <span className="text-slate-700 dark:text-slate-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 mt-6">
                <Link href="/checkout?plan=essential">
                  <Button variant="secondary" size="lg" className="w-full dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">
                    Get Essential — ₹79
                  </Button>
                </Link>
              </div>
            </div>

            {/* Complete */}
            <div className="bg-white dark:bg-[#141414] rounded-3xl p-8 border-2 border-[#16A34A] dark:border-emerald-500 shadow-xl relative flex flex-col justify-between ring-4 ring-emerald-500/10">
              <div className="absolute -top-3.5 right-8 bg-[#16A34A] text-white text-xs font-extrabold tracking-wider uppercase px-4 py-1 rounded-full shadow-md">
                MOST POPULAR
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Complete</h3>
                  <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full">
                    Comprehensive
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl font-extrabold text-[#16A34A] dark:text-emerald-400">₹199</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">One-time</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  For students who want job-specific tailoring, keyword matching, and placement dominance.
                </p>
                <div className="space-y-3 pt-5 border-t border-slate-100 dark:border-emerald-900/30 text-sm">
                  {[
                    "Everything in Essential",
                    "Job-Specific Resume Tailoring",
                    "Multiple Resume Versions (Classic, Modern, Minimal)",
                    "Advanced Job Match & Keyword Analysis",
                    "Portfolio Narrative & Bio Generator",
                    "Multiple Cover Letter Variations",
                    "Full Application Tracker with Follow-up Alerts",
                    "Direct PDF Export with Crisp ATS Typography",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-base">verified</span>
                      <span className="text-slate-900 dark:text-slate-100 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 mt-6">
                <Link href="/checkout?plan=complete">
                  <Button variant="emerald" size="lg" className="w-full shadow-md shadow-emerald-600/20">
                    Get Complete Suite — ₹199
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section
        id="faq"
        className="py-20 bg-white dark:bg-[#0a0a0a] border-t border-slate-200 dark:border-slate-800 transition-colors"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Does this tool fabricate skills or fake work experience?",
                a: "Never. Student Career Kit is strictly anti-fabrication. It only utilises the real credentials, coursework, projects, and skills you provide in your Career Profile. It elevates your wording and framing without inventing facts.",
              },
              {
                q: "Is this a monthly subscription?",
                a: "No! Both Essential (₹79) and Complete (₹199) are single one-time payments. You get access for your entire academic and placement season without recurring credit card charges.",
              },
              {
                q: "Can I download my resume as a PDF?",
                a: "Yes. You can directly export your formatted resume to clean, ATS-compliant PDF with high-resolution vector typography.",
              },
              {
                q: "What degrees is this suited for?",
                a: "Student Career Kit was created specifically for higher education students across B.Tech, B.E., BS, MS, BSc, MSc, BBA, and MBA programs seeking internships and fresher roles.",
              },
            ].map((faq) => (
              <Card key={faq.q} padding="md" className="bg-white dark:bg-[#141414] border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
