import FillEditor from './FillEditor';
import TestUtil from '../../../Util/TestUtil';

describe('FillEditor', () => {

  let wrapper: any;
  beforeEach(() => {
    const polygonStyle = TestUtil.getPolygonStyle();
    wrapper = TestUtil.shallowRenderComponentWithLocale(FillEditor, {
      symbolizer: polygonStyle.rules[0].symbolizer
    });
  });

  it('is defined', () => {
    expect(FillEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

});
