// src/components/InputForm.tsx
import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (data: number[]) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('3, 1, 4, 1, 5');
  const [size, setSize] = useState(10);

  const generateRandom = () => {
    const arr = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setText(arr.join(', '));
    onSubmit(arr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nums = text
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));
    onSubmit(nums);
  };

  return (
    // ❌ was: "w-full md:w-1/4 p-4"
    // ✅ make it fill the sidebar; let the sidebar handle padding
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {/* Input field */}
      <div>
        <label className="block text-sm font-medium mb-1">Input Array</label>
        <input
          type="text"
          className="block w-full rounded-lg border px-3 py-2 text-sm leading-normal focus:outline-none focus:ring focus:border-blue-400"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      {/* Run Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
      >
        Run
      </button>

      {/* Random array controls */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Random Array Size: {size}
        </label>
        <input
          type="range"
          min={5}
          max={50}
          step={1}
          value={size}
          onChange={e => setSize(parseInt(e.target.value, 10))}
          className="w-full"
        />
      </div>

      <button
        type="button"
        onClick={generateRandom}
        className="w-full px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
      >
        Generate Random Array
      </button>
    </form>
  );
};
