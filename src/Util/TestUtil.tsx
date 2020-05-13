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

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Style, Filter } from 'geostyler-style';
import { ConfigProvider } from 'antd';
import en_US from '../locale/en_US';
import { VectorData } from 'geostyler-data';
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
   * This function wraps ConfigProvider around component.
   *
   * @param {Component} Component The Component to render.
   * @param {Object} props The props to be used.
   * @param {Object} options The options to be set.
   */
  static shallowRenderComponentWithLocale = (Component: any, props?: any, options?: any) => {
    const wrapper = shallow(<ConfigProvider locale={en_US}><Component {...props} /></ConfigProvider>, options);
    return wrapper;
  }

  /**
   *
   */
  static getDummyGsData = (): VectorData => {
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

  static getComplexGsDummyData = (): VectorData => {
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
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '02',
              'RS_0': '020000000000',
              'GEN': 'Hamburg',
              'pop': 1810000,
              'area': 755,
              'dense': 2397.3509933774835,
              'kuerzel': 'HH'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.2',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '03',
              'RS_0': '030000000000',
              'GEN': 'Niedersachsen',
              'pop': 7946000,
              'area': 47593,
              'dense': 166.95732565713445,
              'kuerzel': 'NI'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.3',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '04',
              'RS_0': '040000000000',
              'GEN': 'Bremen',
              'pop': 679000,
              'area': 420,
              'dense': 1616.6666666666667,
              'kuerzel': 'HB'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.4',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '05',
              'RS_0': '050000000000',
              'GEN': 'Nordrhein-Westfalen',
              'pop': 17890000,
              'area': 34113,
              'dense': 524.4335004250579,
              'kuerzel': 'NW'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.5',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '06',
              'RS_0': '060000000000',
              'GEN': 'Hessen',
              'pop': 6213000,
              'area': 21115,
              'dense': 294.2457968269003,
              'kuerzel': 'HE'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.6',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '07',
              'RS_0': '070000000000',
              'GEN': 'Rheinland-Pfalz',
              'pop': 4066000,
              'area': 19854,
              'dense': 204.79500352573788,
              'kuerzel': 'RP'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.7',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '08',
              'RS_0': '080000000000',
              'GEN': 'Baden-Württemberg',
              'pop': 10952000,
              'area': 35751,
              'dense': 306.34108136835334,
              'kuerzel': 'BW'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.8',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '09',
              'RS_0': '090000000000',
              'GEN': 'Bayern',
              'pop': 12931000,
              'area': 70550,
              'dense': 183.2884479092842,
              'kuerzel': 'BY'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.9',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '10',
              'RS_0': '100000000000',
              'GEN': 'Saarland',
              'pop': 997000,
              'area': 2569,
              'dense': 388.08875048657063,
              'kuerzel': 'SL'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.10',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '11',
              'RS_0': '110000000000',
              'GEN': 'Berlin',
              'pop': 3575000,
              'area': 892,
              'dense': 4007.847533632287,
              'kuerzel': 'BE'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.11',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '12',
              'RS_0': '120000000000',
              'GEN': 'Brandenburg',
              'pop': 2495000,
              'area': 29654,
              'dense': 84.13704727861334,
              'kuerzel': 'BB'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.12',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '13',
              'RS_0': '130000000000',
              'GEN': 'Mecklenburg-Vorpommern',
              'pop': 1611000,
              'area': 23214,
              'dense': 69.39777720341174,
              'kuerzel': 'MV'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.13',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '14',
              'RS_0': '140000000000',
              'GEN': 'Sachsen',
              'pop': 4082000,
              'area': 17449,
              'dense': 233.9389076737922,
              'kuerzel': 'SN'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.14',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '15',
              'RS_0': '150000000000',
              'GEN': 'Sachsen-Anhalt',
              'pop': 2236000,
              'area': 20452,
              'dense': 109.32916096225308,
              'kuerzel': 'SA'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.15',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '16',
              'RS_0': '160000000000',
              'GEN': 'Thüringen',
              'pop': 2158000,
              'area': 16202,
              'dense': 133.19343290951736,
              'kuerzel': 'TH'
            }
          },
          {
            'type': 'Feature',
            'id': 'bundeslaender.16',
            'geometry': {
              'type': 'MultiPolygon',
              'coordinates': [
                [
                    [[40, 40], [20, 45], [45, 30], [40, 40]]
                ],
                [
                    [[20, 35], [10, 30], [10, 10], [30, 5], [45, 20], [20, 35]],
                    [[30, 20], [20, 15], [20, 25], [30, 20]]
                ]
              ]
            },
            'properties': {
              'ADE': 2,
              'RS': '01',
              'RS_0': '010000000000',
              'GEN': 'Schleswig-Holstein',
              'pop': 2882000,
              'area': 15802,
              'dense': 182.38197696494115,
              'kuerzel': 'SH'
            }
          }
        ]
      }
    };
  }
}

export default TestUtil;
