// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Trophy, Star, Award, TrendingUp, LogOut, Calendar, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

// --- TYPE DEFINITIONS ---
interface User {
  id: string;
  name: string;
  avatar: string;
  age: number;
  ecoPoints: number;
  level: number;
  achievements: string[];
}
interface ProfileSectionProps {
  user: User;
  onLogout: () => void;
}

// Galaxy Background Component
const GalaxyBackground = () => (
  <>
    <div className="fixed inset-0 z-[-3] bg-gradient-radial from-slate-900 via-slate-950 to-black" />
    <div className="fixed inset-0 z-[-2] opacity-40" 
         style={{
           background: `
             radial-gradient(2px 2px at 20px 30px, #fff, transparent),
             radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
             radial-gradient(1px 1px at 90px 40px, #fff, transparent),
             radial-gradient(1px 2px at 130px 80px, rgba(255,255,255,0.6), transparent),
             radial-gradient(2px 1px at 160px 30px, #fff, transparent),
             radial-gradient(1px 1px at 300px 200px, rgba(255,255,255,0.9), transparent),
             radial-gradient(2px 2px at 400px 150px, #fff, transparent)
           `,
           backgroundRepeat: 'repeat',
           backgroundSize: '600px 400px',
           animation: 'galaxy-drift 120s linear infinite'
         }} />
    <div className="fixed inset-0 z-[-1] opacity-30"
         style={{
           background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.1) 20%, rgba(6, 182, 212, 0.15) 40%, rgba(139, 92, 246, 0.1) 60%, rgba(236, 72, 153, 0.08) 80%, transparent 100%)',
           filter: 'blur(2px)',
           animation: 'aurora-wave 15s ease-in-out infinite'
         }} />
  </>
);

// Nature Particles Component
const NatureParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleSymbols = ['🌿', '🍃', '🌱', '🌊', '✨', '🌟', '💫', '🦋'];
    
    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        symbol: particleSymbols[Math.floor(Math.random() * particleSymbols.length)],
        left: Math.random() * 100,
        size: Math.random() * 20 + 15,
        duration: Math.random() * 10 + 15
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, newParticle.duration * 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute opacity-60 animate-bounce"
          style={{
            left: `${particle.left}%`,
            fontSize: `${particle.size}px`,
            animation: `nature-float ${particle.duration}s linear forwards`
          }}
        >
          {particle.symbol}
        </div>
      ))}
    </div>
  );
};

// --- Enhanced Reusable Animated Components ---
const StatCard = ({ label, value, icon: Icon, color }) => (
    <motion.div 
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        className={`relative overflow-hidden group rounded-2xl p-6 text-center backdrop-blur-sm border ${color.border} shadow-2xl ${color.shadow}`}
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.6))'
        }}
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <div className={`absolute inset-0 bg-gradient-to-r ${color.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-purple-400/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${color.iconGradient || 'from-emerald-500 to-cyan-500'}`}
               style={{ animation: 'icon-float 4s ease-in-out infinite' }}>
            <Icon className={`h-6 w-6 text-white`} />
          </div>
          <p className="text-3xl font-bold text-white mb-1" style={{ textShadow: `0 0 20px ${color.glow || '#10b981'}` }}>
            {value}
          </p>
          <p className={`text-sm ${color.text}/80`}>{label}</p>
        </div>
    </motion.div>
);

