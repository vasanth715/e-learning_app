import React from 'react';
import { Plus, User, Star, BookOpen, DollarSign } from 'lucide-react';

export default function InstructorHome({
  courses = [], analytics = {}, setIsAddOpen, onNavigate
}) {
  const totalStudents = analytics?.totalStudents ?? 320;
  const instructorRating = analytics?.instructorRating ?? 4.9;
  const totalCourses = courses?.length ?? 0;
  const totalEarnings = analytics?.totalEarnings ?? (totalStudents * 24.99);

  return (
    <div className="space-y-6 text-left">
      
      {/* Analytics widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm space-y-1 text-left">
          <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1">
            <User className="h-3 w-3" /> Students
          </div>
          <div className="text-base font-black text-slate-800">{totalStudents}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm space-y-1 text-left">
          <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-500 fill-amber-500" /> Rating
          </div>
          <div className="text-base font-black text-slate-800">{instructorRating} ★</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm space-y-1 text-left">
          <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> Active Courses
          </div>
          <div className="text-base font-black text-slate-800">{totalCourses}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm space-y-1 text-left">
          <div className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-emerald-500" /> Estimated Earnings
          </div>
          <div className="text-base font-black text-slate-800">${Number(totalEarnings).toLocaleString()}</div>
        </div>
      </div>

      {/* Course listings */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider text-left">My Authored Courses</h3>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-[10px] font-black shadow-md shadow-purple-600/10 hover:scale-105 active:scale-95 transition flex items-center gap-1 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Build Course
          </button>
        </div>
        
        {!courses || courses.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 text-center space-y-3">
            <span className="text-3xl">💻</span>
            <p className="text-xs text-slate-500 font-bold">You haven't built any courses yet.</p>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">Click "Build Course" above to create your first curriculum module.</p>
            <button 
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-purple-700 transition"
            >
              + Create Course Now
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(c => (
              <div key={c.id || Math.random()} className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition duration-300 space-y-3 text-left">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-4xl">{c.thumbnail || '💻'}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                    c.status === 'published'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {c.status === 'published' ? 'Published' : 'Pending Review'}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs truncate">{c.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 truncate">{c.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-500">
                  <span>Price: ${c.price || 99}</span>
                  <span>Level: {c.level || 'Beginner'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
