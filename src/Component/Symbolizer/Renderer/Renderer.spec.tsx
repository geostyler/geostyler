import { Renderer, RendererProps } from './Renderer';
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
    const props: RendererProps = {
      onClick: jest.fn(),
      symbolizers: dummySymbolizers
    };
    wrapper = TestUtil.shallowRenderComponent(Renderer, props);
  });

  it('is defined', () => {
    expect(Renderer).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
