import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Style, Filter } from 'geostyler-style';
import { LocaleProvider } from 'antd';
import en_US from '../locale/en_US';

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
  static getDummyGsData = () => {
    return {
      schema: {
        properties: {
          foo: {
            type: 'number',
            min: 1,
            max: 1
          },
          bar: {
            type: 'string',
          }
        }
      },
      exampleFeatures: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              foo: 1
            },
            geometry: {
              type: 'Point',
              coordinates: [0, 0]
            }
          }
        ]
      }
    };
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
}

export default TestUtil;
