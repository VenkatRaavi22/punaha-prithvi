// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Brain, Type, Star, Trophy, ChevronLeft, Volume2, Lightbulb, XCircle, CheckCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

/**
 * GamesSection.tsx - FINAL, COMPLETE, AND CORRECTED VERSION 4
 *
 * UPDATE LOG:
 * - ECO STORIES REBUILT: This section has been completely rewritten for stability and to match new requirements.
 * - Each story has 5 questions, including situational questions.
 * - A new "mastery" quiz flow is implemented: you must answer correctly to proceed.
 * - The end-of-quiz flow now shows a simple score summary before exiting to the story list.
 * - The other three games remain complete and functional as per previous versions.
 */

/* -------------------- Data for All Games -------------------- */
// Data for Quiz Game
const ALL_QUIZ_QUESTIONS = [
    { id: 1, difficulty: 'beginner', question: "Which of the 3 R's means to use less of something?", options: ["Reduce", "Reuse", "Recycle"], correct: 0, hint: "It's the first and most effective of the three.", explanation: "Reduce is the most effective of the 3 R's because it prevents waste from being created in the first place." }, { id: 2, difficulty: 'beginner', question: "What gas do trees absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], correct: 1, hint: "It's the gas we exhale when we breathe.", explanation: "Trees take in Carbon Dioxide (CO2) for photosynthesis and release oxygen, which is why they are often called the 'lungs of the planet'." }, { id: 3, difficulty: 'beginner', question: "What is the main source of energy for life on Earth?", options: ["The Moon", "Electricity", "The Sun"], correct: 2, hint: "It's a giant star that our planet orbits.", explanation: "The Sun provides light and heat energy that plants use to grow, forming the base of almost every food chain on Earth." }, { id: 4, difficulty: 'beginner', question: "Turning off lights when you leave a room helps to do what?", options: ["Save energy", "Create pollution", "Waste water"], correct: 0, hint: "It reduces the amount of electricity you use.", explanation: "Saving energy reduces the demand on power plants, which often burn fossil fuels that contribute to air pollution and climate change." }, { id: 5, difficulty: 'beginner', question: "What material is created when we break down organic waste like fruit peels?", options: ["Plastic", "Compost", "Glass"], correct: 1, hint: "It's a nutrient-rich soil fertilizer.", explanation: "Compost is decomposed organic matter that enriches soil, helping plants grow without the need for chemical fertilizers." }, { id: 6, difficulty: 'advanced', question: "What does the term 'Carbon Footprint' refer to?", options: ["A fossilized footprint", "The total greenhouse gas emissions caused by an individual", "The amount of trees planted in a year"], correct: 1, hint: "It's a measure of your impact on the climate.", explanation: "A carbon footprint includes emissions from travel, energy consumption, and food. Reducing it is key to fighting climate change." }, { id: 7, difficulty: 'advanced', question: "What is the primary cause of acid rain?", options: ["Volcanic eruptions", "Pollutants from burning fossil fuels", "Excessive sunlight"], correct: 1, hint: "Gases like sulfur dioxide and nitrogen oxides are the main culprits.", explanation: "When fossil fuels are burned, they release pollutants that react with water in the atmosphere to form acids, which then fall as acid rain, harming forests and lakes." }, { id: 8, difficulty: 'advanced', question: "Which of these is NOT a renewable energy source?", options: ["Solar Power", "Wind Power", "Natural Gas"], correct: 2, hint: "Renewable sources replenish themselves naturally.", explanation: "Natural Gas is a fossil fuel, meaning it was formed over millions of years and is a finite, non-renewable resource." }, { id: 9, difficulty: 'advanced', question: "What is biodiversity?", options: ["The study of biology", "A type of renewable energy", "The variety of all living things on Earth"], correct: 2, hint: "It includes everything from tiny bacteria to giant whales.", explanation: "High biodiversity is crucial for ecosystem health, providing services like pollination, clean water, and climate regulation." }, { id: 10, difficulty: 'advanced', question: "What is the 'greenhouse effect'?", options: ["A method for growing plants in winter", "The trapping of the sun's warmth in the atmosphere", "The color of solar panels"], correct: 1, hint: "It's a natural process, but human activities have intensified it.", explanation: "Gases like CO2 act like a blanket, trapping heat. While necessary for life, excessive amounts from human activity are causing global warming." }, { id: 11, difficulty: 'master', question: "Which international treaty, signed in 1987, was designed to protect the ozone layer?", options: ["The Kyoto Protocol", "The Paris Agreement", "The Montreal Protocol"], correct: 2, hint: "This agreement phased out the production of substances like CFCs.", explanation: "The Montreal Protocol is hailed as one of the most successful environmental agreements in history, leading to the gradual recovery of the ozone layer." }, { id: 12, difficulty: 'master', question: "What is 'eutrophication' in aquatic ecosystems?", options: ["The process of water evaporation", "An excess of nutrients causing dense plant growth and oxygen depletion", "The filtering of water by rocks"], correct: 1, hint: "It's often caused by fertilizer runoff from farms into rivers.", explanation: "Eutrophication leads to algal blooms that consume dissolved oxygen when they decompose, creating 'dead zones' where aquatic life cannot survive." }, { id: 13, difficulty: 'master', question: "The 'Chipko Movement' in India was a form of what kind of activism?", options: ["Social media campaign", "Non-violent grassroots environmentalism", "Political lobbying"], correct: 1, hint: "It famously involved villagers hugging trees.", explanation: "The Chipko Movement is a prime example of community-led conservation, highlighting the power of peaceful protest to protect local environments." }, { id: 14, difficulty: 'master', question: "What is carbon sequestration?", options: ["The process of capturing and storing atmospheric carbon dioxide", "A method for creating artificial diamonds", "The measurement of carbon in fossils"], correct: 0, hint: "Forests and oceans are major natural examples of this process.", explanation: "Carbon sequestration is a critical process for reducing CO2 in the atmosphere. It can be done naturally (e.g., planting trees) or through industrial technologies." }, { id: 15, difficulty: 'master', question: "What does 'potable water' mean?", options: ["Water used in industrial pots", "Water that is safe to drink", "Water collected from flower pots"], correct: 1, hint: "Access to this is a major global health issue.", explanation: "Potable water, or drinking water, is free from harmful microorganisms and chemical contaminants, making it safe for human consumption." }
];
// Data for Word Decode Game
const WORD_DECODE_CHALLENGES = [
    { word: "PLANT", hint: "To put a seed in the ground so a tree or flower can grow." }, { word: "TREES", hint: "They have leaves and branches and give us oxygen to breathe." }, { word: "SAVE", hint: "To use less of something to prevent it from running out." }, { word: "WATER", hint: "The clear liquid that falls from the sky as rain." }, { word: "REDUCE", hint: "One of the 3 R's; to make something smaller or use less." }, { word: "POLLUTION", hint: "The presence of harmful substances in the environment." }, { word: "PROTECT", hint: "To keep something safe from harm or injury." }, { word: "NATURE", hint: "The physical world, including plants, animals, and landscapes." }, { word: "SECURE", hint: "To make something safe and free from danger." }, { word: "FUTURE", hint: "The time that is still to come." },
].map(c => ({...c, prefilled: {0: c.word[0], [c.word.length-1]: c.word[c.word.length-1]}}));
const WORD_DECODE_CONCLUSION = "To SECURE a better FUTURE and PROTECT our precious NATURE, we must PLANT more TREES, SAVE WATER, and REDUCE POLLUTION.";
const WORD_DECODE_KEYWORDS = ["SECURE", "FUTURE", "PROTECT", "NATURE", "PLANT", "TREES", "SAVE", "WATER", "REDUCE", "POLLUTION"];
// Data for Memory Game
const EMOJI_BASE_LARGE = ["🌳","🌍","♻️","💧","☀️","🌱","🍃","🌺","🦋","🐝","🌊","🏞️","🪴","🚲","🗑️","🐢","🐘","🐬","🦜","🪷","🍄","🌾","⛰️","⭐","🌬️","🐞","🐠","🌲","🌻","🐌","🐸","🐒","🦊","🐻","🐼","🐨","🐅","🦓","🦒","🦔","🦇","🦉","🦅","🕊️","🦢","🐳","🦀","🐚","CORAL", "LAVA"];
// Data for Eco Stories (Expanded with 5 questions each)
const STORIES = [
    { hero: "Meera", title: "Plastic-Free Festival", location: "Kerala", topic: "Community Waste Management", text: "Every year during Onam, the streets of Kochi burst with life. But after the celebrations, the joy turned into piles of plastic litter. Meera, a Class 9 student, suggested using traditional banana leaves for serving food and cloth bags instead of plastic. The idea spread like wildfire. The community launched “Zero-Plastic Onam.” Waste was reduced by half, and leftover food was composted. For the first time, Onam ended with smiles instead of stinking garbage heaps. 👉 Lesson: Festivals can celebrate culture while protecting nature.", questions: [
        { q: "What was the main problem Meera noticed after Onam?", options: ["The food was not tasty", "There were too many people", "Piles of plastic litter"], correct: 2 },
        { q: "What was Meera's sustainable alternative for plastic plates?", options: ["Steel plates", "Banana leaves", "Paper plates"], correct: 1 },
        { q: "The community's action of composting leftovers is an example of which 'R'?", options: ["Reduce", "Reuse", "Recycle (and Rot)"], correct: 2 },
        { q: "If you saw a similar waste problem after a local event, what would be a good first step inspired by Meera?", options: ["Ignore it, as it's not your job", "Suggest a simple, local solution to a community group or school", "Write an angry letter to the newspaper"], correct: 1 },
        { q: "What was the overall impact of the “Zero-Plastic Onam” initiative?", options: ["The festival was less fun", "Waste was reduced by half", "It cost the community more money"], correct: 1 },
    ]},
    { hero: "Venkat", title: "Lake Revival Project", location: "Bangalore", topic: "Citizen-led Ecosystem Restoration", text: "In Bangalore, a once-beautiful lake had become a dumping ground. Venkat and his college friends decided: “If no one cleans it, we will.” Armed with gloves and garbage bags, they began weekend clean-ups. Soon, locals joined them. They planted native saplings along the lake’s edge. The movement grew, and the municipal body stopped sewage from entering the lake. A year later, the lake’s surface sparkled, and migratory birds returned. 👉 Lesson: Small steps by citizens can heal damaged ecosystems.", questions: [
        { q: "What inspired Venkat to take action?", options: ["He was paid by the government", "He was frustrated by the pollution and inaction", "It was a college project"], correct: 1 },
        { q: "Besides cleaning, what other restorative action did the group take?", options: ["They built a fence around the lake", "They introduced new fish species", "They planted native saplings"], correct: 2 },
        { q: "What does the return of migratory birds signify?", options: ["The area has become noisier", "The ecosystem is recovering and healthy", "The water is still very polluted"], correct: 1 },
        { q: "You notice a small local park is filled with litter. What would be the most Venkat-like approach?", options: ["Wait for the city to clean it", "Complain about it online", "Organize a small clean-up with friends"], correct: 2 },
        { q: "What was the ultimate lesson from Venkat's story?", options: ["Only experts can solve environmental problems", "Citizen-led initiatives can create powerful change", "Cleaning up is a waste of time"], correct: 1 },
    ]},
    { hero: "Gaura Devi", title: "The Chipko Movement", location: "Uttarakhand", topic: "Grassroots Conservation", text: "In the 1970s, in the Himalayan villages of Uttarakhand, a crisis was looming. Large-scale deforestation threatened the villagers' livelihood, which depended on the forests for food, fuel, and water. When loggers arrived to cut down the trees, the local women, led by activists like Gaura Devi, took a brave stand. They hugged the trees, forming a human circle around them to prevent the axes from striking. Their simple, non-violent protest, known as the Chipko Movement, captured the nation's attention. It became a powerful symbol of grassroots environmentalism and the deep connection between communities and their forests. 👉 Lesson: Peaceful, collective action can bring about monumental environmental change.", questions: [
        { q: "What was the main goal of the Chipko Movement?", options: ["To protect trees from being cut down", "To build new roads", "To start a logging business"], correct: 0 },
        { q: "What unique and peaceful method of protest did the villagers use?", options: ["Hugging the trees", "Blocking the roads with cars", "Writing letters to the editor"], correct: 0 },
        { q: "Why were the forests so important to the villagers?", options: ["They were a tourist attraction", "They provided food, fuel, and water", "They wanted to sell the land"], correct: 1 },
        { q: "The Chipko Movement is a powerful example of what?", options: ["Grassroots environmentalism", "Industrial development", "Government policy"], correct: 0 },
        { q: "If a green space in your area was threatened, what lesson could you take from Gaura Devi?", options: ["That one person can do nothing", "That peaceful, community action can be very powerful", "That protesting is always violent"], correct: 1 },
    ]},
    { hero: "Jadav Payeng", title: "The Forest Man", location: "Assam", topic: "Afforestation and Dedication", text: "On a barren sandbar in Assam, a teenager named Jadav Payeng saw a tragic sight: a large number of snakes had died from the heat after floods washed them ashore. There were no trees to shelter them. This moved him deeply. He made it his life's mission to change this. He started by planting bamboo. Then, he continued planting other species. For over 40 years, Payeng single-handedly planted and cultivated trees over an area of 1,360 acres. This man-made forest, now called Molai Forest, is home to Bengal tigers, rhinos, and elephants. Jadav Payeng, known as the 'Forest Man of India', shows how one person's unwavering dedication can create an entire ecosystem. 👉 Lesson: One person's persistent effort can create a world of difference.", questions: [
        { q: "What event motivated Jadav Payeng to start planting trees?", options: ["A government order", "The death of snakes due to heat", "He wanted to start a timber business"], correct: 1 },
        { q: "How large is the Molai Forest that Payeng planted?", options: ["10 acres", "500 acres", "Over 1,300 acres"], correct: 2 },
        { q: "What is Jadav Payeng's nickname?", options: ["The Tree Hugger", "The Forest Man of India", "The River Cleaner"], correct: 1 },
        { q: "The Molai Forest is now home to which of these animals?", options: ["Penguins and polar bears", "Bengal tigers and rhinos", "Kangaroos and koalas"], correct: 1 },
        { q: "What does Jadav Payeng's story teach us about individual action?", options: ["It's pointless without government help", "One person's dedication can create an entire ecosystem", "Planting trees is too slow to make a difference"], correct: 1 },
    ]},
];

/* -------------------- Utility, UI & Main Component -------------------- */
const shuffle = (arr) => arr.slice().sort(() => Math.random() - 0.5);
const playSound = (type) => { /* Sound logic placeholder */ };
const speakText = (text) => {
    if (!("speechSynthesis" in window)) { alert("Sorry, your browser does not support text-to-speech."); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; utterance.pitch = 1.1; utterance.lang = "en-IN";
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance);
};
const AnimatedBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#0A192F] to-[#2C5F2D]">
        {[...Array(50)].map((_, i) => ( <motion.div key={i} className="absolute rounded-full bg-white/80" initial={{ x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh', scale: Math.random() * 0.5 + 0.5, opacity: Math.random() * 0.5 }} animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, ease: "linear" }} style={{ width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`, }} /> ))}
        <motion.div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-radial from-green-400/10 via-transparent to-transparent" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
    </div>
);
const GameContainer = ({ children, title, onBack }) => (
    <motion.div className="w-full h-full p-2 md:p-6 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="flex items-center mb-4 shrink-0">
            <motion.button onClick={onBack} className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><ChevronLeft /></motion.button>
            <h2 className="text-xl md:text-3xl font-bold text-white ml-4 tracking-wider">{title}</h2>
        </div>
        {children}
    </motion.div>
);
const Card = ({ children, onClick, className = '' }) => (
    <motion.div onClick={onClick} className={`bg-slate-900/50 backdrop-blur-md border border-cyan-300/20 rounded-2xl shadow-lg shadow-cyan-500/10 p-6 text-white text-center ${onClick ? 'cursor-pointer' : ''} ${className}`} whileHover={onClick ? { scale: 1.03, borderColor: 'rgba(56, 189, 248, 0.4)' } : {}} transition={{ type: "spring", stiffness: 300 }}>
        {children}
    </motion.div>
);
export default function GamesSection({ user, onUpdatePoints }) {
    const [activeGame, setActiveGame] = useState("menu");
    const handleGameEnd = (gameName, score) => { if (score > 0) onUpdatePoints(score); setActiveGame("menu"); };
    return (
        <div className="relative w-full min-h-screen font-sans bg-[#0A192F] text-white flex items-stretch justify-center">
            <AnimatedBackground />
            <AnimatePresence mode="wait">
                {activeGame === "menu" && <GameMenu key="menu" onSelectGame={setActiveGame} />}
                {activeGame === "quiz" && <QuizGame key="quiz" onBack={() => setActiveGame("menu")} onGameEnd={handleGameEnd} />}
                {activeGame === "wordDecode" && <WordDecodeGame key="wordDecode" onBack={() => setActiveGame("menu")} onGameEnd={handleGameEnd} />}
                {activeGame === "memory" && <MemoryGame key="memory" onBack={() => setActiveGame("menu")} onGameEnd={handleGameEnd} />}
                {activeGame === "LocalKnowledge" && <LocalKnowledgeGame key="local" onBack={() => setActiveGame("menu")} onGameEnd={handleGameEnd} />}
            </AnimatePresence>
        </div>
    );
}
const GameMenu = ({ onSelectGame }) => {
    const games = [{ id: "quiz", name: "Eco Quiz", icon: Brain, color: "from-green-400 to-teal-500" }, { id: "wordDecode", name: "Eco Word Decode", icon: Type, color: "from-yellow-400 to-orange-500" }, { id: "memory", name: "Nature Match", icon: Star, color: "from-blue-400 to-indigo-500" }, { id: "LocalKnowledge", name: "Indian Eco Stories", icon: Trophy, color: "from-pink-400 to-purple-500" }];
    return (<motion.div className="w-full max-w-4xl mx-auto p-4 md:p-8 flex flex-col items-center justify-center" initial="hidden" animate="visible" exit="hidden" variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}><h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-300 via-green-300 to-yellow-300 bg-clip-text text-transparent">Eco Games Hub</h1><p className="text-cyan-200/80 mb-10">Choose a game to test your knowledge!</p><motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>{games.map(game => (<motion.div key={game.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}><Card onClick={() => onSelectGame(game.id)}><div className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${game.color}`}><game.icon size={32} /></div><h3 className="text-2xl font-bold">{game.name}</h3></Card></motion.div>))}</motion.div></motion.div>);
};

/* -------------------- 1. Eco Quiz Component -------------------- */
const QuizGame = ({ onBack, onGameEnd }) => {
    // FULLY FUNCTIONAL CODE FOR QUIZ GAME
    const [quizState, setQuizState] = useState('selectingDifficulty');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showHint, setShowHint] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);
    const timerRef = useRef(null);
    const stopTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };
    const startTimer = () => { stopTimer(); timerRef.current = setInterval(() => setTimeLeft(prev => prev - 1), 1000); };
    useEffect(() => { if (quizState === 'playing' && !isAnswered) startTimer(); else stopTimer(); return stopTimer; }, [quizState, currentQuestionIndex, isAnswered]);
    useEffect(() => { if (timeLeft === 0) { stopTimer(); setIsAnswered(true); setUserAnswers(prev => [...prev, 'skipped']); } }, [timeLeft]);
    const selectDifficulty = (difficulty) => { const filteredQuestions = ALL_QUIZ_QUESTIONS.filter(q => q.difficulty === difficulty); setQuestions(shuffle(filteredQuestions).slice(0, 5)); setQuizState('playing'); };
    const handleSelectOption = (index) => { if (isAnswered) return; stopTimer(); setIsAnswered(true); setSelectedOption(index); setUserAnswers(prev => [...prev, index]); };
    const handleNextQuestion = () => { if (currentQuestionIndex < questions.length - 1) { setCurrentQuestionIndex(prev => prev + 1); setSelectedOption(null); setIsAnswered(false); setShowHint(false); setTimeLeft(20); } else setQuizState('summary'); };
    if (quizState === 'selectingDifficulty') return (<GameContainer title="Select Your Challenge" onBack={onBack}><div className="grid grid-cols-1 md:grid-cols-3 gap-8"><Card onClick={() => selectDifficulty('beginner')} className="border-green-400 hover:bg-green-500/20"><h3 className="text-2xl font-bold text-green-300">Beginner</h3><p className="mt-2 text-gray-300">Get started with the basics.</p></Card><Card onClick={() => selectDifficulty('advanced')} className="border-yellow-400 hover:bg-yellow-500/20"><h3 className="text-2xl font-bold text-yellow-300">Advanced</h3><p className="mt-2 text-gray-300">Test your deeper understanding.</p></Card><Card onClick={() => selectDifficulty('master')} className="border-red-400 hover:bg-red-500/20"><h3 className="text-2xl font-bold text-red-300">Master</h3><p className="mt-2 text-gray-300">Challenge yourself with expert questions.</p></Card></div></GameContainer>);
    if (quizState === 'summary') { const score = userAnswers.reduce((acc, answer, index) => (answer === questions[index].correct ? acc + 1 : acc), 0); const incorrectAnswers = questions.map((q, i) => ({...q, userAnswer: userAnswers[i]})).filter((q) => q.userAnswer !== q.correct); return (<GameContainer title="Quiz Summary" onBack={onBack}><Card className="text-left"><h2 className="text-3xl font-bold text-center">Quiz Complete!</h2><p className="text-xl text-center mt-2 mb-8">You scored <span className="font-bold text-yellow-300">{score} / {questions.length}</span></p>{incorrectAnswers.length > 0 && <h3 className="text-2xl font-bold text-cyan-300 border-b border-cyan-300/20 pb-2 mb-4">Let's Review:</h3>}<div className="space-y-6 max-h-96 overflow-y-auto pr-4">{incorrectAnswers.map((q, i) => (<motion.div key={i} className="bg-black/20 p-4 rounded-lg" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: i * 0.2}}><p className="font-bold text-lg">{q.question}</p><div className="mt-2"><p className="text-red-400 flex items-center"><XCircle size={16} className="mr-2 shrink-0"/>Your Answer: {q.userAnswer === 'skipped' ? 'Skipped' : q.options[q.userAnswer]}</p><p className="text-green-400 flex items-center"><CheckCircle size={16} className="mr-2 shrink-0"/>Correct Answer: {q.options[q.correct]}</p><p className="text-gray-300 mt-2 text-sm">{q.explanation}</p></div></motion.div>))}</div><div className="text-center mt-8"><motion.button onClick={() => {onGameEnd("Eco Quiz", score * 10); onBack();}} className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg" whileHover={{ scale: 1.05 }}>Finish</motion.button></div></Card></GameContainer>); }
    const question = questions[currentQuestionIndex];
    if (!question) return <GameContainer title="Loading..." onBack={onBack} />;
    return (<GameContainer title="Eco Quiz" onBack={onBack}><Card className="cursor-default"><div className="flex justify-between items-center text-cyan-200 mb-4"><span>Question {currentQuestionIndex + 1}/{questions.length}</span><div className={`flex items-center gap-2 font-bold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-yellow-300'}`}><Clock size={20} /><span>{timeLeft}s</span></div></div><AnimatePresence mode="wait"><motion.div key={question.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}><h3 className="text-2xl font-semibold mb-6 text-left">{question.question}</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{question.options.map((opt, idx) => { let btnClass = 'bg-slate-800/50 border-cyan-300/30 hover:bg-cyan-500/20'; if (isAnswered) { if (idx === question.correct) btnClass = 'bg-green-600 border-green-400 scale-105'; else if (idx === selectedOption) btnClass = 'bg-red-600 border-red-400'; else btnClass = 'bg-slate-800/50 border-cyan-300/30 opacity-60'; } return (<motion.button key={idx} onClick={() => handleSelectOption(idx)} className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${btnClass}`} whileHover={isAnswered ? {} : { scale: 1.03 }}><span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>{opt}</motion.button>);})}</div><div className="mt-6 text-left h-24">{!isAnswered && <motion.button onClick={()=>setShowHint(true)} className="flex items-center gap-2 text-yellow-300 font-semibold px-4 py-2 bg-yellow-500/10 rounded-lg hover:bg-yellow-500/20" whileHover={{scale:1.05}}><Lightbulb size={18}/>Show Hint</motion.button>}<AnimatePresence>{showHint && !isAnswered && <motion.p initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="text-yellow-200 mt-2 bg-black/20 p-2 rounded-md">{question.hint}</motion.p>}</AnimatePresence></div><AnimatePresence>{isAnswered && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex flex-col items-center"><div className="bg-black/20 p-4 rounded-lg w-full text-left"><h4 className="font-bold text-lg text-cyan-300">Explanation</h4><p className="text-white mt-1">{question.explanation}</p></div><motion.button onClick={handleNextQuestion} className="w-1/2 mt-6 bg-blue-500 text-white font-bold py-3 rounded-lg text-lg" whileHover={{ scale: 1.05 }}>{currentQuestionIndex === questions.length - 1 ? 'View Summary' : 'Next Question'}</motion.button></motion.div>)}</AnimatePresence></motion.div></AnimatePresence></Card></GameContainer>);
};

/* -------------------- 2. Eco Word Decode Component -------------------- */
const WordDecodeGame = ({ onBack, onGameEnd }) => {
    // FULLY FUNCTIONAL CODE FOR WORD DECODE GAME
    const [wordIndex, setWordIndex] = useState(0); const [userInput, setUserInput] = useState({}); const [status, setStatus] = useState('playing'); const [score, setScore] = useState(0); const [isGameFinished, setIsGameFinished] = useState(false); const inputRefs = useRef([]); const currentChallenge = WORD_DECODE_CHALLENGES[wordIndex]; const { word, hint, prefilled } = currentChallenge;
    useEffect(() => { setUserInput({}); setStatus('playing'); const firstEmptyInput = Array.from(word).findIndex((_, i) => !prefilled[i]); if (firstEmptyInput !== -1) inputRefs.current[firstEmptyInput]?.focus(); }, [wordIndex, prefilled, word]);
    const handleInputChange = (e, index) => { const value = e.target.value.toUpperCase().slice(-1); setUserInput(prev => ({ ...prev, [index]: value })); if (value && index < word.length - 1) for (let i = index + 1; i < word.length; i++) if (!prefilled[i]) { inputRefs.current[i]?.focus(); break; } };
    const handleKeyDown = (e, index) => { if (e.key === 'Backspace' && !userInput[index] && index > 0) for (let i = index - 1; i >= 0; i--) if (!prefilled[i]) { inputRefs.current[i]?.focus(); break; } };
    const checkAnswer = () => { let guessedWord = Array.from({ length: word.length }, (_, i) => prefilled[i] || userInput[i] || '').join(''); if (guessedWord === word) { setStatus('correct'); setScore(s => s + 20); } else { setStatus('incorrect'); setTimeout(() => setStatus('playing'), 800); } };
    const handleNextWord = () => { if (wordIndex < WORD_DECODE_CHALLENGES.length - 1) setWordIndex(i => i + 1); else setIsGameFinished(true); };
    if (isGameFinished) return (<GameContainer title="Challenge Complete!" onBack={onBack}><motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}><Card className="w-full max-w-4xl mx-auto"><Trophy size={48} className="text-yellow-300 mx-auto" /><h2 className="text-3xl font-bold mt-4 text-white">Congratulations!</h2><p className="text-xl mt-2 text-gray-300">Your Final Score: <span className="font-bold text-yellow-300 text-2xl">{score}</span></p><div className="bg-black/20 p-6 rounded-lg my-6 text-left"><h3 className="text-2xl font-semibold text-cyan-300 text-center">A Message For Our Planet</h3><p className="mt-4 text-xl leading-relaxed text-center">{WORD_DECODE_CONCLUSION.split(' ').map((w, i) => WORD_DECODE_KEYWORDS.includes(w.replace(/[.,]/g, '')) ? <strong key={i} className="text-yellow-300"> {w}</strong> : ` ${w}`)}</p></div><div className="flex justify-center items-center gap-4 mt-8"><button disabled className="w-1/3 bg-gray-600 text-gray-400 font-bold py-3 rounded-lg text-lg cursor-not-allowed opacity-50">Next Level</button><motion.button onClick={() => {onGameEnd("Eco Word Decode", score); onBack();}} className="w-1/3 bg-blue-500 text-white font-bold py-3 rounded-lg text-lg" whileHover={{ scale: 1.05 }}>Exit</motion.button></div></Card></motion.div></GameContainer>);
    return (<GameContainer title="Eco Word Decode" onBack={onBack}><Card className="w-full max-w-3xl mx-auto"><AnimatePresence mode="wait"><motion.div key={wordIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center"><div className="w-full flex justify-between items-center mb-4"><span className="text-green-300 font-semibold">Word {wordIndex + 1} of {WORD_DECODE_CHALLENGES.length}</span><span className="text-yellow-300 font-bold">Score: {score}</span></div><div className="bg-black/20 p-4 rounded-lg w-full mb-6 text-center"><p className="text-lg text-gray-300">Hint:</p><p className="text-xl text-white font-medium">{hint}</p></div><motion.div className="flex items-center justify-center gap-2 mb-8" animate={status === 'incorrect' ? { x: [0, -10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.5 }}>{word.split('').map((char, i) => (<input key={i} ref={el => inputRefs.current[i] = el} type="text" maxLength={1} value={prefilled[i] || userInput[i] || ''} onChange={(e) => handleInputChange(e, i)} onKeyDown={(e) => handleKeyDown(e, i)} disabled={!!prefilled[i]} className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-3xl font-bold uppercase rounded-lg transition-all duration-300 ${prefilled[i] ? 'bg-white/30 text-cyan-200 border-transparent' : 'bg-slate-800/50 text-white border-2 border-cyan-300/30 focus:border-yellow-400 focus:outline-none'} ${status === 'correct' ? '!bg-green-500 !border-green-300' : ''}`} />))}</motion.div><motion.button onClick={status === 'correct' ? handleNextWord : checkAnswer} className={`w-full md:w-1/2 text-white font-bold py-3 rounded-lg text-lg ${status === 'correct' ? 'bg-blue-500' : 'bg-green-500'}`} whileHover={{ scale: 1.05 }}>{status === 'correct' ? (wordIndex === WORD_DECODE_CHALLENGES.length - 1 ? 'Finish Game' : 'Next Word') : 'Check Answer'}</motion.button></motion.div></AnimatePresence></Card></GameContainer>);
};

/* -------------------- 3. Memory Game Component -------------------- */
const MemoryGame = ({ onBack, onGameEnd }) => {
    // FULLY FUNCTIONAL CODE FOR MEMORY GAME
    const [cards, setCards] = useState(() => shuffle([...EMOJI_BASE_LARGE, ...EMOJI_BASE_LARGE])); const [flipped, setFlipped] = useState([]); const [matched, setMatched] = useState([]); const [moves, setMoves] = useState(0); const [isGameComplete, setIsGameComplete] = useState(false);
    useEffect(() => { if (flipped.length === 2) { setMoves(m => m + 1); const [first, second] = flipped; if (cards[first] === cards[second]) { setMatched(m => [...m, first, second]); setFlipped([]); } else setTimeout(() => setFlipped([]), 800); } }, [flipped, cards]);
    useEffect(() => { if (matched.length > 0 && matched.length === 100) setIsGameComplete(true); }, [matched]);
    const handleFlip = (idx) => { if (flipped.length < 2 && !flipped.includes(idx) && !matched.includes(idx)) setFlipped(f => [...f, idx]); };
    if (isGameComplete) { const score = Math.max(0, 500 - (moves - 50) * 5); return (<GameContainer title="Grid Cleared!" onBack={onBack}><motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}><Card className="w-full max-w-2xl mx-auto"><Trophy size={48} className="text-yellow-300 mx-auto" /><h2 className="text-3xl font-bold mt-4 text-white">Excellent Memory!</h2><div className="flex justify-around items-center text-xl mt-4 text-gray-300"><p>Moves: <span className="font-bold text-white text-2xl">{moves}</span></p><p>Score: <span className="font-bold text-yellow-300 text-2xl">{score}</span></p></div><div className="flex justify-center items-center gap-4 mt-8"><button disabled className="w-1/3 bg-gray-600 text-gray-400 font-bold py-3 rounded-lg text-lg cursor-not-allowed opacity-50">Next Level</button><motion.button onClick={() => {onGameEnd("Nature Match", score); onBack();}} className="w-1/3 bg-blue-500 text-white font-bold py-3 rounded-lg text-lg" whileHover={{ scale: 1.05 }}>Exit</motion.button></div></Card></motion.div></GameContainer>); }
    return (<GameContainer title="Nature Match" onBack={onBack}><div className="flex flex-col flex-grow min-h-0"><div className="flex justify-between items-center mb-4 shrink-0 px-2"><span className="text-lg font-semibold">Moves: <span className="text-white">{moves}</span></span><span className="text-lg font-semibold">Pairs Found: <span className="text-white">{matched.length / 2} / 50</span></span></div><div className="w-full flex-grow flex items-center justify-center overflow-hidden"><div className="w-full max-w-[90vh] md:max-w-[80vh] aspect-square"><div className="grid grid-cols-10 gap-1 sm:gap-1.5 h-full">{cards.map((emoji, idx) => { const isFlipped = flipped.includes(idx) || matched.includes(idx); const isMatched = matched.includes(idx); return (<div key={idx} className="aspect-square cursor-pointer" style={{ perspective: '1000px' }} onClick={() => handleFlip(idx)}><motion.div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.5 }}><div className="absolute w-full h-full bg-slate-800/50 border border-cyan-300/20 rounded-md sm:rounded-lg flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}><Star className="w-4/6 h-4/6 text-cyan-300/70" /></div><div className={`absolute w-full h-full rounded-md sm:rounded-lg flex items-center justify-center transition-opacity duration-500 ${isMatched ? 'opacity-40 bg-green-500/50' : 'bg-cyan-500/80'}`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}><span className="text-sm sm:text-lg md:text-2xl select-none">{emoji}</span></div></motion.div></div>);})}</div></div></div></div></GameContainer>);
};

/* -------------------- 4. Indian Eco Stories Component (FIXED & SIMPLIFIED) -------------------- */
const LocalKnowledgeGame = ({ onBack, onGameEnd }) => {
    const [view, setView] = useState('list');
    const [activeStory, setActiveStory] = useState(null);
    const [storyState, setStoryState] = useState({ currentQuestion: 0, score: 0, feedback: null });

    const handleSelectStory = (story) => {
        setStoryState({ currentQuestion: 0, score: 0, feedback: null });
        setActiveStory(story);
        setView('story');
    };

    const handleAnswer = (optionIndex) => {
        const question = activeStory.questions[storyState.currentQuestion];
        const isCorrect = optionIndex === question.correct;

        if (isCorrect) {
            const newScore = storyState.score + 1;
            const nextQuestionIndex = storyState.currentQuestion + 1;
            setStoryState(prev => ({ ...prev, feedback: null })); // Clear feedback on correct answer

            if (nextQuestionIndex >= activeStory.questions.length) {
                setStoryState(prev => ({ ...prev, score: newScore }));
                onGameEnd("Eco Stories", newScore * 10);
                setView('summary');
            } else {
                setStoryState(prev => ({ ...prev, currentQuestion: nextQuestionIndex, score: newScore }));
            }
        } else {
            setStoryState(prev => ({ ...prev, feedback: "That's not the correct approach. Try again!" }));
        }
    };
    
    const handleBackToList = () => { setActiveStory(null); setView('list'); };

    if (view === 'list') {
        return (<GameContainer title="Indian Eco Stories" onBack={onBack}><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{STORIES.map((story, idx) => (<motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}><Card onClick={() => handleSelectStory(story)} className="text-left h-full"><h3 className="text-xl font-bold text-cyan-300">{story.title}</h3><p className="text-sm text-gray-400 mb-2">A story of <span className="font-bold">{story.hero}</span></p><p className="mt-2 text-sm text-gray-200">{story.text.slice(0, 150)}...</p></Card></motion.div>))}</div></GameContainer>);
    }

    if (view === 'summary') {
        return (<GameContainer title="Story Complete!" onBack={handleBackToList}><motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}}><Card><Trophy size={40} className="mx-auto text-yellow-300" /><h3 className="text-2xl font-bold mt-4">Quiz Finished!</h3><p className="mt-4 text-gray-200 text-xl">You've learned about <span className="font-bold text-cyan-300">{activeStory.topic}</span></p><p className="mt-2 text-gray-200 text-xl">You Scored: <span className="font-bold text-yellow-300">{storyState.score} / {activeStory.questions.length}</span></p><motion.button onClick={handleBackToList} className="w-full mt-6 bg-blue-500 text-white font-bold py-3 rounded-lg text-lg" whileHover={{scale:1.05}}>Back to Stories</motion.button></Card></motion.div></GameContainer>);
    }
    
    const question = activeStory.questions[storyState.currentQuestion];
    return (
        <GameContainer title={activeStory.title} onBack={handleBackToList}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <Card className="text-left cursor-default h-full">
                        <p className="text-gray-200 leading-relaxed max-h-96 lg:max-h-[60vh] overflow-y-auto pr-2">{activeStory.text}</p>
                        <motion.button onClick={() => speakText(activeStory.text)} whileHover={{scale: 1.05}} className="mt-4 flex items-center gap-2 text-cyan-300 font-semibold"><Volume2 size={20} /> Listen to Story</motion.button>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        <motion.div key={storyState.currentQuestion} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity: 0}}>
                            <Card className="cursor-default">
                                <h3 className="text-lg font-semibold mb-4 text-left">{storyState.currentQuestion + 1}. {question.q}</h3>
                                <div className="flex flex-col gap-3">
                                    {question.options.map((opt, idx) => (
                                        <motion.button key={idx} onClick={() => handleAnswer(idx)} className="p-3 rounded-lg border-2 border-cyan-300/30 text-left transition-colors bg-slate-800/50 hover:bg-cyan-500/20" whileHover={{scale: 1.03}}>{opt}</motion.button>
                                    ))}
                                </div>
                                {storyState.feedback && (
                                    <motion.p initial={{opacity: 0}} animate={{opacity: 1}} className="text-red-400 font-semibold mt-4">{storyState.feedback}</motion.p>
                                )}
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </GameContainer>
    );
};