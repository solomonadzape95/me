import React, { useState } from 'react';

interface ColorSwatch {
  name: string;
  color: string;
  label: string;
  description: string;
}

// Utility to calculate luminance and contrast ratio
function getLuminance(hex: string) {
  // Remove hash if present
  hex = hex.replace('#', '');
  // Expand shorthand
  if (hex.length === 3) {
    hex = hex.split('').map((c) => c + c).join('');
  }
  const rgb = [
    parseInt(hex.substring(0, 2), 16) / 255,
    parseInt(hex.substring(2, 4), 16) / 255,
    parseInt(hex.substring(4, 6), 16) / 255,
  ].map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function getContrastColor(bgColor: string) {
  // Returns either black or white depending on contrast
  const luminance = getLuminance(bgColor);
  // Contrast ratio with white and black
  const whiteContrast = (1.05) / (luminance + 0.05);
  const blackContrast = (luminance + 0.05) / 0.05;
  // Use white if contrast is better, else black
  return whiteContrast > blackContrast ? '#fff' : '#171616';
}

const colorSwatches: ColorSwatch[] = [
  // Background colors
  { name: 'bg-primary', color: '#171616', label: 'bg', description: 'Primary background (dark theme)' },
  { name: 'bg-footer', color: '#131313', label: 'bg-2', description: 'Secondary background (footer)' },
  { name: 'bg-light', color: '#1b1b1b', label: 'bg-3', description: 'Light theme background' },
  
  // Text colors
  { name: 'accent-white', color: '#ffffff', label: 'txt', description: 'Pure white' },
  { name: 'text-gray', color: '#9ca3af', label: 'txt-2', description: 'Secondary text & borders' },
  
  // Border colors
  { name: 'border-subtle', color: 'rgba(249, 250, 251, 0.2)', label: 'txt-3', description: 'Subtle borders' }
  
  // Accent colors
  ,{ name: 'text-primary', color: '#ededed', label: 'txt-4', description: 'Primary text (dark theme)' },
  { name: 'magnets-red', color: 'rgb(255, 100, 100)', label: 'red', description: 'Magnets close distance' },
  { name: 'magnets-blue', color: 'rgb(100, 100, 255)', label: 'blue', description: 'Magnets far distance' },
];

export default function ColorPalette() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (color: string, name: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(name);
      setTimeout(() => setCopied(null), 1500);
    } catch (e) {
      // fallback: do nothing
      console.log(e)
    }
  };

  return (
    <div className="bg-transparent flex items-center justify-center flex-wrap gap-0 mx-auto lg:mx-0 w-auto">
      {colorSwatches.map((swatch) => {
        const textColor = getContrastColor(swatch.color);
        return (
          <div
            key={swatch.name}
            className=""
          >
            <button
              type="button"
              className="w-12 h-8 lg:w-16 xl:w-20 xl:h-10 shadow-lg grid place-content-center transition-all duration-150 outline-none border-collapse border border-gray-50/50"
              style={{ backgroundColor: swatch.color, cursor: 'pointer' }}
              title={`${swatch.description} - Click to copy: ${swatch.color}`}
              onClick={() => handleCopy(swatch.color, swatch.name)}
            >
              <span
                className="text-[10px] lg:text-md font-mono px-2 py-1 rounded select-none transition-colors duration-150"
                style={{
                  color: textColor,
                  background: 'transparent',
                }}
              >
                {copied === swatch.name ? swatch.color : swatch.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
