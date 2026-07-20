import React from 'react';
import { Briefcase, GraduationCap, MessageSquare } from 'lucide-react';

export default function TrustedClients() {
  return (
    <section className="space-y-6 text-left">
      <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center">Trusted By Global Leaders</h2>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40 grayscale">
        <span className="text-sm font-extrabold flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> Google Devs</span>
        <span className="text-sm font-extrabold flex items-center gap-1.5"><GraduationCap className="h-4 w-4" /> Stanford Academy</span>
        <span className="text-sm font-extrabold flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> Reddit Eng</span>
      </div>
    </section>
  );
}
