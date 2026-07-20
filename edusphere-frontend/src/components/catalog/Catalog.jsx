import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { 
  Search, Star, CreditCard, ChevronRight, Bookmark, ArrowRight, 
  ShieldCheck, Award, Sparkles, Filter, Clock, BookOpen, User, CheckCircle2,
  X, Lock, Zap, RefreshCw, Flame, SlidersHorizontal
} from 'lucide-react';

export default function Catalog({ user, onNavigate, onEnrollSuccess }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');

  // Selected item modal detail
  const [selectedCourse, setSelectedCourse] = useState(null);
  // Checkout cart screen overlay
  const [checkoutCourse, setCheckoutCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const loadCourses = async () => {
    try {
      const res = await api.request(`/courses?page=0&size=100`);
      setCourses(res.content || []);
    } catch (err) {
      console.error('Failed to load courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const toggleBookmark = (courseId, e) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    try {
      const payload = {
        courseIds: [checkoutCourse.id],
        totalAmount: checkoutCourse.price,
        paymentMethod
      };
      await api.request('/orders/checkout', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      // Mock Local Storage Enrollment Update
      const cachedEnrolls = JSON.parse(localStorage.getItem('edusphere_mock_enrolls')) || [];
      if (!cachedEnrolls.some(e => e.courseId === checkoutCourse.id)) {
        cachedEnrolls.push({
          id: Date.now(),
          courseId: checkoutCourse.id,
          progressPercent: 0,
          status: 'active',
          completedLessonIds: []
        });
        localStorage.setItem('edusphere_mock_enrolls', JSON.stringify(cachedEnrolls));
      }

      setTimeout(() => {
        setIsProcessingPayment(false);
        setCheckoutCourse(null);
        setSelectedCourse(null);
        if (onEnrollSuccess) onEnrollSuccess();
      }, 600);

    } catch (err) {
      setIsProcessingPayment(false);
      alert('Checkout failed: ' + err.message);
    }
  };

  // Filter courses
  const filtered = courses.filter(c => {
    const matchesCategory = category === 'All' || c.category?.toLowerCase() === category.toLowerCase();
    const matchesSearch = c.title?.toLowerCase().includes(search.toLowerCase()) || 
                          c.description?.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'All' || (c.level && c.level.toLowerCase() === levelFilter.toLowerCase());
    const matchesPrice = priceFilter === 'All' || 
                         (priceFilter === 'Free' && c.price === 0) ||
                         (priceFilter === 'Paid' && c.price > 0);

    return matchesCategory && matchesSearch && matchesLevel && matchesPrice;
  });

  const categories = [
    { name: 'All', icon: '🌐' },
    { name: 'Development', icon: '💻' },
    { name: 'Design', icon: '🎨' },
    { name: 'Business', icon: '📈' }
  ];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500/20 border-t-purple-600"></div>
          <Sparkles className="h-5 w-5 text-purple-600 absolute animate-pulse" />
        </div>
        <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Loading EduSphere Catalog...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1440px] mx-auto pb-16 select-none text-left">
      
      {/* 10x Glassmorphic Search Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 p-6 sm:p-10 border border-slate-800 text-white shadow-2xl">
        {/* Glowing Radial Light Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-extrabold uppercase tracking-widest">
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span>Enterprise Skill Pathways</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Master the Future of <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Tech & Design</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Explore 35+ industry-accredited courses built by engineering leads and enterprise architects.
              </p>
            </div>

            {/* Live Counter Badge */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shrink-0 self-start md:self-auto">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-lg">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-black text-white">{filtered.length} Courses</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Available Now</div>
              </div>
            </div>
          </div>

          {/* Search Bar & Filters */}
          <div className="grid md:grid-cols-12 gap-3 pt-2">
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Python, Spring Boot, React, Figma..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-11 pr-10 py-3 text-xs text-white placeholder-slate-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Level Selector */}
            <div className="md:col-span-3">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white font-bold outline-none focus:border-purple-500 transition cursor-pointer"
              >
                <option value="All">All Skill Levels</option>
                <option value="Beginner">Beginner Level</option>
                <option value="Intermediate">Intermediate Level</option>
                <option value="Advanced">Advanced Level</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="md:col-span-3">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs text-white font-bold outline-none focus:border-purple-500 transition cursor-pointer"
              >
                <option value="All">All Prices</option>
                <option value="Paid">Paid Premium Courses</option>
                <option value="Free">Free Tutorials</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills & Active Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                category === cat.name
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20 font-black'
                  : 'bg-slate-100/80 hover:bg-slate-200/60 text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {(category !== 'All' || search || levelFilter !== 'All' || priceFilter !== 'All') && (
          <button
            onClick={() => {
              setCategory('All');
              setSearch('');
              setLevelFilter('All');
              setPriceFilter('All');
            }}
            className="text-[11px] font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 rounded-xl transition"
          >
            <RefreshCw className="h-3 w-3" />
            Reset Filters
          </button>
        )}
      </div>

      {/* 10x Course Grid Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">
            🔍
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-800">No Courses Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">We couldn't find any courses matching your search criteria. Try adjusting your filter tags.</p>
          </div>
          <button
            onClick={() => { setCategory('All'); setSearch(''); setLevelFilter('All'); setPriceFilter('All'); }}
            className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition"
          >
            Show All Courses
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(c => {
            const isBookmarked = bookmarkedIds.includes(c.id);
            return (
              <div 
                key={c.id} 
                onClick={() => setSelectedCourse(c)}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 hover:shadow-2xl hover:border-purple-300 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden text-left"
              >
                {/* Top Banner Gradient Badge */}
                <div className="space-y-3">
                  <div className="relative h-36 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl group-hover:scale-125 transition duration-500"></div>
                    
                    <div className="flex justify-between items-start z-10">
                      <span className="text-4xl group-hover:scale-110 transition duration-300 drop-shadow-md">
                        {c.thumbnail || '💻'}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-[9px] font-black uppercase tracking-wider text-white">
                          {c.level || 'Intermediate'}
                        </span>
                        <button 
                          onClick={(e) => toggleBookmark(c.id, e)}
                          className={`p-1.5 rounded-lg backdrop-blur-md transition ${
                            isBookmarked ? 'bg-purple-600 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="z-10 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-400/20">
                        {c.category || 'Development'}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-black bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-amber-400" />
                        <span>{c.rating || 4.8}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-black text-slate-900 text-sm group-hover:text-purple-600 transition leading-snug line-clamp-1">
                      {c.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {c.description || 'Master key enterprise development skills with interactive hands-on modules.'}
                    </p>
                  </div>
                </div>
                
                {/* Footer Price & Enroll Trigger */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Tuition Fee</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-slate-900">
                        ${c.price || 999.00}
                      </span>
                      {c.originalPrice && c.originalPrice > c.price && (
                        <span className="text-[10px] text-slate-400 line-through font-bold">
                          ${c.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="px-3.5 py-2 rounded-xl bg-purple-50 group-hover:bg-purple-600 text-purple-700 group-hover:text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-sm">
                    <span>View Course</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 10x Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative text-left space-y-0 max-h-[90vh] flex flex-col">
            
            {/* Top Gradient Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-900 text-white space-y-4 relative overflow-hidden shrink-0">
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                <span className="text-5xl p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-md">
                  {selectedCourse.thumbnail || '💻'}
                </span>
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider">
                    {selectedCourse.category || 'Development'}
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight">{selectedCourse.title}</h3>
                </div>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Course Overview</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {selectedCourse.description}
                </p>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Total Lessons</span>
                  <span className="text-sm font-black text-slate-800">{selectedCourse.totalLessons || 35} Modules</span>
                </div>
                <div className="space-y-0.5 border-x border-slate-200">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Rating</span>
                  <span className="text-sm font-black text-amber-500 flex items-center justify-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    {selectedCourse.rating || 4.8}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Certificate</span>
                  <span className="text-sm font-black text-purple-700">Included</span>
                </div>
              </div>

              {/* Guarantees List */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Full Lifetime Access to all video modules</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Official EduSphere Verified Certificate of Completion</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Q&A Discussion Forum & Instructor Support</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Enrollment Price</span>
                  <span className="text-xl font-black text-slate-900">${selectedCourse.price || 999.00}</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!user) {
                        alert('Please sign in to enroll in courses!');
                        return;
                      }
                      setCheckoutCourse(selectedCourse);
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/20 transition active:scale-95 flex items-center gap-2"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 10x Payment Checkout Drawer Overlay */}
      {checkoutCourse && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800 text-left">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <div className="flex items-center gap-1.5 text-purple-400 font-extrabold text-[10px] uppercase tracking-widest">
                  <Lock className="h-3 w-3" />
                  <span>Secure SSL Checkout</span>
                </div>
                <h3 className="font-black text-base text-white">Enrollment Checkout</h3>
              </div>
              <button 
                onClick={() => setCheckoutCourse(null)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-5">
              {/* Summary Card */}
              <div className="p-4 bg-purple-50/60 border border-purple-100 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{checkoutCourse.thumbnail || '💻'}</span>
                  <div>
                    <h4 className="font-black text-xs text-slate-900 line-clamp-1">{checkoutCourse.title}</h4>
                    <p className="text-[10px] font-bold text-purple-600">{checkoutCourse.category || 'Development'}</p>
                  </div>
                </div>
                <span className="text-sm font-black text-slate-900">${checkoutCourse.price}</span>
              </div>

              {/* Payment Mode Selector */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Select Payment Gateway</label>
                {[
                  { id: 'UPI', label: 'UPI / Instant Google Pay', icon: '⚡' },
                  { id: 'Credit/Debit Card', label: 'Credit / Debit Card', icon: '💳' },
                  { id: 'Net Banking', label: 'Net Banking & Wallet', icon: '🏦' }
                ].map(method => (
                  <label key={method.id} className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold cursor-pointer transition ${
                    paymentMethod === method.id 
                      ? 'bg-purple-50 border-purple-600 text-purple-900' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment_method"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="accent-purple-600"
                      />
                      <span>{method.label}</span>
                    </div>
                    <span>{method.icon}</span>
                  </label>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Total Charged</span>
                <span className="text-lg font-black text-purple-700">${checkoutCourse.price}</span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutCourse(null)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-600/20 transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span>Confirm & Pay ${checkoutCourse.price}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
