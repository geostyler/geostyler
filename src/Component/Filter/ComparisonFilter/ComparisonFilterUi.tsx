import * as React from 'react';

import { Row, Col } from 'antd';

import AttributeCombo from '../AttributeCombo/AttributeCombo';
import OperatorCombo from '../OperatorCombo/OperatorCombo';
import TextFilterField from '../TextFilterField/TextFilterField';
import NumberFilterField from '../NumberFilterField/NumberFilterField';

import { ComparisonFilter } from 'geostyler-style';

import './ComparisonFilterUi.css';

// default props
interface DefaultComparisonFilterProps {}
// non default props
interface ComparisonFilterProps extends Partial<DefaultComparisonFilterProps> {
  internalDataDef: any;
  onFilterChange: ((compFilter: ComparisonFilter) => void);
}
// state
interface ComparisonFilterState {
  textFieldVisible: boolean;
  numberFieldVisible: boolean;
}

/**
 * UI for a ComparisonFilter consisting of
 *
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value
 */
class ComparisonFilterUi extends React.Component<ComparisonFilterProps, ComparisonFilterState> {

  /** */
  attribute: string;

  /** */
  attributeType: string;

  /** TODO replace with appropriate type once it is available */
  operator: '==' | '*=' | '!=' | '<' | '<=' | '>' | '>=';

  /** TODO replace with appropriate type once it is available */
  value: string | number | boolean;

  constructor(props: ComparisonFilterProps) {
    super(props);

    this.state = {
      textFieldVisible: true,
      numberFieldVisible: false
    };
  }

  /**
   * Handler function, which is executed, when to underlying filter attribute changes.
   *
   * Changes the input field for the filter value and stores the appropriate attribute name as member.
   */
  onAttributeChange = (newAttrName: string) => {

    this.attribute = newAttrName;

    // read out attribute type
    const attrDefs = this.props.internalDataDef.schema.properties;
    const attrType = attrDefs[newAttrName].type;

    // toggle visibility due to attribute's type
    if (attrType === 'string') {
      this.setState({
        textFieldVisible: true,
        numberFieldVisible: false
      });
    } else if (attrType === 'number') {
      this.setState({
        textFieldVisible: false,
        numberFieldVisible: true
      });
    }

    // reset the filter value when the attribute type changed
    if (attrType !== this.attributeType) {
      delete this.value;
    }

    // preserve the attribute type to compare with new one
    this.attributeType = attrType;

    // (re)create the ComparisonFilter object
    this.createGsFilter();
  }

  /**
   * Handler function, which is executed, when to underlying filter operator changes.
   *
   * Stores the appropriate operator as member.
   *
   * TODO replace arg type with appropriate TS type once it is available
   */
  onOperatorChange = (newOperator: '==' | '*=' | '!=' | '<' | '<=' | '>' | '>=') => {
    this.operator = newOperator;

    // (re)create the ComparisonFilter object
    this.createGsFilter();
  }

  /**
   * Handler function, which is executed, when to underlying filter value changes.
   *
   * Stores the appropriate filter value as member.
   */
  onValueChange = (newValue: string) => {
    this.value = newValue;

    // (re)create the ComparisonFilter object
    this.createGsFilter();
  }

  /**
   * Creates a GeoStyler ComparisonFilter object and passes it to the 'onFilterChange' function.
   */
  createGsFilter = () => {
    const compFilter: ComparisonFilter = [
      this.operator, this.attribute, this.value
    ];

    this.props.onFilterChange(compFilter);
  }

  render() {

    return (
      <div className="gs-comparison-filter-ui">

         <Row gutter={16}>

          <Col span={10}>
            <AttributeCombo
              internalDataDef={this.props.internalDataDef}
              onAttributeChange={this.onAttributeChange}
            />
          </Col>
          <Col span={4}>
            <OperatorCombo
              internalDataDef={this.props.internalDataDef}
              onOperatorChange={this.onOperatorChange}
            />
          </Col>
          {
            this.state.textFieldVisible ?
              <Col span={10}>
                <TextFilterField internalDataDef={this.props.internalDataDef} onValueChange={this.onValueChange} />
              </Col> :
              null
          }
          {
            this.state.numberFieldVisible ?
              <Col span={10}>
                <NumberFilterField internalDataDef={this.props.internalDataDef} onValueChange={this.onValueChange} />
              </Col> :
              null
          }

        </Row>

      </div>
    );
  }
}

export default ComparisonFilterUi;
