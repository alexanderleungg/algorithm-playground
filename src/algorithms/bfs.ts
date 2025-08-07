import type { GraphStep } from '../types';

export function bfsSteps(
  graph: Record<string, string[]>,
  start: string
): GraphStep[] {
  const steps: GraphStep[] = [];
  const visited = new Set<string>([start]);
  const queue: string[] = [start];

  steps.push({ visited: [start], highlight: start });

  while (queue.length) {
    const u = queue.shift()!;
    for (const v of graph[u] || []) {
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
        steps.push({ visited: Array.from(visited), highlight: v });
      }
    }
  }
  return steps;
}
