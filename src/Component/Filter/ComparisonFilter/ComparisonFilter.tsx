import * as React from 'react';

import { Row, Col } from 'antd';

import AttributeCombo from '../AttributeCombo/AttributeCombo';
import OperatorCombo from '../OperatorCombo/OperatorCombo';
import TextFilterField from '../TextFilterField/TextFilterField';
import NumberFilterField from '../NumberFilterField/NumberFilterField';

import './ComparisonFilter.css';

/**
 * UI for a ComparisonFilter consisting of 
 * 
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value 
 */
class ComparisonFilter extends React.Component<any, any> {

  /** the internal data object (definition structure) */
  internalDataDef: any;

  /** placeholder shown when combobox has no selection */
  placeholder: string = 'Enter Value';

  constructor(props: any) {
    super(props);

    this.state = {
      textFieldVisible: true,
      numberFieldVisible: false
    };
  }

  /**
   * Changes the input field for the filter value due when the selection 
   * of the attribute is changes.
   */
  onAttributeChange = (newAttrName: string) => {

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
            <OperatorCombo internalDataDef={this.props.internalDataDef} />
          </Col>
          {
            this.state.textFieldVisible ? 
              <Col span={10}><TextFilterField internalDataDef={this.props.internalDataDef} /></Col> : 
              null
          }
          {
            this.state.numberFieldVisible ? 
              <Col span={10}><NumberFilterField internalDataDef={this.props.internalDataDef} /></Col> : 
              null
          }
          
        </Row>

      </div>
    );
  }
}

export default ComparisonFilter;
