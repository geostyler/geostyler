/* Released under the BSD 2-Clause License
 *
 * Copyright (c) 2018-present, terrestris GmbH & Co. KG
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

import {
  RuleGenerator,
  RuleGeneratorProps
} from './RuleGenerator';
import TestUtil from '../../Util/TestUtil';
import { Data } from 'geostyler-data';

describe('RuleGenerator', () => {

  let wrapper: any;
  const dummyData: Data = TestUtil.getDummyGsData();

  beforeEach(() => {
    const props: RuleGeneratorProps = {
      internalDataDef: dummyData
    };
    wrapper = TestUtil.shallowRenderComponent(RuleGenerator, props);
  });

  it('is defined', () => {
    expect(RuleGenerator).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('handles onAttributeChange correctly', () => {
    expect(wrapper.state('attributeName')).toBeUndefined();
    wrapper.instance().onAttributeChange('bar');
    expect(wrapper.state('attributeName')).toEqual('bar');
    expect(wrapper.state('levelOfMeasurement')).toEqual('nominal');

    wrapper.instance().onAttributeChange('foo');
    expect(wrapper.state('attributeName')).toEqual('foo');
    expect(wrapper.state('levelOfMeasurement')).toEqual('cardinal');
  });

  it('handles onLevelOfMeasurementChange correctly', () => {
    const dummyNom = {target: {value: 'nominal'}};
    const dummyOrd = {target: {value: 'ordinal'}};
    const dummyCard = {target: {value: 'cardinal'}};

    wrapper.instance().onLevelOfMeasurementChange(dummyNom);
    expect(wrapper.state('levelOfMeasurement')).toEqual(dummyNom.target.value);

    wrapper.instance().onLevelOfMeasurementChange(dummyOrd);
    expect(wrapper.state('levelOfMeasurement')).toEqual(dummyOrd.target.value);

    wrapper.instance().onLevelOfMeasurementChange(dummyCard);
    expect(wrapper.state('levelOfMeasurement')).toEqual(dummyCard.target.value);
  });

  it('handles onClassificationChange correctly', () => {
    wrapper.instance().onClassificationChange('equalInterval');
    expect(wrapper.state('classificationMethod')).toEqual('equalInterval');

    wrapper.instance().onClassificationChange('quantile');
    expect(wrapper.state('classificationMethod')).toEqual('quantile');
  });

  it('handles onNumberChange correctly', () => {
    wrapper.instance().onNumberChange(5);
    expect(wrapper.state('numberOfRules')).toBe(5);

    wrapper.instance().onNumberChange(2);
    expect(wrapper.state('numberOfRules')).toBe(2);
  });

  it('handles onColorRampChange correctly', () => {
    expect(wrapper.state('colorRamp')).toBe('GeoStyler');
    wrapper.instance().onColorRampChange('GreenRed');
    expect(wrapper.state('colorRamp')).toEqual('GreenRed');
  });

  it('handles onSymbolizerKindChange correctly', () => {
    expect(wrapper.state('symbolizerKind')).toEqual('Mark');
    wrapper.instance().onSymbolizerKindChange('Line');
    expect(wrapper.state('symbolizerKind')).toEqual('Line');
    expect(wrapper.state('wellKnownName')).toBeUndefined();

    wrapper.instance().onSymbolizerKindChange('Mark');
    expect(wrapper.state('symbolizerKind')).toEqual('Mark');
    expect(wrapper.state('wellKnownName')).toEqual('Circle');
  });

  it('handles onWellKnownNameFieldChange correctly', () => {
    expect(wrapper.state('wellKnownName')).toEqual('Circle');
    wrapper.instance().onWellKnownNameFieldChange('Square');
    expect(wrapper.state('wellKnownName')).toEqual('Square');
  });
});
