"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";
import { JobApplication } from "@/types";

export default function ApplicationTrackerPage() {
  const { applications, addApplication, updateApplicationStatus } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [applicationType, setApplicationType] = useState("Full-time");
  const [status, setStatus] = useState<JobApplication["status"]>("applied");
  const [deadline, setDeadline] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return;

    addApplication({
      user_id: "user",
      company,
      role,
      application_type: applicationType,
      date_applied: new Date().toISOString().split("T")[0],
      deadline: deadline || undefined,
      status,
    });

    setCompany("");
    setRole("");
    setShowAddForm(false);
  };

  const statuses: { key: JobApplication["status"]; label: string; color: "slate" | "amber" | "emerald" | "rose" }[] = [
    { key: "saved", label: "Saved", color: "slate" },
    { key: "applied", label: "Applied", color: "amber" },
    { key: "interview", label: "Interview", color: "emerald" },
    { key: "selected", label: "Selected", color: "emerald" },
    { key: "rejected", label: "Rejected", color: "rose" },
    { key: "on_hold", label: "On Hold", color: "slate" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>Complete Suite Feature</span>
              <span>•</span>
              <span className="text-emerald-700">Internship & Job Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              Application Tracker
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track your campus placement and off-campus applications in one visual board.
            </p>
          </div>

          <Button variant="emerald" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Cancel" : "+ Add Application"}
          </Button>
        </div>

        {/* Add Application Form Modal / Drawer */}
        {showAddForm && (
          <Card padding="lg" className="mb-8 border-emerald-200 shadow-sm max-w-2xl">
            <h3 className="font-bold text-base text-slate-900 mb-4">Track New Job / Internship</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  placeholder="e.g. Zerodha"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
                <Input
                  label="Role"
                  placeholder="e.g. SDE Intern"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <Select
                  label="Stage"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  options={[
                    { label: "Saved", value: "saved" },
                    { label: "Applied", value: "applied" },
                    { label: "Interview", value: "interview" },
                    { label: "Selected", value: "selected" },
                    { label: "Rejected", value: "rejected" },
                    { label: "On Hold", value: "on_hold" },
                  ]}
                />
                <Input
                  label="Deadline / Follow-up"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="submit" variant="emerald" size="sm">
                  Save Application
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Kanban Board Columns - all 6 statuses */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {(["saved", "applied", "interview", "selected", "rejected", "on_hold"] as const).map((colStatus) => {
            const items = applications.filter((a) => a.status === colStatus);
            const colColors: Record<string, string> = {
              saved: "bg-slate-100/70",
              applied: "bg-amber-50/80",
              interview: "bg-blue-50/80",
              selected: "bg-emerald-50/80",
              rejected: "bg-rose-50/80",
              on_hold: "bg-slate-100/50",
            };
            const labelColors: Record<string, string> = {
              saved: "text-slate-700",
              applied: "text-amber-800",
              interview: "text-blue-800",
              selected: "text-emerald-800",
              rejected: "text-rose-800",
              on_hold: "text-slate-600",
            };
            return (
              <div key={colStatus} className={`${colColors[colStatus]} rounded-2xl p-3 flex flex-col min-h-[300px]`}>
                <div className="flex justify-between items-center mb-3 px-1">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${labelColors[colStatus]}`}>
                    {colStatus.replace("_", " ")} ({items.length})
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  {items.map((app) => (
                    <Card key={app.id} padding="sm" className="bg-white">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{app.company}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 truncate">{app.role}</p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">{app.date_applied}</span>
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                          className="text-[10px] font-semibold text-emerald-700 bg-transparent border-0 cursor-pointer focus:ring-0 max-w-[70px]"
                        >
                          <option value="saved">Saved</option>
                          <option value="applied">Applied</option>
                          <option value="interview">Interview</option>
                          <option value="selected">Selected</option>
                          <option value="rejected">Rejected</option>
                          <option value="on_hold">On Hold</option>
                        </select>
                      </div>
                    </Card>
                  ))}
                  {items.length === 0 && (
                    <div className="text-center py-6 text-[11px] text-slate-400">
                      Empty
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
