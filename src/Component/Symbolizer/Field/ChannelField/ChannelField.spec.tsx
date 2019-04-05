import { ChannelField, ChannelFieldProps } from './ChannelField';
import TestUtil from '../../../../Util/TestUtil';
import { ContrastEnhancement } from 'geostyler-style';

describe('ChannelField', () => {

  let wrapper: any;
  beforeEach(() => {
    const props: ChannelFieldProps = {
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(ChannelField , props);
  });

  it('is defined', () => {
    expect(ChannelField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
  
  describe('updateChannel', () => {
    it('calls onChange', () => {
      const newColor = '#aabbcc';
      wrapper.instance().updateChannel('color', newColor);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });

  describe('onSourceChannelNameChange', () => {
    it('calls onChange', () => {
      const dummySourceChannelName = 'dummyChannel';
      wrapper.instance().onSourceChannelNameChange(dummySourceChannelName);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });

  describe('onContrastEnhancementChange', () => {
    it('calls onChange', () => {
      const dummyCeType: ContrastEnhancement['enhancementType'] = 'histogram';
      wrapper.instance().onContrastEnhancementChange(dummyCeType);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });

  describe('onGammaChange', () => {
    it('calls onChange', () => {
      const dummyGamma: number = 0.5;
      wrapper.instance().onGammaChange(dummyGamma);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });
});
