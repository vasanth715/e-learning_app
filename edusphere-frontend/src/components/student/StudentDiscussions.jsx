import React from 'react';
import { Send } from 'lucide-react';

export default function StudentDiscussions({ 
  courses, selectedCourseId, setSelectedCourseId, 
  discussions, newTopic, setNewTopic, handlePostDiscussion 
}) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-lg font-bold text-slate-800">Central Q&A Forum</h3>
      
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <span className="text-xs font-bold text-slate-600">Select Path Forum:</span>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs outline-none"
        >
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      </div>

      {/* Post question form */}
      <form onSubmit={handlePostDiscussion} className="flex gap-2">
        <input
          type="text"
          required
          placeholder="Ask a new question to this course community board..."
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-purple-500"
        />
        <button type="submit" className="p-2 bg-purple-600 text-white rounded-xl">
          <Send className="h-4 w-4" />
        </button>
      </form>

      {/* Discussion Feed list */}
      <div className="space-y-2">
        {discussions.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-4 text-center">No questions posted to this forum path yet. Ask the first question!</p>
        ) : (
          discussions.map(d => (
            <div key={d.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                <span className="text-purple-600">{d.userName || 'Ed Student'}</span>
                <span>{d.createdDate}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{d.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
