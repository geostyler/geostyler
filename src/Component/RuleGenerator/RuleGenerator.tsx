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

import React, { useState } from 'react';
import { Rule, SymbolizerKind, WellKnownName } from 'geostyler-style';
import { VectorData } from 'geostyler-data';
import { Radio, Form, Button, InputNumber, Tooltip } from 'antd';
import en_US from '../../locale/en_US';
import AttributeCombo from '../Filter/AttributeCombo/AttributeCombo';

import './RuleGenerator.less';
import { RadioChangeEvent } from 'antd/lib/radio';
import RuleGeneratorUtil from '../../Util/RuleGeneratorUtil';
import { KindField } from '../Symbolizer/Field/KindField/KindField';
import { WellKnownNameField } from '../Symbolizer/Field/WellKnownNameField/WellKnownNameField';
import { localize } from '../LocaleWrapper/LocaleWrapper';
import { brewer, InterpolationMode } from 'chroma-js';
import { ColorRampCombo } from './ColorRampCombo/ColorRampCombo';
import { ColorSpaceCombo } from './ColorSpaceCombo/ColorSpaceCombo';
import ColorsPreview from './ColorsPreview/ColorsPreview';
import { ClassificationMethod, ClassificationCombo } from './ClassificationCombo/ClassificationCombo';
import _get from 'lodash/get';
import { PlusSquareOutlined } from '@ant-design/icons';
import { GeoStylerLocale } from '../../locale/locale';

export type LevelOfMeasurement = 'nominal' | 'ordinal' | 'cardinal';

// default props
interface RuleGeneratorDefaultProps {
  locale: GeoStylerLocale['RuleGenerator'];
  /** List of provided color ramps */
  colorRamps: {
    [name: string]: string[];
  };
  /** List of color spaces to use */
  colorSpaces: (InterpolationMode)[];
}

// non default props
export interface RuleGeneratorProps extends Partial<RuleGeneratorDefaultProps> {
  internalDataDef: VectorData;
  onRulesChange?: (rules: Rule[]) => void;
}
const COMPONENTNAME = 'RuleGenerator';

