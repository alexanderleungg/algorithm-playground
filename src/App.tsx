// src/App.tsx

import React, { useState } from 'react';
import {
  AlgorithmSelector,
  GraphSelector,
  StartNodeSelector,
  InputForm,
  Visualizer,
  GraphVisualizer,
  AlgorithmPlayground
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

function App() {
  const algos: Algorithm[] = [
    'Bubble Sort',
    'Insertion Sort',
    'Selection Sort',
    'Merge Sort',
    'Quick Sort',
    'DFS',
    'BFS',
    'Custom Code'
  ];

  const graphNames = Object.keys(graphs);

  // core state
  const [selectedAlgo, setSelectedAlgo] = useState<Algorithm>('Bubble Sort');
  const [inputArray, setInputArray]       = useState<number[]>([3, 1, 4, 1, 5]);
  const [sortSteps, setSortSteps]       = useState<Step[]>([]);
  const [graphSteps, setGraphSteps]     = useState<GraphStep[]>([]);
  const [selectedGraph, setSelectedGraph] = useState<string>(graphNames[0]);
  const [startNode, setStartNode]         = useState<string>(
    Object.keys(graphs[graphNames[0]])[0]
  );

  // Runs whenever user submits a new array
  const handleRun = (arr: number[]) => {
    setInputArray(arr);
    setSortSteps([]);
    setGraphSteps([]);

    if (selectedAlgo === 'DFS') {
      setGraphSteps(dfsSteps(graphs[selectedGraph], startNode));
    } else if (selectedAlgo === 'BFS') {
      setGraphSteps(bfsSteps(graphs[selectedGraph], startNode));
    } else {
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
        // Custom Code is handled by AlgorithmPlayground
      }
      setSortSteps(steps);
    }
  };

  // When the graph selection changes, pick its first node by default
  const onGraphChange = (g: string) => {
    setSelectedGraph(g);
    setStartNode(Object.keys(graphs[g])[0]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 text-center text-xl font-bold">
        Personal Algorithm Lab
      </header>

      <main className="flex flex-col md:flex-row flex-1">
        {/* Controls panel */}
        <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
          <AlgorithmSelector
            options={algos}
            selected={selectedAlgo}
            onChange={setSelectedAlgo}
          />

          {(selectedAlgo === 'DFS' || selectedAlgo === 'BFS') && (
            <>
              <GraphSelector
                options={graphNames}
                selected={selectedGraph}
                onChange={onGraphChange}
              />
              <StartNodeSelector
                graph={graphs[selectedGraph]}
                startNode={startNode}
                onChange={setStartNode}
              />
            </>
          )}

          <InputForm onSubmit={handleRun} />
        </div>

        {/* Visualization panel */}
        <div className="flex-1 p-4">
          {selectedAlgo === 'Custom Code' ? (
            <AlgorithmPlayground
              initialArray={inputArray}
              onRun={setSortSteps}
            />
          ) : selectedAlgo === 'DFS' || selectedAlgo === 'BFS' ? (
            <GraphVisualizer
              graph={graphs[selectedGraph]}
              steps={graphSteps}
            />
          ) : (
            <Visualizer steps={sortSteps} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
