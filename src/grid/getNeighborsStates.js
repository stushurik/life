// @flow

import { getNeighborsCoordinates, type TMatrix } from '../matrix';
import type { TGridState } from './model';

export default (
  grid: TMatrix<TGridState>,
  x: number,
  y: number,
  maxX: number,
  maxY: number
): TGridState[] =>
  getNeighborsCoordinates(x, y, maxX, maxY).map(([x, y]) => grid[x][y]);
