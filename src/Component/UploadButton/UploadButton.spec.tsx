import UploadButton from './UploadButton';
import TestUtil from '../../Util/TestUtil';

describe('UploadButton', () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(UploadButton, {});
  });

  it('is defined', () => {
    expect(UploadButton).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
