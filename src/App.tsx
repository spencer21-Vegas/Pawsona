/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useMemo, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Info,
  Trophy,
  Activity,
  DollarSign,
  Clock,
  ExternalLink,
  Github,
  PawPrint,
  Cat,
  Dog,
  Fish,
  Bird,
  Rabbit,
  Home,
  Sparkles,
  Volume2,
  VolumeX,
  Leaf,
  Flower2,
} from 'lucide-react';

import { 
  PET_DATASET, 
  WEIGHTS, 
  QUESTIONS, 
  PET_DETAILS,
} from './constants';

const PetPatternBackground = () => {
  const icons = [Cat, Dog, Fish, Bird, Rabbit, PawPrint];
  
  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.1] overflow-hidden z-0">
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-16 p-8">
        {[...Array(64)].map((_, i) => {
          const Icon = icons[i % icons.length];
          const rotation = (i * 45) % 360;
          return (
            <div 
              key={i} 
              className="flex items-center justify-center"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <Icon size={48} strokeWidth={2} className="text-deep-gray" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HeartTrail = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newHeart = {
        id: `${Date.now()}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
      };
      setHearts((prev) => [...prev.slice(-15), newHeart]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              y: -50,
              x: (Math.random() - 0.5) * 20
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'fixed',
              left: heart.x - 10,
              top: heart.y - 10,
              color: '#FF9AA2',
            }}
          >
            <Heart size={20} fill="currentColor" strokeWidth={0} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const PawTransition = () => {
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden bg-white/20 backdrop-blur-sm">
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            x: i % 2 === 0 ? -100 : '110vw', 
            y: `${(i / 24) * 100}vh` 
          }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            x: i % 2 === 0 ? '110vw' : -100,
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)]
          }}
          transition={{ 
            duration: 1.2, 
            delay: (i % 12) * 0.03,
            ease: "easeInOut" 
          }}
          className="absolute"
        >
          <PawPrint size={64} className="text-cafe-accent fill-cafe-accent" />
        </motion.div>
      ))}
    </div>
  );
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4); // Start at 40% as requested "it's a bit loud"
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.error("Audio play blocked", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="fixed bottom-8 right-8 z-50 flex items-center gap-4"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/20 backdrop-blur-md border-2 border-white/40 px-4 py-3 rounded-2xl flex items-center shadow-lg"
          >
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <audio 
        ref={audioRef} 
        loop 
        src="/cafe_saffron.mp3" 
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-16 h-16 bg-white/20 backdrop-blur-md border-4 border-white/40 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-white/30 transition-colors shrink-0"
      >
        {isPlaying ? (volume > 0 ? <Volume2 size={32} /> : <VolumeX size={32} />) : <VolumeX size={32} />}
      </motion.button>
    </div>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: mousePos.x - 20,
        y: mousePos.y - 20,
        scale: isPointer ? 1.2 : 1,
        rotate: isPointer ? 15 : 0
      }}
      transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
    >
      <img 
        src="/paw_cursor.png" 
        alt="cursor" 
        className="w-10 h-10 object-contain drop-shadow-md"
      />
      {isPointer && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="absolute inset-0 bg-white/40 rounded-full blur-xl"
        />
      )}
    </motion.div>
  );
};

const NatureParticle = ({ delay, type }: { delay: number; type: 'leaf' | 'flower' }) => {
  const Icon = type === 'leaf' ? Leaf : Flower2;
  const startX = useMemo(() => Math.random() * 100, []);
  const size = useMemo(() => 16 + Math.random() * 24, []);
  const duration = useMemo(() => 15 + Math.random() * 15, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: "110vh", x: `${startX}vw`, rotate: 0 }}
      animate={{ 
        opacity: [0, 0.3, 0.3, 0],
        y: "-10vh",
        x: [`${startX}vw`, `${startX + (Math.random() - 0.5) * 15}vw`],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay, 
        ease: "linear" 
      }}
      className="absolute pointer-events-none z-10"
      style={{ color: type === 'leaf' ? '#7A942E' : '#F28BA8' }}
    >
      <Icon size={size} strokeWidth={1} className="opacity-40" />
    </motion.div>
  );
};

const NatureBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
    {[...Array(10)].map((_, i) => (
      <React.Fragment key={i}>
        <NatureParticle delay={i * 2} type="leaf" />
        <NatureParticle delay={i * 2 + 1} type="flower" />
      </React.Fragment>
    ))}
  </div>
);

const CoffeeBean = ({ delay }: { delay: number; key?: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0], 
      y: [-20, -100],
      rotate: [0, 180]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
    className="absolute pointer-events-none"
    style={{ 
      left: `${10 + Math.random() * 80}%`,
      bottom: '10%'
    }}
  >
    <div className="w-4 h-6 bg-[#4A2C10] rounded-full border-2 border-[#2A1808] opacity-60 relative overflow-hidden">
       <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black/20 -translate-y-1/2 rotate-12" />
    </div>
  </motion.div>
);

const SteamLine = ({ delay }: { delay: number; key?: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 0 }}
    animate={{ 
      opacity: [0, 0.6, 0],
      y: [0, -40],
      x: [0, (Math.random() - 0.5) * 10]
    }}
    transition={{ 
      duration: 2.5,
      repeat: Infinity,
      delay,
      ease: "easeOut"
    }}
    className="absolute w-2 h-8 bg-white/30 rounded-full blur-[3px]"
  />
);

const CafeLanding = ({ onStart }: { onStart: (e: React.MouseEvent) => void }) => {
  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col font-serif bg-cover bg-center bg-[#FDF1E6]"
      style={{ backgroundImage: "url('/cafe_bg.png')" }}
    >
      {/* Background Overlay - gentle warmth */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      
      <NatureBackground />
      
      <MusicPlayer />

      {/* Logo Area */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -15, 0], // Floating up and down
          }}
          transition={{ 
            opacity: { duration: 1 },
            scale: { duration: 1 },
            y: { 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }
          }}
          className="relative"
        >
          {/* Logo Image */}
          <img 
            src="/logo_catfe.png" 
            alt="Pawsona Logo" 
            className="w-96 md:w-[800px] drop-shadow-[0_20px_20px_rgba(0,0,0,0.3)]"
          />
          
          {/* Enhanced Sparkles/Glitter Effect */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.5],
                  rotate: [0, 90, 180]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2 + Math.random(), 
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
                className="absolute text-[#FFD700]"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%` 
                }}
              >
                <Sparkles size={24 + Math.random() * 20} strokeWidth={2} />
              </motion.div>
            ))}
            
            {/* Fine Glitter particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`g-${i}`}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  y: [0, -20 - Math.random() * 30],
                  x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5 + Math.random(), 
                  delay: i * 0.2 
                }}
                className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full blur-[1px]"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%` 
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hero Content Area - Transparent, just for spacing/layout */}
      <div className="flex-1" />

      {/* Bottom Left Button Area */}
      <div className="p-8 md:p-20 relative z-30">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-16 py-7 md:px-24 md:py-10 bg-[#F28BA8] text-white rounded-[40px] md:rounded-[60px] font-black text-3xl md:text-5xl border-[8px] md:border-[12px] border-[#3E230B] shadow-[0_12px_30px_rgba(242,139,168,0.4),0_12px_0px_#3E230B] active:shadow-none translate-y-[-12px] active:translate-y-0 transition-all flex items-center gap-6 group cursor-pointer font-sans"
          >
            เริ่มทำควิซ <ArrowRight className="w-12 h-12 md:w-16 md:h-16 group-hover:translate-x-4 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Coffee Beans (Moving slowly over the beautiful art) */}
      {[...Array(6)].map((_, i) => (
        <CoffeeBean key={i} delay={i * 1.2} />
      ))}
      
      {/* Subtle steam rises over the painted cup area */}
      <div className="absolute bottom-[20%] right-[25%] opacity-40">
         <SteamLine delay={0} />
         <SteamLine delay={0.8} />
      </div>
    </div>
  );
};

