// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, AlertCircle, ThumbsUp, Share2, Clock, Filter, Plus, Upload, X, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
interface ReportSectionProps {
  user: User;
  onUpdatePoints: (points: number) => void;
}
interface Report {
  id: string;
  user: { name: string; avatar: string; };
  title: string;
  description: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  image?: string;
  location: string;
  timestamp: string;
  likes: number;
  status: 'Open' | 'In Progress' | 'Resolved';
  points: number;
}

// --- Reusable Components (No Changes) ---
const GalaxyBackground = () => (
  <>
    <div className="fixed inset-0 z-[-3] bg-black" />
    <div className="fixed inset-0 z-[-2] opacity-15" style={{ background: `radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.9), transparent), radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.4), transparent), radial-gradient(1px 1px at 160px 30px, rgba(255,255,255,0.7), transparent)`, backgroundRepeat: 'repeat', backgroundSize: '600px 400px', animation: 'galaxy-drift 120s linear infinite' }} />
    <div className="fixed inset-0 z-[-1] opacity-08" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.08) 20%, rgba(6, 182, 212, 0.12) 40%, rgba(139, 92, 246, 0.08) 60%, rgba(236, 72, 153, 0.06) 80%, transparent 100%)', filter: 'blur(3px)', animation: 'aurora-wave 15s ease-in-out infinite' }} />
  </>
);
const StatCard = ({ title, value, icon: Icon, gradient, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay }} whileHover={{ scale: 1.05, y: -10, transition: { type: "spring", stiffness: 400 } }} className={`${gradient} rounded-2xl p-6 text-white relative overflow-hidden backdrop-blur-lg border border-white/10 shadow-2xl group`}>
    <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'cosmic-rotation 3s linear infinite' }} />
    <div className="relative z-10 flex items-center justify-between">
      <div><p className="text-3xl font-bold mb-1" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}>{value}</p><p className="text-white/80 font-medium">{title}</p></div>
      <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="relative"><Icon className="h-12 w-12 text-white/90" /></motion.div>
    </div>
  </motion.div>
);

