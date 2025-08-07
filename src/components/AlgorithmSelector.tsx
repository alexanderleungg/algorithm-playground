import React from 'react';
import type { Algorithm } from '../types';

interface AlgorithmSelectorProps {
  options: Algorithm[];
  selected: Algorithm;
  onChange: (algo: Algorithm) => void;
}

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ options, selected, onChange }) => (
  <div className="w-full md:w-1/4 p-4">
    <label className="block text-sm font-medium mb-2">Choose Algorithm</label>
    <select
      className="block w-full rounded border-gray-300 focus:outline-none focus:ring focus:border-blue-300 p-2"
      value={selected}
      onChange={e => onChange(e.target.value as Algorithm)}
    >
      {options.map(algo => (
        <option key={algo} value={algo}>
          {algo}
        </option>
      ))}
    </select>
  </div>
);
