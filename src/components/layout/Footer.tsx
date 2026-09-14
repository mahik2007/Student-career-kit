import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 flex flex-col gap-3">
            <Logo size="md" />
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1">
              Create once. Apply everywhere. Empowering college students and freshers to land their dream internships and jobs with structured, ATS-friendly career assets.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Built for Engineering, BS, MS, BSc, Management & Technology Students</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Application Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/generate/resume" className="hover:text-slate-900 dark:hover:text-white">ATS Resume Builder</Link></li>
              <li><Link href="/generate/cover-letter" className="hover:text-slate-900 dark:hover:text-white">Cover Letter Generator</Link></li>
              <li><Link href="/generate/linkedin" className="hover:text-slate-900 dark:hover:text-white">LinkedIn Profile Kit</Link></li>
              <li><Link href="/generate/outreach" className="hover:text-slate-900 dark:hover:text-white">Professor & Recruiter Outreach</Link></li>
              <li><Link href="/generate/projects" className="hover:text-slate-900 dark:hover:text-white">Project Descriptions (STAR)</Link></li>
              <li><Link href="/generate/github-readme" className="hover:text-slate-900 dark:hover:text-white">GitHub README Generator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform & Support
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/pricing" className="hover:text-slate-900 dark:hover:text-white">Pricing (₹79 / ₹199)</Link></li>
              <li><Link href="/complete-suite" className="hover:text-slate-900 dark:hover:text-white">Complete Suite</Link></li>
              <li><Link href="/tracker" className="hover:text-slate-900 dark:hover:text-white">Application Tracker</Link></li>
              <li><Link href="/tools/job-match" className="hover:text-slate-900 dark:hover:text-white">Job Match Analysis</Link></li>
              <li><Link href="/settings" className="hover:text-slate-900 dark:hover:text-white">Account & Privacy</Link></li>
              <li><span className="text-slate-400 text-xs">No recurring subscription</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Student Career Kit. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">Razorpay Test Mode Verified</span>
            <span>Made with precision for ambitious students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
