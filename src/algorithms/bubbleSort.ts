import type { Step } from '../types';

export function bubbleSortSteps(data: number[]): Step[] {
  const steps: Step[] = [];
  const arr = [...data];
  steps.push({ array: [...arr] });

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({ array: [...arr], highlight: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ array: [...arr], highlight: [j, j + 1] });
      }
    }
  }

  return steps;
}
