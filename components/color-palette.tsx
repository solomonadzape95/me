import React, { useState } from 'react';

interface ColorSwatch {
  name: string;
  color: string;
  label: string;
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
  { name: 'bg', color: '#171616', label: 'bg' },
  { name: 'bg-2', color: '#2a2a2a', label: 'bg-2' },
  { name: 'bg-3', color: '#3d3d3d', label: 'bg-3' },
  { name: 'txt-3', color: '#4a5568', label: 'txt-3' },
  { name: 'txt-2', color: '#718096', label: 'txt-2' },
  { name: 'txt', color: '#e2e8f0', label: 'txt' },
  { name: 'txt-0', color: '#f7fafc', label: 'txt-0' },
  { name: 'pink', color: '#ec4899', label: 'pink' },
  { name: 'purple', color: '#8b5cf6', label: 'purple' },
  { name: 'blue', color: '#06b6d4', label: 'blue' },
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
    }
  };

  return (
    <div className="bg-transparent flex items-center justify-center flex-wrap lg:grid lg:grid-cols-10 gap-0 mx-auto lg:mx-0 w-auto ">
      {colorSwatches.map((swatch) => {
        const textColor = getContrastColor(swatch.color);
        return (
          <div
            key={swatch.name}
            className=""  
          >
            <button
              type="button"
              className="w-12 h-8 lg:w-16  xl:w-20 xl:h-10 shadow-lg grid place-content-center transition-all duration-150 outline-none border-collapse border border-gray-50/50"
              style={{ backgroundColor: swatch.color, cursor: 'pointer' }}
              title={`Click to copy: ${swatch.color}`}
              onClick={() => handleCopy(swatch.color, swatch.name)}
            >
              <span
                className="text-xs lg:text-md font-mono px-2 py-1 rounded select-none transition-colors duration-150"
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
