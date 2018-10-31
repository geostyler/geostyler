import { SLDRenderer } from './SLDRenderer';
import TestUtil from '../../../Util/TestUtil';
import { Symbolizer } from 'geostyler-style';

describe('SLDRenderer', () => {

  let wrapper: any;
  const dummySymbolizers: Symbolizer[] = [{
    kind: 'Mark',
    wellKnownName: 'Circle',
    color: '#FF0000'
  }];

  beforeEach(() => {
    wrapper = TestUtil.shallowRenderComponent(SLDRenderer, {
      baseUrl: 'https://ows.terrestris.de/geoserver/wms',
      layer: 'osm:osm-fuel',
      symbolizers: dummySymbolizers
    });
  });

  it('is defined', () => {
    expect(SLDRenderer).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });
});
