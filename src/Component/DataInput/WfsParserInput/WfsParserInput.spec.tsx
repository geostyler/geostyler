import WfsParserInput, { WfsParserInputProps } from './WfsParserInput';
import TestUtil from '../../../Util/TestUtil';

describe('WfsParserInput', () => {
  let wrapper: any;
  const dummyOnClick = jest.fn();
  beforeEach(() => {
    const props: WfsParserInputProps = {
      onClick: dummyOnClick
    };
    wrapper = TestUtil.shallowRenderComponent(WfsParserInput, props);
  });

  it('is defined', () => {
    expect(WfsParserInput).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
