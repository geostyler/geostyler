import {
  BulkEditModals,
  BulkEditModalsProps
} from './BulkEditModals';
import TestUtil from '../../../Util/TestUtil';

describe('BulkEditModals', () => {

  let wrapper: any;
  const dummyFct = jest.fn();
  beforeEach(() => {
    const props: BulkEditModalsProps = {
      colorModalVisible: false,
      sizeModalVisible: false,
      opacityModalVisible: false,
      symbolModalVisible: false,
      selectedRowKeys: [1, 2],
      modalsClosed: dummyFct
    };
    wrapper = TestUtil.shallowRenderComponent(BulkEditModals, props);
  });

  it('is defined', () => {
    expect(BulkEditModals).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
