import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Lock, Calendar, Globe } from "lucide-react";

interface User {
  id: string;
  name: string;
  password: string;
  age: number;
  ecoPoints: number;
  level: number;
  achievements: string[];
}

interface LoginPageProps {
  onLogin: (user: User) => void;
  onSignup?: (user: User) => void;
}

export default function LoginPage({ onLogin, onSignup }: LoginPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(15);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !password.trim() || age < 8) {
      setError("Please fill all fields correctly.");
      return;
    }

    setIsLoading(true);
    setError("");

    await new Promise(resolve => setTimeout(resolve, 2000));

    const newUser: User = {
      id: Date.now().toString(),
      name: name.trim(),
      password: password.trim(),
      age,
      ecoPoints: 0,
      level: 1,
      achievements: [],
    };

    if (isSignup && onSignup) {
      onSignup(newUser);
    } else {
      onLogin(newUser);
    }
    setIsLoading(false);
  };

  const getAgeColor = (age: number) => {
    if (age <= 18) return 'from-purple-400 to-pink-500';
    if (age <= 35) return 'from-emerald-400 to-cyan-500';
    if (age <= 50) return 'from-green-400 to-teal-500';
    return 'from-indigo-400 to-purple-500';
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-emerald-900">
      {/* Animated Starfield Background */}
      <div className="absolute inset-0">
        {/* Moving Stars Layer 1 - Fast */}
        {[...Array(80)].map((_, i) => (
          <div
            key={`fast-${i}`}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `moveStars 20s linear infinite, twinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 20}s`,
              opacity: Math.random() * 0.8 + 0.3
            }}
          />
        ))}
        
        {/* Moving Stars Layer 2 - Medium */}
        {[...Array(60)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute bg-emerald-200 rounded-full"
            style={{
              width: `${Math.random() * 3 + 1.5}px`,
              height: `${Math.random() * 3 + 1.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `moveStars 40s linear infinite, twinkle ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 40}s`,
              opacity: Math.random() * 0.7 + 0.4
            }}
          />
        ))}
        
        {/* Moving Stars Layer 3 - Slow */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`slow-${i}`}
            className="absolute bg-purple-200 rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `moveStars 80s linear infinite, twinkle ${4 + Math.random() * 5}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 80}s`,
              opacity: Math.random() * 0.6 + 0.5
            }}
          />
        ))}
      </div>

      {/* Environmental Space Nebula */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/30 via-green-500/15 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-purple-500/25 via-violet-500/10 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-radial from-cyan-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Planet System */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central Earth */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-80 h-80">
            <div 
              className="w-full h-full rounded-full shadow-2xl animate-spin"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, 
                    #10b981 0%,
                    #059669 20%,
                    #047857 35%,
                    #1e40af 50%,
                    #1e3a8a 70%,
                    #0f172a 85%,
                    #020617 100%
                  )
                `,
                animationDuration: '120s',
                boxShadow: `
                  inset -30px -30px 60px rgba(0,0,0,0.5),
                  inset 20px 20px 40px rgba(16, 185, 129, 0.1),
                  0 0 100px rgba(16, 185, 129, 0.4),
                  0 0 200px rgba(16, 185, 129, 0.2)
                `
              }}
            >
              {/* Earth Continents */}
              <div className="absolute inset-0 rounded-full opacity-90"
                style={{
                  background: `
                    radial-gradient(ellipse 50% 35% at 25% 25%, #065f46 0%, transparent 60%),
                    radial-gradient(ellipse 40% 50% at 75% 35%, #064e3b 0%, transparent 60%),
                    radial-gradient(ellipse 45% 30% at 60% 75%, #052e16 0%, transparent 60%),
                    radial-gradient(ellipse 30% 40% at 20% 80%, #14532d 0%, transparent 60%)
                  `
                }}
              />
              
              {/* Atmospheric Glow */}
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, transparent 82%, rgba(16, 185, 129, 0.6) 95%, rgba(34, 197, 94, 0.8) 100%)',
                  filter: 'blur(4px)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Orbiting Planets */}
        {/* Mars-like Planet */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] animate-spin" style={{ animationDuration: '180s' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div 
                className="w-12 h-12 rounded-full shadow-lg"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #dc2626, #991b1b, #450a0a)',
                  boxShadow: '0 0 20px rgba(220, 38, 38, 0.4), inset -4px -4px 8px rgba(0,0,0,0.3)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Jupiter-like Planet */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[800px] h-[800px] animate-spin" style={{ animationDuration: '300s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-0 right-1/4 transform translate-x-1/2 translate-y-1/2">
              <div 
                className="w-20 h-20 rounded-full shadow-lg"
                style={{
                  background: 'radial-gradient(circle at 25% 25%, #f59e0b, #d97706, #92400e, #451a03)',
                  boxShadow: '0 0 30px rgba(245, 158, 11, 0.3), inset -6px -6px 12px rgba(0,0,0,0.4)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Venus-like Planet */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[450px] h-[450px] animate-spin" style={{ animationDuration: '100s' }}>
            <div className="absolute left-0 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div 
                className="w-8 h-8 rounded-full shadow-lg"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #fbbf24, #f59e0b, #d97706)',
                  boxShadow: '0 0 15px rgba(251, 191, 36, 0.5), inset -3px -3px 6px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex items-center justify-center min-h-screen p-4 z-10">
        <div className="w-full max-w-md">
          {/* Ultra Glass Card */}
          <div className="relative group">
            {/* Outer Environmental Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-purple-500/20 to-cyan-500/30 rounded-3xl blur-lg opacity-75 animate-pulse"></div>
            
            {/* Main Glass Card */}
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/15 via-emerald-50/5 to-purple-50/10 rounded-3xl p-8 shadow-2xl border border-white/30">
              {/* Inner Environmental Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/8 via-transparent to-purple-500/8"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-emerald-400/20 via-cyan-400/15 to-purple-400/20 backdrop-blur-xl border border-white/40 shadow-2xl animate-pulse">
                    <Globe className="w-12 h-12 text-emerald-300 drop-shadow-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 rounded-full blur-lg opacity-20 animate-pulse"></div>
                  </div>
                  
                  <h1 className="text-5xl font-bold mb-4 tracking-wide">
                    <span 
                      className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                      style={{ 
                        filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))',
                        textShadow: '0 0 30px rgba(16, 185, 129, 0.3)' 
                      }}
                    >
                      Punaha
                    </span>
                    <span 
                      className="bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent"
                      style={{ 
                        filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))',
                        textShadow: '0 0 30px rgba(139, 92, 246, 0.3)' 
                      }}
                    >
                      Prithvi
                    </span>
                  </h1>
                  
                  <p className="text-white/95 text-xl font-medium" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>
                    {isSignup ? "🌍 Join Earth's Guardians" : "🚀 Welcome Back, Guardian"}
                  </p>
                  
                  <div className="flex justify-center mt-4">
                    <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 rounded-full shadow-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-400/30 backdrop-blur-xl shadow-lg">
                    <p className="text-red-300 text-center font-medium" style={{ textShadow: '0 0 10px rgba(252, 165, 165, 0.5)' }}>{error}</p>
                  </div>
                )}

                {/* Form */}
                <div className="space-y-6">
                  {/* Username Field */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-all duration-500"></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-white/70 group-focus-within:text-emerald-300 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))' }} />
                      </div>
                      <input
                        type="text"
                        placeholder="Guardian Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-14 pr-5 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 backdrop-blur-xl transition-all duration-300 font-medium"
                        style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.4)' }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-emerald-500/10 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-all duration-500"></div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-white/70 group-focus-within:text-purple-300 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))' }} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Guardian Access Code"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-14 pr-14 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:border-purple-400/60 backdrop-blur-xl transition-all duration-300 font-medium"
                        style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.4)' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-5 flex items-center group/eye"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-white/70 hover:text-white transition-all duration-300 group-hover/eye:scale-110" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))' }} />
                        ) : (
                          <Eye className="w-5 h-5 text-white/70 hover:text-white transition-all duration-300 group-hover/eye:scale-110" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))' }} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Age Selector */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-white/70" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))' }} />
                        <label className="text-white font-medium" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.4)' }}>Guardian Age</label>
                      </div>
                      <div className={`px-6 py-3 rounded-xl bg-gradient-to-r ${getAgeColor(age)} text-white font-bold text-lg shadow-2xl backdrop-blur-xl border border-white/30`}>
                        {age}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="range"
                        min="8"
                        max="80"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full h-4 bg-white/15 rounded-full outline-none slider backdrop-blur-xl border border-white/20"
                        style={{
                          background: `linear-gradient(to right, rgba(16, 185, 129, 0.8) 0%, rgba(16, 185, 129, 0.8) ${((age - 8) / 72) * 100}%, rgba(255,255,255,0.15) ${((age - 8) / 72) * 100}%, rgba(255,255,255,0.15) 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-white/70 mt-3 font-medium">
                        <span style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>8</span>
                        <span style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>Young Guardian</span>
                        <span style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>Veteran Guardian</span>
                        <span style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>Elder Guardian</span>
                        <span style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>80</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full relative group overflow-hidden rounded-2xl p-[2px] transition-all duration-500 hover:scale-105 disabled:scale-100 disabled:opacity-70"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-500 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-500 blur-lg opacity-50"></div>
                    <div className="relative px-8 py-5 bg-gradient-to-r from-emerald-500/95 via-cyan-600/95 to-purple-600/95 rounded-2xl text-white font-bold text-xl flex items-center justify-center space-x-3 backdrop-blur-xl border border-white/30 group-hover:from-emerald-400/95 group-hover:via-cyan-500/95 group-hover:to-purple-500/95 transition-all duration-500">
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                          <span style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>Connecting to Earth...</span>
                        </>
                      ) : (
                        <>
                          <span style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
                            {isSignup ? "🌱 Join the Mission" : "🌍 Enter Earth Station"}
                          </span>
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* Toggle */}
                <div className="mt-8 text-center">
                  <p className="text-white/85" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}>
                    {isSignup ? "Already a Guardian?" : "New to Earth Station?"}{" "}
                    <button
                      onClick={() => setIsSignup(!isSignup)}
                      className="text-emerald-300 font-bold hover:text-emerald-200 transition-colors duration-300 hover:underline"
                      style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}
                    >
                      {isSignup ? "Return to Station" : "Join the Guardians"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Guardian Stats */}
          <div className="mt-8 flex justify-center space-x-4 text-center">
            {[
              { label: "Earth Guardians", value: "10K+", icon: "🌱", color: "emerald" },
              { label: "Trees Protected", value: "50K+", icon: "🌳", color: "green" },
              { label: "CO2 Neutralized", value: "100T+", icon: "💨", color: "cyan" }
            ].map((stat, i) => (
              <div key={i} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/20 to-white/10 backdrop-blur-xl rounded-xl border border-white/30 shadow-lg`}></div>
                <div className="relative px-4 py-3">
                  <div className="text-2xl mb-1 animate-pulse">{stat.icon}</div>
                  <div className={`text-${stat.color}-300 font-bold text-lg`} style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}>{stat.value}</div>
                  <div className="text-white/80 text-xs font-medium" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(var(--tw-gradient-stops));
        }
        
        @keyframes moveStars {
          from {
            transform: translateY(100vh);
          }
          to {
            transform: translateY(-100vh);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6);
          cursor: pointer;
          box-shadow: 
            0 0 20px rgba(16, 185, 129, 0.6),
            0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.4);
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 
            0 0 30px rgba(16, 185, 129, 0.8),
            0 6px 20px rgba(0, 0, 0, 0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.4);
          box-shadow: 
            0 0 20px rgba(16, 185, 129, 0.6),
            0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 
            0 0 30px rgba(16, 185, 129, 0.8),
            0 6px 20px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}