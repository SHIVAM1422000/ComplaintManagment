import { useEffect, useState } from "react";

export default function SentimentGauge({ score }) {
  // Score is 0–1 → convert to 0–100
  const percentage = Math.round(score * 100);

  // Animated needle angle
  const [angle, setAngle] = useState(-90);  // start at left
  
  // Final angle mapping (-90° to 90°)
  const finalAngle = -90 + (percentage * 1.8);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAngle(finalAngle);
    }, 200);
    return () => clearTimeout(timeout);
  }, [percentage]);

  // Colors
  const getColor = () => {
    if (percentage > 60) return "#10b981";   // green
    if (percentage > 30) return "#f59e0b";   // amber
    return "#ef4444";                         // red
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg viewBox="0 0 200 120" className="w-56">
        
        {/* Background semicircle */}
        <path
          d="M10 110 A90 90 0 0 1 190 110"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="15"
        />

        {/* Colored value arc */}
        <path
          d="M10 110 A90 90 0 0 1 190 110"
          fill="none"
          stroke={getColor()}
          strokeWidth="15"
          strokeDasharray={`${percentage * 2.83} 1000`}
          strokeLinecap="round"
        />

        {/* Center circle */}
        <circle cx="100" cy="110" r="6" fill="#374151" />

        {/* Needle */}
        <line
          x1="100"
          y1="110"
          x2="100"
          y2="30"
          stroke="#111827"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: "100px 110px",
            transition: "transform 0.9s cubic-bezier(.4,0,.2,1)"
          }}
        />
      </svg>

      <p className="mt-2 text-xl font-bold">{percentage}%</p>
      <p className="text-sm text-gray-500">Sentiment Score</p>
    </div>
  );
}
