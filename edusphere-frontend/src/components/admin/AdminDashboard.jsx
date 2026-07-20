import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { LayoutDashboard, Users, BookOpen, Clock, CreditCard } from 'lucide-react';

import AdminHome from './AdminHome';
import AdminUsers from './AdminUsers';
import AdminCourses from './AdminCourses';
import AdminPayments from './AdminPayments';
import AdminEnrollments from './AdminEnrollments';

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

  const renderActiveView = () => {
    switch (activeMenu) {
      case 'users':
        return <AdminUsers users={users} />;
      case 'courses':
        return <AdminCourses courses={courses} handleApprove={handleApprove} />;
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
    <div className="flex h-[calc(100vh-6rem)] border border-slate-200 rounded-3xl overflow-hidden bg-white select-text">
      
      {/* Sidebar Nav */}
      <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col flex-shrink-0 text-left">
        <div className="p-4 border-b border-slate-200 bg-white">
          <button 
            onClick={onOpenProfile}
            className="flex items-center gap-2 text-left group hover:opacity-90 transition cursor-pointer w-full"
            title="Click to edit profile"
          >
            <div className="h-9 w-9 rounded-full overflow-hidden bg-red-100 text-red-700 flex items-center justify-center font-black text-xs shrink-0 border border-red-200 group-hover:border-red-500 shadow-sm">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span>{user.presetAvatar || user.name?.substring(0, 2).toUpperCase() || 'A'}</span>
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 group-hover:text-red-600 transition flex items-center gap-1">
                <span>{user.name}</span>
                <span className="text-[10px]">⚙️</span>
              </div>
              <div className="text-[10px] text-slate-400">Admin Console • Edit</div>
            </div>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'users', label: 'Users Management', icon: Users },
            { id: 'courses', label: 'Course Moderation', icon: BookOpen },
            { id: 'payments', label: 'Payments Ledger', icon: CreditCard },
            { id: 'enrollments', label: 'Active Enrollments', icon: Clock }
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-xs font-bold transition duration-300 ${
                  activeMenu === item.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/10'
                    : 'text-slate-600 hover:bg-slate-100'
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
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 text-left bg-slate-50/10">
        {renderActiveView()}
      </div>

    </div>
  );
}
