import React from 'react';

interface Props {
  graph: Record<string,string[]>;
  startNode: string;
  onChange: (node: string) => void;
}

export const StartNodeSelector: React.FC<Props> = ({ graph, startNode, onChange }) => (
  <div className="w-full md:w-1/4 p-4">
    <label className="block text-sm font-medium mb-2">Start Node</label>
    <select
      value={startNode}
      onChange={e => onChange(e.target.value)}
      className="block w-full rounded border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-300"
    >
      {Object.keys(graph).map(node => (
        <option key={node} value={node}>{node}</option>
      ))}
    </select>
  </div>
);
