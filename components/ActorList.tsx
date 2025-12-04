
import React, { useState } from 'react';
import { Actor } from '../types';
import { X, Check } from 'lucide-react';

interface ActorListProps {
  isOpen: boolean;
  onClose: () => void;
  gongList: Actor[];
  shouList: Actor[];
  currentGong: Actor | null;
  currentShou: Actor | null;
  onSelectGong: (actor: Actor) => void;
  onSelectShou: (actor: Actor) => void;
}

const ListItem: React.FC<{ 
  actor: Actor; 
  isSelected: boolean; 
  onClick: () => void; 
  colorClass: string; 
}> = ({ actor, isSelected, onClick, colorClass }) => {
  const [imgSrc, setImgSrc] = useState(actor.photo_url);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback avatar
      const bg = colorClass.includes('blue') ? '409eff' : 'f56c6c';
      setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=${bg}&color=fff&size=64&font-size=0.4&bold=true`);
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 border
        ${isSelected 
          ? `bg-white border-${colorClass}-500 shadow-md ring-2 ring-${colorClass}-200` 
          : 'bg-white/50 border-transparent hover:bg-white hover:shadow-sm'
        }
      `}
    >
      <div className="relative w-12 h-12 flex-shrink-0">
        <img 
          src={imgSrc} 
          alt={actor.name}
          referrerPolicy="no-referrer"
          onError={handleError}
          className="w-full h-full object-cover rounded-full bg-gray-200"
        />
        {isSelected && (
          <div className={`absolute -bottom-1 -right-1 bg-${colorClass}-500 text-white rounded-full p-0.5 shadow-sm`}>
            <Check size={12} strokeWidth={3} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-bold text-sm truncate ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
          {actor.name}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {actor.tags[0]}
        </p>
      </div>
    </div>
  );
};

export const ActorList: React.FC<ActorListProps> = ({ 
  isOpen, onClose, gongList, shouList, currentGong, currentShou, onSelectGong, onSelectShou 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📖 演员名册 <span className="text-sm font-normal text-gray-400">Roster Selection</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Gong Column */}
          <div className="flex-1 flex flex-col bg-blue-50/30 border-r border-blue-100">
            <div className="px-4 py-3 bg-blue-100/50 text-blue-800 font-bold text-sm uppercase tracking-wider sticky top-0 z-10 backdrop-blur-sm">
              攻方 (Alpha) - {gongList.length}人
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {gongList.map(actor => (
                <ListItem 
                  key={actor.name}
                  actor={actor}
                  isSelected={currentGong?.name === actor.name}
                  onClick={() => onSelectGong(actor)}
                  colorClass="blue"
                />
              ))}
            </div>
          </div>

          {/* Shou Column */}
          <div className="flex-1 flex flex-col bg-rose-50/30">
            <div className="px-4 py-3 bg-rose-100/50 text-rose-800 font-bold text-sm uppercase tracking-wider sticky top-0 z-10 backdrop-blur-sm">
              受方 (Omega) - {shouList.length}人
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {shouList.map(actor => (
                <ListItem 
                  key={actor.name}
                  actor={actor}
                  isSelected={currentShou?.name === actor.name}
                  onClick={() => onSelectShou(actor)}
                  colorClass="rose"
                />
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-500">
          点击列表头像直接选择 / Click to select
        </div>
      </div>
    </div>
  );
};
