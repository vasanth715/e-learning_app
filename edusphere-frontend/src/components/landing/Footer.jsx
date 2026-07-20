import React from 'react';
import { Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#05446b] text-blue-100/90 text-xs select-text text-left">
      {/* Top Footer Column Area */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        
        {/* Col 1: Head Office / Logo */}
        <div className="space-y-5">
          {/* Logo Badge capsules */}
          <div className="bg-white px-4 py-2 rounded-xl inline-flex items-center gap-2 shadow-sm border border-slate-100 select-none">
            <div className="h-6 w-6 rounded-lg bg-purple-600 flex items-center justify-center text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-black text-slate-800 text-sm tracking-wide">GOPIVERSE</span>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-wide">Head Office</h4>
            <p className="text-[11px] leading-relaxed text-blue-100/80">
              Plot No. 45, Madhapur,<br />
              Near Hitec City Metro Station,<br />
              Hyderabad, Telangana 500081, INDIA.
            </p>
            <div className="pt-2 space-y-1.5 text-[11px] font-semibold text-white">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-blue-300" />
                <span>Phone: +91 8639176137</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-blue-300" />
                <span>Email: info@gopiverse.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">GET TO KNOW US</h4>
          <nav className="flex flex-col gap-2.5 font-bold">
            <button onClick={() => onNavigate('/')} className="text-left hover:text-white transition duration-300">
              Home
            </button>
            <button onClick={() => onNavigate('/catalog')} className="text-left hover:text-white transition duration-300">
              About us
            </button>
            <button onClick={() => onNavigate('/catalog')} className="text-left hover:text-white transition duration-300">
              Career
            </button>
            <button onClick={() => onNavigate('/catalog')} className="text-left hover:text-white transition duration-300">
              Portfolio
            </button>
            <button onClick={() => onNavigate('/catalog')} className="text-left hover:text-white transition duration-300">
              Contact us
            </button>
          </nav>
        </div>

        {/* Col 3: About Corporate Details */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm tracking-wide">About Gopiverse</h4>
            <p className="text-[11px] leading-relaxed text-blue-100/80">
              Gopiverse Universal IT Solutions is a premier software development service based in Madhapur, Hyderabad. We strive to deliver quality solutions involving high-end technology at reasonable prices.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">FOLLOW US</h4>
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 bg-[#095786] hover:bg-[#07476e] text-white px-3.5 py-1.5 rounded-xl font-bold transition text-[10px]"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
                <span>Facebook</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 bg-[#095786] hover:bg-[#07476e] text-white px-3.5 py-1.5 rounded-xl font-bold transition text-[10px]"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar Divider */}
      <div className="border-t border-blue-400/20 bg-[#043757]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-blue-200/70 font-semibold uppercase tracking-wider">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 Gopiverse Universal IT Solutions. All Rights Reserved.</span>
            <span className="text-blue-400/40">|</span>
            <button onClick={() => onNavigate('/')} className="hover:text-white transition">Terms of Use</button>
            <span className="text-blue-400/40">|</span>
            <button onClick={() => onNavigate('/')} className="hover:text-white transition">Privacy Policy</button>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-[10px]">
            <a href="mailto:info@gopiverse.com" className="flex items-center gap-1.5 hover:text-white transition">
              <Mail className="h-3.5 w-3.5 text-blue-300" />
              <span>info@gopiverse.com</span>
            </a>
            <a href="tel:+918639176137" className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="h-3.5 w-3.5 text-blue-300" />
              <span>+91 8639176137</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
