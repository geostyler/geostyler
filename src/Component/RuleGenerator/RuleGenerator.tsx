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
import { Rule, SymbolizerKind, WellKnownName } from 'geostyler-style';
import { Data } from 'geostyler-data';
import { Radio, Form, Button, InputNumber } from 'antd';
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

export type LevelOfMeasurement = 'nominal' | 'ordinal' | 'cardinal';

interface RuleGeneratorLocale {
  attribute: string;
  generateButtonText: string;
  levelOfMeasurement: string;
  nominal: string;
  ordinal: string;
  cardinal: string;
  numberOfRules: string;
  colorRamp: string;
  colorRampPlaceholder: string;
  colorRampMinClassesWarningPre: string;
  colorRampMinClassesWarningPost: string;
  symbolizer: string;
  classification: string;
  classificationPlaceholder: string;
  colorSpace: string;
  preview: string;
  numberOfRulesViaKmeans: string;
}

// default props
interface RuleGeneratorDefaultProps {
  unknownSymbolizerText?: string;
  /** Locale object containing translated text snippets */
  locale: RuleGeneratorLocale;
  /** List of provided color ramps */
  colorRamps: {
    [name: string]: string[];
  };
  /** List of color spaces to use */
  colorSpaces: (InterpolationMode)[];
}

interface RuleGeneratorState {
  attributeName?: string;
  attributeType?: string;
  numberOfRules?: number;
  levelOfMeasurement?: LevelOfMeasurement;
  colorRamp?: string;
  symbolizerKind?: SymbolizerKind;
  wellKnownName?: WellKnownName;
  classificationMethod?: ClassificationMethod;
  colorSpace: InterpolationMode;
  hasError: boolean;
}

// non default props
export interface RuleGeneratorProps extends Partial<RuleGeneratorDefaultProps> {
  internalDataDef: Data;
  onRulesChange?: (rules: Rule[]) => void;
}

export class RuleGenerator extends React.Component<RuleGeneratorProps, RuleGeneratorState> {

  static componentName: string = 'RuleGenerator';

  public static defaultProps: RuleGeneratorDefaultProps = {
    locale: en_US.GsRuleGenerator,
    colorSpaces: ['hsl', 'hsv', 'hsi', 'lab', 'lch', 'hcl', 'rgb'], // rgba, cmyk and gl crash
    colorRamps: {
      GeoStyler: ['#E7000E', '#F48E00', '#FFED00', '#00943D', '#272C82', '#611E82'],
      GreenRed: ['#00FF00', '#FF0000'],
      ...brewer
    }
  };

  private minNrClasses: number;