const AchievementCard = ({ achievement }) => (
    <motion.div
        variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
        whileHover={{ y: -8, scale: 1.08, rotateY: 5 }}
        className={`p-4 rounded-xl border-2 text-center transition-all duration-500 relative overflow-hidden ${
            achievement.unlocked
            ? 'border-emerald-400/50 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20'
            : 'border-slate-700 bg-slate-800/30 opacity-60'
        }`}
        style={{
          boxShadow: achievement.unlocked 
            ? '0 10px 30px rgba(16, 185, 129, 0.3), 0 0 50px rgba(6, 182, 212, 0.2)' 
            : 'none'
        }}
    >
        <div className={`absolute -inset-1 bg-gradient-to-r ${achievement.unlocked ? 'from-emerald-400/20 to-cyan-400/20' : ''} blur-sm opacity-0 hover:opacity-100 transition-opacity duration-500`} />
        
        <div className="relative z-10">
          <div className="text-4xl mb-2" style={{ animation: achievement.unlocked ? 'achievement-bounce 2s ease-in-out infinite' : 'none' }}>
            {achievement.icon}
          </div>
          <h4 className={`font-semibold mb-1 text-sm ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
              {achievement.name}
          </h4>
          {achievement.unlocked ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  ✓ Unlocked
              </span>
          ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-700 text-gray-400">
                  Locked
              </span>
          )}
        </div>
    </motion.div>
);

// --- Main Profile Section Component ---
export default function ProfileSection({ user = { id: '1', name: 'Eco Guardian', avatar: '🌟', age: 25, ecoPoints: 365, level: 3, achievements: [] }, onLogout = () => console.log('Logged out') }: ProfileSectionProps) {
  const achievements = [
    { name: 'Welcome Eco Warrior', icon: '🌱', unlocked: true },
    { name: 'First Quiz Champion', icon: '🧠', unlocked: user.ecoPoints >= 10 },
    { name: 'Knowledge Seeker', icon: '📚', unlocked: user.ecoPoints >= 100 },
    { name: 'Action Hero', icon: '🦸', unlocked: false },
    { name: 'Community Reporter', icon: '📋', unlocked: false },
    { name: 'Rising Star', icon: '⭐', unlocked: user.level >= 5 },
    { name: 'Eco Champion', icon: '🏆', unlocked: user.ecoPoints >= 500 },
    { name: 'Environmental Guardian', icon: '🛡️', unlocked: user.ecoPoints >= 1000 },
  ];

  const stats = [
    { 
      label: 'Total Stardust', 
      value: user.ecoPoints, 
      icon: Star, 
      color: { 
        text: 'text-yellow-300', 
        border: 'border-yellow-400/30', 
        shadow: 'shadow-yellow-500/10', 
        gradient: 'from-yellow-500/20 to-amber-500/20',
        iconGradient: 'from-yellow-400 to-amber-500',
        glow: '#fbbf24'
      } 
    },
    { 
      label: 'Cosmic Level', 
      value: user.level, 
      icon: Award, 
      color: { 
        text: 'text-cyan-300', 
        border: 'border-cyan-400/30', 
        shadow: 'shadow-cyan-500/10', 
        gradient: 'from-cyan-500/20 to-blue-500/20',
        iconGradient: 'from-cyan-400 to-blue-500',
        glow: '#06b6d4'
      } 
    },
    { 
      label: 'Achievements', 
      value: achievements.filter(a => a.unlocked).length, 
      icon: Trophy, 
      color: { 
        text: 'text-purple-300', 
        border: 'border-purple-400/30', 
        shadow: 'shadow-purple-500/10', 
        gradient: 'from-purple-500/20 to-pink-500/20',
        iconGradient: 'from-purple-400 to-pink-500',
        glow: '#a855f7'
      } 
    },
    { 
      label: 'Days Active', 
      value: 7, 
      icon: Calendar, 
      color: { 
        text: 'text-emerald-300', 
        border: 'border-emerald-400/30', 
        shadow: 'shadow-emerald-500/10', 
        gradient: 'from-emerald-500/20 to-teal-500/20',
        iconGradient: 'from-emerald-400 to-teal-500',
        glow: '#10b981'
      } 
    }
  ];

  const progressToNextLevel = ((user.ecoPoints % 100) / 100) * 100;

  return (
    <>
      {/* Galaxy Background */}
      <GalaxyBackground />
      
      {/* Nature Particles */}
      <NatureParticles />
      
      <div className="max-w-5xl mx-auto space-y-8 p-4 relative z-10">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="backdrop-blur-lg rounded-3xl p-8 text-white relative overflow-hidden border border-emerald-300/30 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.90), rgba(15, 23, 42, 0.95))',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(34, 197, 94, 0.15)',
            animation: 'profile-glow 6s ease-in-out infinite alternate'
          }}
        >
          {/* Cosmic Rotation Background */}
          <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-30"
               style={{
                 background: 'conic-gradient(from 0deg, transparent, rgba(34, 197, 94, 0.15), transparent)',
                 animation: 'cosmic-rotation 30s linear infinite'
               }} />
          
          {/* Gradient Orbs */}
          <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-gradient-radial from-emerald-500/20 via-transparent to-transparent opacity-50 animate-pulse" />
          <div className="absolute -bottom-1/4 -left-1/4 w-80 h-80 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent opacity-50 animate-pulse" 
               style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-6">
              <div className="flex items-center space-x-6">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-5xl font-bold shadow-lg relative"
                  style={{
                    boxShadow: '0 0 50px rgba(34, 197, 94, 0.4)',
                    animation: 'avatar-pulse 4s ease-in-out infinite'
                  }}
                >
                  {user.avatar}
                  <div className="absolute -inset-3 border-2 border-emerald-400/30 rounded-full"
                       style={{ animation: 'orbit-ring 6s linear infinite' }} />
                </motion.div>
                <div>
                  <h1 className="text-4xl font-bold mb-1" style={{ textShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}>
                    {user.name}
                  </h1>
                  <p className="text-cyan-200 text-lg">Environmental Guardian</p>
                  <p className="text-emerald-300/80">Joined 7 days ago</p>
                </div>
              </div>
              <motion.button 
                onClick={onLogout} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-white py-2 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center backdrop-blur-sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </motion.button>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2 text-cyan-200/80">
                <span>Level {user.level}</span>
                <span>{user.ecoPoints % 100} / 100 Stardust to Level {user.level + 1}</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-4 border border-cyan-400/30 p-0.5 relative overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full h-full shadow-lg relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                       style={{ animation: 'progress-shimmer 3s ease-in-out infinite' }} />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="backdrop-blur-lg rounded-3xl p-8 border border-purple-300/20 shadow-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.8))',
            boxShadow: '0 0 80px rgba(139, 92, 246, 0.15)'
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Trophy className="h-7 w-7 text-yellow-300 mr-3" />
            Your Achievements
          </h2>
          
          <motion.div 
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.name} achievement={achievement} />
            ))}
          </motion.div>
        </motion.div>

        {/* Recommended Actions & Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="backdrop-blur-lg rounded-3xl p-8 border border-emerald-300/20 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.6))'
              }}
          >
               <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="h-6 w-6 text-emerald-300 mr-3" />
                  Recommended Actions
               </h2>
               <div className="space-y-3">
                   {[
                      { action: 'Share an eco-action', points: '+50 Stardust', icon: '📸' },
                      { action: 'Complete a Master Quiz', points: '+75 Stardust', icon: '🧠' },
                      { action: 'Report a local issue', points: '+100 Stardust', icon: '📋' },
                   ].map((rec, index) => (
                       <motion.div 
                         key={rec.action} 
                         whileHover={{ x: 5, scale: 1.02 }}
                         className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 flex items-center justify-between backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30"
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.4 + index * 0.1 }}
                       >
                           <div className="flex items-center">
                              <span className="text-2xl mr-3">{rec.icon}</span>
                              <h4 className="font-semibold text-gray-200">{rec.action}</h4>
                           </div>
                           <p className="text-sm text-emerald-300 font-medium">{rec.points}</p>
                       </motion.div>
                   ))}
               </div>
           </motion.div>
           
           <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="backdrop-blur-lg rounded-3xl p-8 border border-green-300/20 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.6))'
              }}
          >
               <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Leaf className="h-6 w-6 text-green-400 mr-3" />
                  Your Environmental Impact
               </h2>
               <div className="space-y-4">
                   <motion.div 
                     className="text-center p-4 rounded-lg border border-emerald-400/30 relative overflow-hidden"
                     style={{
                       background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(6, 182, 212, 0.10))'
                     }}
                     whileHover={{ scale: 1.05 }}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.5 }}
                   >
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"
                            style={{ animation: 'impact-shimmer 4s ease-in-out infinite' }} />
                       <p className="text-3xl font-bold text-white relative z-10" style={{ textShadow: '0 0 20px #10b981' }}>12</p>
                       <p className="text-sm text-emerald-300 relative z-10">Trees Saved</p>
                   </motion.div>
                   <motion.div 
                     className="text-center p-4 rounded-lg border border-cyan-400/30 relative overflow-hidden"
                     style={{
                       background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(34, 197, 94, 0.10))'
                     }}
                     whileHover={{ scale: 1.05 }}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.6 }}
                   >
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                            style={{ animation: 'impact-shimmer 4s ease-in-out infinite 2s' }} />
                       <p className="text-3xl font-bold text-white relative z-10" style={{ textShadow: '0 0 20px #06b6d4' }}>2,450</p>
                       <p className="text-sm text-cyan-300 relative z-10">Water Conserved (L)</p>
                   </motion.div>
               </div>
           </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes galaxy-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-600px, -400px); }
        }

        @keyframes aurora-wave {
          0%, 100% { transform: translateX(-50%) skew(0deg); opacity: 0.3; }
          25% { transform: translateX(-30%) skew(2deg); opacity: 0.6; }
          50% { transform: translateX(-70%) skew(-1deg); opacity: 0.4; }
          75% { transform: translateX(-40%) skew(1deg); opacity: 0.7; }
        }

        @keyframes nature-float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes cosmic-rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes profile-glow {
          0% { box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(34, 197, 94, 0.1); }
          100% { box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 120px rgba(6, 182, 212, 0.2); }
        }

        @keyframes avatar-pulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 50px rgba(34, 197, 94, 0.4); 
          }
          50% { 
            transform: scale(1.05); 
            box-shadow: 0 0 60px rgba(6, 182, 212, 0.6); 
          }
        }

        @keyframes orbit-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes icon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes achievement-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes progress-shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes impact-shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}