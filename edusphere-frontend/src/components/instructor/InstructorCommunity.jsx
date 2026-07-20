import React, { useState, useEffect } from 'react';
import { Send, Users, Megaphone, Trash2, Calendar } from 'lucide-react';

export default function InstructorCommunity({ user, courses }) {
  const [announcements, setAnnouncements] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const loadAnnouncements = () => {
    const stored = localStorage.getItem('edusphere_mock_announcements');
    if (!stored) {
      const defaultPosts = [
        {
          id: 1,
          title: "🔴 Live Q&A Session Scheduled!",
          content: "Hello team! We are holding a live QA session this Friday at 6:00 PM IST to review Spring Boot JPA entity mappings and handle doubt clearances. The link will be shared in your course player.",
          courseTitle: "Spring Boot REST API Development 2026",
          timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString()
        },
        {
          id: 2,
          title: "💻 Source Code Repository Updated",
          content: "All coding practice repositories have been updated to support Java 17 and Spring Boot 3.3 architectures. Download the zip files from the resources section of lesson 4.",
          courseTitle: "Spring Boot REST API Development 2026",
          timestamp: new Date(Date.now() - 3600000 * 20).toLocaleString()
        }
      ];
      localStorage.setItem('edusphere_mock_announcements', JSON.stringify(defaultPosts));
      setAnnouncements(defaultPosts);
    } else {
      setAnnouncements(JSON.parse(stored));
    }
  };

  useEffect(() => {
    loadAnnouncements();
    if (courses && courses.length > 0) {
      setSelectedCourse(courses[0].title);
    }
  }, [courses]);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      courseTitle: selectedCourse || (courses.length > 0 ? courses[0].title : "General Announcement"),
      timestamp: new Date().toLocaleString()
    };

    const updated = [newPost, ...announcements];
    localStorage.setItem('edusphere_mock_announcements', JSON.stringify(updated));
    setAnnouncements(updated);
    setNewTitle('');
    setNewContent('');
    alert('Announcement post published to all enrolled students successfully!');
  };

  const handleDelete = (id) => {
    const updated = announcements.filter(p => p.id !== id);
    localStorage.setItem('edusphere_mock_announcements', JSON.stringify(updated));
    setAnnouncements(updated);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Publisher section */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-extrabold text-xs tracking-wide uppercase">
          <Megaphone className="h-4.5 w-4.5 text-purple-600" />
          <span>Publish Community Announcement</span>
        </div>
        
        <form onSubmit={handlePublish} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase">Announcement Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Chapter 4 GitHub source files updated!"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-purple-500 font-medium"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase">Select Target Course Path</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-purple-500 font-bold text-slate-700"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.title}>{c.title}</option>
                ))}
                {courses.length === 0 && <option value="General">General (All Students)</option>}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-400 uppercase">Content Message</label>
            <textarea
              required
              rows="3"
              placeholder="Write your announcement details to send alerts..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-purple-500 leading-relaxed font-medium"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black shadow-md shadow-purple-600/10 hover:scale-105 transition flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5" /> Publish Announcement
            </button>
          </div>
        </form>
      </div>

      {/* Announcements Feed list */}
      <div className="space-y-3">
        <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Active Channel Posts ({announcements.length})</h4>
        
        {announcements.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No community posts published yet.</p>
        ) : (
          <div className="space-y-3">
            {announcements.map(post => (
              <div key={post.id} className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h5 className="font-bold text-slate-800 text-xs">{post.title}</h5>
                    <div className="inline-flex items-center gap-1 text-[9px] text-purple-600 font-bold mt-1 uppercase tracking-wide">
                      <Megaphone className="h-3 w-3" /> {post.courseTitle}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-400 font-semibold">{post.timestamp}</span>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
