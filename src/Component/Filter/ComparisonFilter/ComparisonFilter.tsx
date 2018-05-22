import * as React from 'react';

import { Row, Col } from 'antd';

import AttributeCombo from '../AttributeCombo/AttributeCombo';
import OperatorCombo from '../OperatorCombo/OperatorCombo';
import TextFilterField from '../TextFilterField/TextFilterField';
import NumberFilterField from '../NumberFilterField/NumberFilterField';

import { ComparisonFilter, ComparisonOperator } from 'geostyler-style';

import './ComparisonFilter.css';
import BoolFilterField from '../BoolFilterField/BoolFilterField';

// default props
interface DefaultComparisonFilterProps {
  filter: ComparisonFilter;
}
// non default props
interface ComparisonFilterProps extends Partial<DefaultComparisonFilterProps> {
  internalDataDef: any;
  onFilterChange: ((compFilter: ComparisonFilter) => void);
}
// state
interface ComparisonFilterState {
  textFieldVisible: boolean;
  numberFieldVisible: boolean;
  boolFieldVisible: boolean;
  attribute: string;
  attributeType: string;
  operator: ComparisonOperator | undefined;
  value: string | number | boolean | null;
  filter: ComparisonFilter | undefined;
}

/**
 * UI for a ComparisonFilter consisting of
 *
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value
 */
class ComparisonFilterUi extends React.Component<ComparisonFilterProps, ComparisonFilterState> {

  constructor(props: ComparisonFilterProps) {
    super(props);

    if (this.props.filter) {

      // build UI by passed in filter object

      const attrName = this.props.filter[1];
      // read out attribute type
      const attrDefs = this.props.internalDataDef.schema.properties;
      const attrType = attrDefs[attrName].type;
      const stateParts = {
        attribute: attrName,
        attributeType: attrType,
        operator: this.props.filter[0],
        value: this.props.filter[2],
        filter: this.props.filter
      };
      const valueFieldVis: {textFieldVisible: boolean; numberFieldVisible: boolean; boolFieldVisible: boolean} =
        this.getValueFieldVis(attrName);

      this.state = Object.assign(stateParts, valueFieldVis);

    } else {

      this.state = {
        textFieldVisible: true,
        numberFieldVisible: false,
        boolFieldVisible: false,
        attribute: '',
        attributeType: '',
        operator: undefined,
        value: null,
        filter: undefined
      };

    }

  }

  /**
   * Retuns the state part showing which balue UI should be rendered according to attribute type.
   *
   * @param {string} The attribute name to get the value visalization state for
   */
  getValueFieldVis = (attrName: string) => {
    // read out attribute type
    const attrDefs = this.props.internalDataDef.schema.properties;
    const attrType = attrDefs[attrName].type;

    // for string and any non-specified type we show a text field
    let valueFieldVis = {
      textFieldVisible: true,
      numberFieldVisible: false,
      boolFieldVisible: false
    };
    // visibility due to attribute's type
    if (attrType === 'number') {
      valueFieldVis = {
        textFieldVisible: false,
        numberFieldVisible: true,
        boolFieldVisible: false
      };
    } else if (attrType === 'boolean') {
      valueFieldVis = {
        textFieldVisible: false,
        numberFieldVisible: false,
        boolFieldVisible: true
      };
    }

    return valueFieldVis;
  }

  /**
   * Handler function, which is executed, when to underlying filter attribute changes.
   *
   * Changes the input field for the filter value and stores the appropriate attribute name as member.
   */
  onAttributeChange = (newAttrName: string) => {

    const valueFieldVis = this.getValueFieldVis(newAttrName);
    this.setState(valueFieldVis);

    // read out attribute type
    const attrDefs = this.props.internalDataDef.schema.properties;
    const attrType = attrDefs[newAttrName].type;

    this.setState({attribute: newAttrName});

    // (re)create the ComparisonFilter object if all info are collected
    if (this.state.operator && newAttrName && this.state.value) {
      const compFilter: ComparisonFilter = [
        this.state.operator, newAttrName, this.state.value
      ];

      // reset the filter value when the attribute type changed
      if (attrType !== this.state.attributeType) {
        compFilter[2] = null;
        this.setState({value: null});

        // preserve the attribute type to compare with new one
        // this.attributeType = attrType;
        this.setState({attributeType: attrType});
      }

      this.setState({filter: compFilter});

      this.props.onFilterChange(compFilter);
    }
  }

  /**
   * Handler function, which is executed, when to underlying filter operator changes.
   *
   * Stores the appropriate operator as member.
   */
  onOperatorChange = (newOperator: ComparisonOperator) => {

    this.setState({operator: newOperator});

    // (re)create the ComparisonFilter object if all info are collected
    if (newOperator && this.state.attribute && this.state.value) {
      const compFilter: ComparisonFilter = [
        newOperator, this.state.attribute, this.state.value
      ];
      this.setState({filter: compFilter});

      this.props.onFilterChange(compFilter);
    }
  }

  /**
   * Handler function, which is executed, when to underlying filter value changes.
   *
   * Stores the appropriate filter value as member.
   */
  onValueChange = (newValue: string | number | boolean) => {

    this.setState({value: newValue});

    // (re)create the ComparisonFilter object if all info are collected
    if (this.state.operator && this.state.attribute && newValue) {
      const compFilter: ComparisonFilter = [
        this.state.operator, this.state.attribute, newValue
      ];
      this.setState({filter: compFilter});

      this.props.onFilterChange(compFilter);
    }
  }

  render() {

    return (
      <div className="gs-comparison-filter-ui">

         <Row gutter={16}>

          <Col span={10}>
            <AttributeCombo
              value={this.state.filter ? this.state.filter[1] : undefined}
              internalDataDef={this.props.internalDataDef}
              onAttributeChange={this.onAttributeChange}
            />
          </Col>
          <Col span={4}>
            <OperatorCombo
              value={this.state.filter ? this.state.filter[0] : undefined}
              internalDataDef={this.props.internalDataDef}
              onOperatorChange={this.onOperatorChange}
            />
          </Col>
          {
            this.state.textFieldVisible ?
              <Col span={10}>
                <TextFilterField
                  value={this.state.filter ? this.state.filter[2] as string : undefined}
                  internalDataDef={this.props.internalDataDef}
                  onValueChange={this.onValueChange}
                />
              </Col> :
              null
          }
          {
            this.state.numberFieldVisible ?
              <Col span={10}>
                <NumberFilterField
                  value={this.state.filter ? this.state.filter[2] as number : undefined}
                  internalDataDef={this.props.internalDataDef}
                  selectedAttribute={this.state.attribute}
                  onValueChange={this.onValueChange}
                />
              </Col> :
              null
          }
          {
            this.state.boolFieldVisible ?
              <Col span={10}>
                <BoolFilterField
                  value={this.state.filter ? this.state.filter[2] as boolean : undefined}
                  internalDataDef={this.props.internalDataDef}
                  onValueChange={this.onValueChange}
                />
              </Col> :
              null
          }

        </Row>

      </div>
    );
  }
}

export default ComparisonFilterUi;
