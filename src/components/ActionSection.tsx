// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Heart, MessageCircle, Share2, Trophy, Upload, MapPin, Clock, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPE DEFINITIONS ---
interface User {
  id: string;
  name: string;
  avatar: string;
  age: number;
}
interface Comment {
  id: string;
  user: { name: string; avatar: string };
  text: string;
}
interface Post {
  id: string;
  user: { name: string; avatar: string };
  content: string;
  image?: string;
  location?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  points: number;
  isLiked: boolean;
}
interface ActionSectionProps {
  user: User;
  onUpdatePoints: (points: number) => void;
}

// --- Stunning Animated Background ---
const StunningBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0a0f18]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f18] via-[#0a192f] to-emerald-900/50" />
        {/* Subtle SVG Nature Pattern */}
        <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%232dd4bf' fill-opacity='0.4'%3E%3Cpath d='M96 95c-3.14 0-6.1-1.23-8.3-3.4-2.2-2.18-3.4-5.17-3.4-8.3 0-6.1 4.9-11 11-11 .2 0 .4 0 .6.02A16.4 16.4 0 0 0 85 64c-9.1 0-16.5 7.4-16.5 16.5S75.9 97 85 97a16.4 16.4 0 0 0 12.98-7.6c-.01.2-.02.4-.02.6 0 2.9-1.07 5.6-3 7.6-2.18 2.2-5.17 3.4-8.3 3.4zM29 95c-3.14 0-6.1-1.23-8.3-3.4-2.2-2.18-3.4-5.17-3.4-8.3 0-6.1 4.9-11 11-11 .2 0 .4 0 .6.02A16.4 16.4 0 0 0 18 64c-9.1 0-16.5 7.4-16.5 16.5S8.9 97 18 97a16.4 16.4 0 0 0 12.98-7.6c-.01.2-.02.4-.02.6 0 2.9-1.07 5.6-3 7.6-2.18 2.2-5.17 3.4-8.3 3.4zM42 16.5C42 7.4 34.6 0 25.5 0S9 7.4 9 16.5 16.4 33 25.5 33 42 25.6 42 16.5zm33 0c0-9.1-7.4-16.5-16.5-16.5S42 7.4 42 16.5 49.4 33 58.5 33 75 25.6 75 16.5z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '300px' }}
        />
        {[...Array(50)].map((_, i) => (
            <motion.div 
              key={i} 
              className="absolute rounded-full bg-cyan-300/80" 
              initial={{ x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh', scale: Math.random() * 0.6 + 0.2, opacity: Math.random() * 0.5 }} 
              animate={{ opacity: [0.1, 0.7, 0.1] }} 
              transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, ease: "linear" }} 
              style={{ 
                  width: `${Math.random() * 2 + 1}px`, 
                  height: `${Math.random() * 2 + 1}px`
              }} 
            />
        ))}
    </div>
);

