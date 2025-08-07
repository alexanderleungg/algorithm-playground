import React from 'react';

interface Props {
  options: string[];
  selected: string;
  onChange: (g: string) => void;
}

export const GraphSelector: React.FC<Props> = ({ options, selected, onChange }) => (
  <div className="w-full md:w-1/4 p-4">
    <label className="block text-sm font-medium mb-2">Choose Graph</label>
    <select
      value={selected}
      onChange={e => onChange(e.target.value)}
      className="block w-full rounded border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-300"
    >
      {options.map(name => (
        <option key={name} value={name}>{name}</option>
      ))}
    </select>
  </div>
);
