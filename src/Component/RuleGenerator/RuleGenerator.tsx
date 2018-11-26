import * as React from 'react';
import { Rule, SymbolizerKind, WellKnownName } from 'geostyler-style';
import { Data } from 'geostyler-data';
import { Radio, Form, Button, InputNumber, Select } from 'antd';
import en_US from '../../locale/en_US';
import AttributeCombo from '../Filter/AttributeCombo/AttributeCombo';

import './RuleGenerator.css';
import { RadioChangeEvent } from 'antd/lib/radio';
import RuleGeneratorUtil, { colorScales } from '../../Util/RuleGeneratorUtil';
import { KindField } from '../Symbolizer/Field/KindField/KindField';
import { WellKnownNameField } from '../Symbolizer/Field/WellKnownNameField/WellKnownNameField';
import { localize } from '../LocaleWrapper/LocaleWrapper';
const _get = require('lodash/get');
const _cloneDeep = require('lodash/cloneDeep');

export type LevelOfMeasurement = 'nominal' | 'ordinal' | 'cardinal';
export type ClassificationMethod = 'equalInterval' | 'quantile';

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
  equalInterval: string;
  quantile: string;
}

// default props
interface RuleGeneratorDefaultProps {
  unknownSymbolizerText?: string;
  locale: RuleGeneratorLocale;
  classificationMethods: ClassificationMethod[];
  colorRampNames: string[];
}

interface RuleGeneratorState {
  attributeName?: string;
  attributeType?: string;
  numberOfRules?: number;
  levelOfMeasurement?: LevelOfMeasurement;
  colorRamp?: string[];
  colorRampName?: string;
  symbolizerKind?: SymbolizerKind;
  wellKnownName?: WellKnownName;
  classificationMethod?: ClassificationMethod;
}

// non default props
export interface RuleGeneratorProps extends Partial<RuleGeneratorDefaultProps> {
  internalDataDef: Data;
  onRulesChange?: (rules: Rule[]) => void;
}

export class RuleGenerator extends React.Component<RuleGeneratorProps, RuleGeneratorState> {
  private minNrClasses: number;

  public static defaultProps: RuleGeneratorDefaultProps = {
    locale: en_US.GsRuleGenerator,
    classificationMethods: ['equalInterval', 'quantile'],
    colorRampNames: [
      'jet', 'hsv', 'hot', 'cool', 'spring', 'summer', 'autumn', 'winter', 'bone',
      'copper', 'greys', 'YIGnBu', 'greens', 'YIOrRd', 'bluered', 'RdBu', 'picnic',
      'rainbow', 'portland', 'blackbody', 'earth', 'electric',
      'viridis', 'inferno', 'magma', 'plasma', 'warm', 'rainbow-soft',
      'bathymetry', 'cdom', 'chlorophyll', 'density', 'freesurface-blue',
      'freesurface-red', 'oxygen', 'par', 'phase', 'salinity', 'temperature',
      'turbidity', 'velocity-blue', 'velocity-green'
    ]
  };

  static componentName: string = 'RuleGenerator';

  constructor(props: RuleGeneratorProps) {
    super(props);

    const {
      internalDataDef
    } = this.props;

    const symbolizerKind = RuleGeneratorUtil.guessSymbolizerFromData(internalDataDef);

    this.minNrClasses = 3;

    this.state = {
      numberOfRules: this.minNrClasses,
      symbolizerKind,
      wellKnownName: 'Circle'
    };
  }

  onAttributeChange = (attributeName: string) => {
    const {
      internalDataDef
    } = this.props;
    const attributeType = _get(internalDataDef, `schema.properties[${attributeName}].type`);
    let numberOfRules: number;
    if (attributeType === 'string') {
      const distinctValues = RuleGeneratorUtil.getDistinctValues(internalDataDef, attributeName);
      numberOfRules = distinctValues.length;
    }
    this.setState({
      attributeName,
      attributeType,
      classificationMethod: this.props.classificationMethods[0],
      levelOfMeasurement: attributeType === 'string' ? 'nominal' : 'cardinal',
      numberOfRules: numberOfRules || this.state.numberOfRules
    });
  }

  onLevelOfMeasurementChange = (event: RadioChangeEvent) => {
    const levelOfMeasurement = event.target.value;
    this.setState({levelOfMeasurement});
  }

  onClassificationChange = (classificationMethod: ClassificationMethod) => {
    this.setState({classificationMethod});
  }

