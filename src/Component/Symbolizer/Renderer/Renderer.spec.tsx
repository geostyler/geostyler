import { Renderer } from './Renderer';
import TestUtil from '../../../Util/TestUtil';
import { Symbolizer } from 'geostyler-style';

describe('Renderer', () => {

  let wrapper: any;
  const dummySymbolizers: Symbolizer[] = [{
    kind: 'Mark',
    wellKnownName: 'Circle',
    color: '#FF0000'
  }];

  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(Renderer, {
      onSymbolizerChange: jest.fn(),
      symbolizers: dummySymbolizers
    });
  });

  it('is defined', () => {
    expect(Renderer).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
