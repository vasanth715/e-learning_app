import React from 'react';

export default function AdminPayments({ orders }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 text-left">Sales Transactions History</h3>
      <div className="border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm bg-white">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-100">
            <tr>
              <th className="p-4">Txn ID</th>
              <th className="p-4">Buyer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Method</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-slate-50/50 transition">
                <td className="p-4 font-mono text-slate-500">#{o.id}</td>
                <td className="p-4 font-bold">{o.user?.name}</td>
                <td className="p-4 font-bold text-slate-800">${o.totalAmount}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    o.status === 'completed' 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-red-50 text-red-600 border border-red-100'
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{o.paymentMethod}</td>
                <td className="p-4 text-slate-400">{o.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
