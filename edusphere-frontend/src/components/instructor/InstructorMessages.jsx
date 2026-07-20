import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, Mail, User, ShieldCheck } from 'lucide-react';

export default function InstructorMessages({ user }) {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  
  const loadMessages = () => {
    const stored = localStorage.getItem('edusphere_mock_instructor_messages');
    if (!stored) {
      const defaultMsgs = [
        {
          id: 1,
          senderName: "STUDENT",
          senderEmail: "student@edusphere.com",
          courseTitle: "Spring Boot REST API Development 2026",
          text: "Hi JADA LAKSHMAN, I'm having trouble with the REST controller mapping in lesson 3. Can you guide me on how to return proper JSON responses?",
          timestamp: new Date(Date.now() - 3600000 * 4).toLocaleString(),
          replies: []
        },
        {
          id: 2,
          senderName: "Sarah Jenkins",
          senderEmail: "sarah@gmail.com",
          courseTitle: "Modern UI/UX Design Masters Academy",
          text: "Awesome course! The Figma templates you shared were extremely helpful. Thank you for the direct reviews!",
          timestamp: new Date(Date.now() - 3600000 * 24).toLocaleString(),
          replies: [
            {
              senderName: "JADA LAKSHMAN",
              text: "Thank you Sarah! Glad you loved the design templates. Keep designing!",
              timestamp: new Date(Date.now() - 3600000 * 22).toLocaleString()
            }
          ]
        }
      ];
      localStorage.setItem('edusphere_mock_instructor_messages', JSON.stringify(defaultMsgs));
      setMessages(defaultMsgs);
    } else {
      setMessages(JSON.parse(stored));
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleReplySubmit = (msgId) => {
    const txt = replyText[msgId];
    if (!txt || !txt.trim()) return;

    const updated = messages.map(msg => {
      if (msg.id === msgId) {
        return {
          ...msg,
          replies: [
            ...msg.replies,
            {
              senderName: user.name || "JADA LAKSHMAN",
              text: txt,
              timestamp: new Date().toLocaleString()
            }
          ]
        };
      }
      return msg;
    });

    localStorage.setItem('edusphere_mock_instructor_messages', JSON.stringify(updated));
    setMessages(updated);
    setReplyText(prev => ({ ...prev, [msgId]: '' }));
    alert('Reply sent successfully!');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-800 text-xs tracking-wide uppercase">Community Messages & Feedback</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Read direct technical support queries and general path feedbacks from your students.</p>
        </div>
        <div className="h-9 w-9 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
          <MessageSquare className="h-5 w-5" />
        </div>
      </div>

      {messages.length === 0 ? (
        <p className="text-xs text-slate-400">No student messages received yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
              
              {/* Message Header */}
              <div className="flex justify-between items-start gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    {msg.senderName[0]}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      {msg.senderName} 
                      <span className="text-[9px] text-slate-400 font-semibold lowercase">({msg.senderEmail})</span>
                    </div>
                    <div className="text-[10px] text-purple-600 font-bold mt-0.5">Course: {msg.courseTitle}</div>
                  </div>
                </div>
                <div className="text-[9px] text-slate-400 font-bold">{msg.timestamp}</div>
              </div>

              {/* Message Content */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {msg.text}
              </div>

              {/* Replies History */}
              {msg.replies && msg.replies.length > 0 && (
                <div className="pl-6 border-l-2 border-purple-200 space-y-3 pt-2">
                  <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Responses History</h5>
                  {msg.replies.map((rep, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-700">
                        <span className="text-purple-600 flex items-center gap-0.5"><ShieldCheck className="h-3 w-3" /> {rep.senderName}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">• {rep.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 bg-purple-50/20 p-2.5 rounded-xl border border-purple-100/10">{rep.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Send Reply Form */}
              <div className="pt-2 border-t border-slate-50 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a direct reply or assistance instructions..."
                  value={replyText[msg.id] || ''}
                  onChange={(e) => setReplyText(prev => ({ ...prev, [msg.id]: e.target.value }))}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => handleReplySubmit(msg.id)}
                  className="px-4 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" /> Reply
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
