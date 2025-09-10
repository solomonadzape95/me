import React, { useState } from 'react';
import { useMain } from '../contexts/MainContext';

interface ShuttersProps {
  children: React.ReactNode;
  shutterColor?: string;
  slatsCount?: number;
  animationDuration?: string;
  className?: string;
}

export const Shutters: React.FC<ShuttersProps> = ({
  children,
  shutterColor = '#8B4513',
  slatsCount = 12,
  animationDuration = '800ms',
  className = ''
}) => {
  const { setWindowOpen, isWindowOpen } = useMain() as { setWindowOpen: (open: boolean) => void ; isWindowOpen: boolean};
  const [isOpen, setIsOpen] = useState(isWindowOpen);

  const handleClick = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    setWindowOpen(newState);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Content underneath */}
      <div className="w-full h-full">
        {children}
      </div>
      
      {/* Clickable overlay for closing when shutters are open */}
      {isOpen && (
        <div 
          className="absolute inset-0 cursor-pointer bg-transparent group"
          onClick={handleClick}
        >
          {/* Tooltip */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            Click to close
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </div>
        </div>
      )}
      
      {/* Shutters overlay */}
      <div 
        className={`absolute inset-0 cursor-pointer transition-transform duration-${animationDuration} ease-out ${
          isOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
        onClick={handleClick}
        style={{ 
          transitionDuration: animationDuration,
          background: `linear-gradient(180deg, ${shutterColor} 0%, #654321 50%, ${shutterColor} 100%)`
        }}
      >
        {/* Individual slats */}
        <div className="h-full flex flex-col">
          {Array.from({ length: slatsCount }).map((_, index) => (
            <div
              key={index}
              className="flex-1 border-b border-black/20 relative"
              style={{
                background: `linear-gradient(90deg, 
                  ${shutterColor}dd 0%, 
                  ${shutterColor} 30%, 
                  ${shutterColor}aa 50%, 
                  ${shutterColor} 70%, 
                  ${shutterColor}dd 100%)`
              }}
            >
              {/* Slat highlight */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
              
              {/* Slat shadow */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-black/30 via-black/10 to-black/30"
              />
              
              {/* Text on middle slat */}
              {index === Math.floor(slatsCount / 2) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/80 text-sm font-medium tracking-wide drop-shadow-lg">
                    Take a look outside my window
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Click hint overlay */}
        <div className="absolute inset-0 bg-transparent group flex items-center justify-center">
          {/* Tooltip */}
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-2 rounded-lg transition-opacity duration-300 pointer-events-none whitespace-nowrap ${
            isOpen ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
          }`}>
            Click to open
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </div>
        </div>
      </div>
    </div>
  );
};