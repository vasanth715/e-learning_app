import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, GraduationCap, Send, ShieldCheck, 
  CheckCircle2, ArrowRight, Heart, Sparkles, Globe
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 text-xs select-text text-left relative overflow-hidden border-t border-slate-800/80">
      
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Newsletter CTA Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span>Stay Ahead In Technology</span>
            </div>
            <h3 className="text-lg font-black text-white tracking-wide">
              Subscribe to Weekly Masterclass & Tech Updates
            </h3>
            <p className="text-slate-400 text-xs">Join 45,000+ developers receiving our curated fullstack tutorials.</p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-2">
            {isSubscribed ? (
              <div className="px-5 py-2.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl text-xs font-black flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <div className="flex w-full md:w-96 bg-slate-900 border border-slate-800 focus-within:border-purple-500 rounded-2xl p-1.5 transition">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-transparent px-3 text-xs text-white outline-none placeholder:text-slate-500 font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/20 hover:scale-105 active:scale-95 transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Join Free</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main 4-Column Footer Area */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        
        {/* Col 1: Brand & Mission */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2.5 bg-white p-2 px-4 rounded-2xl shadow-xl border border-slate-100 select-none">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-black text-slate-900 text-base tracking-wide">GOPIVERSE</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Gopiverse Universal IT Solutions is an enterprise learning ecosystem providing production-ready software development bootcamps and corporate talent upskilling.
          </p>

          <div className="pt-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 w-fit">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>All Services Operational</span>
          </div>
        </div>

        {/* Col 2: Learning Paths */}
        <div className="space-y-4">
          <h4 className="font-black text-white text-xs uppercase tracking-widest text-purple-400">
            Top Learning Paths
          </h4>
          <ul className="space-y-2.5 font-bold text-slate-300 text-xs">
            {['Java Spring Boot REST Architect', 'React 19 & Tailwind CSS Mastery', 'Modern UI/UX Design Academy', 'Python Data Analytics BootCamp', 'AWS Cloud Infrastructure'].map((item, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => onNavigate && onNavigate('/catalog')} 
                  className="hover:text-purple-300 transition duration-300 flex items-center gap-1.5 group text-left"
                >
                  <span className="text-purple-500 group-hover:translate-x-1 transition duration-300">›</span>
                  <span>{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick Links & Enterprise */}
        <div className="space-y-4">
          <h4 className="font-black text-white text-xs uppercase tracking-widest text-indigo-400">
            Company & Solutions
          </h4>
          <ul className="space-y-2.5 font-bold text-slate-300 text-xs">
            {[
              { label: 'Browse Full Catalog', path: '/catalog' },
              { label: 'Enterprise Team Seats', path: '/dashboard' },
              { label: 'Instructor Studio', path: '/dashboard' },
              { label: 'System Health Check', path: '/dashboard' },
              { label: 'Careers (We\'re Hiring!)', path: '/catalog' }
            ].map((link, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => onNavigate && onNavigate(link.path)} 
                  className="hover:text-indigo-300 transition duration-300 flex items-center gap-1.5 group text-left"
                >
                  <span className="text-indigo-500 group-hover:translate-x-1 transition duration-300">›</span>
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact & Socials */}
        <div className="space-y-5">
          <h4 className="font-black text-white text-xs uppercase tracking-widest text-pink-400">
            Head Office & Support
          </h4>
          
          <div className="space-y-3 text-xs text-slate-300 font-medium">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
              <span>Plot No. 45, Madhapur, Hitec City Metro, Hyderabad, Telangana 500081, INDIA.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
              <span className="font-bold text-white">+91 8639176137</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-pink-400 shrink-0" />
              <span className="font-bold text-white">info@gopiverse.com</span>
            </div>
          </div>

          {/* Social Pills */}
          <div className="pt-1 space-y-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Connect With Us</span>
            <div className="flex flex-wrap gap-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-slate-900 hover:bg-purple-600 text-white rounded-xl border border-slate-800 transition duration-300 hover:scale-110 shadow-md"
                title="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl border border-slate-800 transition duration-300 hover:scale-110 shadow-md"
                title="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/vasanth715/e-learning_app" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-800 transition duration-300 hover:scale-110 shadow-md"
                title="GitHub Repo"
              >
                <Globe className="h-4 w-4 text-purple-400" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar Footer Copyright */}
      <div className="border-t border-slate-800/80 bg-slate-950/90">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-bold">
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span>© 2026 Gopiverse Universal IT Solutions. All Rights Reserved.</span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="text-purple-400 flex items-center gap-1">
              Crafted with <Heart className="h-3 w-3 fill-pink-500 text-pink-500" /> for Developers
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider">
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-black">
              <ShieldCheck className="h-3.5 w-3.5" /> 256-Bit SSL Encrypted
            </span>
            <button onClick={() => onNavigate && onNavigate('/')} className="hover:text-white transition">Terms</button>
            <button onClick={() => onNavigate && onNavigate('/')} className="hover:text-white transition">Privacy</button>
          </div>

        </div>
      </div>

    </footer>
  );
}
