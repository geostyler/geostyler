import ExampleFeatures from './ExampleFeatures';
import GeoJsonFeature from './GeoJsonFeature';
import GeoJsonGeometry from './GeoJsonGeometry';

it('is defined', () => {
  expect(ExampleFeatures).toBeDefined();
});

describe('Constructor', () => {
  it('can be created with array of GeoJSON features', () => {
    const testGeom = new GeoJsonGeometry('Point');
    const gjFeat = new GeoJsonFeature('foo', testGeom, {});
    const explFeats = new ExampleFeatures([gjFeat]);
    expect(explFeats).toBeDefined();
    expect(explFeats.features[0]).toBe(gjFeat);
  });
});
