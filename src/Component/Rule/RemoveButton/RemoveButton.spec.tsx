import { RemoveButton, RemoveButtonProps } from './RemoveButton';
import TestUtil from '../../../Util/TestUtil';

describe('RemoveButton', () => {

  let wrapper: any;
  let onClickDummy: jest.Mock;
  beforeEach(() => {
    onClickDummy = jest.fn();
    const props: RemoveButtonProps = {
      ruleIdx: 1,
      onClick: onClickDummy
    };
    wrapper = TestUtil.shallowRenderComponent(RemoveButton, props);
  });

  it('is defined', () => {
    expect(RemoveButton).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