export const RuleGenerator: React.FC<RuleGeneratorProps> = ({
  locale = en_US.RuleGenerator,
  internalDataDef,
  onRulesChange,
  colorSpaces = ['hsl', 'hsv', 'hsi', 'lab', 'lch', 'hcl', 'rgb'], // rgba, cmyk and gl crash
  colorRamps = {
    GeoStyler: ['#E7000E', '#F48E00', '#FFED00', '#00943D', '#272C82', '#611E82'],
    GreenRed: ['#00FF00', '#FF0000'],
    ...brewer
  }
}) => {

  const minNrClasses = 2;

  const [symbolizerKind, setSymbolizerKind] = useState<SymbolizerKind>(
    RuleGeneratorUtil.guessSymbolizerFromData(internalDataDef)
  );
  const [wellKnownName, setWellKnownName] = useState<WellKnownName>('circle');
  const [colorRamp, setColorRamp] = useState<string>(colorRamps && colorRamps.GeoStyler ? 'GeoStyler' : undefined);
  const [colorSpace, setColorSpace] = useState<InterpolationMode>('hsl');
  const [numberOfRules, setNumberOfRules] = useState<number>(2);
  const [distinctValues, setDistinctValues] = useState<any[]>();
  const [hasError, setHasError] = useState<boolean>();
  const [attributeType, setAttributeType] = useState<string>();
  const [attributeName, setAttributeName] = useState<string>();
  const [classificationMethod, setClassificationMethod] = useState<ClassificationMethod>();
  const [levelOfMeasurement, setLevelOfMeasurement] = useState<LevelOfMeasurement>();

  const onAttributeChange = (newAttributeName: string) => {
    try {
      const newAttributeType = _get(internalDataDef, `schema.properties[${newAttributeName}].type`);
      let newClassficationMethod = classificationMethod;
      if (newAttributeType === 'string' && classificationMethod === 'kmeans') {
        newClassficationMethod = undefined;
      }

      const newDistinctValues = RuleGeneratorUtil.getDistinctValues(internalDataDef, newAttributeName) || [];
      setAttributeName(newAttributeName);
      setAttributeType(newAttributeType);
      setDistinctValues(newDistinctValues);
      setLevelOfMeasurement(newAttributeType === 'string' ? 'nominal' : 'cardinal');
      setClassificationMethod(newClassficationMethod);
    } catch (error) {
      setHasError(true);
    }
  };

  const onLevelOfMeasurementChange = (event: RadioChangeEvent) => {
    setLevelOfMeasurement(event.target.value);
  };

  const onAllDistinctClicked = () => {
    setNumberOfRules(distinctValues.length);
  };

  const onSymbolizerKindChange = (newSymbolizerKind: SymbolizerKind) => {
    let newWellKnownName: WellKnownName;

    if (newSymbolizerKind === 'Mark' && !wellKnownName) {
      newWellKnownName = 'circle';
    } else {
      newWellKnownName = undefined;
    }

    setWellKnownName(newWellKnownName);
    setSymbolizerKind(newSymbolizerKind);
  };

  const onGenerateClick = () => {
    try {
      const rules = RuleGeneratorUtil.generateRules({
        attributeName,
        classificationMethod,
        colors: colorRamps[colorRamp],
        data: internalDataDef,
        levelOfMeasurement,
        numberOfRules,
        symbolizerKind,
        wellKnownName
      });

      if (classificationMethod === 'kmeans') {
        setNumberOfRules(rules.length);
      }

      if (onRulesChange) {
        onRulesChange(rules);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  if (hasError) {
    return <h1>An error occurred in the RuleGenerator UI.</h1>;
  }

  const previewColors = RuleGeneratorUtil.generateColors(colorRamps[colorRamp], numberOfRules, colorSpace);

  return (
    <div className="gs-rule-generator" >
      <Form layout="horizontal">
        <AttributeCombo
          value={attributeName}
          internalDataDef={internalDataDef}
          onAttributeChange={onAttributeChange}
          validateStatus={attributeName ? 'success' : 'warning'}
        />
        <Form.Item
          label={locale.levelOfMeasurement}
        >
          <Radio.Group
            onChange={onLevelOfMeasurementChange}
            value={levelOfMeasurement}
            buttonStyle="solid"
          >
            <Radio.Button
              value="nominal"
            >
              {locale.nominal}
            </Radio.Button>
            <Radio.Button
              value="cardinal"
              disabled={attributeType === 'string'}
            >
              {locale.cardinal}
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        {
          levelOfMeasurement !== 'cardinal' ? null :
            <Form.Item
              label={locale.classification}
            >
              <ClassificationCombo
                classification={classificationMethod}
                onChange={setClassificationMethod}
              />
            </Form.Item>
        }
        <Form.Item
          label={locale.numberOfRules}
          validateStatus={
            classificationMethod === 'kmeans'
              ? 'warning'
              : numberOfRules < minNrClasses
                ? 'error'
                : undefined
          }
          help={classificationMethod === 'kmeans'
            ? locale.numberOfRulesViaKmeans
            : numberOfRules < minNrClasses
            // eslint-disable-next-line max-len
              ? `${locale.colorRampMinClassesWarningPre} ${minNrClasses} ${locale.colorRampMinClassesWarningPost}`
              : undefined
          }
        >
          <div>
            <InputNumber<number>
              min={minNrClasses}
              max={100}
              value={numberOfRules}
              onChange={setNumberOfRules}
            />
            {
              levelOfMeasurement === 'nominal' && distinctValues.length > 0 &&
                <Tooltip title={locale.allDistinctValues}>
                  <Button
                    className="all-distinct-values-button"
                    icon={<PlusSquareOutlined />}
                    onClick={onAllDistinctClicked}
                  />
                </Tooltip>
            }
          </div>
        </Form.Item>
        <fieldset>
          <legend>{locale.symbolizer}</legend>
          <Form.Item>
            <KindField
              kind={symbolizerKind}
              symbolizerKinds={[
                'Fill',
                'Mark',
                'Line'
              ]}
              onChange={onSymbolizerKindChange}
            />
          </Form.Item>
          { symbolizerKind !== 'Mark' ? null :
            <Form.Item>
              <WellKnownNameField
                wellKnownName={wellKnownName}
                onChange={setWellKnownName}
              />
            </Form.Item>
          }
          <Form.Item
            label={locale.colorRamp}
            help={numberOfRules < minNrClasses ?
              `${locale.colorRampMinClassesWarningPre} ${minNrClasses} ${locale.colorRampMinClassesWarningPost}`
              : undefined}
          >
            <ColorRampCombo
              colorRamps={colorRamps}
              colorRamp={colorRamp}
              onChange={setColorRamp}
            />
          </Form.Item>
          {colorSpaces.length > 0 ?
            <Form.Item
              label={locale.colorSpace}
            >
              <ColorSpaceCombo
                colorSpace={colorSpace}
                colorSpaces={colorSpaces}
                onChange={setColorSpace}
              />
            </Form.Item>
            : null}
          <Form.Item
            label={locale.preview}
          >
            <ColorsPreview
              colors={previewColors}
            />
          </Form.Item>
        </fieldset>
        <Form.Item>
          <Button
            className="gs-rule-generator-submit-button"
            type="primary"
            onClick={onGenerateClick}
            disabled={numberOfRules < minNrClasses || !attributeName}
          >
            {locale.generateButtonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default localize(RuleGenerator, COMPONENTNAME);
