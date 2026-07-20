import React from 'react';
import { CreditCard, ShieldCheck, Download, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminPayments({ orders = [] }) {
  const totalRev = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="space-y-6 text-left">
      
      {/* Header Banner */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-widest border border-purple-500/30">
            <CreditCard className="h-3 w-3" />
            <span>Financial Audit Ledger</span>
          </div>
          <h2 className="text-xl font-black text-white">Payment Transactions & Orders Log</h2>
          <p className="text-xs text-slate-400">Monitor course purchase transactions, payment methods, and revenue settlement status.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center shrink-0">
          <span className="text-[10px] font-bold uppercase text-slate-300 block">Total Ledger Revenue</span>
          <span className="text-xl font-black text-emerald-400">${totalRev.toFixed(2)}</span>
        </div>
      </div>

      {/* Table */}
      <div className="border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm bg-white">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-900 text-white font-extrabold uppercase text-[10px]">
            <tr>
              <th className="p-4">Txn Ref</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Amount Paid</th>
              <th className="p-4">Settlement Status</th>
              <th className="p-4">Payment Method</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-mono font-bold text-slate-500">#{o.id}</td>
                <td className="p-4 font-black text-slate-900">{o.user?.name || 'Student Learner'}</td>
                <td className="p-4 font-black text-purple-700">${o.totalAmount?.toFixed(2) || '999.00'}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                    o.status === 'completed' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {o.status === 'completed' ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <XCircle className="h-3 w-3 text-red-500" />}
                    {o.status}
                  </span>
                </td>
                <td className="p-4 font-bold text-slate-600">
                  <span className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] text-slate-700">
                    {o.paymentMethod || 'UPI'}
                  </span>
                </td>
                <td className="p-4 text-slate-400 font-medium">{o.createdAt || '2026-07-20'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
