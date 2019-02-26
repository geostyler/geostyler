import {
  IconSelectorWindow,
  IconSelectorWindowProps
} from './IconSelectorWindow';
import TestUtil from '../../../Util/TestUtil';

describe('IconSelector', () => {

  let wrapper: any;

  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(IconSelectorWindow);
  });

  it('is defined', () => {
    expect(IconSelectorWindow).toBeDefined();
  });

  it('has a component name', () => {
    expect(IconSelectorWindow.componentName).toBeDefined();
  });
});
