'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useUIPreferences } from '@/context/UIPreferencesContext';
import { User, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, FolderKanban, Users2, LineChart, Sun, Moon } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithMicrosoft, isLoading, error, clearError, selectedSite } = useAuth();
  const { preferences, setColorMode } = useUIPreferences();

  const [email, setEmail] = useState('rajvi.prajapati@key360.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const isDark = preferences.colorMode === 'dark';

  const toggleTheme = () => {
    setColorMode(isDark ? 'light' : 'dark');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await login(email, password);
    if (success) {
      if (selectedSite) {
        router.push('/dashboard');
      } else {
        router.push('/select-site');
      }
    }
  };

  const handleMicrosoftLogin = async () => {
    clearError();
    const success = await loginWithMicrosoft();
    if (success) {
      if (selectedSite) {
        router.push('/dashboard');
      } else {
        router.push('/select-site');
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-[#070b09] flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans relative overflow-hidden transition-colors duration-200 selection:bg-[#007a4d] selection:text-white">
      {/* Ambient Glowing Green Mesh Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,122,77,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(0,122,77,0.22),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,122,77,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_80%,rgba(0,122,77,0.15),transparent_50%)] pointer-events-none" />

      {/* Main Executive Login Card Container */}
      <div className="w-full max-w-5xl bg-white dark:bg-[#0d120f] rounded-3xl shadow-2xl shadow-zinc-300/60 dark:shadow-black/90 overflow-hidden border border-zinc-200 dark:border-emerald-950/80 flex flex-col md:flex-row min-h-[660px] relative z-10">
        
        {/* Left Hero Section - Brand Showcase with Responsive Light/Dark Emerald Canvas */}
        <div className="md:w-1/2 bg-gradient-to-b from-[#007a4d] via-[#00623e] to-[#004e31] dark:from-[#022416] dark:via-[#011a10] dark:to-[#000d07] text-white relative p-8 sm:p-10 flex flex-col justify-between overflow-hidden border-r border-[#00623e] dark:border-emerald-950/60">
          
          {/* Animated SVG Network Node Web Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-35 dark:opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#a3e635" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Glowing Connection Dots */}
            <circle cx="15%" cy="25%" r="4" fill="#a3e635" />
            <circle cx="85%" cy="20%" r="5" fill="#ffffff" />
            <circle cx="65%" cy="55%" r="6" fill="#a3e635" className="animate-ping" style={{ animationDuration: '3.5s' }} />
            <circle cx="65%" cy="55%" r="4" fill="#ffffff" />
            <circle cx="25%" cy="75%" r="5" fill="#ffffff" />
            <circle cx="80%" cy="85%" r="4" fill="#a3e635" />

            {/* Connecting Dashed Mesh Lines */}
            <path d="M 15% 25% L 85% 20% L 65% 55% L 25% 75% Z" fill="none" stroke="url(#nodeGrad)" strokeWidth="1.2" strokeDasharray="4,4" />
            <path d="M 15% 25% L 65% 55% L 80% 85%" fill="none" stroke="url(#nodeGrad)" strokeWidth="1" />
            <path d="M 85% 20% L 25% 75%" fill="none" stroke="url(#nodeGrad)" strokeWidth="1" />
          </svg>

          {/* Top Brand Logo - Key360 Management Platform */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <img src="/Key360-Logo.png" alt="Key360 Logo" className="h-9 w-auto object-contain" />
              <span className="text-2xl sm:text-3xl font-black tracking-widest text-white dark:text-[#a3e635] font-mono">
                KEY360
              </span>
            </div>
            <p className="text-[10px] tracking-[0.25em] text-emerald-100 dark:text-emerald-300/90 font-semibold uppercase mt-1">
              MANAGEMENT PLATFORM
            </p>
            <div className="w-12 h-1 bg-white dark:bg-[#007a4d] rounded-full mt-2 shadow-xs" />
          </div>

          {/* Hero Headlines */}
          <div className="relative z-10 my-10 md:my-0 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
              One Platform.<br />
              Every <span className="text-emerald-200 dark:text-[#10b981] underline decoration-white/40 dark:decoration-[#007a4d]/40 underline-offset-4">Operation.</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 dark:text-emerald-100/70 max-w-sm leading-relaxed font-normal">
              Manage projects, operations, people, documents and enterprise data from one unified workspace.
            </p>
          </div>

          {/* Bottom Feature Cards (Projects, Operations, Analytics) */}
          <div className="relative z-10 grid grid-cols-3 gap-3 pt-6 border-t border-white/20 dark:border-emerald-900/40">
            <div className="p-3 rounded-2xl bg-white/10 dark:bg-white/[0.03] border border-white/20 dark:border-white/[0.06] text-center backdrop-blur-md transition-all hover:bg-white/20 dark:hover:bg-white/[0.06]">
              <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-white/20 dark:bg-[#007a4d]/20 text-white dark:text-[#a3e635] flex items-center justify-center border border-white/30 dark:border-[#007a4d]/40">
                <FolderKanban className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-white">Projects</p>
              <p className="text-[10px] text-emerald-100/80 dark:text-emerald-200/60 mt-0.5 leading-tight hidden sm:block">
                Plan, track & deliver
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 dark:bg-white/[0.03] border border-white/20 dark:border-white/[0.06] text-center backdrop-blur-md transition-all hover:bg-white/20 dark:hover:bg-white/[0.06]">
              <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-white/20 dark:bg-[#007a4d]/20 text-white dark:text-[#a3e635] flex items-center justify-center border border-white/30 dark:border-[#007a4d]/40">
                <Users2 className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-white">Operations</p>
              <p className="text-[10px] text-emerald-100/80 dark:text-emerald-200/60 mt-0.5 leading-tight hidden sm:block">
                Streamline daily workflows
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 dark:bg-white/[0.03] border border-white/20 dark:border-white/[0.06] text-center backdrop-blur-md transition-all hover:bg-white/20 dark:hover:bg-white/[0.06]">
              <div className="w-8 h-8 mx-auto mb-2 rounded-xl bg-white/20 dark:bg-[#007a4d]/20 text-white dark:text-[#a3e635] flex items-center justify-center border border-white/30 dark:border-[#007a4d]/40">
                <LineChart className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-white">Analytics</p>
              <p className="text-[10px] text-emerald-100/80 dark:text-emerald-200/60 mt-0.5 leading-tight hidden sm:block">
                Real-time insights
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Section - Authentication Form (Light & Dark Adaptive) */}
        <div className="md:w-1/2 p-7 sm:p-10 lg:p-12 flex flex-col justify-between bg-white dark:bg-[#101512] transition-colors duration-200 relative">
          
          {/* Top Right Theme Toggle Button */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-700/60 flex items-center gap-1.5 text-xs font-medium"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-zinc-600" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <div>
            {/* Form Top Brand Badge & Greeting */}
            <div className="mb-8 pr-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#007a4d] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#007a4d]/30">
                  K
                </div>
                <div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-wider">KEY360</span>
                  <span className="block text-[9px] text-[#007a4d] dark:text-emerald-400 font-semibold tracking-widest uppercase">
                    MANAGEMENT PLATFORM
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Welcome back!
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
                Sign in to continue to <span className="text-[#007a4d] font-bold">Key360</span>
              </p>
            </div>

            {/* Error Banner Alert */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/80 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs text-red-700 dark:text-red-200">
                  <p className="font-bold">Authentication Error</p>
                  <p className="mt-0.5 leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-[#181f1b] border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:border-[#007a4d] focus:ring-2 focus:ring-[#007a4d]/20 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-zinc-50 dark:bg-[#181f1b] border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none focus:border-[#007a4d] focus:ring-2 focus:ring-[#007a4d]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-[#007a4d] focus:ring-[#007a4d] cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Forgot Password: Contact your Key360 administrator to reset credentials.')}
                  className="font-semibold text-[#007a4d] hover:text-[#00623e] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[#007a4d] hover:bg-[#00623e] active:bg-[#004e31] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#007a4d]/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* OR Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-[#101512] px-3 text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider">OR</span>
              </div>
            </div>

            {/* Microsoft SSO Button */}
            <button
              type="button"
              onClick={handleMicrosoftLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white dark:bg-[#181f1b] border border-zinc-300 dark:border-zinc-700/80 hover:bg-zinc-50 dark:hover:bg-[#202924] text-zinc-800 dark:text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-3 transition-all shadow-xs cursor-pointer disabled:opacity-70"
            >
              {/* Microsoft 4-Color Squares Icon */}
              <div className="grid grid-cols-2 gap-0.5 shrink-0">
                <div className="w-2 h-2 bg-[#f25022]"></div>
                <div className="w-2 h-2 bg-[#7fba00]"></div>
                <div className="w-2 h-2 bg-[#00a4ef]"></div>
                <div className="w-2 h-2 bg-[#ffb900]"></div>
              </div>
              <span>Sign in with Microsoft</span>
            </button>
          </div>

          {/* Footer Copyright */}
          <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-center">
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
              © 2026 Key360 Management Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
