import Preview, { PreviewProps } from './Preview';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';
import { Symbolizer } from 'geostyler-style';

describe('Preview', () => {

  let wrapper: any;
  const dummySymbolizers: Symbolizer[] = [{
    kind: 'Mark',
    wellKnownName: 'Circle',
    color: '#FF0000'
  }];

  beforeEach(() => {
    const props: PreviewProps = {
      locale: en_US.GsPreview,
      onSymbolizersChange: jest.fn(),
      symbolizers: dummySymbolizers
    };
    wrapper = TestUtil.shallowRenderComponent(Preview, props);
  });

  it('is defined', () => {
    expect(Preview).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
