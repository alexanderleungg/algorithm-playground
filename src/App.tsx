// src/App.tsx
import React, { useState } from 'react';
import {
  AlgorithmSelector,
  GraphSelector,
  StartNodeSelector,
  InputForm,
  Visualizer,
  GraphVisualizer,
} from './components';
import type { Algorithm, Step, GraphStep } from './types';
import { graphs } from './algorithms/graphs';
import { bubbleSortSteps } from './algorithms/bubbleSort';
import { insertionSortSteps } from './algorithms/insertionSort';
import { selectionSortSteps } from './algorithms/selectionSort';
import { mergeSortSteps } from './algorithms/mergeSort';
import { quickSortSteps } from './algorithms/quickSort';
import { dfsSteps } from './algorithms/dfs';
import { bfsSteps } from './algorithms/bfs';

export default function App() {
  const algos: Algorithm[] = [
    'Bubble Sort',
    'Insertion Sort',
    'Selection Sort',
    'Merge Sort',
    'Quick Sort',
    'DFS',
    'BFS',
    'Custom Code',
  ];
  const graphNames = Object.keys(graphs);

  // --- State ---
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm>('Bubble Sort');
  const [inputArray, setInputArray] = useState<number[]>([3, 1, 4, 1, 5]);
  const [sortSteps, setSortSteps] = useState<Step[]>([]);
  const [graphSteps, setGraphSteps] = useState<GraphStep[]>([]);
  const [selectedGraph, setSelectedGraph] = useState(graphNames[0]);
  const [startNode, setStartNode] = useState(
    Object.keys(graphs[graphNames[0]])[0]
  );
  const [code, setCode] = useState<string>(
    `// Define a function that takes "arr" and returns a new array\n` +
      `const sortFn = arr => [...arr].sort((a, b) => a - b);\n`
  );

  // --- Handlers ---
  const handleRun = (arr: number[]) => {
    setInputArray(arr);
    setSortSteps([]);
    setGraphSteps([]);

    if (selectedAlgo === 'DFS') {
      setGraphSteps(dfsSteps(graphs[selectedGraph], startNode));
    } else if (selectedAlgo === 'BFS') {
      setGraphSteps(bfsSteps(graphs[selectedGraph], startNode));
    } else if (selectedAlgo !== 'Custom Code') {
      let steps: Step[] = [];
      switch (selectedAlgo) {
        case 'Bubble Sort':
          steps = bubbleSortSteps(arr);
          break;
        case 'Insertion Sort':
          steps = insertionSortSteps(arr);
          break;
        case 'Selection Sort':
          steps = selectionSortSteps(arr);
          break;
        case 'Merge Sort':
          steps = mergeSortSteps(arr);
          break;
        case 'Quick Sort':
          steps = quickSortSteps(arr);
          break;
      }
      setSortSteps(steps);
    }
  };

  const handleRunCustom = () => {
    try {
      const decl = code.match(/function\s+([A-Za-z_$][\w$]*)\s*\(/);
      const arrow = code.match(
        /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*.*=>/
      );
      const fnName = decl?.[1] || arrow?.[1];
      if (!fnName) throw new Error('No function found.');

      // @ts-ignore
      const userFn: (arr: number[]) => number[] = new Function(`
        ${code}
        return ${fnName};
      `)();

      if (typeof userFn !== 'function') {
        throw new Error(`"${fnName}" is not a function.`);
      }

      const result = userFn([...inputArray]);
      setSortSteps([{ array: result } as Step]);
    } catch (err: any) {
      alert('Not a valid algorithm: ' + err.message);
    }
  };

  const onGraphChange = (g: string) => {
    setSelectedGraph(g);
    setStartNode(Object.keys(graphs[g])[0]);
  };

  // (keep if your InputForm needs it internally; not used here otherwise)
  const generateRandom = (size: number) => {
    handleRun(
      Array.from({ length: size }, () => Math.floor(Math.random() * 100))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 text-center text-2xl font-semibold">
        Algorithm Playground
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar — fixed comfy width to avoid cramped controls */}
        <aside className="w-full md:w-[340px] lg:w-[360px] shrink-0 bg-white m-4 p-6 rounded-lg shadow space-y-6">
          {/* Algorithm Selector */}
          <div>
            <label className="block mb-1 font-medium text-sm">Algorithm</label>
            <AlgorithmSelector
              options={algos}
              selected={selectedAlgo}
              onChange={setSelectedAlgo}
            />
          </div>

          {/* Graph options */}
          {['DFS', 'BFS'].includes(selectedAlgo) && (
            <>
              <div>
                <label className="block mb-1 font-medium text-sm">
                  Choose Graph
                </label>
                <GraphSelector
                  options={graphNames}
                  selected={selectedGraph}
                  onChange={onGraphChange}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-sm">
                  Start Node
                </label>
                <StartNodeSelector
                  graph={graphs[selectedGraph]}
                  startNode={startNode}
                  onChange={setStartNode}
                />
              </div>
            </>
          )}

          {/* Input Array & Run
              - Let InputForm own the label so we don't duplicate it.
              - The preview can sit below, small text.
           */}
          <div className="space-y-2">
            <InputForm onSubmit={handleRun} />
            <div className="text-xs text-gray-600 break-words">
              Current: <span className="font-mono">{inputArray.join(', ')}</span>
            </div>
          </div>

          {/* 🔻 Removed duplicate "Random Array Size" section here.
              If you still see two sliders, the other one lives inside InputForm.
              In that case, this removal is exactly what we want. */}
        </aside>

        {/* Main Panel */}
        <main className="flex-1 m-4 p-4 bg-white rounded-lg shadow">
          {selectedAlgo === 'Custom Code' ? (
            <div className="space-y-4">
              <textarea
                className="w-full h-64 p-3 border rounded font-mono text-sm leading-normal"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <div className="flex justify-center">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                  onClick={handleRunCustom}
                >
                  Run My Code
                </button>
              </div>
              {sortSteps.length > 0 && <Visualizer steps={sortSteps} />}
            </div>
          ) : ['DFS', 'BFS'].includes(selectedAlgo) ? (
            <GraphVisualizer graph={graphs[selectedGraph]} steps={graphSteps} />
          ) : (
            <Visualizer steps={sortSteps} />
          )}
        </main>
      </div>
    </div>
  );
}
