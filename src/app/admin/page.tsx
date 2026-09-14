"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, Badge } from "@/components/ui/Card";
import { useApp } from "@/context/AppContext";

export default function AdminPage() {
  const { userEmail, isAdmin } = useApp();

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0B1220]">Admin Access Restricted</h1>
          <p className="text-xs text-slate-500 max-w-sm mt-2 mb-6">
            The email <strong>{userEmail}</strong> is not present on the server-side authorization allowlist.
          </p>
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">
              Return to Workspace
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Sample production telemetry records
  const paymentRecords = [
    {
      order_id: "order_9812470123",
      payment_id: "pay_NLx91823901",
      customer: "mahimak2010@gmail.com",
      plan: "Complete",
      amount: "₹199",
      status: "captured",
      date: "2026-09-12 12:40",
    },
    {
      order_id: "order_9812470088",
      payment_id: "pay_NLx91823812",
      customer: "rahul.iitd@gmail.com",
      plan: "Essential",
      amount: "₹79",
      status: "captured",
      date: "2026-09-12 11:15",
    },
    {
      order_id: "order_9812470051",
      payment_id: "pay_NLx91823744",
      customer: "aditi.bca@outlook.com",
      plan: "Complete",
      amount: "₹199",
      status: "captured",
      date: "2026-09-11 18:22",
    },
    {
      order_id: "order_9812469940",
      payment_id: "pay_NLx91823610",
      customer: "ananya.nitk@gmail.com",
      plan: "Essential",
      amount: "₹79",
      status: "captured",
      date: "2026-09-11 15:04",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>Allowlist Protected</span>
              <span>•</span>
              <span className="text-emerald-700">Administrator Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
              Platform & Revenue Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Authorized admin overview for student customer accounts, order ids, and captured payments.
            </p>
          </div>

          <Badge variant="navy">Admin: {userEmail}</Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card padding="md">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">₹18,456</h3>
            <span className="text-[11px] text-emerald-700 font-semibold">+24% this week</span>
          </Card>

          <Card padding="md">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Customers</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">118 Students</h3>
            <span className="text-[11px] text-slate-500">68% Complete / 32% Essential</span>
          </Card>

          <Card padding="md">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gateway Status</span>
            <h3 className="text-2xl font-extrabold text-emerald-700 mt-1">Razorpay Live</h3>
            <span className="text-[11px] text-slate-500">Webhook verified (HMAC SHA-256)</span>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card padding="none" className="overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Recent Transactions & Customer Orders
            </h2>
            <span className="text-xs text-slate-400">Live feed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Payment ID</th>
                  <th className="py-3 px-4">Student Customer</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                {paymentRecords.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">{p.order_id}</td>
                    <td className="py-3 px-4 text-slate-500">{p.payment_id}</td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-900">{p.customer}</td>
                    <td className="py-3 px-4 font-sans">
                      <Badge variant={p.plan === "Complete" ? "emerald" : "slate"}>
                        {p.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{p.amount}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-sans">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
