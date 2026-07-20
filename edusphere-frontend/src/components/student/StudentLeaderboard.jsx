import React from 'react';
import { Trophy, Award, Flame, Star, Sparkles, TrendingUp } from 'lucide-react';

export default function StudentLeaderboard({ user }) {
  // Mock leaderboard list
  const leaders = [
    {
      rank: 1,
      name: "Aarav Sharma",
      path: "Java Full Stack Developer",
      xp: 2850,
      completedPaths: 5,
      streakDays: 15,
      badge: "Elite Coder",
      color: "bg-amber-500/10 text-amber-600 border-amber-200",
      avatarBg: "bg-amber-100 text-amber-700"
    },
    {
      rank: 2,
      name: "Diya Kapoor",
      path: "Python AI Specialist",
      xp: 2400,
      completedPaths: 4,
      streakDays: 12,
      badge: "AI Scholar",
      color: "bg-slate-300/30 text-slate-700 border-slate-300/50",
      avatarBg: "bg-slate-100 text-slate-700"
    },
    {
      rank: 3,
      name: "Mike Ross",
      path: "Cloud & DevOps Engineer",
      xp: 2100,
      completedPaths: 3,
      streakDays: 8,
      badge: "DevOps Guru",
      color: "bg-amber-700/10 text-amber-800 border-amber-600/20",
      avatarBg: "bg-amber-100 text-amber-800"
    },
    {
      rank: 4,
      name: user.name || "STUDENT",
      path: "React & Spring Architect",
      xp: 1850,
      completedPaths: 2,
      streakDays: 3,
      badge: "Rising Architect",
      isCurrentUser: true,
      color: "bg-purple-100 text-purple-700 border-purple-200",
      avatarBg: "bg-purple-600 text-white"
    },
    {
      rank: 5,
      name: "Sarah Jenkins",
      path: "Modern UI/UX Designer",
      xp: 1600,
      completedPaths: 2,
      streakDays: 5,
      badge: "Design Ninja",
      color: "bg-blue-50 text-blue-600 border-blue-100",
      avatarBg: "bg-blue-100 text-blue-700"
    },
    {
      rank: 6,
      name: "Rohan Mehta",
      path: "Business Analytics Specialist",
      xp: 1200,
      completedPaths: 1,
      streakDays: 0,
      badge: "Data Analyst",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      avatarBg: "bg-emerald-100 text-emerald-700"
    }
  ];

  // Current logged in user summary indicators
  const currentUserStats = leaders.find(l => l.isCurrentUser) || {
    rank: 4,
    xp: 1850,
    streakDays: 3
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Overview Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[32px] p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden select-text text-left">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            <Trophy className="h-3 w-3 text-amber-300 fill-amber-300" /> Gopiverse Global Arena
          </div>
          <h2 className="text-xl md:text-3xl font-black">Global Leaderboard</h2>
          <p className="text-xs text-purple-100 max-w-md leading-relaxed">
            See how your learning efforts stack up against programmers worldwide. Earn XP by finishing lessons and scoring on quizes!
          </p>
        </div>

        {/* Current user metrics indicators */}
        <div className="flex gap-4 relative z-10 w-full md:w-auto shrink-0">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex-1 text-center min-w-[90px]">
            <div className="text-[10px] uppercase text-purple-200 font-bold">Your Rank</div>
            <div className="text-2xl font-black text-white mt-1">#{currentUserStats.rank}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex-1 text-center min-w-[90px]">
            <div className="text-[10px] uppercase text-purple-200 font-bold">Total XP</div>
            <div className="text-2xl font-black text-white mt-1">{currentUserStats.xp}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex-1 text-center min-w-[90px]">
            <div className="text-[10px] uppercase text-purple-200 font-bold">Streak</div>
            <div className="text-2xl font-black text-amber-300 mt-1 flex items-center justify-center gap-0.5">
              <Flame className="h-5 w-5 fill-amber-500 text-amber-500" /> {currentUserStats.streakDays}d
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 text-9xl font-black text-white/5 pointer-events-none select-none z-0">
          🏆
        </div>
      </div>

      {/* Ranks Listing container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between text-left">
          <div>
            <h3 className="font-extrabold text-slate-800 text-xs tracking-wide uppercase">Top Learners Standings</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Leaderboard resets weekly. Top 3 receive accredited developer badges.</p>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] bg-purple-50 text-purple-700 font-black px-2.5 py-1 rounded-lg uppercase tracking-wide">
            <Sparkles className="h-3 w-3" /> Live Standings
          </div>
        </div>

        {/* Responsive Table Scroll area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-5 text-center w-16">Rank</th>
                <th className="py-3 px-4">Student Profile</th>
                <th className="py-3 px-4 text-center">Completed Paths</th>
                <th className="py-3 px-4 text-center">Active Streak</th>
                <th className="py-3 px-4 text-center">Score XP</th>
                <th className="py-3 px-5 text-right">Award Achievement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {leaders.map((student) => {
                // Determine Rank Icon indicator representation
                let rankIndicator;
                if (student.rank === 1) {
                  rankIndicator = <span className="text-xl">🏆</span>;
                } else if (student.rank === 2) {
                  rankIndicator = <span className="text-xl">🥈</span>;
                } else if (student.rank === 3) {
                  rankIndicator = <span className="text-xl">🥉</span>;
                } else {
                  rankIndicator = <span className="font-black text-slate-400 text-xs">#{student.rank}</span>;
                }

                return (
                  <tr 
                    key={student.rank} 
                    className={`transition duration-200 ${
                      student.isCurrentUser 
                        ? 'bg-purple-50/50 hover:bg-purple-50 font-semibold' 
                        : 'hover:bg-slate-50/50'
                    }`}
                  >
                    {/* Rank cell */}
                    <td className="py-4 px-5 text-center">{rankIndicator}</td>
                    
                    {/* Student Info cell */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm flex-shrink-0 ${student.avatarBg}`}>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 flex items-center gap-1.5">
                            {student.name}
                            {student.isCurrentUser && (
                              <span className="text-[8px] bg-purple-600 text-white px-1.5 py-0.5 rounded font-black uppercase tracking-wide">You</span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{student.path}</div>
                        </div>
                      </div>
                    </td>

                    {/* Path Completed count */}
                    <td className="py-4 px-4 text-center font-semibold text-slate-700">
                      <div className="inline-flex items-center gap-1">
                        <Award className="h-3.5 w-3.5 text-slate-400" />
                        <span>{student.completedPaths}</span>
                      </div>
                    </td>

                    {/* Streak days count */}
                    <td className="py-4 px-4 text-center font-bold">
                      {student.streakDays > 0 ? (
                        <div className="inline-flex items-center gap-1 text-amber-600">
                          <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          <span>{student.streakDays} Days</span>
                        </div>
                      ) : (
                        <span className="text-slate-300 font-bold">—</span>
                      )}
                    </td>

                    {/* XP Score count */}
                    <td className="py-4 px-4 text-center font-black text-purple-600">
                      <div className="inline-flex items-center gap-1 justify-center">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>{student.xp} XP</span>
                      </div>
                    </td>

                    {/* Achievement Badge pill */}
                    <td className="py-4 px-5 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wide border ${student.color}`}>
                        {student.badge}
                      </span>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
