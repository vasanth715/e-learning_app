import React, { useState } from 'react';
import { api } from '../../services/api';
import { X, Lock, Mail, User, Shield, Eye, EyeOff, Phone } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;
      if (isRegister) {
        data = await api.request('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password, role, phone }),
        });
      } else {
        data = await api.request('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
      }

      if (data && data.token) {
        api.setSession(data.token, data.user);
        onAuthSuccess(data.user);
        onClose();
      } else {
        throw new Error('Authentication failed.');
      }
    } catch (err) {
      setError(err.message || 'Verification failed. Double check details.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (quickEmail, quickPassword) => {
    setEmail(quickEmail);
    setPassword(quickPassword);
    setIsRegister(false);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-surface w-full max-w-md rounded-2xl shadow-xl border border-bg-surface-3 overflow-hidden transition-all duration-300">
        
        {/* Header */}
        <div className="relative p-6 border-b border-bg-surface-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
          <h3 className="text-xl font-bold">{isRegister ? 'Create Account' : 'Welcome Back'}</h3>
          <p className="text-xs text-white/80 mt-1">
            {isRegister ? 'Join LearnHub and start your skills lookup' : 'Login to resume your enrolled paths'}
          </p>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2">
              <span>⚠</span> {error}
            </div>
          )}

          {isRegister && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Diya K"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="student@edusphere.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 outline-none focus:border-purple-500 transition font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-purple-600 transition cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {isRegister && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Select Role</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'student', label: 'Student' },
                  { id: 'instructor', label: 'Instructor' },
                  { id: 'admin', label: 'System Admin' }
                ].map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition ${
                      role === r.id
                        ? 'bg-purple-50 border-purple-500 text-purple-700 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-indigo-600/10 text-white font-extrabold py-2.5 rounded-xl text-sm transition active:scale-95 disabled:opacity-50 mt-2"
          >
            {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
          </button>

          {/* Quick Logins for Seeder Credentials */}
          {!isRegister && (
            <div className="pt-4 border-t border-bg-surface-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase text-center mb-2 tracking-wider">
                Quick Demo Credentials Logins
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('student@edusphere.com', 'student123')}
                  className="px-2 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[10px] text-slate-700 font-bold"
                >
                  🎓 Student
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('instructor@edusphere.com', 'instructor123')}
                  className="px-2 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] text-slate-700 font-bold"
                >
                  💼 Instructor
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin@edusphere.com', 'admin123')}
                  className="px-2 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] text-slate-700 font-bold"
                >
                  🛡️ Admin
                </button>
              </div>
            </div>
          )}

          {/* Toggle */}
          <div className="text-center text-xs text-slate-400 mt-4">
            {isRegister ? 'Already have an account? ' : 'New to LearnHub? '}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-purple-600 font-bold hover:underline"
            >
              {isRegister ? 'Login Here' : 'Register Here'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
