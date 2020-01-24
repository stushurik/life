// @flow
import memoize from 'lodash/memoize';

export type TMatrix<T> = T[][];

export const getNeighborsCoordinates = memoize(
  (x: number, y: number, maxX: number, maxY: number): number[][] => {
    const xToTheLeft = x - 1;
    const xToTheRight = x + 1;
    const yBelow = y - 1;
    const yAbove = y + 1;

    return [
      [xToTheLeft, yBelow],
      [xToTheLeft, y],
      [xToTheLeft, yAbove],

      [x, yBelow],
      [x, yAbove],

      [xToTheRight, yBelow],
      [xToTheRight, y],
      [xToTheRight, yAbove]
    ].filter(([x, y]) => 0 <= x && x <= maxX && 0 <= y && y <= maxY);
  },
  (...args) => args.join()
);

export const Matrix = <T: any>(
  sizeX: number,
  sizeY: number,
  getValue: (x: number, y: number) => T
): TMatrix<T> => {
  const matrix = [];
  for (let x = 0; x < sizeX; x++) {
    matrix[x] = [];
    for (let y = 0; y < sizeY; y++) {
      matrix[x][y] = getValue(x, y);
    }
  }

  return matrix;
};
