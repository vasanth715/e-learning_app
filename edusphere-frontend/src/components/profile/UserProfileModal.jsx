import React, { useState } from 'react';
import { 
  User, Camera, Upload, Link, Check, X, Shield, Lock, Bell, Sparkles, 
  Briefcase, MapPin, Phone, Mail, Award, Globe, Save, Eye, EyeOff
} from 'lucide-react';
import { api } from '../../services/api';

const PRESET_AVATARS = [
  { id: 'av1', emoji: '🎓', label: 'Scholar' },
  { id: 'av2', emoji: '💻', label: 'Coder' },
  { id: 'av3', emoji: '🚀', label: 'Explorer' },
  { id: 'av4', emoji: '🎨', label: 'Designer' },
  { id: 'av5', emoji: '⚡', label: 'Pro' },
  { id: 'av6', emoji: '🦊', label: 'Crafty' },
  { id: 'av7', emoji: '🦁', label: 'Leader' },
  { id: 'av8', emoji: '🔮', label: 'Innovator' }
];

export default function UserProfileModal({ isOpen, onClose, user, onUserUpdate }) {
  if (!isOpen || !user) return null;

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'details' | 'security'
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '+1 (555) 019-2834',
    bio: user.bio || 'Passionate learner building modern full-stack web applications and scaling cloud systems.',
    headline: user.headline || 'Software Engineer & Tech Enthusiast',
    location: user.location || 'San Francisco, CA',
    avatarUrl: user.avatarUrl || user.avatar || '',
    presetAvatar: user.presetAvatar || '🎓',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifs: user.emailNotifs ?? true,
    courseAlerts: user.courseAlerts ?? true,
    publicProfile: user.publicProfile ?? true,
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roleName = (user.roles?.[0] || 'student').toLowerCase();
  const roleBadgeColors = {
    admin: 'bg-red-500/10 text-red-600 border-red-200',
    instructor: 'bg-purple-500/10 text-purple-600 border-purple-200',
    orgadmin: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    student: 'bg-indigo-500/10 text-indigo-600 border-indigo-200'
  };

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  // Handle local image file upload (converts image to Base64)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image file size must be under 5MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, avatarUrl: reader.result }));
      setMessage({ type: 'success', text: 'Image uploaded successfully!' });
    };
    reader.readAsDataURL(file);
  };

  const handleAddCustomUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormData(prev => ({ ...prev, avatarUrl: imageUrlInput.trim() }));
    setImageUrlInput('');
    setMessage({ type: 'success', text: 'Image URL applied!' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    // Password validation if entered
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match.' });
        setIsSaving(false);
        return;
      }
      if (formData.newPassword.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
        setIsSaving(false);
        return;
      }
    }

    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        headline: formData.headline,
        location: formData.location,
        avatarUrl: formData.avatarUrl,
        presetAvatar: formData.presetAvatar,
        emailNotifs: formData.emailNotifs,
        courseAlerts: formData.courseAlerts,
        publicProfile: formData.publicProfile
      };

      await api.updateProfile(updatedUser);
      
      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center font-bold text-lg text-purple-300">
              ⚡
            </div>
            <div>
              <h2 className="text-base font-black tracking-wide text-white">User Profile & Account Settings</h2>
              <p className="text-[11px] text-slate-400 font-medium">Manage your personal info, avatar, security & preferences</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 pt-3 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'profile'
                ? 'border-purple-600 text-purple-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Camera className="h-3.5 w-3.5" />
            Picture & Avatar
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'details'
                ? 'border-purple-600 text-purple-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            Personal Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'security'
                ? 'border-purple-600 text-purple-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="h-3.5 w-3.5" />
            Security & Prefs
          </button>
        </div>

        {/* Form Content Area */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Status Alert Banner */}
          {message && (
            <div className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 border ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {message.type === 'success' ? <Check className="h-4 w-4 text-emerald-600 shrink-0" /> : <X className="h-4 w-4 text-red-600 shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}

          {/* TAB 1: PICTURE & AVATAR */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Profile Preview Block */}
              <div className="p-5 bg-gradient-to-br from-slate-50 to-purple-50/30 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center gap-5">
                
                {/* Big Avatar Display */}
                <div className="relative group shrink-0">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-purple-100 flex items-center justify-center font-black text-3xl text-purple-600">
                    {formData.avatarUrl ? (
                      <img src={formData.avatarUrl} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <span>{formData.presetAvatar || formData.name?.substring(0, 2).toUpperCase() || 'U'}</span>
                    )}
                  </div>

                  {formData.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, avatarUrl: '' }))}
                      className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full text-xs shadow hover:bg-red-600 transition"
                      title="Remove image"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* User Bio Header */}
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-base font-black text-slate-800">{formData.name || 'User'}</h3>
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full border ${roleBadgeColors[roleName] || roleBadgeColors.student}`}>
                      {roleName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{formData.headline}</p>
                  <p className="text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                    <MapPin className="h-3 w-3" /> {formData.location}
                  </p>
                </div>
              </div>

              {/* Upload Picture Options */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Change Profile Picture</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* File Upload Button */}
                  <label className="p-3.5 border-2 border-dashed border-purple-200 hover:border-purple-500 bg-purple-50/20 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition text-xs font-bold text-purple-700">
                    <Upload className="h-4 w-4" />
                    <span>Upload Image File</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>

                  {/* Preset Avatar Selection */}
                  <div className="p-3 border border-slate-200 rounded-2xl bg-white space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Or Choose Preset Avatar</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {PRESET_AVATARS.map(av => (
                        <button
                          type="button"
                          key={av.id}
                          onClick={() => setFormData(p => ({ ...p, presetAvatar: av.emoji, avatarUrl: '' }))}
                          className={`h-7 w-7 rounded-lg text-sm flex items-center justify-center transition border ${
                            formData.presetAvatar === av.emoji && !formData.avatarUrl
                              ? 'bg-purple-600 border-purple-600 text-white scale-110 shadow-sm'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                          title={av.label}
                        >
                          {av.emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Custom Image URL Option */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Link className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="url"
                      placeholder="Paste Image URL (https://...)"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCustomUrl}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition"
                  >
                    Apply URL
                  </button>
                </div>
              </div>

              {/* Headline & Bio inputs */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Headline / Role Title</label>
                  <input 
                    type="text" 
                    value={formData.headline}
                    onChange={(e) => handleInputChange('headline', e.target.value)}
                    placeholder="e.g. Senior Backend Developer | Instructor"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">About / Bio</label>
                  <textarea 
                    rows="3"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Write a brief summary about yourself..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PERSONAL DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Location / City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Role information card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Platform Role</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-black text-slate-800 capitalize">{roleName} User</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">Access permissions managed by Admin</span>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & PREFERENCES */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              
              {/* Password update section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-purple-600" /> Change Security Password
                </h4>
                
                <div className="space-y-3">
                  {/* Current Password Field */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Current Password</label>
                    <div className="relative">
                      <input 
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-purple-600 transition"
                        title={showCurrentPassword ? "Hide password" : "Show password"}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* New Password Field */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">New Password</label>
                      <div className="relative">
                        <input 
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-purple-600 transition"
                          title={showNewPassword ? "Hide password" : "Show password"}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm New Password Field */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Confirm New Password</label>
                      <div className="relative">
                        <input 
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-purple-600 transition"
                          title={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Toggles */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Bell className="h-3.5 w-3.5 text-purple-600" /> Notification Preferences
                </h4>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100/70 transition">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Email Notifications</span>
                      <span className="text-[10px] text-slate-500">Receive course updates and platform notices via email</span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={formData.emailNotifs}
                      onChange={(e) => handleInputChange('emailNotifs', e.target.checked)}
                      className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100/70 transition">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Course Alerts & Achievements</span>
                      <span className="text-[10px] text-slate-500">Get push notices on completed lessons and streak rewards</span>
                    </div>
                    <input 
                      type="checkbox"
                      checked={formData.courseAlerts}
                      onChange={(e) => handleInputChange('courseAlerts', e.target.checked)}
                      className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                  </label>
                </div>
              </div>

            </div>
          )}

          {/* Action Buttons Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-md shadow-purple-600/20 transition active:scale-95 flex items-center gap-2"
            >
              <Save className="h-3.5 w-3.5" />
              {isSaving ? 'Saving Changes...' : 'Save Profile'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
