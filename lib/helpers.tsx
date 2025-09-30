function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
  
  function lerpColor(c1: string, c2: string, t: number) {
    const toRgb = (hex: string) => {
      const h = hex.replace('#', '');
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      return { r, g, b };
    };
    
    const a = toRgb(c1);
    const b = toRgb(c2);
    const r = Math.round(lerp(a.r, b.r, t));
    const g = Math.round(lerp(a.g, b.g, t));
    const bl = Math.round(lerp(a.b, b.b, t));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
  }
  
  // Interpolate between two gradients
  function lerpGradient(grad1: { top: string, bottom: string }, grad2: { top: string, bottom: string }, t: number) {
    return {
      top: lerpColor(grad1.top, grad2.top, t),
      bottom: lerpColor(grad1.bottom, grad2.bottom, t)
    };
  }
  
  // UPDATED: Map hours to gradient stops (top -> bottom of sky)
  function gradientFromHour(hour: number) {
    // Normalize hour to 0-24 range
    const h = ((hour % 24) + 24) % 24;
    
    // Define time-based gradient stops (hour -> {top, bottom})
    const stops = [
      { h: 0, gradient: { top: '#000814', bottom: '#1a1a2e' } },   // midnight - deep night
      { h: 4, gradient: { top: '#000814', bottom: '#1a1a2e' } },   // deep night continues
      { h: 5, gradient: { top: '#1e3a5f', bottom: '#0f1419' } },   // pre-dawn - dark blue to black
      { h: 6, gradient: { top: '#ff7b54', bottom: '#ffb07a' } },   // sunrise - orange to warm orange
      { h: 7, gradient: { top: '#ffcb8e', bottom: '#ffe4b5' } },   // early morning - warm yellow to cream
      { h: 9, gradient: { top: '#87ceeb', bottom: '#b6e5d8' } },   // morning - sky blue to light blue
      { h: 12, gradient: { top: '#4a90e2', bottom: '#87ceeb' } }, // noon - bright blue to sky blue
      { h: 15, gradient: { top: '#4a90e2', bottom: '#87ceeb' } }, // afternoon - maintaining bright blue
      { h: 17, gradient: { top: '#ffb347', bottom: '#ffd700' } }, // late afternoon - warm gold
      { h: 18, gradient: { top: '#ff8c42', bottom: '#ffb347' } }, // sunset - orange to gold
      { h: 19, gradient: { top: '#ff6b35', bottom: '#ff8c69' } }, // sunset peak - red-orange
      { h: 20, gradient: { top: '#4a148c', bottom: '#7b1fa2' } }, // dusk - purple tones
      { h: 21, gradient: { top: '#1a1a2e', bottom: '#16213e' } }, // early night - dark blue
      { h: 24, gradient: { top: '#000814', bottom: '#1a1a2e' } }, // midnight again
    ];
    
    // Find surrounding stops
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i];
      const b = stops[i + 1];
      
      if (h >= a.h && h <= b.h) {
        const t = (h - a.h) / (b.h - a.h);
        return lerpGradient(a.gradient, b.gradient, t);
      }
    }
    
    return stops[stops.length - 1].gradient;
  }
  
  // UPDATED: Return gradient CSS string
  function findSkyGradient(time: string) {
    const [hourStr, minuteStr] = time.split(':');
    const hour = Number(hourStr);
    const minute = Number(minuteStr) || 0;
    
    // Convert to decimal hour for smooth transitions
    const decimalHour = hour + (minute / 60);
    
    const gradient = gradientFromHour(decimalHour);
    return `linear-gradient(to bottom, ${gradient.top}, ${gradient.bottom})`;
  }
  
  // UPDATED: Also return individual colors for more control
  function findSkyColors(time: string) {
    const [hourStr, minuteStr] = time.split(':');
    const hour = Number(hourStr);
    const minute = Number(minuteStr) || 0;
    
    const decimalHour = hour + (minute / 60);
    const gradient = gradientFromHour(decimalHour);
    
    return {
      top: gradient.top,
      bottom: gradient.bottom,
      css: `linear-gradient(to bottom, ${gradient.top}, ${gradient.bottom})`,
      // Tailwind-friendly classes (approximate matches)
      tailwind: getTailwindGradient(gradient)
    };
  }
  
  // Helper to get approximate Tailwind classes
  function getTailwindGradient(gradient: { top: string, bottom: string }) {
    // This is a simplified mapping - you might want to expand this
    const colorMap: { [key: string]: string } = {
      '#000814': 'slate-900',
      '#1a1a2e': 'slate-800', 
      '#1e3a5f': 'blue-900',
      '#ff7b54': 'orange-500',
      '#ffb07a': 'orange-300',
      '#ffcb8e': 'yellow-300',
      '#ffe4b5': 'yellow-100',
      '#87ceeb': 'sky-300',
      '#b6e5d8': 'teal-200',
      '#4a90e2': 'blue-500',
      '#ffb347': 'orange-400',
      '#ffd700': 'yellow-400',
      '#ff8c42': 'orange-500',
      '#ff6b35': 'red-500',
      '#ff8c69': 'red-400',
      '#4a148c': 'purple-800',
      '#7b1fa2': 'purple-700',
      '#16213e': 'slate-800'
    };
    
    const topClass = colorMap[gradient.top] || 'sky-500';
    const bottomClass = colorMap[gradient.bottom] || 'sky-300';
    
    return `bg-gradient-to-b from-${topClass} to-${bottomClass}`;
  }
  
  // Function to determine if it's day or night for your Sky component
  function getTimeOfDay(time: string): "day" | "night" {
    const hour = Number(time.split(":")[0]);
    // Day is roughly 6 AM to 7 PM
    return (hour >= 6 && hour < 19) ? "day" : "night";
  }
  const pageMap = [["/"], ["/about", "/projects", "/blog", "/contact"], ["/about/resume", "/projects/:id", "/blog/:id"]]
  function findDistance(from : string, to:string){
    // console.log(from,to)
    let x = pageMap[1].findIndex(item => to.split("/")[1] == item.split("/")[1]) - pageMap[1].findIndex(item => from.split("/")[1] == item.split("/")[1])
    const y = from == "/" ? (to.split("/").length + 1) - from.split("/").length :to == "/" ? to.split("/").length - (from.split("/").length + 1) : to.split("/").length - from.split("/").length 
    if(from == "/" || to == "/"){
      x = 0
    }
    return [x,y]
   }
  export { 
    findSkyGradient, 
    findSkyColors, 
    getTimeOfDay, 
    gradientFromHour,
    findDistance
  };

