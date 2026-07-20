import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import LandingPage from './components/landing/LandingPage';
import Catalog from './components/catalog/Catalog';
import StudentDashboard from './components/student/StudentDashboard';
import CoursePlayer from './components/student/CoursePlayer';
import InstructorDashboard from './components/instructor/InstructorDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import OrgDashboard from './components/orgadmin/OrgDashboard';
import AuthModal from './components/auth/AuthModal';
import UserProfileModal from './components/profile/UserProfileModal';
import Navbar from './components/navigation/Navbar';
import Footer from './components/landing/Footer';
import { 
  BookOpen, Bell, LogOut, User, Menu, X, ShieldAlert, Settings, 
  Search, Sparkles, ChevronDown, Compass, LayoutDashboard, Home 
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Header Notification panel
  const [notifications, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Check session on load
    const savedUser = api.getUser();
    if (savedUser) {
      setUser(savedUser);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch notifications
  const loadNotifications = async () => {
    if (!user) return;
    try {
      const list = await api.request('/notifications');
      const hasHiringNotif = list.some(n => n.title && (n.title.includes("Hiring") || n.message.includes("interview")));
      if (!hasHiringNotif) {
        list.unshift({
          id: 99,
          title: "💼 Exclusive Hiring Invitation",
          message: "Congratulations! Gopiverse partner companies have flagged your profile for interview calls after completing your required skill set exams and coding practices.",
          read: false,
          type: "success"
        });
      }
      setNotifications(list);
    } catch (e) {
      const cached = JSON.parse(localStorage.getItem('edusphere_mock_notifications')) || [];
      const hasHiringNotif = cached.some(n => n.title && (n.title.includes("Hiring") || n.message.includes("interview")));
      if (!hasHiringNotif) {
        cached.unshift({
          id: 99,
          title: "💼 Exclusive Hiring Invitation",
          message: "Congratulations! Gopiverse partner companies have flagged your profile for interview calls after completing your required skill set exams and coding practices.",
          read: false,
          type: "success"
        });
        localStorage.setItem('edusphere_mock_notifications', JSON.stringify(cached));
      }
      setNotifications(cached);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [user]);

  const onNavigate = (path) => {
    window.location.hash = path;
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
    onNavigate('/');
  };

  const markAllRead = async () => {
    try {
      await api.request('/notifications/mark-read', { method: 'POST' });
      loadNotifications();
    } catch (e) {
      const updated = notifications.map(n => ({ ...n, read: true }));
      localStorage.setItem('edusphere_mock_notifications', JSON.stringify(updated));
      setNotifications(updated);
    }
  };

  // --- Router Dispatch ---
  const renderView = () => {
    const hash = route.slice(1); // strip '#'

    // Landing Page is rendered for home hashes ('/' or empty)
    if (hash === '' || hash === '/') {
      return <LandingPage onStartLearning={() => user ? onNavigate('/dashboard') : setIsAuthOpen(true)} onNavigate={onNavigate} />;
    }

    if (hash === '/catalog') {
      return <Catalog user={user} onNavigate={onNavigate} onEnrollSuccess={() => onNavigate('/dashboard')} />;
    }

    if (hash.startsWith('/course/')) {
      if (!user) return <LandingPage onStartLearning={() => setIsAuthOpen(true)} onNavigate={onNavigate} />;
      const courseId = hash.split('/')[2];
      return <CoursePlayer user={user} courseId={courseId} onNavigate={onNavigate} />;
    }

    if (hash === '/dashboard') {
      if (!user) return <LandingPage onStartLearning={() => setIsAuthOpen(true)} onNavigate={onNavigate} />;

      // Normalize user roles array and string fallback
      const rolesArray = Array.isArray(user.roles) ? user.roles : (user.role ? [user.role] : []);
      const normalizedRoles = rolesArray.map(r => String(r).toLowerCase().replace('role_', ''));
      
      const isInstructor = normalizedRoles.includes('instructor') || user.email?.toLowerCase().includes('instructor');
      const isAdmin = normalizedRoles.includes('admin') || user.email?.toLowerCase().includes('admin');
      const isOrgAdmin = normalizedRoles.includes('orgadmin') || user.email?.toLowerCase().includes('orgadmin');

      if (isInstructor) {
        return <InstructorDashboard user={user} onNavigate={onNavigate} onOpenProfile={() => setIsProfileOpen(true)} />;
      }
      if (isAdmin) {
        return <AdminDashboard user={user} onNavigate={onNavigate} onOpenProfile={() => setIsProfileOpen(true)} />;
      }
      if (isOrgAdmin) {
        return <OrgDashboard user={user} onNavigate={onNavigate} onOpenProfile={() => setIsProfileOpen(true)} />;
      }
      return <StudentDashboard user={user} onNavigate={onNavigate} onOpenProfile={() => setIsProfileOpen(true)} />;
    }

    // Default fallback
    return <LandingPage onStartLearning={() => setIsAuthOpen(true)} onNavigate={onNavigate} />;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-slate-700">
      
      {/* Modular Navbar Component */}
      <Navbar 
        user={user}
        route={route}
        onNavigate={onNavigate}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
        notifications={notifications}
        markAllRead={markAllRead}
      />

      {/* Main Content panel */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
        {renderView()}
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* Auth Modal overlay */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onAuthSuccess={(u) => {
          setUser(u);
          onNavigate('/dashboard');
        }} 
      />

      {/* Global User Profile & Account Settings Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUserUpdate={(updated) => setUser(updated)}
      />

    </div>
  );
}
