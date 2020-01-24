// @flow
import memoize from 'lodash/memoize';

export type TMatrix<T> = T[][];

export const getNeighborsCoordinates = memoize(
  (x: number, y: number, maxX: number, maxY: number): number[][] =>
    [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],

      [x, y - 1],
      [x, y + 1],

      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1]
    ]
      .filter(([x]) => 0 <= x && x <= maxX)
      .filter(([_, y]) => 0 <= y && y <= maxY),
  (...args) => args.join()
);

export const Matrix = <T: any>(
  sizeX: number,
  sizeY: number,
  getDefault: () => T
): TMatrix<T> =>
  Array.from({ length: sizeX }, () =>
    Array(sizeY)
      .fill(null)
      .map(getDefault)
  );
