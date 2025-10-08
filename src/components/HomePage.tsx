import React from 'react';
import { Target, Users, FileText, Trophy, TrendingUp, Leaf, Star, Award } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  age: number;
  ecoPoints: number;
  level: number;
  achievements: string[];
}

interface HomePageProps {
  user: User;
  onSectionChange: (section: string) => void;
}

export default function HomePage({ user = {
  id: '1',
  name: 'Alex',
  avatar: '🌍',
  age: 22,
  ecoPoints: 350,
  level: 5,
  achievements: ['First Steps', 'Quiz Master']
}, onSectionChange = () => {} }: HomePageProps) {
  
  const getRecommendedSection = () => {
    if (user.age <= 17) return 'games';
    if (user.age <= 24) return 'action';
    return 'report';
  };

  const sectionCards = [
    {
      id: 'games',
      title: 'Learning Games',
      description: 'Interactive quizzes, crosswords, and environmental challenges',
      icon: Target,
      gradient: 'from-emerald-600 via-green-600 to-teal-600',
      glowColor: 'shadow-emerald-500/30',
      bgPattern: 'bg-gradient-to-br from-emerald-900/20 to-green-900/30',
      ageGroup: '8-17 years',
      points: '+10-50 points per game'
    },
    {
      id: 'action',
      title: 'Action Community',
      description: 'Share your environmental cleanup activities and inspire others',
      icon: Users,
      gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
      glowColor: 'shadow-cyan-500/30',
      bgPattern: 'bg-gradient-to-br from-cyan-900/20 to-blue-900/30',
      ageGroup: '18-24 years',
      points: '+25-100 points per post'
    },
    {
      id: 'report',
      title: 'Environmental Reports',
      description: 'Report environmental issues in your community with location data',
      icon: FileText,
      gradient: 'from-purple-600 via-violet-600 to-indigo-600',
      glowColor: 'shadow-purple-500/30',
      bgPattern: 'bg-gradient-to-br from-purple-900/20 to-violet-900/30',
      ageGroup: '25+ years',
      points: '+50-200 points per report'
    }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Joined PunahaPrithvi', icon: '🌱', unlocked: true },
    { name: 'Quiz Master', description: 'Complete 10 quizzes', icon: '🧠', unlocked: user.ecoPoints >= 100 },
    { name: 'Action Hero', description: 'Make your first post', icon: '🦸', unlocked: false },
    { name: 'Community Reporter', description: 'Submit first report', icon: '📋', unlocked: false },
    { name: 'Eco Champion', description: 'Reach 500 eco points', icon: '🏆', unlocked: user.ecoPoints >= 500 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-emerald-950 relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-cyan-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-60 left-3/4 w-1 h-1 bg-teal-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-32 right-1/4 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="max-w-6xl mx-auto space-y-8 relative z-10 p-6">
        {/* Welcome Header */}
        <div className="relative bg-gradient-to-r from-slate-800/90 via-gray-800/90 to-emerald-900/90 rounded-3xl p-8 backdrop-blur-lg border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-400 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-400 to-transparent rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300 bg-clip-text text-transparent">
                  Welcome back, {user.name}! {user.avatar}
                </h1>
                <p className="text-emerald-200/80 mb-6 text-lg">
                  Ready to make a positive impact on our planet today?
                </p>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                    <Trophy className="h-6 w-6 text-yellow-400 animate-pulse" />
                    <span className="font-semibold text-emerald-300 text-lg">{user.ecoPoints} Eco Points</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
                    <Star className="h-6 w-6 text-cyan-300 animate-pulse" />
                    <span className="font-semibold text-cyan-300 text-lg">Level {user.level}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-8xl mb-3 transform hover:scale-110 transition-transform duration-300">{user.avatar}</div>
                <div className="text-emerald-300/70 bg-slate-800/50 px-3 py-1 rounded-full border border-emerald-500/30">
                  Age: {user.age} years
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800/80 to-emerald-900/60 rounded-2xl p-6 backdrop-blur-lg border border-emerald-500/20 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">{user.ecoPoints}</p>
                <p className="text-emerald-200/70">Total Eco Points</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/80 to-cyan-900/60 rounded-2xl p-6 backdrop-blur-lg border border-cyan-500/20 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{user.level}</p>
                <p className="text-cyan-200/70">Current Level</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-pulse">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/60 rounded-2xl p-6 backdrop-blur-lg border border-purple-500/20 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">{achievements.filter(a => a.unlocked).length}</p>
                <p className="text-purple-200/70">Achievements</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 animate-pulse">
                <Trophy className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="bg-gradient-to-r from-slate-800/90 via-amber-900/70 to-orange-900/70 rounded-2xl p-6 backdrop-blur-lg border border-amber-500/20 shadow-xl shadow-amber-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-3 flex items-center bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              <Leaf className="h-6 w-6 text-emerald-400 mr-3 animate-pulse" />
              Recommended for You
            </h2>
            <p className="text-amber-200/80 mb-6 text-lg">
              Based on your age group ({user.age} years), we recommend starting with the{' '}
              <span className="font-semibold text-amber-300">
                {getRecommendedSection() === 'games' ? 'Learning Games' : 
                 getRecommendedSection() === 'action' ? 'Action Community' : 'Environmental Reports'}
              </span> section.
            </p>
            <button
              onClick={() => onSectionChange(getRecommendedSection())}
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-500 hover:to-green-500 transform hover:scale-110 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
            >
              🚀 Get Started
            </button>
          </div>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectionCards.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl p-6 backdrop-blur-lg border border-slate-600/30 shadow-2xl ${section.glowColor} hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group`}>
                {/* Animated background */}
                <div className={`absolute inset-0 ${section.bgPattern} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-r ${section.gradient} rounded-full flex items-center justify-center mb-6 shadow-xl ${section.glowColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">{section.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{section.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm bg-slate-700/50 px-3 py-2 rounded-full">
                      <span className="text-gray-400">Age Group:</span>
                      <span className="font-semibold text-emerald-300">{section.ageGroup}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-slate-700/50 px-3 py-2 rounded-full">
                      <span className="text-gray-400">Rewards:</span>
                      <span className="font-semibold text-cyan-300">{section.points}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onSectionChange(section.id)}
                    className={`w-full bg-gradient-to-r ${section.gradient} text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg ${section.glowColor} transform hover:scale-105 transition-all duration-300`}
                  >
                    🌟 Explore {section.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl p-8 backdrop-blur-lg border border-slate-600/30 shadow-2xl shadow-emerald-500/10">
          <h2 className="text-3xl font-bold mb-8 flex items-center bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
            <Trophy className="h-8 w-8 text-yellow-400 mr-3 animate-pulse" />
            Your Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 text-center transition-all duration-500 transform hover:scale-110 ${
                  achievement.unlocked
                    ? 'border-emerald-400/40 bg-gradient-to-br from-emerald-900/40 to-green-900/40 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40'
                    : 'border-slate-600/40 bg-gradient-to-br from-slate-800/40 to-slate-900/40 opacity-60 hover:opacity-80'
                }`}
              >
                <div className={`text-5xl mb-4 ${achievement.unlocked ? 'animate-bounce' : ''}`}>{achievement.icon}</div>
                <h4 className={`font-bold mb-2 ${achievement.unlocked ? 'text-emerald-300' : 'text-gray-400'}`}>
                  {achievement.name}
                </h4>
                <p className={`text-sm mb-4 ${achievement.unlocked ? 'text-emerald-200/70' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ✨ Unlocked
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}