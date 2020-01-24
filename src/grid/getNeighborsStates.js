// @flow

import { getNeighborsCoordinates, type TMatrix } from '../matrix';
import type { TGridState } from './model';

export default (
  grid: TMatrix<TGridState>,
  maxX: number,
  maxY: number,
  x: number,
  y: number
): TGridState[] =>
  getNeighborsCoordinates(x, y, maxX, maxY).map(([x, y]) => grid[x][y]);
