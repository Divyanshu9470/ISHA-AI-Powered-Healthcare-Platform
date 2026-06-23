"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { Receipt, CheckCircle2, XCircle, Clock, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TransactionsPage() {
  const { data: session, status } = useSession();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  useEffect(() => {
    fetch('/api/student/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-12 text-center text-slate-400">Loading your transaction history...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-50">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Payments & Receipts</h1>
          <p className="text-slate-500 mt-2">View and manage all your course enrollments and transactions.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border border-slate-200 p-3 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5 text-slate-600" />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search receipts..." 
              className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="p-6 text-sm font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                <th className="p-6 text-sm font-semibold text-slate-600 uppercase tracking-wider">Transaction ID</th>
                <th className="p-6 text-sm font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                <th className="p-6 text-sm font-semibold text-slate-600 uppercase tracking-wider">Method</th>
                <th className="p-6 text-sm font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="p-6 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <motion.tr 
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="p-6">
                    <div className="text-slate-900 font-medium">
                      {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(tx.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="p-6">
                    <code className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono uppercase">
                      {tx.providerOrderId || tx.id.substring(0, 12)}
                    </code>
                  </td>
                  <td className="p-6">
                    <span className="text-lg font-bold text-slate-900">
                      {tx.currency === "INR" ? "₹" : "$"}{tx.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="text-sm text-slate-600 font-medium uppercase">{tx.paymentMethod}</span>
                  </td>
                  <td className="p-6">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-blue-600 hover:text-blue-700 font-bold text-sm inline-flex items-center gap-2">
                      <Receipt className="w-4 h-4" /> Download
                    </button>
                  </td>
                </motion.tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-20 text-center text-slate-400">
                    <Receipt className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No transactions found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: any = {
    SUCCESS: { icon: CheckCircle2, text: "Successful", class: "bg-green-100 text-green-700 border-green-200" },
    FAILED: { icon: XCircle, text: "Failed", class: "bg-red-100 text-red-700 border-red-200" },
    PENDING: { icon: Clock, text: "Pending", class: "bg-orange-100 text-orange-700 border-orange-200" },
  };

  const config = configs[status] || configs.PENDING;
  const Icon = config.icon;

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border", config.class)}>
      <Icon className="w-3 h-3" /> {config.text}
    </span>
  );
}
