import { ScaleDenominator, ScaleDenominatorProps } from './ScaleDenominator';
import TestUtil from '../../Util/TestUtil';

describe('ScaleDenominator', () => {

  let wrapper: any;
  let onChangeDummy: jest.Mock;
  beforeEach(() => {
    onChangeDummy = jest.fn();
    const props: ScaleDenominatorProps = {
      onChange: onChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(ScaleDenominator, props);
  });

  it('is defined', () => {
    expect(ScaleDenominator).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onMinScaleDenomChange', () => {
    it('calls a passed onChange function (no scaleDenominator prop)', () => {
      wrapper.instance().onMinScaleDenomChange(1337);
      expect(onChangeDummy).toHaveBeenCalledWith({
        min: 1337
      });
    });
    it('calls a passed onChange function (scaleDenominator prop)', () => {
      wrapper.setProps({
        scaleDenominator: {
          min: 0,
          max: 7355608
        }
      });
      wrapper.instance().onMinScaleDenomChange(1337);
      expect(onChangeDummy).toHaveBeenCalledWith({
        min: 1337,
        max: 7355608
      });
    });
  });

  describe('onMaxScaleDenomChange', () => {
    it('calls a passed onChange function (no scaleDenominator prop)', () => {
      wrapper.instance().onMaxScaleDenomChange(1234);
      expect(onChangeDummy).toHaveBeenCalledWith({
        max: 1234
      });
    });
    it('calls a passed onChange function (scaleDenominator prop)', () => {
      wrapper.setProps({
        scaleDenominator: {
          min: 0,
          max: 7355608
        }
      });
      wrapper.instance().onMaxScaleDenomChange(1337);
      expect(onChangeDummy).toHaveBeenCalledWith({
        min: 0,
        max: 1337
      });
    });
  });

});
