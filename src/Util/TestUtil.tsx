import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Style, Filter } from 'geostyler-style';
import { LocaleProvider } from 'antd';
import en_US from '../locale/en_US';
import { Data } from 'geostyler-data';
import { IconLibrary } from '../Component/Symbolizer/IconSelector/IconSelector';

/**
 * A set of some useful static helper methods.
 *
 * @class
 */
export class TestUtil {

  /**
   * Mounts the given component.
   *
   * @param {Component} Component The Component to render.
   * @param {Object} props The props to be used.
   * @param {Object} options The options to be set.
   */
  static mountComponent = (Component: any, props?: any, options?: any) => {
    const wrapper = mount(<Component {...props} />, options);
    return wrapper;
  }

  /**
   * Shallow rendering for the given component.
   * Useful for testing components as a unit, and to ensure that your tests
   * aren't indirectly asserting on behavior of child components.
   *
   * @param {Component} Component The Component to render.
   * @param {Object} props The props to be used.
   * @param {Object} options The options to be set.
   */
  static shallowRenderComponent = (Component: any, props?: any, options?: any) => {
    const wrapper = shallow(<Component {...props} />, options);
    return wrapper;
  }

  /**
   * Shallow rendering for the given component.
   * Useful for testing components as a unit, and to ensure that your tests
   * aren't indirectly asserting on behavior of child components.
   * This function wraps LocaleProvider around component.
   *
   * @param {Component} Component The Component to render.
   * @param {Object} props The props to be used.
   * @param {Object} options The options to be set.
   */
  static shallowRenderComponentWithLocale = (Component: any, props?: any, options?: any) => {
    const wrapper = shallow(<LocaleProvider locale={en_US}><Component {...props} /></LocaleProvider>, options);
    return wrapper;
  }

