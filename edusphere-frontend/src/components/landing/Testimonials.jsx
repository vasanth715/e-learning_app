import React from 'react';

export default function Testimonials() {
  return (
    <section className="space-y-6 text-left">
      <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center">Student Feedback</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-3">
          <p className="text-xs text-slate-500 italic">"The practice quiz interface was challenging and highly interactive. Complete compliance with full Spring API endpoints made testing easy."</p>
          <div className="text-[10px] font-bold text-slate-700">— Diya K, Stanford student</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-3">
          <p className="text-xs text-slate-500 italic">"Being able to download the accredited credential PDF instantly upon finishing 100% of my lessons was a game-changer!"</p>
          <div className="text-[10px] font-bold text-slate-700">— Mike Ross, Software Engineer</div>
        </div>
      </div>
    </section>
  );
}
