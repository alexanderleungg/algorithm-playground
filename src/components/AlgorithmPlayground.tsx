// src/components/AlgorithmPlayground.tsx

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import * as Babel from '@babel/standalone';
import type { Step } from '../types';

interface Props {
  initialArray: number[];
  onRun: (steps: Step[]) => void;
}

export const AlgorithmPlayground: React.FC<Props> = ({ initialArray, onRun }) => {
  const [code, setCode] = useState<string>(
    `// write a function named "mySort" that takes "arr" array
function mySort(arr) {
  // example bubble sort:
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}`
  );

  const handleRun = () => {
    const instrumentPlugin = function ({ types: t }: any) {
      return {
        visitor: {
          AssignmentExpression(path: any) {
            if (t.isMemberExpression(path.node.left)) {
              const arrNode = path.node.left.object;
              const idxNode = path.node.left.property;
              const stepCall = t.expressionStatement(
                t.callExpression(t.identifier('__step__'), [
                  arrNode,
                  t.arrayExpression([idxNode]),
                ])
              );
              path.insertBefore(stepCall);
            }
          },
        },
      };
    };

    const transformed = Babel.transform(code, {
      presets: ['env'],
      plugins: [instrumentPlugin],
    }).code!;

    const wrapped = `
      let __steps__ = [];
      function __step__(arr, highlight) {
        __steps__.push({ array: [...arr], highlight });
      }
      ${transformed}
      mySort(initialArr);
      return __steps__;
    `;

    const runner = new Function('initialArr', wrapped);
    let result: Step[] = [];
    try {
      result = runner([...initialArray]);
    } catch (err) {
      alert('Error in your code: ' + err);
      console.error(err);
    }
    onRun(result);
  };

  return (
    <div className="space-y-4">
      <Editor
        height="300px"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={(value: string | undefined, ev: any) => {
          if (value !== undefined) setCode(value);
        }}
        options={{ fontSize: 14, minimap: { enabled: false } }}
      />
      <button
        onClick={handleRun}
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Run My Code
      </button>
    </div>
  );
};
