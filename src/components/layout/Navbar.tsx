"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { plan, isAdmin, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isLanding = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="transition-transform active:scale-95">
            <Logo size="md" />
          </Link>

          {!isAuthPage && !isLanding && (
            <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/dashboard"
                    ? "bg-slate-100 dark:bg-slate-800 text-[#0B1220] dark:text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-[#0B1220] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Workspace
              </Link>
              <Link
                href="/profile"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/profile"
                    ? "bg-slate-100 dark:bg-slate-800 text-[#0B1220] dark:text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-[#0B1220] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Career Profile
              </Link>
              <Link
                href="/documents"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/documents"
                    ? "bg-slate-100 dark:bg-slate-800 text-[#0B1220] dark:text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-[#0B1220] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                My Documents
              </Link>
              <Link
                href="/tracker"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === "/tracker"
                    ? "bg-slate-100 dark:bg-slate-800 text-[#0B1220] dark:text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-[#0B1220] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Applications
              </Link>
            </nav>
          )}

          {isLanding && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <a href="#how-it-works" className="hover:text-[#0B1220] dark:hover:text-white transition-colors">How it works</a>
              <a href="#tools" className="hover:text-[#0B1220] dark:hover:text-white transition-colors">Tools</a>
              <a href="#pricing" className="hover:text-[#0B1220] dark:hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-[#0B1220] dark:hover:text-white transition-colors">FAQ</a>
            </nav>
          )}
        </div>

        {/* Right action block */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {plan !== "free" && (
            <Badge variant="emerald" className="hidden sm:inline-flex uppercase tracking-wider text-[11px] font-bold">
              {plan === "complete" ? "Complete Suite" : "Essential"}
            </Badge>
          )}

          {isAdmin && (
            <Link href="/admin">
              <Badge variant="navy" className="hidden sm:inline-flex text-[11px] cursor-pointer hover:bg-slate-800">
                Admin Panel
              </Badge>
            </Link>
          )}

          {isLanding ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : isAuthPage ? (
            <Link href="/">
              <Button variant="ghost" size="sm" className="dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800">
                Back to Home
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/complete-suite" className="hidden sm:block">
                {plan !== "complete" && (
                  <Button variant="emerald" size="sm">
                    Upgrade to Complete — ₹199
                  </Button>
                )}
              </Link>
              <Link href="/settings">
                <button
                  aria-label="Settings"
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">settings</span>
                </button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#141414] px-4 pt-3 pb-6 flex flex-col gap-3 shadow-lg">
          {isLanding ? (
            <>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-2">How it works</a>
              <a href="#tools" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-2">Tools</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-2">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-2">FAQ</a>
              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">Log In</Button>
                </Link>
                <Link href="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">Sign Up</Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-2">Workspace</Link>
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-2">Career Profile</Link>
              <Link href="/documents" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-2">My Documents</Link>
              <Link href="/tracker" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-2">Application Tracker</Link>
              <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-2">Account & Settings</Link>
              {isAdmin && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold py-2 text-emerald-600">Admin Dashboard</Link>
              )}
              {plan !== "complete" && (
                <Link href="/complete-suite" onClick={() => setMobileMenuOpen(false)} className="pt-2">
                  <Button variant="emerald" className="w-full">Upgrade Complete Suite — ₹199</Button>
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
};
