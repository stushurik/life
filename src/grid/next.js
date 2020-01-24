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

export default (grid: TMatrix<TGridState>, X: number, Y: number) => {
  const neighbors = getNeighborsStates.bind(null, grid, X - 1, Y - 1);
  return Matrix<TGridState>(X, Y, (x, y) => next(grid[x][y], neighbors(x, y)));
};

const next = memoize(
  (cellState, neighborsState) =>
    rules[cellState][neighborsState.filter(Boolean).length] || states.dead,
  (state, neighborsState) => state + neighborsState.join()
);
