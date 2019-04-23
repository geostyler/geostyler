import { RasterChannelEditor, RasterChannelEditorProps } from './RasterChannelEditor';
import TestUtil from '../../../Util/TestUtil';
import { ChannelSelection, Channel } from 'geostyler-style';

describe('RasterChannelEditor', () => {
  let wrapper: any;
  let dummyChannelSelection: ChannelSelection;

  beforeEach(() => {
    dummyChannelSelection = {
      grayChannel: {}
    };
    const props: RasterChannelEditorProps = {
      channelSelection: dummyChannelSelection,
      onChange: jest.fn()
    };
    wrapper = TestUtil.shallowRenderComponent(RasterChannelEditor, props);
  });

  it('is defined', () => {
    expect(RasterChannelEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('isRgbChannel', () => {
    it('returns true if it is a RgbChannel', () => {
      const rgbChannel: ChannelSelection = {
        redChannel: {},
        greenChannel: {},
        blueChannel: {}
      };
      const isRgb = wrapper.instance().isRgbChannel(rgbChannel);
      expect(isRgb).toBeTruthy();
    });
    it('returns false if it is not a RgbChannel', () => {
      const grayChannel: ChannelSelection = {
        grayChannel: {}
      };
      const isRgb = wrapper.instance().isRgbChannel(grayChannel);
      expect(isRgb).toBeFalsy();
    });
  });

  describe('isGrayChannel', () => {
    it('returns true if it is a GrayChannel', () => {
      const grayChannel: ChannelSelection = {
        grayChannel: {}
      };
      const isRgb = wrapper.instance().isGrayChannel(grayChannel);
      expect(isRgb).toBeTruthy();
    });
    it('returns false if it is not a GrayChannel', () => {
      const rgbChannel: ChannelSelection = {
        redChannel: {},
        greenChannel: {},
        blueChannel: {}
      };
      const isRgb = wrapper.instance().isGrayChannel(rgbChannel);
      expect(isRgb).toBeFalsy();
    });
  });

  describe('onChannelFieldChange', () => {
    it('calls onChange', () => {
      const dummyChannel: Channel = {};
      wrapper.instance().onChannelFieldChange('gray', dummyChannel);
      expect(wrapper.instance().props.onChange).toHaveBeenCalled();
    });
  });
});