type View = 'home' | 'quiz' | 'result' | 'about';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPawTransition, setShowPawTransition] = useState(false);

  const [transitionPos, setTransitionPos] = useState({ x: 0, y: 0 });

  const startQuiz = (e: React.MouseEvent) => {
    setIsTransitioning(true);
    setShowPawTransition(true);
    
    // Animation wait
    setTimeout(() => {
      setView('quiz');
      setCurrentIdx(0);
      setAnswers({});
      setSelectedOption(null);
      setIsTransitioning(false);
    }, 1200);

    setTimeout(() => {
      setShowPawTransition(false);
    }, 2000);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedRes = params.get('res');
    if (sharedRes) {
      try {
        const decoded = JSON.parse(atob(sharedRes));
        setAnswers(decoded);
        setView('result');
      } catch (e) {
        console.error("Invalid share link", e);
      }
    }
  }, []);

  useEffect(() => {
    if (view === 'result') {
      const duration = 4 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA']
        });
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA']
        });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [view]);

  const handleAnswer = () => {
    if (selectedOption === null) return;

    const dimension = QUESTIONS[currentIdx].dimension;
    setAnswers(prev => ({
      ...prev,
      [dimension]: [...(prev[dimension] || []), selectedOption]
    }));

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setView('result');
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setAnswers({});
    setSelectedOption(null);
    setView('home');
    // Clear URL params
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const userProfile = useMemo(() => {
    const profile: Record<string, number> = {};
    Object.keys(WEIGHTS).forEach(dim => {
      const vals = answers[dim] || [];
      if (vals.length > 0) {
        profile[dim] = vals.reduce((a, b) => a + b) / vals.length;
      } else {
        profile[dim] = 3;
      }
    });
    return profile;
  }, [answers]);

  const allScores = useMemo(() => {
    if (view !== 'result') return [];
    
    const scores = PET_DATASET.map(pet => {
      let diffSum = 0;
      (Object.keys(WEIGHTS) as (keyof typeof WEIGHTS)[]).forEach(dim => {
        const userVal = userProfile[dim];
        const petVal = pet[dim];
        diffSum += Math.abs(userVal - petVal) * WEIGHTS[dim];
      });
      
      const score = Math.round(Math.max(0, 100 - diffSum));
      return { 
        id: pet.pet, 
        score,
        details: PET_DETAILS[pet.pet]
      };
    });

    return scores.sort((a, b) => b.score - a.score);
  }, [userProfile, view]);

  const bestMatch = allScores.length > 0 ? allScores[0].id : null;
  const matchScore = allScores.length > 0 ? allScores[0].score : 0;

  const [copied, setCopied] = useState(false);

  const shareResult = () => {
    const stateString = btoa(JSON.stringify(answers));
    const url = `${window.location.origin}${window.location.pathname}?res=${stateString}`;
    navigator.clipboard.writeText(`ฉันเหมาะกับสัตว์เลี้ยงแบบ ${bestMatch ? PET_DETAILS[bestMatch].name : '...'}! ลองมาทำควิซหา "PawSona" ของคุณได้ที่นี่: ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const PetIcon = ({ pet, size = 'md' }: { pet: typeof PET_DETAILS[string], size?: 'sm' | 'md' | 'lg' }) => {
    const isEmoji = !pet.image.startsWith('http') && !pet.image.startsWith('/') && !pet.image.includes('.');
    const [imgError, setImgError] = useState(false);
    
    const sizeClasses = {
      sm: 'w-10 h-10 text-xl rounded-xl',
      md: 'w-16 h-16 md:w-20 md:h-20 text-3xl md:text-4xl rounded-[24px]',
      lg: 'w-36 h-36 md:w-48 md:h-48 lg:w-52 lg:h-52 text-6xl md:text-8xl rounded-[32px]'
    };

    return (
      <div className={`relative ${sizeClasses[size]} ${pet.iconBg} border-4 border-deep-gray flex items-center justify-center shadow-sm overflow-hidden shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/30 pointer-events-none z-10" />
        {(isEmoji || imgError) ? (
          <span className="drop-shadow-2xl z-10 filter transition-transform group-hover:scale-110 select-none">
            {pet.emoji || '🐾'}
          </span>
        ) : (
          <img 
            src={pet.image} 
            alt={pet.label}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/5 to-transparent z-0" />
      </div>
    );
  };

  const HeartPop = () => {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.5, 30], 
          opacity: [0, 1, 1],
        }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        className="absolute pointer-events-none text-primary-pastel"
        style={{ 
          left: transitionPos.x, 
          top: transitionPos.y,
          transform: 'translate(-50%, -50%)',
          zIndex: 10000
        }}
      >
        <Heart size={80} fill="currentColor" strokeWidth={0} className="drop-shadow-[0_0_30px_rgba(255,154,162,0.5)]" />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-bg-warm text-deep-gray font-sans selection:bg-primary-pastel cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {showPawTransition && <PawTransition />}
      </AnimatePresence>
      
      {view === 'home' ? (
        <CafeLanding onStart={startQuiz} />
      ) : (
        <>
          <PetPatternBackground />
          <HeartTrail />
          <div className="max-w-4xl mx-auto px-4 py-6 md:py-12 relative z-10">
            
            {/* Navigation / Header */}
            <header className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="bg-primary-pastel p-1.5 rounded-lg border-2 border-deep-gray shadow-sm">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">VERSION 0.0.1 NAJA</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setView('about')}
                  className="p-2 border-2 border-deep-gray rounded-full bg-white hover:bg-bg-warm transition-colors"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </header>

            <AnimatePresence mode="wait">
              {/* Note: view === 'home' Case removed here as it's handled above */}

          {view === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 pb-24"
            >
              <div className="flex items-center justify-between font-bold text-sm uppercase tracking-widest px-2">
                <button onClick={resetQuiz} className="flex items-center gap-1 hover:text-primary-pastel transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back to Home
                </button>
                <span className="bg-white border-2 border-deep-gray px-3 py-1 rounded-full shadow-sm">
                  ข้อ {currentIdx + 1} / {QUESTIONS.length}
                </span>
                <div className="w-32 bg-white h-4 rounded-full border-2 border-deep-gray overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="h-full bg-accent-pastel border-r-2 border-deep-gray" 
                   />
                </div>
              </div>

              <div className="bento-card p-8 md:p-12 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-10"
                  >
                    <h2 className="text-3xl md:text-5xl font-bold relative z-10 leading-tight">
                      {QUESTIONS[currentIdx].text}
                    </h2>
                    
                    <motion.div 
                      className="grid gap-4 relative z-10"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.08
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      {QUESTIONS[currentIdx].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            show: { opacity: 1, y: 0 }
                          }}
                          whileHover={{ scale: 1.01, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedOption(opt.value)}
                          className={`p-6 text-left border-4 rounded-2xl font-bold text-lg md:text-xl transition-all flex items-center gap-4 ${
                            selectedOption === opt.value 
                            ? 'bg-primary-pastel border-deep-gray shadow-sm translate-y-0' 
                            : 'bg-white border-deep-gray/10 hover:border-deep-gray hover:bg-bg-warm shadow-sm hover:translate-y-0'
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-deep-gray shadow-sm text-sm shrink-0 ${selectedOption === opt.value ? 'bg-white' : 'bg-highlight-pastel'}`}>
                            {i + 1}
                          </span>
                          {opt.text}
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="fixed bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-bg-warm via-bg-warm/95 to-transparent z-20 flex justify-center">
                <motion.button
                  layout
                  disabled={selectedOption === null}
                  onClick={handleAnswer}
                  className={`bento-button text-xl px-20 py-4 transition-all duration-300 ${selectedOption === null ? 'opacity-50 grayscale cursor-not-allowed shadow-none active:translate-y-0 translate-y-0' : 'hover:scale-105 active:scale-95'}`}
                >
                  ถัดไป <ArrowRight className="inline-block ml-1" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {view === 'result' && bestMatch && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pb-20 max-w-2xl mx-auto"
            >
              {/* Header Badges */}
              <div className="flex justify-between items-center px-4">
                <div className="bg-[#FFC1CC] text-[#D81B60] px-4 py-1.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm">
                   <Trophy className="w-4 h-4" /> Best Match
                </div>
                <div className="bg-[#D1FAE5] text-[#059669] px-4 py-1.5 rounded-full font-bold text-sm shadow-sm">
                   คะแนน {matchScore}/100
                </div>
              </div>

              {/* Main Result Card */}
              <div className="bento-card p-8 md:p-12 bg-gradient-to-br from-white to-[#FFF5F7] shadow-sm relative overflow-hidden">
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-3 space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
                    <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">คุณคือสาย...</p>
                    <div className="space-y-0 w-full">
                      <h2 className="text-[48px] sm:text-[59px] font-black text-deep-gray tracking-tighter leading-tight md:leading-none">
                        น้อง{PET_DETAILS[bestMatch].label}
                      </h2>
                      <h3 className="text-[40px] sm:text-[52px] font-black text-deep-gray tracking-tighter opacity-90 leading-tight md:leading-none">
                        ({bestMatch})
                      </h3>
                    </div>
                    <div className="mt-6 border-t-4 md:border-t-0 md:border-l-4 border-pink-100 pt-4 md:pt-0 md:pl-4 w-full flex flex-col items-center md:items-start">
                      <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">สายพันธุ์ที่แนะนำ</p>
                      <p className="text-deep-gray font-black text-xl">
                        {PET_DETAILS[bestMatch].breeds}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 relative flex justify-center md:justify-end px-4 md:px-0">
                    <div className="relative w-48 h-48 md:w-52 md:h-52 flex items-center justify-center">
                      {/* Pulsing Aura */}
                      <div className="absolute inset-0 -m-8 bg-primary-pastel/60 blur-[60px] rounded-full animate-pulse" />
                      <motion.div
                        animate={{ 
                          scale: [1, 1.3, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 -m-12 bg-gradient-to-tr from-primary-pastel/40 via-highlight-pastel/50 to-accent-pastel/40 blur-[40px] rounded-full opacity-90"
                      />
                      
                      <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="relative z-10"
                      >
                        <PetIcon pet={PET_DETAILS[bestMatch]} size="lg" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bento-card p-8 bg-[#F0FDF4] shadow-sm">
                  <div className="bg-[#DCFCE7] text-[#166534] px-4 py-1.5 rounded-full text-sm font-black w-fit mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> เหมาะเพราะอะไร
                  </div>
                  <p className="text-gray-600 font-bold leading-relaxed text-lg">
                    {PET_DETAILS[bestMatch].why}
                  </p>
                </div>
                
                <div className="bento-card p-8 bg-[#FFF5F5] shadow-sm">
                  <div className="bg-[#FEE2E2] text-[#991B1B] px-4 py-1.5 rounded-full text-sm font-black w-fit mb-4 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> ต้องระวัง
                  </div>
                  <p className="text-gray-600 font-bold leading-relaxed text-lg">
                    {PET_DETAILS[bestMatch].warning}
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bento-card p-10 bg-white shadow-sm">
                <div className="bg-[#FFE4E6] text-[#9D174D] px-5 py-2 rounded-full text-sm font-black w-fit mb-10 flex items-center gap-2">
                  <PawPrint className="w-4 h-4" /> ข้อแนะนำเริ่มต้น
                </div>
                <div className="space-y-6">
                  {PET_DETAILS[bestMatch].tips.map((tip, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-10 h-10 rounded-full bg-[#FFE4E6] text-[#E11D48] font-black flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110">
                        {i + 1}
                      </div>
                      <p className="font-bold text-gray-700 text-xl">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Rankings */}
              <div className="bento-card p-10 bg-white shadow-sm">
                 <div className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-8 flex items-center gap-2">
                   <Activity className="w-3 h-3" /> อันดับอื่น ๆ
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allScores.slice(1).map((item, i) => {
                      const bgColors = ['bg-[#FFFBF2]', 'bg-[#F8F7FF]', 'bg-[#FFF5F6]', 'bg-[#F2FFF9]', 'bg-[#F2FAFF]'];
                      const bgColor = bgColors[i % bgColors.length];
                      return (
                        <div key={item.id} className={`flex items-center justify-between p-4 ${bgColor} rounded-[24px] border-4 border-deep-gray shadow-sm hover:translate-y-[-2px] transition-all cursor-default group`}>
                          <div className="flex items-center gap-4">
                            <span className="w-10 h-10 rounded-full bg-white border-2 border-deep-gray flex items-center justify-center font-black italic text-sm text-deep-gray shadow-[2px_2px_0px_#2B2B2B] shrink-0">
                              #{i + 2}
                            </span>
                            <PetIcon pet={item.details} size="sm" />
                            <span className="font-black text-deep-gray text-base md:text-lg">น้อง{item.details.label}</span>
                          </div>
                        </div>
                      );
                    })}
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 pt-6">
                <button
                  onClick={resetQuiz}
                  className="px-8 py-4 bg-[#FFC1CC] text-white rounded-full font-black text-lg border-4 border-deep-gray flex items-center gap-2 shadow-sm hover:scale-105 transition-transform"
                >
                  <RotateCcw className="w-5 h-5" /> ทำใหม่
                </button>
                <button
                  onClick={shareResult}
                  className="relative px-10 py-4 bg-[#C1B0FF] text-white rounded-full font-black text-lg border-4 border-deep-gray flex items-center gap-2 shadow-sm hover:scale-105 transition-transform"
                >
                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -40 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex justify-center items-center pointer-events-none"
                      >
                        <span className="bg-deep-gray text-white text-xs py-1 px-3 rounded-full whitespace-nowrap">
                          Copied! ✨
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Share2 className="w-5 h-5" /> {copied ? 'คัดลอกลิงก์แล้ว!' : 'คัดลอกลิงก์ผลลัพธ์'}
                </button>
                <a
                  href="https://www.rspca.org.uk/adviceandwelfare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#B8E2F2] text-white rounded-full font-black text-lg border-4 border-deep-gray flex items-center gap-2 shadow-sm hover:scale-105 transition-transform"
                >
                  <ExternalLink className="w-5 h-5" /> ศึกษาการดูแล
                </a>
                <button
                  onClick={resetQuiz}
                  className="px-8 py-4 bg-white text-gray-400 rounded-full font-black text-lg border-4 border-deep-gray flex items-center gap-2 shadow-sm hover:scale-105 transition-transform"
                >
                  <Home className="w-5 h-5" /> กลับหน้าหลัก
                </button>
              </div>
            </motion.div>
          )}

          {view === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bento-card p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 -m-10 w-40 h-40 bg-secondary-pastel/20 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 -m-10 w-40 h-40 bg-highlight-pastel/20 blur-3xl rounded-full" />
                
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <button onClick={() => setView('home')} className="p-3 border-4 border-deep-gray rounded-full bg-white hover:bg-bg-warm shadow-sm transition-transform hover:scale-105 active:scale-95">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h2 className="text-4xl font-black tracking-tight">เกี่ยวกับ PawSona</h2>
                </div>

                <div className="prose prose-slate max-w-none font-medium text-lg leading-relaxed space-y-6">
                  <div className="bg-bg-warm p-6 rounded-2xl border-2 border-deep-gray">
                    <h3 className="text-xl font-bold mb-2">วิธีคิดคะแนน (The "Wait, Really?" Math)</h3>
                    <p>เราใช้การคำนวณระยะห่างระหว่างจุดโปรไฟล์ของคุณกับค่ามาตรฐานของสัตว์แต่ละชนิดใน 8 มิติ โดยมีการถ่วงน้ำหนักความสำคัญ (Weight) ในมิติที่เป็นหัวใจหลัก เช่น เวลาและการปฏิสัมพันธ์</p>
                    <code className="block mt-4 p-4 bg-white border-2 border-deep-gray rounded-xl font-bold text-primary-pastel">
                      Score = 100 - sum(|User_dim - Pet_dim| * Weight_dim)
                    </code>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">แหล่งข้อมูล & แรงบันดาลใจ</h3>
                    <div className="grid gap-3">
                      {[
                        { name: 'RSPCA Pet Care', url: 'https://www.rspca.org.uk/adviceandwelfare' },
                        { name: 'Shelter Dataset Analysis', url: '/shelter_dataset.csv' }
                      ].map(src => (
                        <a 
                          key={src.name} 
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-white border-2 border-deep-gray rounded-xl hover:translate-x-2 transition-transform cursor-pointer"
                        >
                          <span className="font-bold">{src.name}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t-4 border-deep-gray border-dashed flex flex-col md:flex-row items-center justify-between gap-4 opacity-60">
                   <p className="font-bold">สร้างด้วยความรัก (และการสุ่ม) © 2026</p>
                   <div className="flex gap-4">
                      <a href="#" className="hover:text-primary-pastel transition-colors"><Github className="w-5 h-5" /></a>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )}

      {/* Background Decor */}
      <div className="fixed bottom-4 right-4 opacity-10 pointer-events-none text-xs font-black uppercase z-0">
        Chaotic Pastel Energy 2026
      </div>
    </div>
  );
}
