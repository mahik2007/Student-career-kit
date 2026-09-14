"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { Education, SkillItem, Experience, Project, Achievement, TargetGoal } from "@/types";

export default function ProfilePage() {
  const { profileData, updateProfileData, completionScore } = useApp();
  const [activeTab, setActiveTab] = useState<
    "personal" | "education" | "skills" | "experience" | "projects" | "achievements" | "target"
  >("personal");

  const [savedNotice, setSavedNotice] = useState(false);

  const showSaved = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  // Personal Info Form Handler
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateProfileData({
      profile: {
        ...profileData.profile,
        [name]: value,
      },
    });
  };

  // Education Helpers
  const addEducation = () => {
    const newEdu: Education = {
      id: "edu_" + Date.now(),
      institution: "",
      degree: "B.Tech",
      field: "Computer Science & Engineering",
      start_year: "2022",
      graduation_year: "2026",
      cgpa: "",
      class_10_percent: "",
      class_12_percent: "",
    };
    updateProfileData({ education: [...profileData.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, val: string) => {
    const updated = profileData.education.map((item) =>
      item.id === id ? { ...item, [field]: val } : item
    );
    updateProfileData({ education: updated });
  };

  const removeEducation = (id: string) => {
    updateProfileData({ education: profileData.education.filter((e) => e.id !== id) });
  };

  // Skills Helpers
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState<SkillItem["category"]>("languages");
  const [newSkillLevel, setNewSkillLevel] = useState<SkillItem["proficiency"]>("intermediate");

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const newSkill: SkillItem = {
      id: "skill_" + Date.now(),
      category: newSkillCategory,
      name: newSkillName.trim(),
      proficiency: newSkillLevel,
    };
    updateProfileData({ skills: [...profileData.skills, newSkill] });
    setNewSkillName("");
  };

  const removeSkill = (id: string) => {
    updateProfileData({ skills: profileData.skills.filter((s) => s.id !== id) });
  };

  // Experience Helpers
  const addExperience = () => {
    const newExp: Experience = {
      id: "exp_" + Date.now(),
      organization: "",
      role: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      responsibilities: [],
    };
    updateProfileData({ experience: [...profileData.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, val: Experience[keyof Experience]) => {
    const updated = profileData.experience.map((e) =>
      e.id === id ? { ...e, [field]: val } : e
    );
    updateProfileData({ experience: updated });
  };

  const removeExperience = (id: string) => {
    updateProfileData({ experience: profileData.experience.filter((e) => e.id !== id) });
  };

  // Projects Helpers
  const addProject = () => {
    const newProj: Project = {
      id: "proj_" + Date.now(),
      name: "",
      description: "",
      problem_solved: "",
      technologies: [],
      features: [],
      role: "",
      github_url: "",
      live_demo_url: "",
    };
    updateProfileData({ projects: [...profileData.projects, newProj] });
  };

  const updateProject = (id: string, field: keyof Project, val: Project[keyof Project]) => {
    const updated = profileData.projects.map((p) =>
      p.id === id ? { ...p, [field]: val } : p
    );
    updateProfileData({ projects: updated });
  };

  const removeProject = (id: string) => {
    updateProfileData({ projects: profileData.projects.filter((p) => p.id !== id) });
  };

  // Achievements Helpers
  const addAchievement = () => {
    const newAch: Achievement = {
      id: "ach_" + Date.now(),
      title: "",
      organization: "",
      date: "",
      description: "",
    };
    updateProfileData({ achievements: [...profileData.achievements, newAch] });
  };

  const updateAchievement = (id: string, field: keyof Achievement, val: string) => {
    const updated = profileData.achievements.map((a) =>
      a.id === id ? { ...a, [field]: val } : a
    );
    updateProfileData({ achievements: updated });
  };

  const removeAchievement = (id: string) => {
    updateProfileData({ achievements: profileData.achievements.filter((a) => a.id !== id) });
  };

  // Target Goal Helper
  const handleTargetChange = (
    field: keyof typeof profileData.targetGoal,
    val: string
  ) => {
    updateProfileData({
      targetGoal: {
        ...profileData.targetGoal,
        [field]: val,
      },
    });
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: "person" },
    { id: "education", label: "Education", icon: "school" },
    { id: "skills", label: "Skills", icon: "terminal" },
    { id: "experience", label: "Experience", icon: "work" },
    { id: "projects", label: "Projects", icon: "code_blocks" },
    { id: "achievements", label: "Achievements", icon: "emoji_events" },
    { id: "target", label: "Target Goal", icon: "target" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full flex-1">
        {/* Header with Title and Live Completion Indicator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>Single Source of Truth</span>
              <span>•</span>
              <span className="text-emerald-700">Anti-Fabrication</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              Build your career profile
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Enter your real details once. All six generators will accurately cite this information without fabricating metrics.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Profile Completeness
              </div>
              <div className="text-lg font-extrabold text-slate-900">
                {completionScore}%
              </div>
            </div>
            <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#16A34A] h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.max(5, completionScore)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabbed Navigation (Stitch layout: e0192337f7de4b318588490c0479128b) */}
        <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1 mb-8 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#0B1220] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60"
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Personal Information */}
        {activeTab === "personal" && (
          <Card padding="lg" className="max-w-4xl">
            <h2 className="text-lg font-bold text-[#0B1220] mb-1">Personal information</h2>
            <p className="text-xs text-slate-500 mb-6">
              Official contact details used directly in headers of your resumes, cover letters, and outreach.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                placeholder="e.g. Mahima Sharma"
                name="full_name"
                value={profileData.profile.full_name}
                onChange={handlePersonalChange}
                required
              />
              <Input
                label="Email Address"
                placeholder="e.g. mahima@gmail.com"
                type="email"
                name="email"
                value={profileData.profile.email}
                onChange={handlePersonalChange}
                required
              />
              <Input
                label="Phone Number"
                placeholder="e.g. +91 98765 43210"
                name="phone"
                value={profileData.profile.phone}
                onChange={handlePersonalChange}
              />
              <Input
                label="Current City & State"
                placeholder="e.g. Patna, Bihar or Bangalore, Karnataka"
                name="location"
                value={profileData.profile.location}
                onChange={handlePersonalChange}
              />
              <Input
                label="LinkedIn Profile URL"
                placeholder="https://linkedin.com/in/username"
                name="linkedin"
                value={profileData.profile.linkedin}
                onChange={handlePersonalChange}
              />
              <Input
                label="GitHub Profile URL"
                placeholder="https://github.com/username"
                name="github"
                value={profileData.profile.github}
                onChange={handlePersonalChange}
              />
              <div className="sm:col-span-2">
                <Input
                  label="Portfolio / Personal Website"
                  placeholder="https://yourportfolio.dev"
                  name="portfolio"
                  value={profileData.profile.portfolio}
                  onChange={handlePersonalChange}
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">All changes save automatically</span>
              <Button
                variant="emerald"
                size="sm"
                onClick={() => {
                  showSaved();
                  setActiveTab("education");
                }}
              >
                Save & Continue to Education →
              </Button>
            </div>
          </Card>
        )}

        {/* Tab 2: Education (Indian College specifics: CGPA, 10th %, 12th %) */}
        {activeTab === "education" && (
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0B1220]">Education history</h2>
                <p className="text-xs text-slate-500">Degree, institution, CPI/CGPA, and high school benchmarks.</p>
              </div>
              <Button variant="secondary" size="sm" onClick={addEducation}>
                + Add Degree
              </Button>
            </div>

            {profileData.education.length === 0 ? (
              <Card padding="lg" className="text-center py-10 border-dashed">
                <p className="text-sm text-slate-500 mb-4">No education records added yet.</p>
                <Button variant="emerald" size="sm" onClick={addEducation}>
                  Add Your College / Degree
                </Button>
              </Card>
            ) : (
              profileData.education.map((edu) => (
                <Card key={edu.id} padding="md" className="relative space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Degree Record</span>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="College / University Name"
                      placeholder="e.g. Indian Institute of Technology Patna"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    />
                    <Input
                      label="Degree"
                      placeholder="e.g. B.Tech / BCA / MCA / B.Sc"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    />
                    <Input
                      label="Field / Branch of Study"
                      placeholder="e.g. Computer Science and Engineering"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Start Year"
                        placeholder="2022"
                        value={edu.start_year}
                        onChange={(e) => updateEducation(edu.id, "start_year", e.target.value)}
                      />
                      <Input
                        label="Grad Year"
                        placeholder="2026"
                        value={edu.graduation_year}
                        onChange={(e) => updateEducation(edu.id, "graduation_year", e.target.value)}
                      />
                    </div>
                    <Input
                      label="CPI / CGPA (out of 10)"
                      placeholder="e.g. 8.42"
                      value={edu.cgpa}
                      onChange={(e) => updateEducation(edu.id, "cgpa", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Class 10th %"
                        placeholder="e.g. 92.4%"
                        value={edu.class_10_percent || ""}
                        onChange={(e) => updateEducation(edu.id, "class_10_percent", e.target.value)}
                      />
                      <Input
                        label="Class 12th %"
                        placeholder="e.g. 88.6%"
                        value={edu.class_12_percent || ""}
                        onChange={(e) => updateEducation(edu.id, "class_12_percent", e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))
            )}

            <div className="flex justify-end pt-4">
              <Button variant="emerald" size="sm" onClick={() => setActiveTab("skills")}>
                Continue to Skills →
              </Button>
            </div>
          </div>
        )}

        {/* Tab 3: Technical Skills */}
        {activeTab === "skills" && (
          <div className="max-w-4xl space-y-6">
            <Card padding="lg">
              <h2 className="text-lg font-bold text-[#0B1220] mb-1">Add Verified Skills</h2>
              <p className="text-xs text-slate-500 mb-4">
                Only include languages and tools you have actually used in coursework or projects.
              </p>

              <form onSubmit={addSkill} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                <div className="sm:col-span-2">
                  <Input
                    label="Skill Name"
                    placeholder="e.g. Python, React, PostgreSQL, Docker"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                  />
                </div>
                <div>
                  <Select
                    label="Category"
                    value={newSkillCategory}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e) => setNewSkillCategory(e.target.value as any)}
                    options={[
                      { label: "Programming Language", value: "languages" },
                      { label: "Framework / Library", value: "frameworks" },
                      { label: "Technology / Cloud", value: "technologies" },
                      { label: "Developer Tool", value: "tools" },
                      { label: "Other", value: "other" },
                    ]}
                  />
                </div>
                <Button type="submit" variant="emerald" className="h-11">
                  Add Skill
                </Button>
              </form>
            </Card>

            {/* Render Skill Chips */}
            <Card padding="md">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Your Technical Arsenal ({profileData.skills.length})
              </h3>
              {profileData.skills.length === 0 ? (
                <p className="text-xs text-slate-500">No skills added yet. Add at least 3 to enrich your resume output.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      <span>{skill.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase">({skill.category})</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </Card>

            <div className="flex justify-end pt-4">
              <Button variant="emerald" size="sm" onClick={() => setActiveTab("experience")}>
                Continue to Experience →
              </Button>
            </div>
          </div>
        )}

        {/* Tab 4: Projects (Core Focus for Students) */}
        {activeTab === "projects" && (
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0B1220]">Academic & Independent Projects</h2>
                <p className="text-xs text-slate-500">
                  Projects represent the strongest proof of competence for college students and freshers.
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={addProject}>
                + Add Project
              </Button>
            </div>

            {profileData.projects.length === 0 ? (
              <Card padding="lg" className="text-center py-10 border-dashed">
                <p className="text-sm text-slate-500 mb-4">No projects listed yet.</p>
                <Button variant="emerald" size="sm" onClick={addProject}>
                  Add Your First Project
                </Button>
              </Card>
            ) : (
              profileData.projects.map((proj) => (
                <Card key={proj.id} padding="md" className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project Details</span>
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Project Name"
                      placeholder="e.g. Distributed Task Queue"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                    />
                    <Input
                      label="Your Role / Contribution"
                      placeholder="e.g. Full-Stack Developer or Solo Creator"
                      value={proj.role}
                      onChange={(e) => updateProject(proj.id, "role", e.target.value)}
                    />
                    <div className="sm:col-span-2">
                      <Textarea
                        label="Problem Solved & Technical Overview"
                        placeholder="What real problem does this project solve? What was your core architecture?"
                        value={proj.problem_solved}
                        onChange={(e) => updateProject(proj.id, "problem_solved", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Input
                        label="Technologies Used (Comma Separated)"
                        placeholder="React, TypeScript, Node.js, Redis, Docker"
                        value={proj.technologies ? proj.technologies.join(", ") : ""}
                        onChange={(e) =>
                          updateProject(
                            proj.id,
                            "technologies",
                            e.target.value.split(",").map((s) => s.trim())
                          )
                        }
                      />
                    </div>
                    <Input
                      label="GitHub Repository Link"
                      placeholder="https://github.com/username/project"
                      value={proj.github_url}
                      onChange={(e) => updateProject(proj.id, "github_url", e.target.value)}
                    />
                    <Input
                      label="Live Demo URL (Optional)"
                      placeholder="https://myproject.vercel.app"
                      value={proj.live_demo_url}
                      onChange={(e) => updateProject(proj.id, "live_demo_url", e.target.value)}
                    />
                  </div>
                </Card>
              ))
            )}

            <div className="flex justify-end pt-4">
              <Button variant="emerald" size="sm" onClick={() => setActiveTab("experience")}>
                Continue to Experience →
              </Button>
            </div>
          </div>
        )}

        {/* Tab 5: Experience (Internships, Club Leadership, Teaching) */}
        {activeTab === "experience" && (
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0B1220]">Work Experience & Internships</h2>
                <p className="text-xs text-slate-500">
                  Internships, freelance work, open-source fellowships, or college technical societies.
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={addExperience}>
                + Add Experience
              </Button>
            </div>

            {profileData.experience.length === 0 ? (
              <Card padding="lg" className="text-center py-10 border-dashed">
                <p className="text-sm text-slate-500 mb-4">No previous internships or work experience?</p>
                <p className="text-xs text-slate-400 mb-4">
                  That is normal for students! You can skip this tab, or list college technical club roles or teaching assistantships.
                </p>
                <Button variant="secondary" size="sm" onClick={addExperience}>
                  Add An Internship / Club Role
                </Button>
              </Card>
            ) : (
              profileData.experience.map((exp) => (
                <Card key={exp.id} padding="md" className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Experience Item</span>
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Company / Organization"
                      placeholder="e.g. Swiggy / College Coding Club"
                      value={exp.organization}
                      onChange={(e) => updateExperience(exp.id, "organization", e.target.value)}
                    />
                    <Input
                      label="Job Role / Position"
                      placeholder="e.g. Software Engineering Intern"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                    />
                    <Input
                      label="Start Date"
                      placeholder="e.g. May 2024"
                      value={exp.start_date}
                      onChange={(e) => updateExperience(exp.id, "start_date", e.target.value)}
                    />
                    <Input
                      label="End Date (or 'Present')"
                      placeholder="e.g. July 2024"
                      value={exp.end_date}
                      onChange={(e) => updateExperience(exp.id, "end_date", e.target.value)}
                    />
                    <div className="sm:col-span-2">
                      <Textarea
                        label="Summary of Responsibilities & Contributions"
                        placeholder="What were your deliverables? What tech stack did you leverage?"
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>
              ))
            )}

            <div className="flex justify-end pt-4">
              <Button variant="emerald" size="sm" onClick={() => setActiveTab("achievements")}>
                Continue to Achievements →
              </Button>
            </div>
          </div>
        )}

        {/* Tab 6: Achievements */}
        {activeTab === "achievements" && (
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0B1220]">Honors & Achievements</h2>
                <p className="text-xs text-slate-500">
                  Hackathon podiums, competitive programming ratings (Codeforces, LeetCode), academic scholarships.
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={addAchievement}>
                + Add Achievement
              </Button>
            </div>

            {profileData.achievements.length === 0 ? (
              <Card padding="lg" className="text-center py-10 border-dashed">
                <p className="text-sm text-slate-500 mb-4">No achievements entered yet.</p>
                <Button variant="emerald" size="sm" onClick={addAchievement}>
                  Add an Achievement
                </Button>
              </Card>
            ) : (
              profileData.achievements.map((ach) => (
                <Card key={ach.id} padding="md" className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Honor / Prize</span>
                    <button
                      onClick={() => removeAchievement(ach.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Title / Honor"
                      placeholder="e.g. Smart India Hackathon Finalist / Knight on LeetCode"
                      value={ach.title}
                      onChange={(e) => updateAchievement(ach.id, "title", e.target.value)}
                    />
                    <Input
                      label="Awarding Organization / Platform"
                      placeholder="e.g. Ministry of Education / LeetCode"
                      value={ach.organization}
                      onChange={(e) => updateAchievement(ach.id, "organization", e.target.value)}
                    />
                    <div className="sm:col-span-2">
                      <Input
                        label="Description / Context"
                        placeholder="e.g. Ranked top 2% globally out of 40,000 participants."
                        value={ach.description}
                        onChange={(e) => updateAchievement(ach.id, "description", e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))
            )}

            <div className="flex justify-end pt-4">
              <Button variant="emerald" size="sm" onClick={() => setActiveTab("target")}>
                Continue to Target Goal →
              </Button>
            </div>
          </div>
        )}

        {/* Tab 7: Target Goal */}
        {activeTab === "target" && (
          <Card padding="lg" className="max-w-4xl">
            <h2 className="text-lg font-bold text-[#0B1220] mb-1">Target Opportunity & Goals</h2>
            <p className="text-xs text-slate-500 mb-6">
              Our generators use this target to emphasize your most relevant coursework and project details.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Target Job / Internship Title"
                placeholder="e.g. Junior Backend Engineer / Data Science Intern"
                value={profileData.targetGoal.target_role}
                onChange={(e) => handleTargetChange("target_role", e.target.value)}
                required
              />
              <Select
                label="Application Category"
                value={profileData.targetGoal.application_type}
                onChange={(e) => handleTargetChange("application_type", e.target.value as TargetGoal["application_type"])}
                options={[
                  { label: "Summer / Winter Internship", value: "internship" },
                  { label: "Full-Time Fresher Job (Campus/Off-Campus)", value: "job" },
                  { label: "Research Internship / Professor Lab", value: "research" },
                  { label: "Hackathon / Competition Team", value: "hackathon" },
                ]}
              />
              <Input
                label="Dream Target Company (Optional)"
                placeholder="e.g. Google, Zerodha, Razorpay, or Tier-1 Startup"
                value={profileData.targetGoal.target_company}
                onChange={(e) => handleTargetChange("target_company", e.target.value)}
              />
              <Input
                label="Target Industry / Domain"
                placeholder="e.g. FinTech, AI / ML, Cloud Systems"
                value={profileData.targetGoal.target_industry}
                onChange={(e) => handleTargetChange("target_industry", e.target.value)}
              />
              <div className="sm:col-span-2">
                <Textarea
                  label="Sample Job Description / Posting Notes (Optional)"
                  placeholder="Paste snippets of job descriptions you are targeting. This helps the AI align keywords naturally without fabricating skills."
                  value={profileData.targetGoal.job_description}
                  onChange={(e) => handleTargetChange("job_description", e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">All set! Your profile powers all generators.</span>
              <Button
                variant="emerald"
                size="md"
                onClick={() => {
                  showSaved();
                  window.location.href = "/dashboard";
                }}
              >
                Save Profile & Go To Workspace →
              </Button>
            </div>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