// --- Main Report Section Component ---
export default function ReportSection({ 
  user = { id: '1', name: 'Eco Guardian', avatar: '🌟', age: 25, ecoPoints: 365, level: 3, achievements: [] }, 
  onUpdatePoints = (points) => console.log(`Points updated: ${points}`) 
}: ReportSectionProps) {
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState('All');
  const [newReport, setNewReport] = useState({ title: '', description: '', category: 'Road Infrastructure', severity: 'Medium' as const, location: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const fileInputRef = useRef(null);

  const categories = ['Road Infrastructure', 'Illegal Dumping', 'Water Pollution', 'Air Pollution', 'Noise Pollution', 'Waste Management', 'Other'];

  const resetForm = () => {
    setNewReport({ title: '', description: '', category: 'Road Infrastructure', severity: 'Medium', location: '' });
    setImageFile(null);
    setImagePreview(null);
    setShowCreateReport(false);
  }

  const fetchLocation = () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setNewReport(prev => ({ ...prev, location: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}` }));
            setIsFetchingLocation(false);
        },
        () => {
            alert("Unable to retrieve your location. Please enter it manually.");
            setIsFetchingLocation(false);
        }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result); };
      reader.readAsDataURL(file);
      fetchLocation();
    }
  };

  const handleCreateReport = () => {
    if (newReport.title.trim() && newReport.description.trim()) {
      const points = newReport.severity === 'Critical' ? 200 : newReport.severity === 'High' ? 150 : newReport.severity === 'Medium' ? 100 : 75;
      const report: Report = { id: Date.now().toString(), user: { name: user.name, avatar: user.avatar }, title: newReport.title, description: newReport.description, category: newReport.category, severity: newReport.severity, location: newReport.location || 'Unknown Location', timestamp: 'Just now', likes: 0, status: 'Open', points, image: imagePreview || undefined };
      setReports([report, ...reports]);
      onUpdatePoints(points);
      resetForm();
    }
  };

  const handleLike = (reportId: string) => { setReports(reports.map(report => report.id === reportId ? { ...report, likes: report.likes + 1 } : report)); };

  // *** NEW: Verification Handler ***
  const handleVerify = (reportId: string) => {
    const confirmation = window.confirm("Verifying this report will escalate it to a local NGO. Do you want to proceed?");
    if (confirmation) {
        setReports(reports.map(report => 
            report.id === reportId 
            ? { ...report, status: 'In Progress' }
            : report
        ));
        alert("Report verified and sent to NGO!");
    }
  };

  const filteredReports = filter === 'All' ? reports : reports.filter(report => report.status === filter);
  const getSeverityStyle = (severity: string) => { switch (severity) { case 'Critical': return 'text-red-300 bg-red-500/20 border-red-400/30'; case 'High': return 'text-orange-300 bg-orange-500/20 border-orange-400/30'; case 'Medium': return 'text-yellow-300 bg-yellow-500/20 border-yellow-400/30'; case 'Low': return 'text-green-300 bg-green-500/20 border-green-400/30'; default: return 'text-gray-300 bg-gray-500/20 border-gray-400/30'; } };
  const getStatusStyle = (status: string) => { switch (status) { case 'Resolved': return 'text-emerald-300 bg-emerald-500/20 border-emerald-400/30'; case 'In Progress': return 'text-cyan-300 bg-cyan-500/20 border-cyan-400/30'; case 'Open': return 'text-red-300 bg-red-500/20 border-red-400/30'; default: return 'text-gray-300 bg-gray-500/20 border-gray-400/30'; } };

  return (
    <>
      <GalaxyBackground />
      <div className="max-w-6xl mx-auto relative z-10 p-6">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-10 text-center">
          <motion.h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-purple-300" style={{ textShadow: '0 0 30px rgba(52, 211, 153, 0.5)', filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))' }} animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 5, repeat: Infinity }}>
            Environmental Reports 📋
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-xl text-cyan-200/80 max-w-3xl mx-auto leading-relaxed">
            Help improve your community by reporting issues. Together, we can create a cleaner world. 🌍
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Open Reports" value={reports.filter(r => r.status === 'Open').length} icon={AlertCircle} gradient="bg-gradient-to-br from-red-600/70 via-red-700/60 to-pink-600/70" delay={0.1} />
          <StatCard title="In Progress" value={reports.filter(r => r.status === 'In Progress').length} icon={Clock} gradient="bg-gradient-to-br from-blue-600/70 via-cyan-700/60 to-blue-600/70" delay={0.2} />
          <StatCard title="Resolved" value={reports.filter(r => r.status === 'Resolved').length} icon={ThumbsUp} gradient="bg-gradient-to-br from-emerald-600/70 via-green-700/60 to-teal-600/70" delay={0.3} />
          <StatCard title="Points per Report" value="75-200" icon={Plus} gradient="bg-gradient-to-br from-purple-600/70 via-violet-700/60 to-fuchsia-600/70" delay={0.4} />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="flex items-center space-x-4 bg-slate-900/60 p-4 rounded-2xl border border-cyan-400/20">
            <Filter className="h-5 w-5 text-cyan-300" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-transparent border-none text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-lg px-3 py-2">
              <option value="All" className="bg-slate-800">All Reports</option>
              <option value="Open" className="bg-slate-800">Open</option>
              <option value="In Progress" className="bg-slate-800">In Progress</option>
              <option value="Resolved" className="bg-slate-800">Resolved</option>
            </select>
          </div>
          <motion.button onClick={() => setShowCreateReport(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 flex items-center shadow-xl border border-red-500/50">
            <Camera className="h-5 w-5 mr-3" /> Report Environmental Issue
          </motion.button>
        </motion.div>
        
        <AnimatePresence>
          {showCreateReport && (
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: 0.95 }} transition={{ duration: 0.5 }} className="bg-slate-900/80 rounded-3xl p-8 mb-10 border border-cyan-300/30 relative overflow-hidden shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center"><span className="mr-3 text-3xl">🌍</span>Report a New Issue</h3>
              <div className="space-y-6">
                <input type="text" value={newReport.title} onChange={(e) => setNewReport({...newReport, title: e.target.value})} placeholder="Title of the issue..." className="w-full p-4 bg-slate-800/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"/>
                <textarea value={newReport.description} onChange={(e) => setNewReport({...newReport, description: e.target.value})} placeholder="Detailed description of the issue..." className="w-full p-4 bg-slate-800/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" rows={4} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <select value={newReport.category} onChange={(e) => setNewReport({...newReport, category: e.target.value})} className="w-full p-3 bg-slate-800/50 border border-cyan-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50">{categories.map(cat => (<option key={cat} value={cat} className="bg-slate-800">{cat}</option>))}</select>
                  <select value={newReport.severity} onChange={(e) => setNewReport({...newReport, severity: e.target.value as any})} className="w-full p-3 bg-slate-800/50 border border-cyan-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"><option value="Low" className="bg-slate-800">Low</option><option value="Medium" className="bg-slate-800">Medium</option><option value="High" className="bg-slate-800">High</option><option value="Critical" className="bg-slate-800">Critical</option></select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative"><input type="text" value={newReport.location} onChange={(e) => setNewReport({...newReport, location: e.target.value})} placeholder="Location" className="w-full p-3 bg-slate-800/50 border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />{isFetchingLocation && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-300 animate-spin" />}</div>
                  <div><input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" /><button onClick={() => fileInputRef.current?.click()} className="w-full p-3 bg-slate-800/50 border border-cyan-400/30 rounded-xl flex items-center justify-center gap-2 text-gray-300 hover:bg-slate-700/50 hover:border-cyan-400/50 transition-colors"><Upload className="h-4 w-4" /> {imageFile ? imageFile.name.substring(0, 20) + '...' : 'Upload Photo'}</button></div>
                </div>
                {imagePreview && (<div className="rounded-xl overflow-hidden border border-cyan-400/20"><img src={imagePreview} alt="Report preview" className="w-full h-48 object-cover" /></div>)}
                <div className="flex justify-end space-x-4 pt-4">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={resetForm} className="bg-slate-700/50 text-white py-3 px-6 rounded-xl font-semibold hover:bg-slate-700/70 transition-all duration-200 border border-slate-600/50">Cancel</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCreateReport} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-xl">Submit Report</motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="space-y-8">
          <AnimatePresence>
            {filteredReports.map((report, index) => (
              <motion.div key={report.id} initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: 0.95 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -5, scale: 1.02 }} className="bg-slate-900/70 rounded-3xl p-8 border border-cyan-300/20 relative overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-cyan-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg" style={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' }}>{report.user.avatar}</motion.div>
                            <div><h4 className="font-semibold text-white text-lg">{report.user.name}</h4><p className="text-sm text-cyan-300/80 flex items-center"><Clock className="h-3 w-3 mr-2" />{report.timestamp}</p></div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <motion.span whileHover={{ scale: 1.1 }} className={`px-3 py-2 rounded-full text-xs font-semibold border bg-slate-800/50 ${getSeverityStyle(report.severity)}`}>{report.severity}</motion.span>
                            <motion.span whileHover={{ scale: 1.1 }} className={`px-3 py-2 rounded-full text-xs font-semibold border bg-slate-800/50 ${getStatusStyle(report.status)}`}>{report.status}</motion.span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px rgba(52, 211, 153, 0.3)' }}>{report.title}</h3>
                    <p className="text-gray-200 mb-6 leading-relaxed">{report.description}</p>
                    {report.image && (<motion.div whileHover={{ scale: 1.02 }} className="mb-6 rounded-2xl overflow-hidden border border-cyan-400/20 shadow-2xl"><img src={report.image} alt="Environmental issue" className="w-full h-64 object-cover" /></motion.div>)}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-6 text-sm text-cyan-200/80"><span className="flex items-center bg-slate-800/50 px-3 py-2 rounded-xl border border-cyan-400/20"><MapPin className="h-4 w-4 mr-2 text-emerald-300" />{report.location}</span><span className="bg-slate-800/50 px-3 py-2 rounded-xl text-xs border border-purple-400/20 text-purple-200">{report.category}</span></div>
                        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-full border border-orange-400/30"><AlertCircle className="h-4 w-4 text-orange-300" /><span className="text-sm font-semibold text-orange-200">+{report.points} points</span></motion.div>
                    </div>
                    <div className="flex items-center justify-between border-t border-cyan-400/20 pt-6">
                        <div className="flex space-x-8">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleLike(report.id)} className="flex items-center space-x-3 text-cyan-300 hover:text-red-400 transition-colors duration-300 group"><div className="relative"><ThumbsUp className="h-5 w-5 transition-transform group-hover:scale-110" /></div><span className="font-medium">{report.likes}</span></motion.button>
                        </div>
                        {report.status === 'Open' && (
                            <motion.button onClick={() => handleVerify(report.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-emerald-500/80 hover:bg-emerald-500 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 mr-2" /> Verify Report
                            </motion.button>
                        )}
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes galaxy-drift { 0% { transform: translate(0, 0); } 100% { transform: translate(-600px, -400px); } }
        @keyframes aurora-wave { 0%, 100% { transform: translateX(-50%) skew(0deg); opacity: 0.3; } 25% { transform: translateX(-30%) skew(2deg); opacity: 0.6; } 50% { transform: translateX(-70%) skew(-1deg); opacity: 0.4; } 75% { transform: translateX(-40%) skew(1deg); opacity: 0.7; } }
        @keyframes button-shimmer { 0% { transform: translateX(-100%); } 50% { transform: translateX(100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </>
  );
}