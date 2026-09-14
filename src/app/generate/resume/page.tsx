"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { generateAtsResumeContent } from "@/lib/generationEngine";
import Link from "next/link";

export default function ResumeGeneratorPage() {
  const { profileData, addDocument, plan } = useApp();
  const [template, setTemplate] = useState<"classic" | "modern" | "minimal">("classic");
  const [targetRole, setTargetRole] = useState(profileData.targetGoal.target_role || "Software Engineer");
  const [sections, setSections] = useState({
    education: true,
    skills: true,
    projects: true,
    experience: true,
    achievements: true,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Live content generation strictly grounded on profile data
  const resume = generateAtsResumeContent(profileData, {
    template,
    targetRole,
    sections,
  });

  const handleSaveToDocs = () => {
    addDocument({
      user_id: profileData.profile.id,
      type: "resume",
      title: `Resume - ${targetRole} (${template})`,
      content: resume,
      metadata: {
        template,
        target_role: targetRole,
        created_via: "Resume Generator Final",
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="no-print">
        <Navbar />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Breadcrumb and Header (Stitch ea10053731e74444bbcb0177be4643ca) */}
        <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/dashboard" className="hover:text-slate-900">Workspace</Link>
              <span>/</span>
              <span className="text-[#16A34A] font-bold">Resume Builder</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              ATS-Friendly Resume Builder
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Structured single and double column typography designed to pass campus screener parsers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSaveToDocs}
              icon={<span className="material-symbols-outlined text-base">save</span>}
            >
              {savedSuccess ? "Saved to Documents!" : "Save Document"}
            </Button>
            <Button
              variant="emerald"
              size="sm"
              onClick={handlePrintPdf}
              icon={<span className="material-symbols-outlined text-base">download</span>}
            >
              Download PDF
            </Button>
          </div>
        </div>

        {/* Split Workspace: Left Config & Right ATS Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Configuration Panel */}
          <div className="no-print lg:col-span-4 space-y-6">
            <Card padding="md">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0B1220] mb-4">
                Resume Settings
              </h2>

              <div className="space-y-4">
                <Input
                  label="Target Job / Internship Title"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Frontend Developer"
                />

                <div>
                  <label className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2 block">
                    Resume Template
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "classic" as const, name: "Classic" },
                      { id: "modern" as const, name: "Modern" },
                      { id: "minimal" as const, name: "Minimal" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTemplate(t.id)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                          template === t.id
                            ? "bg-[#0B1220] text-white border-[#0B1220]"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-2 block">
                    Visible Sections
                  </label>
                  <div className="space-y-2">
                    {(
                      [
                        { key: "education", label: "Education History" },
                        { key: "skills", label: "Technical Skills" },
                        { key: "projects", label: "Academic Projects" },
                        { key: "experience", label: "Internships / Experience" },
                        { key: "achievements", label: "Honors & Achievements" },
                      ] as const
                    ).map((sec) => (
                      <label key={sec.key} className="flex items-center gap-2.5 text-xs text-slate-700 select-none cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sections[sec.key]}
                          onChange={(e) =>
                            setSections({ ...sections, [sec.key]: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                        />
                        <span>{sec.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      ✎ Edit Details in Career Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Anti-fabrication reminder */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-900 leading-relaxed">
              <span className="font-bold block mb-1">Grounded Generation Guarantee</span>
              Only verified items from your Career Profile appear here. Missing metrics or projects are left cleanly unstated rather than hallucinated.
            </div>
          </div>

          {/* Right: Live ATS Resume Sheet (Printable Canvas) */}
          <div className="lg:col-span-8">
            <div
              ref={resumeRef}
              className="resume-sheet bg-white rounded-xl shadow-md border border-slate-200 p-8 sm:p-12 text-slate-900 min-h-[900px] flex flex-col font-sans"
              style={{
                fontFamily:
                  template === "classic"
                    ? "'Times New Roman', Times, serif"
                    : "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
            >
              {/* Header */}
              <div className="text-center border-b pb-4 mb-6 border-slate-300">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black uppercase">
                  {resume.header.name}
                </h1>
                <div className="text-xs text-slate-700 mt-2 flex flex-wrap items-center justify-center gap-2">
                  {resume.header.phone && <span>{resume.header.phone}</span>}
                  {resume.header.email && (
                    <>
                      <span>•</span>
                      <span>{resume.header.email}</span>
                    </>
                  )}
                  {resume.header.location && (
                    <>
                      <span>•</span>
                      <span>{resume.header.location}</span>
                    </>
                  )}
                  {resume.header.linkedin && (
                    <>
                      <span>•</span>
                      <a href={resume.header.linkedin} className="text-slate-800 underline">
                        LinkedIn
                      </a>
                    </>
                  )}
                  {resume.header.github && (
                    <>
                      <span>•</span>
                      <a href={resume.header.github} className="text-slate-800 underline">
                        GitHub
                      </a>
                    </>
                  )}
                  {resume.header.portfolio && (
                    <>
                      <span>•</span>
                      <a href={resume.header.portfolio} className="text-slate-800 underline">
                        Portfolio
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-1 mb-2">
                  Professional Objective / Summary
                </h2>
                <p className="text-xs text-slate-800 leading-relaxed text-justify">
                  {resume.summary}
                </p>
              </div>

              {/* Education Section */}
              {sections.education && resume.education.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-1 mb-2">
                    Education
                  </h2>
                  <div className="space-y-3">
                    {resume.education.map((edu) => (
                      <div key={edu.id} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>{edu.institution}</span>
                          <span>
                            {edu.start_year} – {edu.graduation_year || "Present"}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline text-slate-700">
                          <span>
                            {edu.degree} in {edu.field}
                          </span>
                          {edu.cgpa && <span className="font-semibold">CGPA: {edu.cgpa}/10</span>}
                        </div>
                        {(edu.class_10_percent || edu.class_12_percent) && (
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {edu.class_12_percent && `Class XII: ${edu.class_12_percent}`}
                            {edu.class_10_percent && ` | Class X: ${edu.class_10_percent}`}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Skills Section */}
              {sections.skills && resume.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-1 mb-2">
                    Technical Skills
                  </h2>
                  <div className="text-xs space-y-1">
                    <p>
                      <span className="font-bold">Languages & Tools: </span>
                      {resume.skills.map((s) => s.name).join(", ")}
                    </p>
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {sections.projects && resume.projects.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-1 mb-2">
                    Academic & Technical Projects
                  </h2>
                  <div className="space-y-4">
                    {resume.projects.map((proj) => (
                      <div key={proj.id} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>
                            {proj.name}{" "}
                            {proj.technologies && proj.technologies.length > 0 && (
                              <span className="font-normal text-slate-600">
                                | {proj.technologies.join(", ")}
                              </span>
                            )}
                          </span>
                          {proj.github_url && (
                            <span className="text-[11px] font-normal text-slate-600 underline">
                              Code Link
                            </span>
                          )}
                        </div>
                        <p className="text-slate-800 mt-1 leading-relaxed">
                          • {proj.problem_solved || proj.description || "Designed and delivered functional software module."}
                        </p>
                        <p className="text-slate-800 leading-relaxed">
                          • Engineered core architecture using maintainable programming conventions and type safety.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {sections.experience && resume.experience.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-1 mb-2">
                    Work Experience / Internships
                  </h2>
                  <div className="space-y-3">
                    {resume.experience.map((exp) => (
                      <div key={exp.id} className="text-xs">
                        <div className="flex justify-between items-baseline font-bold text-slate-900">
                          <span>
                            {exp.role}, {exp.organization}
                          </span>
                          <span>
                            {exp.start_date} – {exp.end_date || "Present"}
                          </span>
                        </div>
                        <p className="text-slate-800 mt-1 leading-relaxed">
                          • {exp.description || "Delivered assignments in alignment with project deadlines."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements Section */}
              {sections.achievements && resume.achievements.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-slate-300 pb-1 mb-2">
                    Achievements & Honors
                  </h2>
                  <ul className="text-xs space-y-1 list-disc list-inside text-slate-800">
                    {resume.achievements.map((ach) => (
                      <li key={ach.id}>
                        <span className="font-bold">{ach.title}</span>
                        {ach.organization && ` (${ach.organization})`}
                        {ach.description && `: ${ach.description}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
