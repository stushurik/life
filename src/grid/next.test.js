import random from 'lodash/random';
import { getNeighborsCoordinates, Matrix } from '../matrix';
import { states } from './model';
import next from './next';

describe('next', () => {
  const sizeX = 50;
  const sizeY = 50;

  let grid;

  let x;
  let y;

  let neighbors;

  beforeEach(() => {
    grid = Matrix(sizeX, sizeX);

    x = random(0, sizeX - 1);
    y = random(0, sizeY - 1);

    neighbors = getNeighborsCoordinates(x, y, sizeX - 1, sizeY - 1);
  });

  it('should kill live cell if it has less than 2 live neighbors', () => {
    grid[x][y] = states.live;

    const [neighbor] = neighbors;
    grid[neighbor[0]][neighbor[1]] = states.live;

    expect(next(grid, sizeX, sizeY)[x][y]).toEqual(states.dead);
  });

  it('should left live cell live if it has 2 or 3 live neighbors', () => {
    grid[x][y] = states.live;

    const [neighborOne, neighborTwo] = neighbors;

    grid[neighborOne[0]][neighborOne[1]] = states.live;
    grid[neighborTwo[0]][neighborTwo[1]] = states.live;

    expect(next(grid, sizeX, sizeY)[x][y]).toEqual(states.live);
  });

  it('should kill live cell if it more than 3 live neighbors', () => {
    grid[x][y] = states.live;

    const [neighborOne, neighborTwo, neighborThree, neighborFour] = neighbors;

    grid[neighborOne[0]][neighborOne[1]] = states.live;
    grid[neighborTwo[0]][neighborTwo[1]] = states.live;
    grid[neighborThree[0]][neighborThree[1]] = states.live;
    grid[neighborFour[0]][neighborFour[1]] = states.live;

    expect(next(grid, sizeX, sizeY)[x][y]).toEqual(states.dead);
  });

  it('should resurrect dead cell if it has exactly 3 live neighbors', () => {
    const [neighborOne, neighborTwo, neighborThree] = neighbors;

    grid[neighborOne[0]][neighborOne[1]] = states.live;
    grid[neighborTwo[0]][neighborTwo[1]] = states.live;
    grid[neighborThree[0]][neighborThree[1]] = states.live;

    expect(next(grid, sizeX, sizeY)[x][y]).toEqual(states.live);
  });

  it('should not resurrect dead cell if it has exactly 2 live neighbors', () => {
    const [neighborOne, neighborTwo] = neighbors;

    grid[neighborOne[0]][neighborOne[1]] = states.live;
    grid[neighborTwo[0]][neighborTwo[1]] = states.live;

    expect(next(grid, sizeX, sizeY)[x][y]).toEqual(states.dead);
  });
});
