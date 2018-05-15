import DataProvider from './DataProvider';
import GeoJsonDataParser from 'geostyler-geojson-parser';

describe('DataProvider', () => {
  it('is defined', () => {
    expect(DataProvider).toBeDefined();
  });
  
  describe('Constructor', () => {
    it('can be created with parsers', () => {
      const parsers = [{
        format: 'GeoJSON',
        instance: new GeoJsonDataParser()
      }];
      const dataProvider = new DataProvider(parsers);
      expect(dataProvider).toBeDefined();
      expect(dataProvider.parsers).toBe(parsers);
    });
  });

  describe('method', () => {
    it('"importData" is defined and returns the correct data', () => {
      const parsers = [{
        format: 'GeoJSON',
        instance: new GeoJsonDataParser()
      }];
      const dataProvider = new DataProvider(parsers);
      expect(dataProvider.importData).toBeDefined();

      const geojson = {
        type: 'FeatureCollection',
          features: [
            {
              id: 1,
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [1, 1]
              },
              properties: {
                propString: 'A feature with ID 1',
                propNumber: 10,
                propBoolean: true,
                propArray: ['1111', 'Berga', 'foo'],
                anotherPropNumber: 400.5
              }
            }
          ]
        };

      const internalDataPromise = dataProvider.importData(geojson, 'GeoJSON');
      internalDataPromise.then((internalData) => {

        expect(internalData.exampleFeatures).toBe(geojson);

        const expectedSchema = {
          'type': 'object',
          'properties': {
            'propString': {
              'type': 'string'
            },
            'propNumber': {
              'type': 'number',
              'minimum': 10,
              'maximum': 10
            },
            'propBoolean': {
              'type': 'boolean'
            },
            'propArray': {
              'type': 'array'
            },
            'anotherPropNumber': {
              'type': 'number',
              'minimum': 400.5,
              'maximum': 400.5
            },
          }
        };
        expect(internalData.schema).toEqual(expectedSchema);
      });

    });

    it('"getMatchingParser" is defined and returns the correct parser', () => {
      const format = 'GeoJSON';
      const gjParser = new GeoJsonDataParser();
      const parsers = [{
        format: format,
        instance: gjParser
      }];
      const dataProvider = new DataProvider(parsers);
      expect(dataProvider.getMatchingParser).toBeDefined();
      const returnParser = dataProvider.getMatchingParser(format);
      expect(returnParser).toBe(gjParser);
    });
  });
  
});
