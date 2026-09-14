"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "complete";

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center flex-1 flex flex-col justify-center">
      {/* Stitch ab529e862b8f4efb8d8e309b14458ef3 exact layout */}
      <Card padding="lg" className="shadow-lg border-red-200">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-3xl font-bold">priority_high</span>
        </div>

        <Badge variant="rose" className="mb-2">PAYMENT FAILED</Badge>
        <h1 className="text-2xl font-extrabold text-[#0B1220] tracking-tight">
          Transaction could not be completed
        </h1>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          No funds were debited from your card or UPI account. Your career profile and existing documents remain safe and intact.
        </p>

        <div className="space-y-3 mt-8">
          <Link href={`/checkout?plan=${plan}`}>
            <Button variant="emerald" size="lg" className="w-full">
              Try Again
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" size="md" className="w-full text-xs">
              Return to Workspace
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading details...</div>}>
        <PaymentFailedContent />
      </Suspense>
      <Footer />
    </div>
  );
}
