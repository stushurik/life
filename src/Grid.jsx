// @flow
import { useState, useCallback, type Node } from 'react';
import useInterval from './useInterval';
import { Matrix, type TMatrix } from './matrix';
import { next, type TGridState } from './grid';

type TProps = {
  x: number,
  y: number,
  delay: number,
  children: (grid: TMatrix<TGridState>) => Node
};

const defaultRandomCell = () => Math.round(Math.random());

export default ({ x, y, delay, children }: TProps) => {
  const [grid, setGrid] = useState(Matrix<TGridState>(x, y, defaultRandomCell));

  const tick = useCallback(() => {
    setGrid(old => next(old, x, y));
  }, [x, y]);

  useInterval(tick, delay);

  return children(grid);
};
