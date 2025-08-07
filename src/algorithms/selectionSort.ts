// src/algorithms/selectionSort.ts

// ← This import makes it a module
import type { Step } from '../types';

export function selectionSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const arr = [...input];
  steps.push({ array: [...arr] });

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({ array: [...arr], highlight: [minIdx, j] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({ array: [...arr], highlight: [minIdx] });
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({ array: [...arr], highlight: [i, minIdx] });
    }
  }

  return steps;
}
