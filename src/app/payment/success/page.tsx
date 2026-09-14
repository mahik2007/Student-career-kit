"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const { userEmail } = useApp();
  const orderId = searchParams.get("order_id") || "order_complete";
  const amount = searchParams.get("amount") || "199";
  const plan = searchParams.get("plan") || "complete";

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center flex-1 flex flex-col justify-center">
      {/* Stitch 0b7ce0049b9b43e8ab55bb8beef74587 exact layout */}
      <Card padding="lg" className="shadow-lg border-emerald-200">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-3xl font-bold">check</span>
        </div>

        <Badge variant="emerald" className="mb-2">PAYMENT SUCCESSFUL</Badge>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
          You&apos;re all set!
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Your payment of <strong>₹{amount}</strong> has been processed via Razorpay. Your account now has full access to the {plan.toUpperCase()} tier.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 my-6 text-left text-xs space-y-2 text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-400">Order ID:</span>
            <span className="font-mono font-semibold">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Account:</span>
            <span className="font-medium">{userEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Payment Status:</span>
            <span className="text-emerald-700 font-bold">Captured</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link href="/dashboard">
            <Button variant="emerald" size="lg" className="w-full">
              Go to Your Workspace →
            </Button>
          </Link>
          <Link href="/generate/resume">
            <Button variant="secondary" size="md" className="w-full text-xs">
              Generate ATS Resume
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading receipt...</div>}>
        <PaymentSuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