  /**
   *
   */
  static getDummyGsData = (): Data => {
    return {
      schema: {
        title: 'DummyData',
        type: 'object',
        properties: {
          foo: {
            type: 'number',
            minimum: 1,
            maximum: 1
          },
          bar: {
            type: 'string',
          }
        }
      },
      exampleFeatures: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {
            foo: 1,
            bar: 'bar'
          },
          geometry: {
            type: 'Point',
            coordinates: [0, 0]
          }
        }]
      }
    };
  }

  static getDummyGsIconLibraries  = (): IconLibrary[] => {
    return ([
      {
        name: 'lib 1',
        icons: [
          {
            src: 'foo.bar/image.png',
            caption: 'foobar'
          },
          {
            src: 'heinz.de/erhardt.jpg',
            caption: 'Heinz'
          }
        ]
      }, {
        name: 'lib 2',
        icons: [{
          src: 'walter.com/frosch.jpg',
          caption: 'Walter'
        }]
      }
    ]);
  }

  static getDummyGsFilter = (): Filter  => {
    return [
      '&&',
      ['==', 'state', 'germany'],
      [
        '||',
        ['>=', 'population', 100000],
        ['<', 'population', 200000]
      ],
      [
        '!',
        ['==', 'name', 'Schalke']
      ]
    ];
  }

  static getMarkStyle = () => {
    const simpleSquare: Style = {
      name: 'Simple Square',
      rules: [{
        name: '',
        symbolizers: [{
          kind: 'Mark',
          wellKnownName: 'Square'
        }]
      }]
    };

    return simpleSquare;
  }

  /**
   * Returns a simple line symbolizer object.
   *
   * @returns {Style}
   */
  static getLineStyle = () => {
    const lineSimpleLine: Style = {
      name: 'Simple Line',
      rules: [{
        name: '',
        symbolizers: [{
          kind: 'Line',
          color: '#000000',
          width: 3
        }]
      }]
    };

    return lineSimpleLine;
  }

  /**
   * Returns a simple polygon style object.
   *
   * @returns {Style} The polygon style object
   */
  static getPolygonStyle = () => {
    const polygonTransparentPolygon: Style = {
      name: 'Transparent Polygon',
      rules: [{
        name: '',
        symbolizers: [{
          kind: 'Fill',
          color: '#000080',
          opacity: 0.5,
          outlineColor: '#FFFFFF'
        }]
      }]
    };

    return polygonTransparentPolygon;
  }

  /**
   * Returns a simple labeled point style object.
   *
   * @returns {Style} The labeled style object
   */
  static getLabeledPointStyle = () => {
    const pointStyledLabel: Style = {
      name: 'Styled Label',
      rules: [{
        name: '',
        symbolizers: [{
          kind: 'Text',
          color: '#000000',
          label: '{{name}}',
          font: ['Arial'],
          size: 12,
          offset: [0, 5]
        }]
      }]
    };

    return pointStyledLabel;
  }

  /**
   * Returns a style object containing two rules.
   *
   * @returns {Style} The style object with two rules
   */
  static getTwoRulesStyle = (): Style => {
    const twoRulesStyle: Style = {
      name: 'Two Rules',
      rules: [{
        name: 'rule0',
        symbolizers: [{
          kind: 'Mark',
          wellKnownName: 'Circle'
        }]
      }, {
        name: 'rule1',
        symbolizers: [{
          kind: 'Mark',
          wellKnownName: 'Cross'
        }]
      }]
    };

    return twoRulesStyle;
  }

  static getComplexGsDummyData = (): Data => {
    return {
      'schema': {
        'type': 'object',
        'title': 'bundeslaender',
        'properties': {
          'the_geom': {
            'type': 'string'
          },
          'ADE': {
            'type': 'number'
          },
          'RS': {
            'type': 'string'
          },
          'RS_0': {
            'type': 'string'
          },
          'GEN': {
            'type': 'string'
          },
          'pop': {
            'type': 'number'
          },
          'area': {
            'type': 'number'
          },
          'dense': {
            'type': 'number'
          },
          'kuerzel': {
            'type': 'string'
          }
        }
      },
      'exampleFeatures': {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'id': 'bundeslaender.1',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            },
            'properties': {
              'ADE': 2,
              'RS': '02',
              'RS_0': '020000000000',
              'GEN': 'Hamburg',
              'pop': 1,
              'area': 755,
              'dense': 2397.3509933774835,
              'kuerzel': 'HH'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.2',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            },
            'properties': {
              'ADE': 2,
              'RS': '03',
              'RS_0': '030000000000',
              'GEN': 'Niedersachsen',
              'pop': 2,
              'area': 47593,
              'dense': 166.95732565713445,
              'kuerzel': 'NI'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.3',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            },
            'properties': {
              'ADE': 2,
              'RS': '04',
              'RS_0': '040000000000',
              'GEN': 'Bremen',
              'pop': 3,
              'area': 420,
              'dense': 1616.6666666666667,
              'kuerzel': 'HB'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.4',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            },
            'properties': {
              'ADE': 2,
              'RS': '05',
              'RS_0': '050000000000',
              'GEN': 'Nordrhein-Westfalen',
              'pop': 4,
              'area': 34113,
              'dense': 524.4335004250579,
              'kuerzel': 'NW'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.5',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            },
            'properties': {
              'ADE': 2,
              'RS': '06',
              'RS_0': '060000000000',
              'GEN': 'Hessen',
              'pop': 5,
              'area': 21115,
              'dense': 294.2457968269003,
              'kuerzel': 'HE'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.6',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            },
            'properties': {
              'ADE': 2,
              'RS': '07',
              'RS_0': '070000000000',
              'GEN': 'Rheinland-Pfalz',
              'pop': 6,
              'area': 19854,
              'dense': 204.79500352573788,
              'kuerzel': 'RP'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.7',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            },
            'properties': {
              'ADE': 2,
              'RS': '08',
              'RS_0': '080000000000',
              'GEN': 'Baden-Württemberg',
              'pop': 7,
              'area': 35751,
              'dense': 306.34108136835334,
              'kuerzel': 'BW'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.8',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            },
            'properties': {
              'ADE': 2,
              'RS': '09',
              'RS_0': '090000000000',
              'GEN': 'Bayern',
              'pop': 8,
              'area': 70550,
              'dense': 183.2884479092842,
              'kuerzel': 'BY'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.9',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            },
            'properties': {
              'ADE': 2,
              'RS': '10',
              'RS_0': '100000000000',
              'GEN': 'Saarland',
              'pop': 9,
              'area': 2569,
              'dense': 388.08875048657063,
              'kuerzel': 'SL'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.10',
            'geometry': {
              'type': 'Point',
              'coordinates': [0, 0]
            },
            'properties': {
              'ADE': 2,
              'RS': '11',
              'RS_0': '110000000000',
              'GEN': 'Berlin',
              'pop': 10,
              'area': 892,
              'dense': 4007.847533632287,
              'kuerzel': 'BE'
            }
          }
        ]
      }
    };
  }
}

export default TestUtil;
