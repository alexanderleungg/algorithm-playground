// src/components/Visualizer.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Step } from "../types";

type Props = {
  steps: Step[];
};

export default function Visualizer({ steps }: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(500);
  const [showLabels, setShowLabels] = useState(true);

  // reset on new run
  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [steps]);

  const last = Math.max(0, steps.length - 1);
  useEffect(() => {
    if (index > last) setIndex(last);
  }, [index, last]);

  // autoplay
  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!playing || steps.length === 0) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => {
        if (i >= last) {
          window.clearInterval(timerRef.current!);
          return last;
        }
        return i + 1;
      });
    }, speedMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing, speedMs, last, steps.length]);

  const cur = steps[index];
  const arr = cur?.array ?? [];
  const prevArr = steps[index - 1]?.array ?? [];
  const max = useMemo(() => Math.max(1, ...arr), [arr]);

  // Build explicit active indices from common step keys, if present
  const explicitActive = new Set<number>();
  for (const k of ["i", "j", "k", "p", "q", "left", "right", "mid"]) {
    const v = (cur as any)?.[k];
    if (typeof v === "number" && Number.isFinite(v)) explicitActive.add(v);
  }

  // Fallback: highlight indices whose values changed since previous frame
  const changed = new Set<number>();
  if (index > 0) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== prevArr[i]) changed.add(i);
    }
  }
  const useChangedFallback = explicitActive.size === 0 && index > 0;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(last, i + 1));
  const togglePlay = () => setPlaying((p) => !p);

  if (!steps || steps.length === 0) {
    return (
      <div className="flex items-center justify-center h-[28rem] text-gray-500">
        Please run an algorithm to see the visualization
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bars */}
      <div className="h-64 pt-6 pb-6">
        <div className="h-full flex items-end gap-2 overflow-visible">
          {arr.map((v, i) => {
            const isActive = useChangedFallback ? changed.has(i) : explicitActive.has(i);
            const barColor = isActive ? "bg-red-400" : "bg-blue-400";
            return (
              <div key={i} className="relative flex-1 min-w-[14px] h-full">
                <div
                  className={`w-full rounded-t ${barColor} transition-[height] duration-150`}
                  style={{ height: `${(v / max) * 100}%` }}
                  aria-label={`Index ${i}, value ${v}`}
                  title={`i=${i} • ${v}`}
                />
                {showLabels && (
                  <>
                    {/* value above */}
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-medium text-gray-700 select-none">
                      {v}
                    </span>
                    {/* index below */}
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 select-none">
                      i={i}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step info */}
      <div className="text-center text-sm text-gray-600">
        Step {index + 1} of {steps.length}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={prev}
          disabled={index === 0}
          className={`px-3 py-1 rounded border text-sm ${
            index === 0 ? "bg-gray-100 text-gray-400" : "bg-white hover:bg-gray-50"
          }`}
        >
          Prev
        </button>
        <button
          onClick={togglePlay}
          disabled={index >= last}
          className={`px-3 py-1 rounded text-sm text-white ${
            index >= last
              ? "bg-gray-300"
              : playing
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={next}
          disabled={index >= last}
          className={`px-3 py-1 rounded border text-sm ${
            index >= last ? "bg-gray-100 text-gray-400" : "bg-white hover:bg-gray-50"
          }`}
        >
          Next
        </button>
      </div>

      {/* Speed */}
      <div className="flex items-center gap-3 px-6">
        <div className="text-sm text-gray-700 w-16">Speed:</div>
        <input
          type="range"
          min={50}
          max={1500}
          step={25}
          value={speedMs}
          onChange={(e) => setSpeedMs(parseInt(e.target.value, 10))}
          className="flex-1"
        />
        <div className="text-sm text-gray-600 w-16 text-right">{speedMs} ms</div>
      </div>

      {/* Frame slider */}
      <div className="flex items-center gap-3 px-6">
        <div className="text-sm text-gray-700 w-16">Frame:</div>
        <input
          type="range"
          min={1}
          max={steps.length}
          step={1}
          value={index + 1}
          onChange={(e) => setIndex(parseInt(e.target.value, 10) - 1)}
          className="flex-1"
        />
        <div className="text-sm text-gray-600 w-16 text-right">
          {index + 1}/{steps.length}
        </div>
      </div>

      {/* Label toggle */}
      <div className="flex items-center justify-center gap-2">
        <input
          id="toggle-labels"
          type="checkbox"
          checked={showLabels}
          onChange={(e) => setShowLabels(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="toggle-labels" className="text-sm text-gray-700">
          Show value/index labels
        </label>
      </div>
    </div>
  );
}
