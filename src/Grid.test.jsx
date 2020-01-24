import React from 'react';
import { mount } from 'enzyme';
import { Matrix } from './matrix';
import { next } from './grid';
import Grid from './Grid';

jest.useFakeTimers();

jest.mock('./matrix');
jest.mock('./grid');

describe('Grid', () => {
  let sut;
  let props;
  let childrenComponent;

  beforeEach(() => {
    Matrix.mockImplementation(() => 'matrix');

    props = { x: Math.random(), y: Math.random(), delay: null };

    childrenComponent = jest.fn(() => null);
    sut = mount(<Grid {...props}>{childrenComponent}</Grid>);
  });

  it('should create a grid using x and y passed to component', () => {
    expect(Matrix).toHaveBeenCalledWith(props.x, props.y, expect.any(Function));
  });

  it('should render children with default grid', () => {
    expect(childrenComponent).toHaveBeenCalledWith(
      Matrix.mock.results[0].value
    );
  });

  it('should not generate next grid if delay is not provided', () => {
    jest.advanceTimersByTime(1000);
    expect(next).not.toHaveBeenCalled();
  });

  it('should generate next grid if after delay exceed', () => {
    sut.setProps({ delay: 900 });

    jest.advanceTimersByTime(1000);
    expect(next).toHaveBeenCalledWith(
      Matrix.mock.results[0].value,
      props.x,
      props.y
    );
  });
});
