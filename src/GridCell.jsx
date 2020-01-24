// @flow

import React, { memo } from 'react';
import type { TGridState } from './grid';
import './GridCell.css';

type TProps = {
  state: TGridState
};

export default memo<TProps>(({ state }: TProps) => (
  <div
    className={`grid__cell ${state ? 'grid__cell-live' : 'grid__cell-dead'}`}
  />
));
