// src/algorithms/mergeSort.ts
import type { Step } from '../types';

export function mergeSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const arr = [...input];
  const helper = new Array<number>(arr.length);

  // record the initial state
  steps.push({ array: [...arr] });

  function mergeSort(l: number, r: number) {
    if (r - l <= 1) return;

    const m = Math.floor((l + r) / 2);
    mergeSort(l, m);
    mergeSort(m, r);

    // merge [l,m) and [m,r)
    let i = l, j = m, k = l;
    while (i < m || j < r) {
      if (i < m && (j >= r || arr[i] <= arr[j])) {
        helper[k++] = arr[i++];
      } else {
        helper[k++] = arr[j++];
      }
    }

    // write back to arr and record each write
    for (let t = l; t < r; t++) {
      arr[t] = helper[t];
      // highlight the index we just wrote
      steps.push({ array: [...arr], highlight: [t] });
    }
  }

  mergeSort(0, arr.length);
  return steps;
}
