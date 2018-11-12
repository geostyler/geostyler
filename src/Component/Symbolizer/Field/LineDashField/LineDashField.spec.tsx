import { LineDashField, LineDashFieldProps } from './LineDashField';
import TestUtil from '../../../../Util/TestUtil';

describe('OffsetField', () => {

  let wrapper: any;
  let onChangeDummy: jest.Mock;
  const dashArray = [20, 10, 1, 10];
  beforeEach(() => {
    onChangeDummy = jest.fn();
    const props: LineDashFieldProps = {
      dashArray,
      onChange: onChangeDummy
    };
    wrapper = TestUtil.shallowRenderComponent(LineDashField, props);
  });

  it('is defined', () => {
    expect(LineDashField).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
    const buttons = wrapper.find('Button');
    const numberInputs = wrapper.find('InputNumber');
    expect(buttons.length).toBe(2);
    expect(numberInputs.length).toBe(dashArray.length);
  });

  describe('InputFields', () => {
    it('change handlers call the onChange prop method correctly', () => {
      const numberInputs = wrapper.find('InputNumber');
      numberInputs.forEach((numberInput: any, index: number) => {
        const inputOnChangeDummy = numberInput.props().onChange;
        inputOnChangeDummy(12);
        const newDashArray = [...dashArray];
        newDashArray[index] = 12;
        expect(onChangeDummy).toBeCalledWith(newDashArray);
      });
    });
  });

});
