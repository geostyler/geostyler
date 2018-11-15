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
  colorRampMinClassesWarning: string;
  symbolizer: string;
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
  numberOfRules?: number;
  levelOfMeasurement?: LevelOfMeasurement;
  colorRamp?: string[];
  colorRampName?: string;
  symbolizerKind?: SymbolizerKind;
  wellKnownName?: WellKnownName;
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

    const {
      internalDataDef
    } = this.props;

    const symbolizerKind = RuleGeneratorUtil.guessSymbolizerFromData(internalDataDef);

    this.state = {
      numberOfRules: 2,
      symbolizerKind
    };
  }

  onAttributeChange = (attributeName: string) => {
    const {
      internalDataDef
    } = this.props;
    const attributeType = _get(internalDataDef, `schema.properties[${attributeName}].type`);
    let numberOfRules: number = undefined;
    if (attributeType === 'string') {
      const distinctValues = RuleGeneratorUtil.getDistinctValues(internalDataDef, attributeName);
      numberOfRules = distinctValues.length;
    }
    this.setState({
      attributeName,
      attributeType,
      levelOfMeasurement: attributeType === 'string' ? 'nominal' : 'ordinal',
      numberOfRules
    });
  }

  onLevelOfMeasurementChange = (event: RadioChangeEvent) => {
    const levelOfMeasurement = event.target.value;
    this.setState({levelOfMeasurement});
  }

  onNumberChange = (numberOfRules: number) => {
    let {
      colorRamp,
      colorRampName
    } = this.state;

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

  getColorOptions = () => {
    const {
      numberOfRules
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

    const filteredColorMaps = colorMaps.filter((colormap: string) => {
      const minClasses = _get(colorScales, `[${colormap}].length`);
      return numberOfRules > minClasses;
    });

    return filteredColorMaps.map((colormap) => {
      const colors = RuleGeneratorUtil.getColorRamp(colormap, numberOfRules);
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
    const {
      wellKnownName
    } = this.state;
    this.setState({
      symbolizerKind,
      wellKnownName: symbolizerKind === 'Mark' ? wellKnownName : undefined
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
      wellKnownName
    } = this.state;
    const rules = RuleGeneratorUtil.generateRules(
      internalDataDef,
      levelOfMeasurement,
      numberOfRules,
      attributeName,
      colorRamp,
      symbolizerKind,
      wellKnownName
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
      numberOfRules,
      levelOfMeasurement,
      colorRampName,
      colorRamp,
      symbolizerKind,
      wellKnownName
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
              min={2}
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
              help={numberOfRules < 3 ? locale.colorRampMinClassesWarning : undefined}
            >
              <Select
                className="color-ramp-select"
                style={colorRampStyle}
                placeholder={locale.colorRampPlaceholder}
                optionFilterProp="children"
                value={colorRampName}
                onChange={this.onColorRampNameChange}
                disabled={numberOfRules < 3}
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
