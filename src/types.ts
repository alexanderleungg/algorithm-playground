// src/types.ts

// your existing sort‐step type
export interface Step {
  array: number[];
  highlight?: number[];
}

// add this for graph traversals:
export interface GraphStep {
  visited: string[];   // nodes visited so far, in order
  highlight: string;    // the node we're currently on
}

// src/types.ts
export type Algorithm =
  | 'Bubble Sort'
  | 'Insertion Sort'
  | 'Selection Sort'
  | 'Merge Sort'
  | 'Quick Sort'
  | 'DFS'
  | 'BFS'
  | 'Custom Code';
