// src/algorithms/quickSort.ts
import type { Step } from '../types';

export function quickSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const arr = [...input];

  steps.push({ array: [...arr] }); // initial state

  function partition(l: number, r: number): number {
    const pivot = arr[r];
    let i = l;
    for (let j = l; j < r; j++) {
      // highlight comparison between j and pivot index r
      steps.push({ array: [...arr], highlight: [j, r] });
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        // record swap
        steps.push({ array: [...arr], highlight: [i, j] });
        i++;
      }
    }
    // final swap of pivot into place
    [arr[i], arr[r]] = [arr[r], arr[i]];
    steps.push({ array: [...arr], highlight: [i, r] });
    return i;
  }

  function quickSort(l: number, r: number) {
    if (l >= r) return;
    const pi = partition(l, r);
    quickSort(l, pi - 1);
    quickSort(pi + 1, r);
  }

  quickSort(0, arr.length - 1);
  return steps;
}