// --- Create Post Modal Component ---
const CreatePostModal = ({ user, onCreatePost, onCancel }) => {
    const [content, setContent] = useState('');
    const [location, setLocation] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const fileInputRef = useRef(null);
    
    const fetchLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }
        setIsFetchingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
                setIsFetchingLocation(false);
            },
            () => {
                alert("Unable to retrieve location. Please grant permission or enter it manually.");
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

    const handleSubmit = () => {
        if (!content.trim()) return;
        onCreatePost({ content, location, image: imagePreview });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-slate-800 border border-cyan-400/30 rounded-2xl p-6 w-full max-w-lg relative shadow-2xl shadow-cyan-500/10">
                <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
                <h3 className="text-xl font-bold text-white mb-4">Share Your Environmental Impact</h3>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder={`What did you do today, ${user.name}?`} className="w-full p-3 bg-slate-700/50 text-gray-200 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4" rows={4}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (optional)" className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                        {isFetchingLocation && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400 animate-spin" />}
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center gap-2 text-gray-300 hover:bg-slate-700 hover:border-cyan-400/50 transition-colors">
                        <Upload className="h-4 w-4" /> {imageFile ? 'Change Photo' : 'Upload Photo'}
                    </button>
                </div>
                {imagePreview && (<div className="mb-4 rounded-lg overflow-hidden border border-slate-600"><img src={imagePreview} alt="Post preview" className="w-full h-48 object-cover" /></div>)}
                <div className="flex justify-end space-x-3">
                    <button onClick={onCancel} className="bg-slate-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-slate-500 transition-colors">Cancel</button>
                    <button onClick={handleSubmit} disabled={!content.trim()} className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-2 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Share Action</button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- Main Action Section Component ---
export default function ActionSection({ user, onUpdatePoints }: ActionSectionProps) {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activePostComments, setActivePostComments] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');

  const handleCreatePost = (newPostData) => {
    const post = { id: Date.now().toString(), user: { name: user.name, avatar: user.avatar }, content: newPostData.content, image: newPostData.image || undefined, location: newPostData.location || undefined, timestamp: 'Just now', likes: 0, comments: [], points: 50, isLiked: false };
    setPosts([post, ...posts]);
    onUpdatePoints(50);
    setShowCreatePostModal(false);
  };

  const handleLike = (postId) => setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p));
  const handleShare = async (post) => { if (navigator.share) { try { await navigator.share({ title: 'Eco Action by ' + post.user.name, text: post.content, url: window.location.href }); } catch (error) { console.error('Error sharing:', error); } } else { alert('Web Share API is not supported in your browser.'); } };
  const handleAddComment = (postId) => {
    if(!newCommentText.trim()) return;
    const newComment = { id: Date.now().toString(), user: { name: user.name, avatar: user.avatar }, text: newCommentText };
    setPosts(posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p));
    setNewCommentText('');
  };
  
  const PostCard = ({ post }) => (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="bg-slate-900/50 backdrop-blur-md border border-cyan-300/20 rounded-2xl p-6 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-emerald-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3"><div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">{post.user.avatar}</div><div><h4 className="font-semibold text-white">{post.user.name}</h4><p className="text-sm text-gray-400 flex items-center"><Clock className="h-3 w-3 mr-1" />{post.timestamp}</p></div></div>
        <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30"><Trophy className="h-4 w-4 text-emerald-400" /><span className="text-sm font-semibold text-emerald-300">+{post.points} points</span></div>
      </div>
      <p className="text-gray-300 mb-4 text-left">{post.content}</p>
      {post.image && <div className="mb-4 rounded-lg overflow-hidden border border-slate-700"><img src={post.image} alt="Environmental action" className="w-full h-auto max-h-[50vh] object-cover" /></div>}
      {post.location && <div className="flex items-center text-gray-400 text-sm mb-4"><MapPin className="h-4 w-4 mr-1" />{post.location}</div>}
      <div className="flex items-center justify-between border-t border-cyan-400/20 pt-4"><div className="flex space-x-6">
        <button onClick={() => handleLike(post.id)} className={`flex items-center space-x-2 transition-colors ${post.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}><Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} /><span className="font-medium">{post.likes}</span></button>
        <button onClick={() => setActivePostComments(activePostComments === post.id ? null : post.id)} className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors"><MessageCircle className="h-5 w-5" /><span className="font-medium">{post.comments.length}</span></button>
        <button onClick={() => handleShare(post)} className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors"><Share2 className="h-5 w-5" /><span className="font-medium">Share</span></button>
      </div></div>
      <AnimatePresence>
        {activePostComments === post.id && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 border-t border-cyan-400/20 pt-4 overflow-hidden">
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">{post.comments.map(comment => (<div key={comment.id} className="flex items-start space-x-2 text-sm"><div className="w-6 h-6 mt-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs shrink-0">{comment.user.avatar}</div><div className="bg-slate-700/50 p-2 rounded-lg text-left"><span className="font-semibold text-white mr-2">{comment.user.name}</span><span className="text-gray-300">{comment.text}</span></div></div>))}</div>
                <div className="flex items-center mt-4 gap-2"><input type="text" value={newCommentText} onChange={e => setNewCommentText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddComment(post.id)} placeholder="Add a comment..." className="w-full flex-1 p-2 bg-slate-700 text-gray-200 border border-slate-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-400" /><button onClick={() => handleAddComment(post.id)} className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-400"><Send size={20}/></button></div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full relative">
        <StunningBackground />
        <div className="max-w-3xl mx-auto py-8 px-4 relative z-10 text-white">
            <motion.header initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-300 via-emerald-300 to-yellow-300 bg-clip-text text-transparent">Action Community 🌿</h1>
                <p className="text-lg text-cyan-200/80">Share your actions, inspire change, and grow our green galaxy.</p>
            </motion.header>

            <motion.div variants={{ visible: { transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div variants={{hidden: {opacity:0, y:20}, visible: {opacity:1, y:0}}} className="bg-slate-800/50 border border-emerald-400/30 p-4 rounded-xl text-center"><p className="text-2xl font-bold text-white">50+</p><p className="text-emerald-300/80 text-sm">Points per Post</p></motion.div>
                <motion.div variants={{hidden: {opacity:0, y:20}, visible: {opacity:1, y:0}}} className="bg-slate-800/50 border border-cyan-400/30 p-4 rounded-xl text-center"><p className="text-2xl font-bold text-white">{posts.length}</p><p className="text-cyan-300/80 text-sm">Community Actions</p></motion.div>
                <motion.div variants={{hidden: {opacity:0, y:20}, visible: {opacity:1, y:0}}} className="bg-slate-800/50 border border-pink-400/30 p-4 rounded-xl text-center"><p className="text-2xl font-bold text-white">{posts.reduce((sum, p) => sum + p.likes, 0)}</p><p className="text-pink-300/80 text-sm">Total Likes</p></motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
                <button onClick={() => setShowCreatePostModal(true)} className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center text-lg shadow-lg shadow-cyan-500/20">
                    <Camera className="h-6 w-6 mr-2" /> Share Your Action
                </button>
            </motion.div>
            
            <AnimatePresence>
                {showCreatePostModal && <CreatePostModal user={user} onCreatePost={handleCreatePost} onCancel={() => setShowCreatePostModal(false)} />}
            </AnimatePresence>
            
            <div className="space-y-6">
                {posts.length === 0 && (<div className="text-center text-cyan-200/60 mt-12"><p>The community feed is quiet...</p><p className="mt-1">Be the first to share an environmental action! 🌱</p></div>)}
                {posts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
        </div>
         <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: linear-gradient(to bottom, #06b6d4, #10b981);
                border-radius: 10px;
            }
        `}</style>
    </div>
  );
}