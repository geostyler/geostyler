import { SLDRenderer } from './SLDRenderer';
import TestUtil from '../../../Util/TestUtil';

describe('SLDRenderer', () => {

  let wrapper: any;

  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(SLDRenderer, {
      baseUrl: 'https://ows.terrestris.de/geoserver/wms',
      layer: 'osm:osm-fuel'
    });
  });

  it('is defined', () => {
    expect(SLDRenderer).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
