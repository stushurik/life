// @flow

import memoize from 'lodash/memoize';
import { Matrix, type TMatrix } from '../matrix';
import { states, type TGridState } from './model';
import getNeighborsStates from './getNeighborsStates';

// rules for dead and live cells
// maps number of neighbors to next cell state
const rules = {
  [(states.live: number)]: {
    '0': states.dead,
    '1': states.dead,
    '2': states.live,
    '3': states.live,
    '4': states.dead
  },
  [(states.dead: number)]: {
    '0': states.dead,
    '1': states.dead,
    '2': states.dead,
    '3': states.live,
    '4': states.dead
  }
};

const defaultDeadCell = () => 0;

export default (grid: TMatrix<TGridState>, sizeX: number, sizeY: number) => {
  const newGrid = Matrix<TGridState>(sizeX, sizeY, defaultDeadCell);

  for (let x = 0; x < sizeX; x++) {
    for (let y = 0; y < sizeY; y++) {
      const neighborStates = getNeighborsStates(
        grid,
        x,
        y,
        sizeX - 1,
        sizeY - 1
      );

      newGrid[x][y] = computeNextState(grid[x][y], neighborStates);
    }
  }

  return newGrid;
};

const computeNextState = memoize(
  (cellState, neighborsState) => {
    return (
      rules[cellState][
        neighborsState.reduce((neighbors, state) => neighbors + state, 0)
      ] || states.dead
    );
  },
  (state, neighborsState) => state + neighborsState.join()
);
