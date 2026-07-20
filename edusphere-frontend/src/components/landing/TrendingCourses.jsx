import React from 'react';
import { Star, BookOpen, Clock, ArrowRight, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function TrendingCourses({ onNavigate }) {
  const trendingList = [
    {
      id: 1,
      title: "Java Full Stack Development Masterclass 2026",
      category: "Development",
      price: "$99.00",
      rating: "4.9",
      reviews: "1,240",
      lectures: 45,
      duration: "32h",
      badge: "🔥 Bestseller",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Python for Artificial Intelligence & Data Science",
      category: "Development",
      price: "$89.00",
      rating: "4.8",
      reviews: "980",
      lectures: 38,
      duration: "28h",
      badge: "⚡️ Trending",
      imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Modern UI/UX Design Masters Academy",
      category: "Design",
      price: "$79.00",
      rating: "4.7",
      reviews: "640",
      lectures: 32,
      duration: "22h",
      badge: "⭐ Top Rated",
      imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Enterprise Cloud Infrastructure & DevOps",
      category: "Development",
      price: "$119.00",
      rating: "4.9",
      reviews: "820",
      lectures: 50,
      duration: "35h",
      badge: "🛡️ Enterprise",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Business Automation & Predictive Analytics",
      category: "Business",
      price: "$69.00",
      rating: "4.6",
      reviews: "450",
      lectures: 25,
      duration: "18h",
      badge: "🚀 Hot",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="space-y-8 text-left py-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-widest">
            <TrendingUp className="h-3 w-3" />
            <span>Curated Skill Pathways</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Featured <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Masterclasses</span>
          </h2>
        </div>

        <button
          onClick={() => onNavigate('/catalog')}
          className="px-5 py-2.5 bg-slate-900 hover:bg-purple-600 text-white rounded-2xl text-xs font-black transition-all duration-300 flex items-center gap-2 group shadow-md cursor-pointer self-start sm:self-auto"
        >
          <span>Explore 35+ Courses</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
        </button>
      </div>

      {/* 10x Card Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingList.map(c => (
          <div
            key={c.id}
            onClick={() => onNavigate('/catalog')}
            className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 hover:shadow-2xl hover:border-purple-300 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group text-left"
          >
            <div className="space-y-4">
              {/* Cover Image Frame */}
              <div className="h-48 rounded-2xl overflow-hidden relative shadow-md bg-slate-900 group">
                <img 
                  src={c.imageUrl} 
                  alt={c.title} 
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-white/20 rounded-xl text-[10px] font-black uppercase text-white shadow-sm">
                    {c.category}
                  </span>
                  <span className="px-2.5 py-1 bg-purple-600/90 backdrop-blur-md rounded-xl text-[10px] font-black text-white shadow-md">
                    {c.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold">
                  <div className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    <BookOpen className="h-3.5 w-3.5 text-purple-400" />
                    <span>{c.lectures} Modules</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    <Clock className="h-3.5 w-3.5 text-purple-400" />
                    <span>{c.duration}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-purple-600 transition line-clamp-2">
                  {c.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md font-black">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>{c.rating}</span>
                  </div>
                  <span className="text-[11px]">({c.reviews} enrolled reviews)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Tuition Fee</span>
                <span className="text-base font-black text-slate-900">{c.price}</span>
              </div>
              
              <button className="px-4 py-2 rounded-xl bg-purple-50 group-hover:bg-purple-600 text-purple-700 group-hover:text-white text-xs font-black transition-all duration-300 flex items-center gap-1.5 shadow-sm">
                <span>Enroll Now</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
