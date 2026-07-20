import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { 
  Trophy, BookOpen, BarChart2, Award, MessageSquare, Bot, Menu, X, Home 
} from 'lucide-react';

import StudentHome from './StudentHome';
import StudentCourses from './StudentCourses';
import StudentProgress from './StudentProgress';
import StudentCertificates from './StudentCertificates';
import StudentDiscussions from './StudentDiscussions';
import StudentChatbot from './StudentChatbot';
import StudentLeaderboard from './StudentLeaderboard';

export default function StudentDashboard({ user, onNavigate, onOpenProfile }) {
  const [activeMenu, setActiveMenu] = useState('dashboard'); // dashboard, courses, progress, certificates, discussions, chatbot
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [analytics, setAnalytics] = useState({ xp: 450, streak: 3, enrolledCourses: 0, certificatesAwarded: 0 });
  const [loading, setLoading] = useState(true);
  
  // Mobile responsiveness sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Discussions state
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [newTopic, setNewTopic] = useState('');

  // AI Chatbot state
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I am your AI Tutor Assistant. Ask me anything about programming, Spring Boot, Python, or UI/UX Design!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);

  const loadData = async () => {
    try {
      const enrolls = await api.request('/enrollments/my');
      setEnrollments(enrolls);

      const coursesRes = await api.request('/courses?page=0&size=100');
      const allCourses = coursesRes.content || [];
      setCourses(allCourses);

      if (allCourses.length > 0) {
        setSelectedCourseId(allCourses[0].id.toString());
      }

      // Load analytics
      try {
        const stats = await api.request('/analytics/student');
        setAnalytics(stats);
      } catch (e) {
        setAnalytics({
          xp: user.xp || 450,
          streak: user.streak || 3,
          enrolledCourses: enrolls.length,
          certificatesAwarded: enrolls.filter(e => e.status === 'completed').length
        });
      }

      // Load certificates
      const mockEnrolls = JSON.parse(localStorage.getItem('edusphere_mock_enrolls')) || [];
      setCertificates(mockEnrolls.filter(e => e.status === 'completed'));

    } catch (err) {
      console.error('Failed to load student dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // Load discussions when selected course changes
  useEffect(() => {
    if (!selectedCourseId) return;
    const loadDiscussions = async () => {
      try {
        const list = await api.request(`/courses/${selectedCourseId}/discussions`);
        setDiscussions(list);
      } catch (e) {
        const cached = JSON.parse(localStorage.getItem(`discussions_${selectedCourseId}`)) || [];
        setDiscussions(cached);
      }
    };
    loadDiscussions();
  }, [selectedCourseId]);

  const getCourseDetails = (id) => {
    return courses.find(c => c.id === id) || { title: 'Java Full Stack Development', thumbnail: '💻', instructor: { name: 'John Doe' } };
  };

  // Submit discussion Q&A
  const handlePostDiscussion = async (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    try {
      const res = await api.request(`/courses/${selectedCourseId}/discussions`, {
        method: 'POST',
        body: JSON.stringify({ body: newTopic })
      });
      setDiscussions(prev => [res, ...prev]);
    } catch (err) {
      const cached = JSON.parse(localStorage.getItem(`discussions_${selectedCourseId}`)) || [];
      const newD = {
        id: Date.now(),
        userName: user.name,
        userInitials: user.name.substring(0, 2).toUpperCase(),
        body: newTopic,
        createdDate: new Date().toISOString().split('T')[0],
        votes: 0
      };
      const updated = [newD, ...cached];
      localStorage.setItem(`discussions_${selectedCourseId}`, JSON.stringify(updated));
      setDiscussions(updated);
    }
    setNewTopic('');
  };

  // Submit chatbot message
  const handleSendChat = (textToSend) => {
    const prompt = textToSend || chatInput;
    if (!prompt.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setAiTyping(true);

    setTimeout(() => {
      let aiText = '';
      const query = prompt.toLowerCase();

      if (query.includes('spring') || query.includes('boot')) {
        aiText = `Spring Boot is an open-source Java-based framework used to build microservices and standalone production-ready applications. 

Key Annotations:
- \`@RestController\`: Marks the class as a REST controller.
- \`@Autowired\`: Handles dependencies injection automatically.

Example REST Controller:
\`\`\`java
@RestController
@RequestMapping("/api")
public class HelloController {
    @GetMapping("/greet")
    public String sayHello() {
        return "Welcome to Spring Boot!";
    }
}
\`\`\``;
      } else if (query.includes('mvc') || query.includes('controller')) {
        aiText = `MVC (Model-View-Controller) is an architectural design pattern:
- **Model**: Represents the data layer.
- **View**: Renders visual representation.
- **Controller**: Coordinates logic and requests.`;
      } else if (query.includes('oop') || query.includes('class') || query.includes('polymorphism')) {
        aiText = `Object-Oriented Programming (OOP) core pillars:
1. **Inheritance**: Subclasses acquire properties of a parent class.
2. **Polymorphism**: Ability for a method to behave differently based on context.
3. **Encapsulation**: Restricting direct access using private getters/setters.
4. **Abstraction**: Hiding background details using interfaces.`;
      } else if (query.includes('rest') || query.includes('http')) {
        aiText = `REST APIs use standard HTTP verbs:
- **GET**: Retrieve records.
- **POST**: Create a resource.
- **PUT**: Overwrite an existing item.
- **DELETE**: Remove resource items.`;
      } else {
        aiText = `That is an excellent learning topic! In software engineering, it is best practice to construct modular components to ensure clean organization.`;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiText }]);
      setAiTyping(false);
    }, 1000);
  };

  const renderActiveView = () => {
    switch (activeMenu) {
      case 'courses':
        return (
          <StudentCourses 
            enrollments={enrollments} 
            getCourseDetails={getCourseDetails} 
            onNavigate={onNavigate} 
          />
        );
      case 'progress':
        return (
          <StudentProgress 
            enrollments={enrollments} 
            analytics={analytics} 
            certificates={certificates} 
          />
        );
      case 'certificates':
        return (
          <StudentCertificates 
            certificates={certificates} 
            getCourseDetails={getCourseDetails} 
          />
        );
      case 'leaderboard':
        return (
          <StudentLeaderboard user={user} />
        );
      case 'discussions':
        return (
          <StudentDiscussions 
            courses={courses}
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
            discussions={discussions}
            newTopic={newTopic}
            setNewTopic={setNewTopic}
            handlePostDiscussion={handlePostDiscussion}
          />
        );
      case 'chatbot':
        return (
          <StudentChatbot 
            messages={messages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            aiTyping={aiTyping}
            handleSendChat={handleSendChat}
          />
        );
      default:
        return (
          <StudentHome 
            user={user} 
            analytics={analytics} 
            enrollments={enrollments} 
            getCourseDetails={getCourseDetails} 
            onNavigate={onNavigate} 
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)] lg:h-[calc(100vh-6rem)] lg:border lg:border-slate-200 lg:rounded-3xl overflow-hidden bg-white select-text relative">
      
      {/* Mobile Header Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-500 hover:text-purple-600 hover:bg-slate-50 rounded-xl transition"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-xs font-black text-slate-800 tracking-wider uppercase">Student Panel</span>
        <div className="w-9 h-9"></div> {/* Spacer */}
      </div>

      {/* Sidebar Overlay Backdrop for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Left Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 border-r border-slate-200 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } text-left`}>
        
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <button 
            onClick={onOpenProfile}
            className="flex items-center gap-2 text-left group hover:opacity-90 transition cursor-pointer"
            title="Click to edit profile"
          >
            <div className="h-9 w-9 rounded-full overflow-hidden bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs shrink-0 border border-purple-200 group-hover:border-purple-500 shadow-sm">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span>{user.presetAvatar || user.name?.substring(0, 2).toUpperCase() || 'S'}</span>
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-purple-600 transition flex items-center gap-1">
                <span>{user.name}</span>
                <span className="text-[10px]">⚙️</span>
              </div>
              <div className="text-[10px] text-slate-400">Student Panel • Edit</div>
            </div>
          </button>
          {/* Close button visible only on mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Home Hub', icon: Home },
            { id: 'courses', label: 'My Enrolled Paths', icon: BookOpen },
            { id: 'progress', label: 'My Learning Stats', icon: BarChart2 },
            { id: 'leaderboard', label: 'Global Leaderboard', icon: Trophy },
            { id: 'certificates', label: 'Certificates Log', icon: Award },
            { id: 'discussions', label: 'Central Q&A Forum', icon: MessageSquare },
            { id: 'chatbot', label: 'AI Tutor Assistant', icon: Bot }
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsSidebarOpen(false); // Close sidebar on mobile select
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-xs font-bold transition duration-300 ${
                  activeMenu === item.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/10'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content panel */}
      <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto flex flex-col gap-4 sm:gap-6 text-left">
        {renderActiveView()}
      </div>

    </div>
  );
}
