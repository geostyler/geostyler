import * as React from 'react';
import { mount, shallow } from 'enzyme';

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
}

export default TestUtil;
