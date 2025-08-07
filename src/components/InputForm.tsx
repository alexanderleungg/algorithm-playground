import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (data: number[]) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  // text version of the array, as before
  const [text, setText] = useState('3, 1, 4, 1, 5');

  // new: size of random array
  const [size, setSize] = useState(10);

  // helper to generate a random array of given length
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
    <form onSubmit={handleSubmit} className="w-full md:w-1/4 p-4 space-y-4">
      {/* Input field */}
      <div>
        <label className="block text-sm font-medium mb-1">Input Array</label>
        <input
          type="text"
          className="block w-full rounded border-gray-300 p-2 focus:ring focus:border-blue-300"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      {/* Run Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Run
      </button>

      {/* Divider */}
      <hr className="my-4" />

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
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Generate Random Array
      </button>
    </form>
  );
};
