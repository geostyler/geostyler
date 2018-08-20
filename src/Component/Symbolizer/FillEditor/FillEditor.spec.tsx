import { FillEditor } from './FillEditor';
import TestUtil from '../../../Util/TestUtil';
import en_US from '../../../locale/en_US';

describe('FillEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const polygonStyle = TestUtil.getPolygonStyle();
    wrapper = TestUtil.shallowRenderComponent(FillEditor, {
      symbolizer: polygonStyle.rules[0].symbolizers,
      locale: en_US.GsFillEditor
    });
  });

  it('is defined', () => {
    expect(FillEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