  onNumberChange = (numberOfRules: number) => {
    let colorRamp = _cloneDeep(this.state.colorRamp);
    let colorRampName = this.state.colorRampName;

    if (numberOfRules <= 2) {
      colorRamp = undefined;
      colorRampName = undefined;
    } else if (colorRampName) {
      colorRamp = RuleGeneratorUtil.getColorRamp(colorRampName, numberOfRules);
      if (!colorRamp) {
        colorRampName = undefined;
      }
    }

    this.setState({
      numberOfRules,
      colorRamp,
      colorRampName
    });
  }

  getBackgroundStyleFromColors = (colors: string[]) => {
    const gradients = colors.map((color: string) => `linear-gradient(${color}, ${color})`);
    const backgroundImage = gradients.join(',');
    const size = colors.map((color: string, index: number) => {
      const width = (index + 1) * (100 / colors.length);
      return `${width}% 100%`;
    });
    const backgroundSize = size.join(',');
    return {
      backgroundImage: backgroundImage,
      backgroundSize: backgroundSize,
      backgroundRepeat: 'no-repeat'
    };
  }

  getClassificationOptions = () => {
    const {
      classificationMethods,
      locale
    } = this.props;
    return classificationMethods.map((classificationMethod: ClassificationMethod) => {
      return (
        <Select.Option
          className="classification-option"
          key={classificationMethod}
          value={classificationMethod}
        >
          {locale[classificationMethod] || classificationMethod}
        </Select.Option>
      );
    });
  }

  getColorOptions = () => {
    const {
      numberOfRules
    } = this.state;

    const {
      colorRampNames
    } = this.props;

    const filteredColorMaps = colorRampNames.filter((colorRampName: string) => {
      const minClasses = _get(colorScales, `[${colorRampName}].length`);
      return numberOfRules > minClasses;
    });

    return filteredColorMaps.map((colorRampName) => {
      const colors = RuleGeneratorUtil.getColorRamp(colorRampName, numberOfRules);
      const style = this.getBackgroundStyleFromColors(colors);
      return (
        <Select.Option
          className="color-ramp-option"
          key={colorRampName}
          value={colorRampName}
          style={style}
        >
          {colorRampName}
        </Select.Option>
      );
    });
  }

  onColorRampNameChange = (colorRampName: string) => {
    const {
      numberOfRules
    } = this.state;
    const colorRamp = RuleGeneratorUtil.getColorRamp(colorRampName, numberOfRules);
    this.setState({
      colorRampName,
      colorRamp
    });
  }

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
  }

  onWellKnownNameFieldChange = (wellKnownName: WellKnownName) => {
    this.setState({
      wellKnownName
    });
  }

  onGenerateClick = () => {
    const {
      onRulesChange,
      internalDataDef
    } = this.props;
    const {
      levelOfMeasurement,
      numberOfRules,
      attributeName,
      colorRamp,
      symbolizerKind,
      wellKnownName,
      classificationMethod
    } = this.state;

    const rules = RuleGeneratorUtil.generateRules({
        data: internalDataDef,
        levelOfMeasurement,
        numberOfRules,
        attributeName,
        colorRamp,
        symbolizerKind,
        wellKnownName,
        classificationMethod
      });
    if (onRulesChange) {
      onRulesChange(rules);
    }
  }

  render() {
    const {
      locale,
      internalDataDef
    } = this.props;

    const {
      attributeName,
      attributeType,
      numberOfRules,
      levelOfMeasurement,
      colorRampName,
      colorRamp,
      symbolizerKind,
      wellKnownName,
      classificationMethod
    } = this.state;

    let colorRampStyle = {};
    if (colorRamp) {
      colorRampStyle = this.getBackgroundStyleFromColors(colorRamp);
    }

    return (
      <div className="gs-rule-generator" >
        <Form layout="horizontal">
          <AttributeCombo
            value={attributeName}
            internalDataDef={internalDataDef}
            onAttributeChange={this.onAttributeChange}
          />
          <Form.Item label={locale.levelOfMeasurement}>
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
              required={levelOfMeasurement !== 'cardinal'}
            >
              <Select
                className="classification-select"
                placeholder={locale.classificationPlaceholder}
                value={classificationMethod}
                onChange={this.onClassificationChange}
              >
                {this.getClassificationOptions()}
              </Select>
            </Form.Item>
          }
          <Form.Item label={locale.numberOfRules}>
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
              <Select
                className="color-ramp-select"
                style={colorRampStyle}
                placeholder={locale.colorRampPlaceholder}
                optionFilterProp="children"
                value={colorRampName}
                onChange={this.onColorRampNameChange}
                disabled={numberOfRules < this.minNrClasses}
              >
                {this.getColorOptions()}
              </Select>
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
