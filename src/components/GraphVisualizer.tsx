// src/components/GraphVisualizer.tsx

import React, { useState, useEffect } from 'react';
import type { GraphStep } from '../types';

interface Props {
  graph: Record<string, string[]>;
  steps: GraphStep[];
}

export const GraphVisualizer: React.FC<Props> = ({ graph, steps }) => {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed]     = useState(500);

  // Reset to step 0 & start playing when we get new steps
  useEffect(() => {
    setCurrent(0);
    setPlaying(true);
  }, [steps]);

  // Auto‐advance while playing
  useEffect(() => {
    if (!playing || steps.length === 0) return;
    const iv = setInterval(() => {
      setCurrent(c => (c + 1 < steps.length ? c + 1 : c));
    }, speed);
    return () => clearInterval(iv);
  }, [playing, speed, steps]);

  // If no frames yet, show placeholder
  if (steps.length === 0) {
    return (
      <div className="p-4 flex-1 flex items-center justify-center text-gray-500">
        <p>Run DFS/BFS to see the graph traversal</p>
      </div>
    );
  }

  const { visited, highlight } = steps[current];

  return (
    <div className="p-4 flex flex-col items-center flex-1">
      {/* Node Row */}
      <div className="flex space-x-4 mb-4">
        {Object.keys(graph).map(node => (
          <div
            key={node}
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${
              node === highlight ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
          >
            {node}
          </div>
        ))}
      </div>

      {/* Visited Order */}
      <div className="text-sm mb-4">Visited: {visited.join(' → ')}</div>

      {/* Playback Controls */}
      <div className="flex flex-col items-center space-y-4 w-full">
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
