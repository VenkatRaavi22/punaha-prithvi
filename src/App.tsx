// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Leaf, Users, Target, FileText, Home, Trophy, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import GamesSection from './components/GamesSection';
import ActionSection from './components/ActionSection';
import ReportSection from './components/ReportSection';
import ProfileSection from './components/ProfileSection';

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

// --- Stunning Animated Background Component ---
const StunningBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0a0f18]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f18] via-[#0a192f] to-emerald-900/50" />
        {[...Array(50)].map((_, i) => (
            <motion.div 
              key={i} 
              className="absolute rounded-full bg-cyan-300/80" 
              initial={{ x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh', scale: Math.random() * 0.6 + 0.2, opacity: Math.random() * 0.5 }} 
              animate={{ opacity: [0.1, 0.7, 0.1] }} 
              transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, ease: "linear" }} 
              style={{ width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px` }} 
            />
        ))}
    </div>
);


function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const savedUser = localStorage.getItem('punahapridhvi-user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else {
        // For demonstration purposes, creating a mock user if none is found
        const mockUser = { id: '1', name: 'Aakash', avatar: 'AK', age: 24, ecoPoints: 302, level: 4, achievements: [] };
        setCurrentUser(mockUser);
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('punahapridhvi-user', JSON.stringify(user));
    setActiveSection('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('punahapridhvi-user');
    setActiveSection('home');
  };

  const updateUserPoints = (points: number) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        ecoPoints: currentUser.ecoPoints + points,
        level: Math.floor((currentUser.ecoPoints + points) / 100) + 1
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('punahapridhvi-user', JSON.stringify(updatedUser));
    }
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'games', icon: Target, label: 'Games' },
    { id: 'action', icon: Users, label: 'Action' },
    { id: 'report', icon: FileText, label: 'Report' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage user={currentUser} onSectionChange={setActiveSection} />;
      case 'games':
        return <GamesSection user={currentUser} onUpdatePoints={updateUserPoints} />;
      case 'action':
        return <ActionSection user={currentUser} onUpdatePoints={updateUserPoints} />;
      case 'report':
        return <ReportSection user={currentUser} onUpdatePoints={updateUserPoints} />;
      case 'profile':
        return <ProfileSection user={currentUser} onLogout={handleLogout} />;
      default:
        return <HomePage user={currentUser} onSectionChange={setActiveSection} />;
    }
  };

  // Sections that have their own background and should not have main padding
  const fullWidthSections = ['action', 'report', 'games'];

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200">
      <StunningBackground />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-slate-900/50 backdrop-blur-md border-b border-cyan-300/20 sticky top-0 z-50"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-emerald-300">Punaha</span>
                <span className="text-cyan-300">Prithvi</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                <Trophy className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-semibold text-emerald-200">{currentUser.ecoPoints} Eco Points</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                {currentUser.avatar}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <motion.nav 
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-20 lg:w-64 bg-slate-900/30 backdrop-blur-md border-r border-cyan-300/20 min-h-[calc(100vh-4rem)]"
        >
          <div className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <motion.button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-4 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                        isActive ? 'bg-cyan-500/20' : 'hover:bg-cyan-500/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <AnimatePresence>
                        {isActive && (
                            <motion.div
                                layoutId="activeNavIndicator"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-300 rounded-r-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        )}
                      </AnimatePresence>
                      <Icon className={`h-6 w-6 shrink-0 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                      <span className={`hidden lg:block font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {item.label}
                      </span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className={`flex-1 ${!fullWidthSections.includes(activeSection) ? 'p-6' : ''}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderActiveSection()}
                </motion.div>
            </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;