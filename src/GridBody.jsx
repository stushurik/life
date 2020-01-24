// @flow

import React from 'react';
import type { TMatrix } from './matrix';
import type { TGridState } from './grid';
import GridCell from './GridCell';
import './GridBody.css';

type TProps = {
  grid: TMatrix<TGridState>
};

export default ({ grid }: TProps) => (
  <div className="grid">
    {grid.map((row, x) => (
      <div key={`row-${x}`}>
        {row.map((cell, y) => (
          <GridCell key={`cell-${x}-${y}`} state={cell} />
        ))}
      </div>
    ))}
  </div>
);
