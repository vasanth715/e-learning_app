import React from 'react';
import { Star, BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function TrendingCourses({ onNavigate }) {
  const trendingList = [
    {
      id: 1,
      title: "Java Full Stack Development Masterclass",
      category: "Development",
      price: "$99.00",
      rating: "4.9",
      reviews: "1,240",
      lectures: 45,
      duration: "32h",
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
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Top Programs</span>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">Trending Courses</h2>
        </div>
        <button
          onClick={() => onNavigate('/catalog')}
          className="text-xs font-black text-purple-600 hover:text-purple-700 flex items-center gap-1 group transition"
        >
          View Full Library <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
        </button>
      </div>

      {/* Larger Card Grid (3 Columns instead of 5 Columns) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingList.map(c => (
          <div
            key={c.id}
            onClick={() => onNavigate('/catalog')}
            className="bg-white rounded-[32px] border border-slate-100 p-5 space-y-4 hover:shadow-xl hover:border-purple-200 transition duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Cover Image Frame */}
              <div className="h-48 rounded-2xl overflow-hidden relative shadow-inner bg-slate-100">
                <img 
                  src={c.imageUrl} 
                  alt={c.title} 
                  className="h-full w-full object-cover hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-extrabold uppercase text-slate-700 shadow-sm">
                  {c.category}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-800 text-sm leading-snug">
                  {c.title}
                </h3>
                
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>{c.rating}</span>
                  </div>
                  <span>({c.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-bold">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><BookOpen className="h-4 w-4 text-slate-400" /> {c.lectures} Lessons</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-slate-400" /> {c.duration}</span>
              </div>
              <div className="text-sm font-black text-purple-600">{c.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
