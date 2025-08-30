import { useRef, useEffect } from "react";

// Simple arrow component with dynamic styling
const ArrowIcon = ({ opacity = 0.3, color = "rgb(248 250 252)" }) => (
  <svg 
    className="w-4 h-4 lg:w-6 lg:h-6 transition-all duration-300" 
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    style={{ opacity }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function Magnets() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<HTMLDivElement[]>([]);
  const currentAngles = useRef<number[]>([]); // Track current angles to prevent jumping

  // Utility: compute angle between two points
  function getAngle(x1: number, y1: number, x2: number, y2: number) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    return angle * (180 / Math.PI);
  }

  // Utility: find shortest rotation path between two angles
  function getShortestAngle(currentAngle: number, targetAngle: number) {
    let diff = targetAngle - currentAngle;
    
    // Normalize difference to [-180, 180]
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    
    return currentAngle + diff;
  }

  // Utility: calculate distance between two points
  function getDistance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  // Utility: map distance to color intensity
  function getColorIntensity(distance: number, maxDistance: number) {
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    const intensity = Math.max(0.1, 1 - normalizedDistance);
    
    // Create color gradient from blue (far) to red (close)
    const red = Math.round(255 * intensity);
    const blue = Math.round(255 * (1 - intensity));
    const green = Math.round(100 * intensity);
    
    return {
      color: `rgb(${red}, ${green}, ${blue})`,
      opacity: 0.3 + (intensity * 0.7) // opacity from 0.3 to 1.0
    };
  }

  // Set arrows to point toward container center
  function setRestingAngles() {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    arrowRefs.current.forEach((arrow, index) => {
      if (!arrow) return;
      
      const ax = arrow.offsetLeft + arrow.offsetWidth / 2;
      const ay = arrow.offsetTop + arrow.offsetHeight / 2;
      
      const targetAngle = getAngle(ax, ay, centerX, centerY);
      
      // Initialize or update current angle smoothly
      if (currentAngles.current[index] === undefined) {
        currentAngles.current[index] = targetAngle;
      } else {
        currentAngles.current[index] = getShortestAngle(currentAngles.current[index], targetAngle);
      }
      
      arrow.style.transform = `rotate(${currentAngles.current[index]}deg)`;
      
      // Reset color to default
      const arrowIcon = arrow.querySelector('svg');
      if (arrowIcon) {
        arrowIcon.style.stroke = 'rgb(248 250 252)';
        arrowIcon.style.opacity = '0.3';
      }
    });
  }

  useEffect(() => {
    const timer = setTimeout(setRestingAngles, 100);
    
    const handleResize = () => {
      setTimeout(setRestingAngles, 100);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse move: point arrows to mouse position with color intensity
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate maximum possible distance for normalization
    const maxDistance = Math.sqrt(rect.width ** 2 + rect.height ** 2);

    arrowRefs.current.forEach((arrow, index) => {
      if (!arrow) return;
      
      const ax = arrow.offsetLeft + arrow.offsetWidth / 2;
      const ay = arrow.offsetTop + arrow.offsetHeight / 2;
      
      const targetAngle = getAngle(ax, ay, mouseX, mouseY);
      
      // Use shortest path for smooth rotation
      if (currentAngles.current[index] !== undefined) {
        currentAngles.current[index] = getShortestAngle(currentAngles.current[index], targetAngle);
      } else {
        currentAngles.current[index] = targetAngle;
      }
      
      arrow.style.transform = `rotate(${currentAngles.current[index]}deg)`;
      
      // Calculate distance and update color
      const distance = getDistance(ax, ay, mouseX, mouseY);
      const { color, opacity } = getColorIntensity(distance, maxDistance * 0.3);
      
      const arrowIcon = arrow.querySelector('svg');
      if (arrowIcon) {
        arrowIcon.style.stroke = color;
        arrowIcon.style.opacity = opacity.toString();
      }
    });
  }

  // Mouse leave: return to center with smooth transition
  function handleMouseLeave() {
    setRestingAngles();
  }

  return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="grid grid-cols-20 gap-2 justify-items-center items-center border-y-4 border-gray-50/20 border-dashed min-h-[30vh] py-10 relative cursor-none"
      >
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) arrowRefs.current[index] = el;
            }}
            className="transition-transform duration-300 ease-out"
          >
            <ArrowIcon />
          </div>
        ))}
      </div>
      
  );
}