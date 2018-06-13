import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Style } from 'geostyler-style';

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

  /**
   * Returns a simple line symbolizer object.
   *
   * @returns {Style}
   */
  static getLineStyle = () => {
    const lineSimpleLine: Style = {
      name: 'Simple Line',
      type: 'Line',
      rules: [{
        name: '',
        symbolizer: {
          kind: 'Line',
          color: '#000000',
          width: 3
        }
      }]
    };

    return lineSimpleLine;
  }

  /**
   * Returns a simple polygon symbolizer object.
   *
   * @returns {Style} The polgy style object
   */
  static getPolygonStyle = () => {
    const polygonTransparentPolygon: Style = {
      name: 'Transparent Polygon',
      type: 'Fill',
      rules: [{
        name: '',
        symbolizer: {
          kind: 'Fill',
          color: '#000080',
          opacity: 0.5,
          outlineColor: '#FFFFFF'
        }
      }]
    };

    return polygonTransparentPolygon;
  }
}

export default TestUtil;
