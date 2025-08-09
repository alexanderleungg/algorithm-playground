// src/components/AlgorithmSelector.tsx
import React from "react";
import type { Algorithm } from "../types";

export function AlgorithmSelector({
  options,
  selected,
  onChange,
}: {
  options: Algorithm[];
  selected: Algorithm;
  onChange: (a: Algorithm) => void;
}) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value as Algorithm)}
      // key bits: make it block-level and full width with comfy padding/line-height
      className="block w-full rounded-lg border px-3 py-2 text-sm leading-normal focus:outline-none focus:ring focus:border-blue-400"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
export default AlgorithmSelector;

