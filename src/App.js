import React, { useState } from 'react';
import Grid from './Grid';
import GridBody from './GridBody';

export default () => {
  const [delay, setDelay] = useState(null);

  return (
    <div>
      <button onClick={() => setDelay(1000)}>Start</button>
      <Grid x={50} y={50} delay={delay}>
        {grid => <GridBody grid={grid} />}
      </Grid>
    </div>
  );
};