  constructor(props: RuleGeneratorProps) {
    super(props);

    const {
      internalDataDef
    } = this.props;

    const symbolizerKind = RuleGeneratorUtil.guessSymbolizerFromData(internalDataDef);

    this.minNrClasses = 2;

    this.state = {
      symbolizerKind,
      wellKnownName: 'Circle',
      colorRamp: props.colorRamps && props.colorRamps.GeoStyler ? 'GeoStyler' : undefined,
      colorSpace: 'hsl',
      numberOfRules: 2,
      hasError: false
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true
    });
  }

  onAttributeChange = (attributeName: string) => {
    const {
      internalDataDef
    } = this.props;
    const attributeType = _get(internalDataDef, `schema.properties[${attributeName}].type`);
    let {
      classificationMethod
    } = this.state;
    if (attributeType === 'string' && classificationMethod === 'kmeans') {
      classificationMethod = undefined;
    }
    this.setState({
      attributeName,
      attributeType,
      levelOfMeasurement: attributeType === 'string' ? 'nominal' : 'cardinal',
      classificationMethod
    });
  };

  onLevelOfMeasurementChange = (event: RadioChangeEvent) => {
    const levelOfMeasurement = event.target.value;
    this.setState({levelOfMeasurement});
  };

  onClassificationChange = (classificationMethod: ClassificationMethod) => {
    this.setState({classificationMethod});
  };

  onNumberChange = (numberOfRules: number) => {
    this.setState({
      numberOfRules
    });
  };

  onColorRampChange = (colorRamp: string) => {
    this.setState({colorRamp});
  };
  onColorSpaceChange = (colorSpace: InterpolationMode) => {
    this.setState({colorSpace});
  };

  onSymbolizerKindChange = (symbolizerKind: SymbolizerKind) => {
    let {
      wellKnownName
    } = this.state;

    if (symbolizerKind === 'Mark' && !wellKnownName) {
      wellKnownName = 'Circle';
    } else {
      wellKnownName = undefined;
    }

    this.setState({
      symbolizerKind,
      wellKnownName
    });
  };

  onWellKnownNameFieldChange = (wellKnownName: WellKnownName) => {
    this.setState({
      wellKnownName
    });
  };

  onGenerateClick = () => {
    const {
      onRulesChange,
      internalDataDef,
      colorRamps
    } = this.props;
    const {
      attributeName,
      classificationMethod,
      colorRamp,
      levelOfMeasurement,
      numberOfRules,
      symbolizerKind,
      wellKnownName
    } = this.state;

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
      this.setState({
        numberOfRules: rules.length
      });
    }

    if (onRulesChange) {
      onRulesChange(rules);
    }
  };

  render() {
    if (this.state.hasError) {
      return <h1>An error occured in the RuleGenerator UI.</h1>;
    }

    const {
      colorRamps,
      colorSpaces,
      internalDataDef,
      locale
    } = this.props;

    const {
      attributeName,
      attributeType,
      classificationMethod,
      colorRamp,
      colorSpace,
      levelOfMeasurement,
      numberOfRules,
      symbolizerKind,
      wellKnownName
    } = this.state;

    const previewColors = RuleGeneratorUtil.generateColors(colorRamps[colorRamp], numberOfRules, colorSpace);

    return (
      <div className="gs-rule-generator" >
        <Form layout="horizontal">
          <AttributeCombo
            value={attributeName}
            internalDataDef={internalDataDef}
            onAttributeChange={this.onAttributeChange}
            validateStatus={attributeName ? 'success' : 'warning'}
          />
          <Form.Item
            label={locale.levelOfMeasurement}
          >
            <Radio.Group
              onChange={this.onLevelOfMeasurementChange}
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
                  onChange={this.onClassificationChange}
                />
              </Form.Item>
          }
          <Form.Item
            label={locale.numberOfRules}
            validateStatus={
              classificationMethod === 'kmeans'
                ? 'warning'
                : numberOfRules < this.minNrClasses
                  ? 'error'
                  : undefined
            }
            help={classificationMethod === 'kmeans'
              ? locale.numberOfRulesViaKmeans
              : numberOfRules < this.minNrClasses
                // eslint-disable-next-line max-len
                ? `${locale.colorRampMinClassesWarningPre} ${this.minNrClasses} ${locale.colorRampMinClassesWarningPost}`
                : undefined
            }
          >
            <InputNumber
              min={this.minNrClasses}
              max={100}
              value={numberOfRules}
              onChange={this.onNumberChange}
            />
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
                onChange={this.onSymbolizerKindChange}
              />
            </Form.Item>
            { symbolizerKind !== 'Mark' ? null :
              <Form.Item>
                <WellKnownNameField
                  wellKnownName={wellKnownName}
                  onChange={this.onWellKnownNameFieldChange}
                />
              </Form.Item>
            }
            <Form.Item
              label={locale.colorRamp}
              help={numberOfRules < this.minNrClasses ?
                `${locale.colorRampMinClassesWarningPre} ${this.minNrClasses} ${locale.colorRampMinClassesWarningPost}`
                : undefined}
            >
              <ColorRampCombo
                colorRamps={colorRamps}
                colorRamp={colorRamp}
                onChange={this.onColorRampChange}
              />
            </Form.Item>
            {colorSpaces.length > 0 ?
              <Form.Item
                label={locale.colorSpace}
              >
                <ColorSpaceCombo
                  colorSpace={colorSpace}
                  colorSpaces={colorSpaces}
                  onChange={this.onColorSpaceChange}
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
              onClick={this.onGenerateClick}
              disabled={numberOfRules < this.minNrClasses || !attributeName}
            >
              {locale.generateButtonText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default localize(RuleGenerator, RuleGenerator.componentName);
