import GeoJsonGeometry from './GeoJsonGeometry';

it('is defined', () => {
  expect(GeoJsonGeometry).toBeDefined();
});

describe('Constructor', () => {
  it('can be created with type', () => {
    const testType = 'Point';
    const geom = new GeoJsonGeometry(testType);
    expect(geom).toBeDefined();
    expect(geom.type).toBe(testType);
    expect(geom.coordinates).toEqual([]);
  });
});
