"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userEmail, upgradePlan } = useApp();

  const requestedPlan = searchParams.get("plan") === "essential" ? "essential" : "complete";
  const [isProcessing, setIsProcessing] = useState(false);

  const price = requestedPlan === "essential" ? 79 : 199;
  const planName = requestedPlan === "essential" ? "Essential Starter Kit" : "Complete Career Suite";

  const handleSimulatePayment = (success: boolean) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (success) {
        upgradePlan(requestedPlan);
        router.push(`/payment/success?order_id=order_${Date.now()}&amount=${price}&plan=${requestedPlan}`);
      } else {
        router.push(`/payment/failed?plan=${requestedPlan}`);
      }
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
      {/* Header (Stitch 5805cbb538b14c3bb50d8472637701b8) */}
      <div className="text-center mb-10">
        <Badge variant="emerald" className="mb-2">RAZORPAY TEST MODE</Badge>
        <h1 className="text-3xl font-extrabold text-[#0B1220] tracking-tight">
          Complete your purchase
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          One-time payment for lifetime student access to Student Career Kit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Plan Summary */}
        <div className="md:col-span-7 space-y-6">
          <Card padding="lg">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase text-slate-400">Selected Plan</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{planName}</h3>
              </div>
              <span className="text-3xl font-extrabold text-[#16A34A]">₹{price}</span>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                <span>Single one-time payment. Zero recurring charges.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                <span>All six core generators included</span>
              </div>
              {requestedPlan === "complete" && (
                <>
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span>Job Match Analysis & Tailoring included</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-slate-900">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                    <span>Application Tracker included</span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Account Email:</span>
              <span className="font-semibold text-slate-900">{userEmail}</span>
            </div>
          </Card>

          {/* Plan switcher */}
          <div className="flex justify-between items-center text-xs text-slate-500 px-2">
            <span>Want a different plan?</span>
            <Link
              href={requestedPlan === "essential" ? "/checkout?plan=complete" : "/checkout?plan=essential"}
              className="text-emerald-700 font-bold hover:underline"
            >
              Switch to {requestedPlan === "essential" ? "Complete Suite (₹199)" : "Essential (₹79)"} →
            </Link>
          </div>
        </div>

        {/* Right: Payment Action */}
        <div className="md:col-span-5 space-y-4">
          <Card padding="lg" className="border-emerald-200/80 shadow-md">
            <h3 className="font-bold text-base text-slate-900 mb-2">Payment Breakdown</h3>
            <div className="space-y-2 text-xs text-slate-600 border-b border-slate-100 pb-4 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{price}.00</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Student Discount</span>
                <span>Applied</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold pt-2 text-sm border-t border-slate-100">
                <span>Total Due</span>
                <span>₹{price}.00</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="emerald"
                size="lg"
                className="w-full"
                isLoading={isProcessing}
                onClick={() => handleSimulatePayment(true)}
              >
                Pay ₹{price} via Razorpay (Success)
              </Button>

              <button
                disabled={isProcessing}
                onClick={() => handleSimulatePayment(false)}
                className="w-full text-xs text-slate-400 hover:text-red-500 transition-colors py-1 text-center"
              >
                Simulate Payment Failure
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>256-bit SSL Encrypted • Test Mode</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading checkout...</div>}>
        <CheckoutContent />
      </Suspense>
      <Footer />
    </div>
  );
}
