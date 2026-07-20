import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Search, Star, CreditCard, ChevronRight, Bookmark, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export default function Catalog({ user, onNavigate, onEnrollSuccess }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Selected item modal detail
  const [selectedCourse, setSelectedCourse] = useState(null);
  // Checkout cart screen overlay
  const [checkoutCourse, setCheckoutCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

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

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
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
      alert(`Success! You have purchased and enrolled in "${checkoutCourse.title}"!`);

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

      setCheckoutCourse(null);
      setSelectedCourse(null);
      onEnrollSuccess();
    } catch (err) {
      alert('Checkout failed: ' + err.message);
    }
  };

  // Filter courses
  const filtered = courses.filter(c => {
    const matchesCategory = category === 'All' || c.category?.toLowerCase() === category.toLowerCase();
    const matchesSearch = c.title?.toLowerCase().includes(search.toLowerCase()) || 
                          c.description?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1440px] mx-auto pb-12 select-text text-left">
      
      {/* Header Search */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Explore Course Library</h2>
          <p className="text-xs text-slate-400">Search 35+ lessons built by industry leaders.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search python, Spring, Java..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Category selector capsules */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Development', 'Design', 'Business'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition duration-300 border ${
              category === cat
                ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses List */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div 
            key={c.id} 
            onClick={() => setSelectedCourse(c)}
            className="bg-white rounded-3xl border border-slate-100 p-5 space-y-4 hover:shadow-lg hover:border-purple-200 transition duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-4xl">{c.thumbnail || '💻'}</span>
                <button className="text-slate-300 hover:text-purple-600"><Bookmark className="h-4 w-4" /></button>
              </div>
              <h3 className="font-bold text-slate-800 text-xs truncate">{c.title}</h3>
              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{c.description}</p>
            </div>
            
            <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                <Star className="h-3 w-3 fill-amber-500" />
                <span>{c.rating || 4.8}</span>
              </div>
              <div className="text-xs font-black text-slate-800">${c.price || 999.00}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative text-left">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white space-y-3">
              <span className="text-5xl">{selectedCourse.thumbnail}</span>
              <h3 className="text-lg font-black">{selectedCourse.title}</h3>
              <p className="text-xs text-white/80 line-clamp-3">{selectedCourse.description}</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-4 text-center">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Lessons</span>
                  <span className="text-xs font-black text-slate-700">{selectedCourse.totalLessons || 35}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Rating</span>
                  <span className="text-xs font-black text-slate-700">{selectedCourse.rating || 4.8} ★</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Certificate</span>
                  <span className="text-xs font-black text-slate-700">Yes</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-extrabold text-sm text-slate-700">
                <span>Tuition Cost:</span>
                <span className="text-base text-purple-700 font-black">${selectedCourse.price}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 py-2.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (!user) {
                      alert('Please sign in to buy courses!');
                      return;
                    }
                    setCheckoutCourse(selectedCourse);
                  }}
                  className="flex-1 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Screen Checkout overlay */}
      {checkoutCourse && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-100 overflow-hidden text-slate-800 text-left">
            <div className="p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-sm">Payment Confirmation</h3>
              <p className="text-[10px] text-slate-400">EduSphere Checkout Portal</p>
            </div>
            
            <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs">{checkoutCourse.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Category: {checkoutCourse.category}</p>
                </div>
                <span className="text-xs font-black text-slate-700">${checkoutCourse.price}</span>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Choose Payment Mode</label>
                {['UPI', 'Credit/Debit Card', 'Net Banking'].map(method => (
                  <label key={method} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-100 transition">
                    <input
                      type="radio"
                      name="payment_method"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-black text-slate-800">
                <span>Total Amount:</span>
                <span>${checkoutCourse.price}</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutCourse(null)}
                  className="flex-1 py-2.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold"
                >
                  Pay ${checkoutCourse.price}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
