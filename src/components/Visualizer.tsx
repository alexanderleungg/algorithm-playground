import React, { useState, useEffect } from 'react';
import type { Step } from '../types';

interface VisualizerProps {
  steps: Step[];
}

export const Visualizer: React.FC<VisualizerProps> = ({ steps }) => {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(500);

  // Whenever we get a new steps array, reset index & play state
  useEffect(() => {
    setCurrent(0);
    setPlaying(true);
  }, [steps]);

  // Auto‐advance when playing
  useEffect(() => {
    if (!playing || steps.length === 0) return;
    const iv = setInterval(() => {
      setCurrent(c => (c + 1 < steps.length ? c + 1 : c));
    }, speed);
    return () => clearInterval(iv);
  }, [playing, steps, speed]);

  // If no frames yet, show a placeholder
  if (steps.length === 0) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center text-gray-500">
        <p>Please run an algorithm to see the visualization</p>
      </div>
    );
  }

  const { array, highlight } = steps[current];

  return (
    <div className="flex-1 p-4 flex flex-col">
      {/* Bar‐chart display */}
      <div className="flex items-end h-48 space-x-1 px-4">
        {array.map((val, idx) => {
          const max = Math.max(...array, 1);
          const h = (val / max) * 100;
          return (
            <div
              key={idx}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded ${
                highlight?.includes(idx) ? 'bg-red-400' : 'bg-blue-400'
              }`}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-col items-center space-y-4">
        {/* Step Counter */}
        <div className="text-sm text-gray-500">
          Step {current + 1} of {steps.length}
        </div>

        {/* Prev / Play‐Pause / Next */}
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrent(c => Math.max(0, c - 1))}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPlaying(p => !p)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => setCurrent(c => Math.min(steps.length - 1, c + 1))}
            disabled={current >= steps.length - 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center space-x-2">
          <label className="text-sm">Speed:</label>
          <input
            type="range"
            min={100}
            max={2000}
            step={100}
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            className="w-48"
          />
          <span className="text-sm">{speed} ms</span>
        </div>

        {/* Frame Slider */}
        <div className="flex items-center space-x-2">
          <label className="text-sm">Frame:</label>
          <input
            type="range"
            min={1}
            max={steps.length}
            value={current + 1}
            onChange={e => setCurrent(Number(e.target.value) - 1)}
            className="w-64"
          />
          <span className="text-sm">
            {current + 1}/{steps.length}
          </span>
        </div>
      </div>
    </div>
  );
};
