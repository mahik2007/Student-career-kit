"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge, Card } from "@/components/ui/Card";
import GatewayFlow from "@/components/ui/gateway-flow";
import { useApp } from "@/context/AppContext";

export default function LandingPage() {
  const { theme } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Gateway Flow component active in dark mode */}
        {theme === "dark" && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
            <GatewayFlow mode="dark" speed={0.9} density={1.1} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-transparent to-[#030712]" />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-700/40 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 tracking-wide uppercase">
              STUDENT CAREER KIT FOR COLLEGE STUDENTS & FRESHERS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#0B1220] dark:text-white tracking-tight leading-[1.1] mb-6">
            Create once. <br className="hidden sm:inline" />
            <span className="text-[#16A34A] dark:text-emerald-400">Apply everywhere.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Enter your college education, projects, skills, and coursework <strong>once</strong>. Student Career Kit turns your profile into recruiter-ready ATS resumes, tailored cover letters, LinkedIn assets, outreach emails, and GitHub READMEs in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button variant="emerald" size="lg" className="w-full sm:w-auto shadow-lg shadow-emerald-500/20">
                Build My Career Kit — Free Preview
              </Button>
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800">
                Explore How It Works
              </Button>
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            <span>B.Tech / B.E</span>
            <span>•</span>
            <span>BS & MS</span>
            <span>•</span>
            <span>BSc & MSc</span>
            <span>•</span>
            <span>BBA / MBA</span>
            <span>•</span>
            <span>Fresh Graduates</span>
          </div>
        </div>

        {/* Subtle background glow for light mode */}
        {theme !== "dark" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-100/40 rounded-full blur-3xl -z-0 pointer-events-none" />
        )}
      </section>

      {/* Interactive Core Workflow / How It Works */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-[#070c18] border-y border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="emerald" className="mb-3">Simplicity First</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
              One Profile. Six Recruiter-Grade Assets.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-base">
              Stop re-typing your college details into twenty different tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card padding="lg" className="border-slate-200/80 dark:border-slate-800 relative">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center mb-6 text-sm">
                01
              </div>
              <h3 className="text-xl font-bold text-[#0B1220] dark:text-white mb-2">Build Career Profile</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Add your university, GPA, 10th/12th percentages, projects, verified technical skills, and target roles once.
              </p>
            </Card>

            <Card padding="lg" className="border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/20 dark:bg-emerald-950/20 relative">
              <div className="w-10 h-10 rounded-xl bg-[#16A34A] text-white font-bold flex items-center justify-center mb-6 text-sm">
                02
              </div>
              <h3 className="text-xl font-bold text-[#0B1220] dark:text-white mb-2">Generate Every Asset</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Our grounded generation engine creates your ATS resume, cover letter, LinkedIn about section, and emails without fabricating facts.
              </p>
            </Card>

            <Card padding="lg" className="border-slate-200/80 dark:border-slate-800 relative">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center mb-6 text-sm">
                03
              </div>
              <h3 className="text-xl font-bold text-[#0B1220] dark:text-white mb-2">Tailor & Apply</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Paste any internship or job description to instantly tailor your highlights, verify keyword alignment, and track applications.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The 6 Core Tools (Exact Stitch Feature Set) */}
      <section id="tools" className="py-20 bg-[#F8FAFC] dark:bg-[#030712] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="navy" className="mb-3">Comprehensive Suite</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
              Six essential generators in one workspace
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-base">
              Every tool strictly references your verified profile data — no fake metrics or invented experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tool 1 */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] dark:text-white mb-1.5">ATS-Friendly Resume</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Clean, single-column & double-column layouts that parse smoothly through modern ATS screeners. Download as print-perfect PDF.
                </p>
              </div>
              <Link href="/generate/resume" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1">
                Open Generator →
              </Link>
            </Card>

            {/* Tool 2 */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] dark:text-white mb-1.5">Personalized Cover Letter</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Context-aware cover letters matching specific job descriptions and company cultures without generic clichés.
                </p>
              </div>
              <Link href="/generate/cover-letter" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1">
                Open Generator →
              </Link>
            </Card>

            {/* Tool 3 */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">share</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] dark:text-white mb-1.5">LinkedIn Profile Suite</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Punchy headlines, high-engagement &apos;About&apos; section, structured experience writeups, and featured project prompts.
                </p>
              </div>
              <Link href="/generate/linkedin" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1">
                Open Generator →
              </Link>
            </Card>

            {/* Tool 4 */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">send</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] dark:text-white mb-1.5">Cold Outreach Emails</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Tailored templates for Professor Research opportunities and Recruiter outreach that respect brevity and professionalism.
                </p>
              </div>
              <Link href="/generate/outreach" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1">
                Open Generator →
              </Link>
            </Card>

            {/* Tool 5 */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">code_blocks</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] dark:text-white mb-1.5">Project Descriptions</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Convert raw github repositories into structured STAR bullet points, LinkedIn project announcements, and portfolio narratives.
                </p>
              </div>
              <Link href="/generate/projects" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1">
                Open Generator →
              </Link>
            </Card>

            {/* Tool 6 */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">terminal</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] dark:text-white mb-1.5">GitHub README Generator</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Professional repository READMEs complete with tech stacks, architecture overview, setup steps, and contribution guidelines.
                </p>
              </div>
              <Link href="/generate/github-readme" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1">
                Open Generator →
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section (Matching Stitch Screen Exactly: ₹79 & ₹199) */}
      <section id="pricing" className="py-20 bg-white dark:bg-[#070c18] border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="emerald" className="mb-3">Affordable Student Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
              One-time investment. No monthly trap.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3 text-base">
              Pay once, keep your profile, and apply with confidence all placement season.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan 1: Essential (₹79) */}
            <Card padding="lg" className="border-slate-200 dark:border-slate-800 relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Essential</h3>
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">Starter Kit</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">₹79</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">One-time payment</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                  Everything a student needs to build a solid entry-level application kit.
                </p>

                <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm">
                  {[
                    "ATS-Friendly Single-Column Resume",
                    "Personalized Cover Letter Generator",
                    "LinkedIn Headline & About Generator",
                    "Professor & Recruiter Outreach Email",
                    "Project Descriptions (STAR)",
                    "GitHub README Generator",
                    "Unlimited Profile Edits",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-base">check_circle</span>
                      <span className="text-slate-700 dark:text-slate-200">{feat}</span>
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
            </Card>

            {/* Plan 2: Complete Suite (₹199 - Most Popular) */}
            <div className="bg-white dark:bg-slate-900/90 rounded-3xl p-8 sm:p-10 border-2 border-[#16A34A] dark:border-emerald-500 shadow-xl relative flex flex-col justify-between ring-4 ring-emerald-500/10">
              <div className="absolute -top-3.5 right-8 bg-[#16A34A] text-white text-xs font-extrabold tracking-wider uppercase px-4 py-1 rounded-full shadow-md">
                MOST POPULAR
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Complete</h3>
                  <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full">Comprehensive</span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#16A34A] dark:text-emerald-400">₹199</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">One-time payment</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                  For students who want job-specific tailoring, keyword matching, and placement dominance.
                </p>

                <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm">
                  {[
                    "Everything in Essential",
                    "Job-Specific Resume Tailoring",
                    "Multiple Resume Versions (Classic, Modern, Minimal)",
                    "Advanced Job Match & Keyword Analysis",
                    "Portfolio Narrative & Bio Generator",
                    "Multiple Cover Letter Variations",
                    "Full Application Tracker with Follow-up Alerts",
                    "Direct PDF Export with Crisp ATS Typography",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5">
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

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#F8FAFC] dark:bg-[#030712] border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0B1220] dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Does this tool fabricate skills or fake work experience?",
                a: "Never. Student Career Kit is strictly anti-fabrication. It only utilizes the real credentials, coursework, projects, and skills you provide in your Career Profile. It elevates your wording and framing without inventing facts.",
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
            ].map((faq, i) => (
              <Card key={i} padding="md">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">{faq.q}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
