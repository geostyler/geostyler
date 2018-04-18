import Data from './Data';
import DataSchema from './schema/DataSchema';
import { FeatureCollection, Point, LineString, Polygon } from 'geojson';

it('is defined', () => {
  expect(Data).toBeDefined();
});

describe('Constructor', () => {
  it('can be created with schema and exampleFeatures', () => {
    const featureCollection: FeatureCollection<Point | LineString | Polygon> = {
      type: 'FeatureCollection',
      features: [
        {
          id: 1234,
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [102.0, 0.5]
          },
          properties: {
            prop0: 'A feature with a null geom coordianates property'
          }
        },
        {
          id: 1900,
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: []
          },
          properties: {
            prop0: 'A feature with an empty geom coordinates property'
          }
        },
        {
          id: 'stringid',
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [102.0, 0.0],
              [103.0, 1.0],
              [104.0, 0.0],
              [105.0, 1.0]
            ]
          },
          properties: {
            prop0: 'value0',
            prop1: 0.0
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]
            ]
          },
          properties: {
            prop0: 'value0',
            prop1: {
              that: 'this'
            }
          }
        }
      ]
    };
    const schema = new DataSchema('test', {});
    const data = new Data(schema, featureCollection);
    expect(data).toBeDefined();
    expect(data.schema).toBe(schema);
    expect(data.exampleFeatures).toBe(featureCollection);
  });
});
