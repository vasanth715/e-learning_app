import React from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function StudentChatbot({ 
  messages, chatInput, setChatInput, aiTyping, handleSendChat 
}) {
  return (
    <div className="flex flex-col h-[400px] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden text-left">
      {/* Chat list */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
              msg.sender === 'user'
                ? 'bg-purple-600 text-white font-bold rounded-tr-none'
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
            {msg.sender === 'ai' ? (
              <div className="h-8 w-8 rounded-full bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot className="h-4 w-4" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-purple-50 border border-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        {aiTyping && (
          <div className="flex items-start gap-2 justify-start">
            <div className="p-3 bg-white border border-slate-200 text-slate-400 text-xs italic rounded-2xl rounded-tl-none animate-pulse">
              AI Tutor is typing...
            </div>
            <div className="h-8 w-8 rounded-full bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center flex-shrink-0 shadow-sm animate-bounce">
              <Bot className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 border-t border-slate-100 flex flex-wrap gap-1.5 bg-white">
        {[
          "What is Spring Boot?",
          "Explain MVC architecture",
          "OOP core pillars",
          "HTTP Status Codes"
        ].map(prompt => (
          <button
            key={prompt}
            onClick={() => handleSendChat(prompt)}
            className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-100 rounded-lg text-[10px] font-bold transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat inputs */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendChat();
        }}
        className="p-3 border-t border-slate-200 bg-white flex gap-2"
      >
        <input
          type="text"
          required
          placeholder="Ask your AI tutor a question..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-purple-500"
        />
        <button type="submit" className="p-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
          <Send className="h-4.5 w-4.5" />
        </button>
      </form>
    </div>
  );
}
