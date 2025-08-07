// src/algorithms/graphs.ts

export const graphs: Record<string, Record<string, string[]>> = {
  'Tree Graph': {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: ['F'],
    F: []
  },
  'Cycle Graph': {
    1: ['2'],
    2: ['3'],
    3: ['1']
  },
  'Custom Small': {
    X: ['Y'],
    Y: ['Z'],
    Z: []
  }
};
