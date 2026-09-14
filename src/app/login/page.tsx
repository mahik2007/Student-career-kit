"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

export default function AuthPage() {
  const router = useRouter();
  const { setUserEmail } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);

    setTimeout(() => {
      setUserEmail(email);
      setIsLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <Logo size="lg" />
          </Link>
          <h2 className="mt-4 text-2xl font-extrabold text-[#0B1220] tracking-tight">
            {isSignUp ? "Create your Career Kit account" : "Welcome back to your workspace"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {isSignUp
              ? "Start building your centralized student career profile"
              : "Log in to access your generated documents & applications"}
          </p>
        </div>

        {/* Tab switcher matching Stitch screen 10052eceb0d24ee3bbdbd5a8c7acf4c3 */}
        <Card padding="lg" className="border-slate-200 shadow-lg">
          <div className="flex border-b border-slate-200 mb-6 pb-2">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 pb-2 text-sm font-bold transition-colors ${
                !isSignUp
                  ? "text-[#0B1220] border-b-2 border-[#16A34A]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 pb-2 text-sm font-bold transition-colors ${
                isSignUp
                  ? "text-[#0B1220] border-b-2 border-[#16A34A]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                label="Full Name"
                placeholder="e.g. Mahima Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            )}

            <Input
              type="email"
              label="College or Personal Email"
              placeholder="name@university.edu or gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="emerald"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              {isSignUp ? "Create Student Account" : "Sign In to Workspace"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              By continuing, you agree to Student Career Kit&apos;s terms of service. Profile data remains 100% private to your account.
            </p>
          </div>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-slate-900">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
