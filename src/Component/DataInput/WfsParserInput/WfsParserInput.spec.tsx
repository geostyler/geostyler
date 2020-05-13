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

import { WfsParserInput, WfsParserInputProps } from './WfsParserInput';
import TestUtil from '../../../Util/TestUtil';

describe('WfsParserInput', () => {
  let wrapper: any;
  let dummyOnClick: jest.Mock;
  beforeEach(() => {
    dummyOnClick = jest.fn();
    const props: WfsParserInputProps = {
      onClick: dummyOnClick
    };
    wrapper = TestUtil.shallowRenderComponent(WfsParserInput, props);
  });

  it('is defined', () => {
    expect(WfsParserInput).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onUrlChange', () => {
    it('sets the url in the state', () => {
      const fakeEvent = {
        target: {
          value: 'www.terrestris.de'
        }
      };
      const onUrlChange = wrapper.instance().onUrlChange;
      onUrlChange(fakeEvent);
      expect(wrapper.state().url).toEqual('www.terrestris.de');
    });
    it('sets an error in the state if url is to short', () => {
      const fakeEvent = {
        target: {
          value: ''
        }
      };
      const onUrlChange = wrapper.instance().onUrlChange;
      onUrlChange(fakeEvent);
      expect(wrapper.state().url).toEqual('');
      expect(wrapper.state().validation.url).toEqual({
        status: 'error',
        message: 'Url is required'
      });
    });
  });

  describe('onTypeNameChange', () => {
    it('sets the typeName in the state', () => {
      const typeName = 'my:typeName';
      const fakeEvent = {
        target: {
          value: typeName
        }
      };
      const onTypeNameChange = wrapper.instance().onTypeNameChange;
      onTypeNameChange(fakeEvent);
      expect(wrapper.state().typeName).toEqual(typeName);
    });
    it('sets an error in the state typeName url is to short', () => {
      const fakeEvent = {
        target: {
          value: ''
        }
      };
      const onTypeNameChange = wrapper.instance().onTypeNameChange;
      onTypeNameChange(fakeEvent);
      expect(wrapper.state().typeName).toEqual('');
      expect(wrapper.state().validation.typeName).toEqual({
        status: 'error',
        message: 'TypeName is required'
      });
    });
  });

  describe('onVersionChange', () => {
    it('sets the typeName in the state', () => {
      const version = '2.1.0';
      const onVersionChange = wrapper.instance().onVersionChange;
      onVersionChange(version);
      expect(wrapper.state().version).toEqual(version);
    });
    it('sets an error in the state typeName url is to short', () => {
      const onVersionChange = wrapper.instance().onVersionChange;
      onVersionChange('');
      expect(wrapper.state().version).toEqual('');
      expect(wrapper.state().validation.version).toEqual({
        status: 'error',
        message: 'Version is required'
      });
    });
  });

  describe('onFeatureIDChange', () => {
    it('sets the featureID in the state', () => {
      const featureID = '12';
      const fakeEvent = {
        target: {
          value: featureID
        }
      };
      const onFeatureIDChange = wrapper.instance().onFeatureIDChange;
      onFeatureIDChange(fakeEvent);
      expect(wrapper.state().featureID).toEqual(featureID);
    });
  });

  describe('onPropertyNameChange', () => {
    it('sets the featureID in the state', () => {
      const propertyName = ['name', 'age'];
      const onPropertyNameChange = wrapper.instance().onPropertyNameChange;
      onPropertyNameChange(propertyName);
      expect(wrapper.state().propertyName).toEqual(propertyName);
    });
  });

  describe('onMaxFeaturesChange', () => {
    it('sets the featureID in the state', () => {
      const maxFeatures = 1337;
      const onMaxFeaturesChange = wrapper.instance().onMaxFeaturesChange;
      onMaxFeaturesChange(maxFeatures);
      expect(wrapper.state().maxFeatures).toEqual(maxFeatures);
    });
  });

  describe('onClick', () => {
    it('calls the passed method with the current state', () => {
      const currentState = wrapper.state();
      const onClick = wrapper.instance().onClick;
      onClick();
      expect(dummyOnClick).toBeCalledWith(currentState);
    });
  });

});
