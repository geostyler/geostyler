/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import DataProvider from './DataProvider';
import GeoJsonDataParser from 'geostyler-geojson-parser';
import { Data } from 'geostyler-data';
import DataUtil from '../Util/DataUtil';

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
      internalDataPromise.then((internalData: Data) => {

        if (DataUtil.isVector(internalData)) {
          expect(internalData.exampleFeatures).toBe(geojson);
        }

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
