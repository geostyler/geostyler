import * as React from 'react';
import { Rule } from 'geostyler-style';
import { Data } from 'geostyler-data';
import { Radio, Form, Button, InputNumber, Select } from 'antd';
import en_US from '../../locale/en_US';
import AttributeCombo from '../Filter/AttributeCombo/AttributeCombo';

const generateColormap = require('colormap');

import './RuleGenerator.css';
import { RadioChangeEvent } from 'antd/lib/radio';
import RuleGeneratorUtil from 'src/Util/RuleGeneratorUtil';

const _get = require('lodash/get');

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
}

// default props
interface RuleGeneratorDefaultProps {
  unknownSymbolizerText?: string;
  locale: RuleGeneratorLocale;
}

export type LevelOfMeasurement = 'nominal' | 'ordinal' | 'cardinal';

interface RuleGeneratorState {
  attributeName?: string;
  attributeType?: string;
  numberOfClasses?: number;
  levelOfMeasurement?: LevelOfMeasurement;
  colors?: string[];
  colorMap?: string;
}

// non default props
export interface RuleGeneratorProps extends Partial<RuleGeneratorDefaultProps> {
  rules: Rule[];
  internalDataDef: Data;
  onRulesChange?: (rules: Rule[]) => void;
}

export class RuleGenerator extends React.Component<RuleGeneratorProps, RuleGeneratorState> {

  public static defaultProps: RuleGeneratorDefaultProps = {
    locale: en_US.GsRuleGenerator
  };

  constructor(props: RuleGeneratorProps) {
    super(props);
    this.state = {};
  }

  onAttributeChange = (attributeName: string) => {
    const {
      internalDataDef
    } = this.props;
    const attributeType = _get(internalDataDef, `schema.properties[${attributeName}].type`);
    let numberOfClasses: number = undefined;
    if (attributeType === 'string') {
      const distinctValues = RuleGeneratorUtil.getDistinctValues(internalDataDef, attributeName);
      numberOfClasses = distinctValues.length;
    }
    this.setState({
      attributeName,
      attributeType,
      levelOfMeasurement: attributeType === 'string' ? 'nominal' : 'ordinal',
      numberOfClasses
    });
  }

  onLevelOfMeasurementChange = (event: RadioChangeEvent) => {
    const levelOfMeasurement = event.target.value;
    this.setState({levelOfMeasurement});
  }

  onNumberChange = (numberOfClasses: number) => {
    this.setState({numberOfClasses});
  }

  getBackgroundStyleFromColors = (colors: string[]) => {
    const gradients = colors.map((color: string) => `linear-gradient(${color}, ${color})`);
    const backgroundImage = gradients.join(',');

    const size = colors.map((color: string, index: number) => {
      const width = index * (100 / (colors.length - 1));
      return `${width}% 100%`;
    });
    const backgroundSize = size.join(',');
    return {
      backgroundImage: backgroundImage,
      backgroundSize: backgroundSize,
      backgroundRepeat: 'no-repeat'
    };
  }

  getColorOptions = () => {
    const {
      numberOfClasses
    } = this.state;
    const colorMaps = [
      'jet', 'hsv', 'hot', 'cool', 'spring', 'summer', 'autumn', 'winter', 'bone',
      'copper', 'greys', 'YIGnBu', 'greens', 'YIOrRd', 'bluered', 'RdBu', 'picnic',
      'rainbow', 'portland', 'blackbody', 'earth', 'electric',
      'viridis', 'inferno', 'magma', 'plasma', 'warm', 'rainbow-soft',
      'bathymetry', 'cdom', 'chlorophyll', 'density', 'freesurface-blue',
      'freesurface-red', 'oxygen', 'par', 'phase', 'salinity', 'temperature',
      'turbidity', 'velocity-blue', 'velocity-green'
    ];

    return colorMaps.map((colormap) => {
      const colors = generateColormap({
        colormap,
        nshades: numberOfClasses
      });

      const style = this.getBackgroundStyleFromColors(colors);

      return (
        <Select.Option
          className="color-ramp-option"
          key={colormap}
          value={colormap}
          style={style}
        >
          {colormap}
        </Select.Option>
      );
    });
  }

  onColorChange = (value: string) => {
    const {
      numberOfClasses
    } = this.state;
    const colors = generateColormap({
      colormap: value,
      nshades: numberOfClasses
    });
    this.setState({
      colorMap: value,
      colors
    });
  }

  onGenerateClick = () => {
    const {
      onRulesChange,
      internalDataDef
    } = this.props;
    const {
      levelOfMeasurement,
      numberOfClasses,
      attributeName,
      colors
    } = this.state;
    const rules = RuleGeneratorUtil.generateRules(
      internalDataDef,
      levelOfMeasurement,
      numberOfClasses,
      attributeName,
      colors
      );
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
      numberOfClasses,
      levelOfMeasurement,
      colorMap,
      colors
    } = this.state;

    const ruleCountDisabled = levelOfMeasurement === 'nominal' && !!internalDataDef;

    let colorRampStyle = {};
    if (colors) {
      colorRampStyle = this.getBackgroundStyleFromColors(colors);
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
                disabled={attributeType !== 'string'}
              >
                {locale.nominal}
              </Radio.Button>
              <Radio.Button
                value="ordinal"
                disabled={attributeType === 'string'}
              >
                {locale.ordinal}
              </Radio.Button>
              <Radio.Button
                value="cardinal"
                disabled={attributeType === 'string'}
              >
                {locale.cardinal}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={locale.numberOfRules}>
            <InputNumber
              disabled={ruleCountDisabled}
              value={numberOfClasses}
              onChange={this.onNumberChange}
            />
          </Form.Item>
          <Form.Item label={locale.colorRamp}>
            <Select
              className="color-ramp-select"
              style={colorRampStyle}
              placeholder={locale.colorRampPlaceholder}
              optionFilterProp="children"
              value={colorMap}
              onChange={this.onColorChange}
            >
              {this.getColorOptions()}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              className="gs-rule-generator-submit-button"
              type="primary"
              onClick={this.onGenerateClick}
            >
              {locale.generateButtonText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default RuleGenerator;
