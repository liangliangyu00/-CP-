import React, { useState, useEffect } from 'react';
import { Actor } from '../types';

interface ActorCardProps {
  actor: Actor | null;
  title: string;
  type: 'gong' | 'shou';
  loading?: boolean;
}

export const ActorCard: React.FC<ActorCardProps> = ({ actor, title, type, loading }) => {
  const isGong = type === 'gong';
  const borderColor = isGong ? 'border-blue-400' : 'border-rose-400';
  const bgColor = isGong ? 'bg-blue-50' : 'bg-rose-50';
  const titleColor = isGong ? 'text-blue-600' : 'text-rose-600';
  const badgeColor = isGong ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800';

  // State to handle image load errors
  const [imgSrc, setImgSrc] = useState<string>('');
  const [imgError, setImgError] = useState(false);

  // Reset state when actor changes
  useEffect(() => {
    if (actor) {
      setImgSrc(actor.photo_url);
      setImgError(false);
    }
  }, [actor]);

  const handleImageError = () => {
    // Prevent infinite loops if fallback also fails
    if (!imgError && actor) {
      setImgError(true);
      // Fallback to a generated avatar based on name if the Search Proxy URL fails
      const color = isGong ? '409eff' : 'f56c6c';
      setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=${color}&color=fff&size=400&font-size=0.33&bold=true`);
    }
  };

  return (
    <div className={`flex flex-col w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden border-2 ${actor ? borderColor : 'border-dashed border-gray-300'} transition-all duration-300`}>
      {/* Header */}
      <div className={`p-4 text-center font-bold text-xl uppercase tracking-wider ${actor ? titleColor : 'text-gray-400'}`}>
        {title}
      </div>

      {/* Image Container */}
      <div className={`relative w-full aspect-[3/4] ${bgColor} flex items-center justify-center overflow-hidden group`}>
        {loading ? (
           <div className="animate-pulse flex flex-col items-center">
             <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-transparent animate-spin mb-4"></div>
             <span className="text-gray-400 font-medium">Matching...</span>
           </div>
        ) : actor ? (
          <img 
            src={imgSrc} 
            alt={actor.name}
            // CRITICAL: prevents sending Referer header, reducing 403 Forbidden errors from external image proxies
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="text-4xl text-gray-300 select-none">?</span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col items-center flex-grow">
        {actor ? (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{actor.name}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {actor.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index} 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="text-gray-400 italic mt-4">等待配对...</div>
        )}
      </div>
    </div>
  );
};