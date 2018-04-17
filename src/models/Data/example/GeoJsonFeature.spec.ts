import GeoJsonFeature from './GeoJsonFeature';
import GeoJsonGeometry from './GeoJsonGeometry';

it('is defined', () => {
  expect(GeoJsonFeature).toBeDefined();
});

describe('Constructor', () => {
  it('can be created with type, geometry and properties', () => {
    const testType = 'foo';
    const testGeom = new GeoJsonGeometry('Point');
    const testProp = {};
    const gjFeat = new GeoJsonFeature(testType, testGeom, testProp);
    expect(gjFeat).toBeDefined();
    expect(gjFeat.type).toBe(testType);
    expect(gjFeat.geometry).toBe(testGeom);
    expect(gjFeat.properties).toBe(testProp);
  });
});
