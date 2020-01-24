import React from 'react';
import { shallow } from 'enzyme';
import GridCell from './GridCell';

describe('Grid Cell', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<GridCell state={0} />);
  });

  it('should be dead by default', () => {
    expect(sut.hasClass('grid__cell-dead')).toBeTruthy();
  });

  it('should live if state is live', () => {
    sut.setProps({ state: 1 });
    expect(sut.hasClass('grid__cell-live')).toBeTruthy();
  });
});
