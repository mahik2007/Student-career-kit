"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const { userEmail, setUserEmail, plan, isAdmin } = useApp();
  const [activeTab, setActiveTab] = useState<"account" | "plan" | "preferences" | "privacy">("account");
  const [emailInput, setEmailInput] = useState(userEmail);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setUserEmail(emailInput);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2000);
    }
  };

  const handleExportData = () => {
    const raw = localStorage.getItem("sck_profile_v1") || "{}";
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `StudentCareerKit_Export_${Date.now()}.json`;
    a.click();
  };

  const tabs = [
    { id: "account", label: "Account Information", icon: "manage_accounts" },
    { id: "plan", label: "Plan & Access", icon: "payments" },
    { id: "preferences", label: "Preferences", icon: "tune" },
    { id: "privacy", label: "Privacy & Data", icon: "security" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full flex-1">
        {/* Header (Stitch 2736c8a19ed6414ea4bde89651a355a5) */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/dashboard" className="hover:text-slate-900">Workspace</Link>
            <span>/</span>
            <span className="text-[#16A34A] font-bold">Settings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
            Account & settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your credentials, active subscription tier, notifications, and personal data exports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Navigation */}
          <div className="md:col-span-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#0B1220] text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Right Tab Content */}
          <div className="md:col-span-8 space-y-6">
            {/* Account Tab */}
            {activeTab === "account" && (
              <Card padding="lg">
                <h2 className="text-base font-bold text-slate-900 mb-4">Account details</h2>
                <form onSubmit={handleUpdateEmail} className="space-y-4">
                  <Input
                    label="Account Email"
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    helperText="Switch to mahimak2010@gmail.com to test Admin access."
                  />

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs text-emerald-700 font-semibold">
                      {savedNotice ? "Account Updated!" : ""}
                    </span>
                    <Button type="submit" variant="emerald" size="sm">
                      Update Email
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Plan Tab */}
            {activeTab === "plan" && (
              <Card padding="lg" className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-400">Current Status</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1 capitalize">
                      {plan} Tier
                    </h3>
                  </div>
                  <Badge variant={plan === "complete" ? "emerald" : "slate"}>
                    {plan === "complete" ? "COMPLETE SUITE" : "STARTER"}
                  </Badge>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed">
                  {plan === "complete" ? (
                    <p>You have full access to all features, including Job Match Keyword Analysis and Application Tracking.</p>
                  ) : (
                    <p>Upgrade to the Complete Suite for ₹199 to unlock all 3 ATS templates, Job Match, and the tracker.</p>
                  )}
                </div>

                {plan !== "complete" && (
                  <Link href="/complete-suite">
                    <Button variant="emerald" size="md">
                      Upgrade to Complete Suite (₹199)
                    </Button>
                  </Link>
                )}
              </Card>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <Card padding="lg" className="space-y-4">
                <h2 className="text-base font-bold text-slate-900 mb-2">Notification preferences</h2>
                <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-600" />
                  <span>Receive email alerts when target company deadlines approach</span>
                </label>
                <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-600" />
                  <span>Notify me about new ATS resume template releases</span>
                </label>
              </Card>
            )}

            {/* Privacy & Data Tab */}
            {activeTab === "privacy" && (
              <Card padding="lg" className="space-y-4">
                <h2 className="text-base font-bold text-slate-900 mb-2">Privacy & Local Data</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your Career Profile details remain strictly isolated. You can export a full JSON dump of your profile at any time.
                </p>

                <div className="pt-2 flex gap-3">
                  <Button variant="secondary" size="sm" onClick={handleExportData}>
                    Export Career Profile (.JSON)
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your local profile cache?")) {
                        localStorage.clear();
                        window.location.href = "/";
                      }
                    }}
                  >
                    Clear Local Cache
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
