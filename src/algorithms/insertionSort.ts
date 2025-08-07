import type { Step } from '../types';

export function insertionSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const arr = [...input];
  steps.push({ array: [...arr] });

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    // Highlight the key selection
    steps.push({ array: [...arr], highlight: [i] });

    // Shift elements right to make space
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({ array: [...arr], highlight: [j, j + 1] });
      j--;
    }

    // Insert the key
    arr[j + 1] = key;
    steps.push({ array: [...arr], highlight: [j + 1] });
  }

  return steps;
}
