import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';

export default function StudentCourses({ enrollments, getCourseDetails, onNavigate }) {
  const [activeCourse, setActiveCourse] = useState(null);
  const [msgText, setMsgText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!msgText.trim()) return;

    const stored = JSON.parse(localStorage.getItem('edusphere_mock_instructor_messages')) || [
      {
        id: 1,
        senderName: "STUDENT",
        senderEmail: "student@edusphere.com",
        courseTitle: "Spring Boot REST API Development 2026",
        text: "Hi JADA LAKSHMAN, I'm having trouble with the REST controller mapping in lesson 3. Can you guide me on how to return proper JSON responses?",
        timestamp: new Date(Date.now() - 3600000 * 4).toLocaleString(),
        replies: []
      }
    ];

    const newMsg = {
      id: Date.now(),
      senderName: "STUDENT",
      senderEmail: "student@edusphere.com",
      courseTitle: activeCourse.title,
      instructorName: activeCourse.instructor?.name || "JADA LAKSHMAN",
      instructorEmail: activeCourse.instructor?.email || "instructor@edusphere.com",
      text: msgText,
      timestamp: new Date().toLocaleString(),
      replies: []
    };

    stored.unshift(newMsg);
    localStorage.setItem('edusphere_mock_instructor_messages', JSON.stringify(stored));
    alert(`Feedback message successfully sent to Instructor ${activeCourse.instructor?.name || 'Tutor'}!`);
    
    setMsgText('');
    setActiveCourse(null);
  };

  return (
    <div className="space-y-4 text-left">
      <h3 className="text-lg font-bold text-slate-800">My Enrolled Paths</h3>
      {enrollments.length === 0 ? (
        <p className="text-xs text-slate-400">You are not enrolled in any paths yet.</p>
      ) : (
        <div className="grid gap-3">
          {enrollments.map(e => {
            const details = getCourseDetails(e.courseId);
            return (
              <div key={e.id} className="bg-slate-50 p-4 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{details.thumbnail}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{details.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">By Instructor {details.instructor?.name || 'Tutor'}</p>
                    {/* Visual Progress Bar */}
                    <div className="mt-2 w-full min-w-[140px] sm:w-48 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full transition-all duration-300" style={{ width: `${e.progressPercent}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <div className="text-right mr-2 hidden sm:block">
                    <div className="text-xs font-bold text-slate-800">{e.progressPercent}%</div>
                    <div className="text-[9px] text-slate-400 uppercase font-semibold">Progress</div>
                  </div>
                  
                  <button
                    onClick={() => setActiveCourse(details)}
                    className="p-2 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-xl transition flex items-center gap-1.5 text-xs font-bold"
                    title="Send message to instructor"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Message Tutor</span>
                  </button>

                  <button
                    onClick={() => onNavigate(`/course/${e.courseId}`)}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 rounded-xl transition"
                  >
                    Open Player
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Message Modal Dialog */}
      {activeCourse && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300">
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wide">Message Instructor</h3>
                <p className="text-[10px] text-white/80 mt-0.5">Send direct feedback or technical doubt query</p>
              </div>
              <button 
                onClick={() => setActiveCourse(null)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            
            <form onSubmit={handleSendMessage} className="p-6 space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Tutor Name</label>
                <input
                  type="text"
                  disabled
                  value={activeCourse.instructor?.name || 'JADA LAKSHMAN'}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-500 font-bold outline-none cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Subject Course Path</label>
                <input
                  type="text"
                  disabled
                  value={activeCourse.title}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-500 font-bold outline-none cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-500 uppercase">Your Message / Feedback</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Type your message, query or feedback details..."
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveCourse(null)}
                  className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" /> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

