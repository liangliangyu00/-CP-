
import React, { useState, useMemo, useCallback } from 'react';
import { ACTOR_DATA } from './constants';
import { Actor } from './types';
import { ActorCard } from './components/ActorCard';
import { ActorList } from './components/ActorList';
import { Heart, RefreshCw, Users } from 'lucide-react';

const App: React.FC = () => {
  // Independent state for flexible manual selection
  const [selectedGong, setSelectedGong] = useState<Actor | null>(null);
  const [selectedShou, setSelectedShou] = useState<Actor | null>(null);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRosterOpen, setIsRosterOpen] = useState(false);

  // Separate data into lists once on load
  const { gongList, shouList } = useMemo(() => {
    return {
      gongList: ACTOR_DATA.filter(a => a.role_type === 'gong'),
      shouList: ACTOR_DATA.filter(a => a.role_type === 'shou')
    };
  }, []);

  const handleRandomPairing = useCallback(() => {
    if (gongList.length === 0 || shouList.length === 0) {
      alert("Insufficient data to generate a pair.");
      return;
    }

    setIsAnimating(true);
    // Visual reset
    setSelectedGong(null);
    setSelectedShou(null);

    // Simulate a brief "shuffling" delay for better UX
    setTimeout(() => {
      const randomGongIndex = Math.floor(Math.random() * gongList.length);
      const randomShouIndex = Math.floor(Math.random() * shouList.length);

      setSelectedGong(gongList[randomGongIndex]);
      setSelectedShou(shouList[randomShouIndex]);
      setIsAnimating(false);
    }, 600);
  }, [gongList, shouList]);

  const hasPair = selectedGong && selectedShou;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4 flex flex-col items-center">
      
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-rose-500 mb-4 drop-shadow-sm">
          社群标签驱动 CP 生成器
        </h1>
        <p className="text-slate-500 text-lg">
          Social Tag-Driven Pairing Generator
        </p>
      </header>

      {/* Main Display Area */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-10 mb-12">
        
        {/* Gong / Alpha Side */}
        <div className="flex-1 flex justify-center">
          <ActorCard 
            actor={selectedGong} 
            title="攻方 (Alpha)" 
            type="gong"
            loading={isAnimating}
          />
        </div>

        {/* Center VS/Icon */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative">
            <div className={`p-4 rounded-full bg-white shadow-xl text-pink-500 transition-all duration-500 ${hasPair ? 'scale-110' : 'scale-100 grayscale'}`}>
              <Heart size={48} fill={hasPair ? "currentColor" : "none"} strokeWidth={2} />
            </div>
            {hasPair && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                 <span className="bg-gradient-to-r from-blue-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm animate-bounce">
                   MATCHED
                 </span>
              </div>
            )}
          </div>
        </div>

        {/* Shou / Omega Side */}
        <div className="flex-1 flex justify-center">
          <ActorCard 
            actor={selectedShou} 
            title="受方 (Omega)" 
            type="shou"
            loading={isAnimating}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-8 z-10 flex gap-4">
        {/* Roster Button */}
        <button
          onClick={() => setIsRosterOpen(true)}
          disabled={isAnimating}
          className="
            px-6 py-4 rounded-full text-lg font-bold text-slate-700 bg-white shadow-xl 
            hover:bg-slate-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
            flex items-center gap-2 border border-slate-100
          "
        >
          <Users size={24} />
          <span>名册 (Roster)</span>
        </button>

        {/* Random Button */}
        <button
          onClick={handleRandomPairing}
          disabled={isAnimating}
          className={`
            group relative px-8 py-4 rounded-full text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
            ${isAnimating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-rose-500 hover:from-blue-600 hover:to-rose-600'}
          `}
        >
          <span className="flex items-center gap-3">
             <RefreshCw className={`w-6 h-6 ${isAnimating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
             {isAnimating ? '正在匹配...' : '随机拉郎 (Random)'}
          </span>
        </button>
      </div>

      {/* Roster Modal/Overlay */}
      <ActorList 
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        gongList={gongList}
        shouList={shouList}
        currentGong={selectedGong}
        currentShou={selectedShou}
        onSelectGong={(actor) => {
          setSelectedGong(actor);
          // Optional: Don't close immediately to allow selecting the other side
        }}
        onSelectShou={(actor) => {
          setSelectedShou(actor);
        }}
      />

      {/* Instructions / Footer */}
      <footer className="mt-auto pt-10 text-slate-400 text-sm text-center max-w-lg">
        <p>Data is loaded locally based on predefined role types.</p>
        <p className="mt-2">© {new Date().getFullYear()} CP Generator. Just for fun.</p>
      </footer>

    </div>
  );
};

export default App;
