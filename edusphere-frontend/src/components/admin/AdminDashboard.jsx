import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { LayoutDashboard, Users, BookOpen, Clock, CreditCard, Building2 } from 'lucide-react';

import AdminHome from './AdminHome';
import AdminUsers from './AdminUsers';
import AdminCourses from './AdminCourses';
import AdminPayments from './AdminPayments';
import AdminEnrollments from './AdminEnrollments';
import AdminEnterprise from './AdminEnterprise';

export default function AdminDashboard({ user, onOpenProfile }) {
  const [activeMenu, setActiveMenu] = useState('dashboard'); // dashboard, users, courses, payments, enrollments
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      // Fetch courses (all)
      let allCourses = [];
      try {
        const coursesRes = await api.request('/courses?page=0&size=100');
        allCourses = coursesRes.content || [];
        if (allCourses.length === 0) {
          allCourses = JSON.parse(localStorage.getItem('edusphere_mock_courses')) || [];
        }
      } catch (err) {
        allCourses = JSON.parse(localStorage.getItem('edusphere_mock_courses')) || [];
      }
      setCourses(allCourses);

      // Fetch enrollments (all)
      let allEnrolls = [];
      try {
        allEnrolls = await api.request('/enrollments/my'); // mock endpoint fallback contains all for admin demo
      } catch (e) {
        allEnrolls = JSON.parse(localStorage.getItem('edusphere_mock_enrolls')) || [];
      }
      if (allEnrolls.length === 0) {
        allEnrolls = JSON.parse(localStorage.getItem('edusphere_mock_enrolls')) || [];
      }
      setEnrollments(allEnrolls);

      // Mock users list
      const seedUsers = [
        { id: 1, name: 'Diya Khere', email: 'diya@example.com', role: 'student' },
        { id: 2, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'student' },
        { id: 3, name: 'Sneha Patil', email: 'sneha@example.com', role: 'student' },
        { id: 4, name: 'Amit Verma', email: 'instructor@edusphere.com', role: 'instructor' },
        { id: 5, name: 'Ed Admin', email: 'admin@edusphere.com', role: 'admin' }
      ];
      setUsers(seedUsers);

      // Mock payments list
      const seedOrders = [
        { id: 101, user: { name: 'Diya Khere' }, totalAmount: 999.00, status: 'completed', paymentMethod: 'UPI', createdAt: '2026-07-19' },
        { id: 102, user: { name: 'Rahul Sharma' }, totalAmount: 799.00, status: 'completed', paymentMethod: 'Credit Card', createdAt: '2026-07-18' },
        { id: 103, user: { name: 'Sneha Patil' }, totalAmount: 899.00, status: 'completed', paymentMethod: 'UPI', createdAt: '2026-07-17' },
        { id: 104, user: { name: 'Amit Verma' }, totalAmount: 699.00, status: 'failed', paymentMethod: 'Net Banking', createdAt: '2026-07-16' }
      ];
      setOrders(seedOrders);

    } catch (err) {
      console.error('Failed to load admin metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleApprove = async (courseId) => {
    try {
      await api.request(`/admin/courses/${courseId}/approve`, {
        method: 'POST'
      });
      alert('Course successfully published to the live public catalog!');
    } catch (err) {
      const cached = JSON.parse(localStorage.getItem('edusphere_mock_courses')) || [];
      const matchIdx = cached.findIndex(c => c.id === courseId);
      if (matchIdx !== -1) {
        cached[matchIdx].status = 'published';
        localStorage.setItem('edusphere_mock_courses', JSON.stringify(cached));
      }
      alert('Course status approved and published locally in mock DB!');
    }
    loadData();
  };

  const handleHoldUser = async (userId) => {
    try {
      await api.request(`/users/${userId}/hold`, { method: 'PUT' });
    } catch (err) {
      console.warn('Backend hold endpoint offline fallback');
    }
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const currentlyHeld = u.status === 'suspended' || u.isHold === true;
        return {
          ...u,
          status: currentlyHeld ? 'active' : 'suspended',
          isHold: !currentlyHeld
        };
      }
      return u;
    }));
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to permanently delete this user account? This operation cannot be undone.')) {
      try {
        await api.request(`/users/${userId}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Backend delete endpoint offline fallback');
      }
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const renderActiveView = () => {
    switch (activeMenu) {
      case 'users':
        return <AdminUsers users={users} onHoldUser={handleHoldUser} onDeleteUser={handleDeleteUser} />;
      case 'courses':
        return <AdminCourses courses={courses} handleApprove={handleApprove} />;
      case 'enterprise':
        return <AdminEnterprise />;
      case 'payments':
        return <AdminPayments orders={orders} />;
      case 'enrollments':
        return <AdminEnrollments enrollments={enrollments} />;
      case 'dashboard':
      default:
        return <AdminHome courses={courses} enrollments={enrollments} />;
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
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)] lg:h-[calc(100vh-6rem)] lg:border lg:border-slate-800 lg:rounded-3xl overflow-hidden bg-slate-950 select-text relative shadow-2xl">
      
      {/* Sidebar Nav */}
      <div className="w-full lg:w-64 bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col flex-shrink-0 text-left">
        <div className="p-5 border-b border-slate-800/80 bg-slate-900/50">
          <button 
            onClick={onOpenProfile}
            className="flex items-center gap-3 text-left group hover:opacity-90 transition cursor-pointer w-full"
            title="Click to edit profile"
          >
            <div className="h-10 w-10 rounded-2xl overflow-hidden bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0 border border-purple-400/40 group-hover:scale-105 transition shadow-lg shadow-purple-600/20">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span>{user.presetAvatar || user.name?.substring(0, 2).toUpperCase() || 'A'}</span>
              )}
            </div>
            <div>
              <div className="text-xs font-black text-white group-hover:text-purple-300 transition flex items-center gap-1">
                <span>{user.name}</span>
                <span className="text-[10px]">⚙️</span>
              </div>
              <div className="text-[9px] font-black text-purple-400 uppercase tracking-widest mt-0.5">Super Admin Hub</div>
            </div>
          </button>
        </div>

        <nav className="flex-1 p-3 sm:p-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Command Hub', icon: LayoutDashboard },
            { id: 'users', label: 'Users Control', icon: Users },
            { id: 'courses', label: 'Course Approvals', icon: BookOpen },
            { id: 'enterprise', label: 'Enterprise Seats', icon: Building2 },
            { id: 'payments', label: 'Payments Ledger', icon: CreditCard },
            { id: 'enrollments', label: 'Active Enrollments', icon: Clock }
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-600/20 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-6 text-left bg-slate-50">
        {renderActiveView()}
      </div>

    </div>
  );
}
