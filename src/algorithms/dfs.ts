import type { GraphStep } from '../types';

export function dfsSteps(
  graph: Record<string, string[]>,
  start: string
): GraphStep[] {
  const steps: GraphStep[] = [];
  const visited = new Set<string>();

  function dfs(u: string) {
    visited.add(u);
    steps.push({ visited: Array.from(visited), highlight: u });
    for (const v of graph[u] || []) {
      if (!visited.has(v)) dfs(v);
    }
  }

  dfs(start);
  return steps;
}
