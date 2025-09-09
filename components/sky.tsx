import React from "react";
import { useMain } from "../contexts/MainContext";
import { findSkyGradient, getTimeOfDay } from "../lib/helpers";

interface SkyProps {
  mode?: "day" | "night";
}

const Sky: React.FC<SkyProps> = ({ mode }) => {
  const { regionalTime } = useMain() as { regionalTime: string | null, updatedAt: number };
  const time = regionalTime || "00:00:00";
  const skyGradient = findSkyGradient(time);
  const timeOfDay = mode || getTimeOfDay(time);
  
  return (
    <div
      className="relative w-full h-full overflow-hidden mx-auto shadow-lg"
      style={{ 
        background: skyGradient, 
        transition: "background 600ms ease" 
      }}
    >
      {timeOfDay === "day" ? <SunWithClouds /> : <MoonWithStars />}
    </div>
  );
};

const SunWithClouds = () => (
  <>
    {/* Sun with better glow effect */}
    <div
      className="absolute top-6 left-6 w-[60px] h-[60px] rounded-full
        bg-gradient-to-br from-yellow-200 to-orange-400"
      style={{
        boxShadow: '0 0 40px 15px rgba(255, 215, 0, 0.6), 0 0 80px 25px rgba(255, 165, 0, 0.3)',
      }}
    />
    <Cloud className="top-[80px] left-[20px] scale-110" />
    <Cloud className="top-[100px] left-[120px] scale-95" />
    <Cloud className="top-[60px] left-[180px] scale-100" />
    <Cloud className="top-[130px] left-[60px] scale-85" />
    <Cloud className="top-[90px] left-[250px] scale-90" />
  </>
);

const Cloud: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`relative ${className}`}
    style={{ width: 100, height: 70 }}
  >
    {/* Main cloud body */}
    <div
      className="absolute bg-white rounded-full shadow-lg opacity-90"
      style={{ width: 80, height: 50, top: 10, left: 10 }}
    />
    {/* Cloud puffs */}
    <div
      className="absolute bg-white rounded-full shadow-lg opacity-90"
      style={{ width: 45, height: 45, top: -15, left: 5 }}
    />
    <div
      className="absolute bg-white rounded-full shadow-lg opacity-90"
      style={{ width: 55, height: 55, top: -10, left: 35 }}
    />
    <div
      className="absolute bg-white rounded-full shadow-lg opacity-90"
      style={{ width: 40, height: 40, top: 5, left: 60 }}
    />
    <div
      className="absolute bg-white rounded-full shadow-lg opacity-90"
      style={{ width: 35, height: 35, top: -5, left: 70 }}
    />
  </div>
);

const MoonWithStars = () => (
  <>
    <div
      className="absolute top-[40px] right-[30px] w-[70px] h-[70px] rounded-full
        bg-gradient-to-br from-gray-100 to-gray-300"
      style={{ 
        boxShadow: '0 0 25px 8px rgba(255, 255, 255, 0.3), 0 0 50px 15px rgba(255, 255, 255, 0.1)',
        mask: 'radial-gradient(circle at 70% 50%, transparent 50%, black 50%)',
        WebkitMask: 'radial-gradient(circle at 70% 50%, transparent 50%, black 50%)'
      }}
    />

    {/* More stars with better positioning */}
    <Star className="top-[10%] left-[15%] w-1 h-1" delay="0s" />
    <Star className="top-[20%] left-[35%] w-1.5 h-1.5" delay="0.8s" />
    <Star className="top-[8%] left-[60%] w-1.25 h-1.25" delay="1.5s" />
    <Star className="top-[25%] left-[75%] w-1.75 h-1.75" delay="0.3s" />
    <Star className="top-[15%] left-[85%] w-1 h-1" delay="2.1s" />
    <Star className="top-[35%] left-[25%] w-1.5 h-1.5" delay="1.2s" />
    <Star className="top-[30%] left-[50%] w-1.25 h-1.25" delay="0.6s" />
    <Star className="top-[40%] left-[80%] w-1 h-1" delay="1.8s" />
    <Star className="top-[45%] left-[10%] w-1.75 h-1.75" delay="0.9s" />
    <Star className="top-[50%] left-[65%] w-1.5 h-1.5" delay="2.4s" />
  </>
);

const Star: React.FC<{ className?: string; delay?: string }> = ({
  className = "",
  delay = "0s",
}) => (
  <div
    className={`absolute bg-white rounded-full ${className}`}
    style={{ 
      animationDelay: delay, 
      boxShadow: "0 0 6px 1px rgba(255, 255, 255, 0.8), 0 0 12px 2px rgba(255, 255, 255, 0.4)",
      opacity: 0.9,
      animation: "twinkle 3s ease-in-out infinite"
    }}
  />
);

export default Sky;
