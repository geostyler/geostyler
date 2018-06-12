import * as React from 'react';

import { Row, Col } from 'antd';

import AttributeCombo from '../AttributeCombo/AttributeCombo';
import OperatorCombo from '../OperatorCombo/OperatorCombo';
import TextFilterField from '../TextFilterField/TextFilterField';
import NumberFilterField from '../NumberFilterField/NumberFilterField';

import {
  ComparisonFilter as GsComparisonFilter,
  ComparisonOperator
} from 'geostyler-style';

import './ComparisonFilter.css';
import BoolFilterField from '../BoolFilterField/BoolFilterField';

import {
  Data as Data
} from 'geostyler-data';

import {
  get as _get,
  cloneDeep as _cloneDeep
} from 'lodash';

// default props
interface DefaultComparisonFilterProps {
  filter: GsComparisonFilter;
  attributeNameFilter: (attributeName: string) => boolean;
}
// non default props
interface ComparisonFilterProps extends Partial<DefaultComparisonFilterProps> {
  internalDataDef: Data;
  onFilterChange: ((compFilter: GsComparisonFilter) => void);
}
// state
interface ComparisonFilterState {
  textFieldVisible: boolean;
  numberFieldVisible: boolean;
  boolFieldVisible: boolean;
  attribute: string;
  attributeType?: string;
  operator: ComparisonOperator | undefined;
  value: string | number | boolean | null;
  filter: GsComparisonFilter;
  allowedOperators: string[];
}

/**
 * UI for a ComparisonFilter consisting of
 *
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value
 */
class ComparisonFilterUi extends React.Component<ComparisonFilterProps, ComparisonFilterState> {

  static getDerivedStateFromProps(
      nextProps: ComparisonFilterProps,
      prevState: ComparisonFilterState): Partial<ComparisonFilterState> {
    return {
      filter: nextProps.filter
    };
  }

  public static defaultProps: DefaultComparisonFilterProps = {
    filter: ['==', '', null],
    attributeNameFilter: () => true
  };

  private operatorsMap: Object = {
    string: ['==', '*=', '!='],
    number: ['==', '!=', '<', '<=', '>', '>='],
    boolean: ['==', '!=']
  };

  constructor(props: ComparisonFilterProps) {
    super(props);

    const {
      filter,
      internalDataDef
    } = this.props;

    if (filter) {
      // build UI by passed in filter object
      const attrName = filter[1];

      const stateParts: any = {
        attribute: attrName,
        operator: filter[0],
        value: filter[2],
        filter: this.props.filter
      };

      this.state = stateParts;

      // read out attribute type
      if (internalDataDef) {
        const attrDefs = internalDataDef.schema.properties;
        const attribute = attrDefs[attrName];
        if (attribute) {
          const attrType = attrDefs[attrName].type;
          stateParts.attributeType = attrType;

          stateParts.allowedOperators = this.operatorsMap[attrType];
        }
      }

      const valueFieldVis: {
        textFieldVisible: boolean;
        numberFieldVisible: boolean;
        boolFieldVisible: boolean
      } = this.getValueFieldVis(attrName);

      this.state = Object.assign(stateParts, valueFieldVis);

    } else {
      this.state = {
        textFieldVisible: true,
        numberFieldVisible: false,
        boolFieldVisible: false,
        attribute: '',
        operator: undefined,
        value: null,
        filter: ComparisonFilterUi.defaultProps.filter,
        allowedOperators: ['==', '*=', '!=', '<', '<=', '>', '>=']
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
    const attrType = _get(this.props, `internalDataDef.schema.properties[${attrName}].type`);

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
    const {
      internalDataDef,
      onFilterChange
    } = this.props;

    let filter: GsComparisonFilter = _cloneDeep(this.state.filter);
    filter[1] = newAttrName;

    const valueFieldVis = this.getValueFieldVis(newAttrName);
    this.setState(valueFieldVis);

    if (internalDataDef) {
      // read out attribute type
      const attrDefs = internalDataDef.schema.properties;
      const attrType = attrDefs[newAttrName].type;
      this.setState({attribute: newAttrName});

      // reset the filter value when the attribute type changed
      if (attrType !== this.state.attributeType) {

        this.setState({
          value: null,
          // preserve the attribute type to compare with new one
          attributeType: attrType,
          allowedOperators: this.operatorsMap[attrType]
        });
      }
    }

    onFilterChange(filter);
    this.setState({
      filter
    });
  }

  /**
   * Handler function, which is executed, when to underlying filter operator changes.
   *
   * Stores the appropriate operator as member.
   */
  onOperatorChange = (newOperator: ComparisonOperator) => {
    let filter: GsComparisonFilter = _cloneDeep(this.state.filter);
    filter[0] = newOperator;
    this.setState({filter});
    this.props.onFilterChange(filter);
    this.setState({operator: newOperator});
  }

  /**
   * Handler function, which is executed, when to underlying filter value changes.
   *
   * Stores the appropriate filter value as member.
   */
  onValueChange = (newValue: string | number | boolean) => {
    let filter: GsComparisonFilter = _cloneDeep(this.state.filter);
    filter[2] = newValue;
    this.setState({filter});
    this.props.onFilterChange(filter);
  }

  render() {

    return (
      <div className="gs-comparison-filter-ui">
         <Row gutter={16}>
          <Col span={10}>
            <AttributeCombo
              value={this.state && this.state.filter ? this.state.filter[1] : undefined}
              internalDataDef={this.props.internalDataDef}
              onAttributeChange={this.onAttributeChange}
              attributeNameFilter={this.props.attributeNameFilter}
            />
          </Col>
          <Col span={4}>
            <OperatorCombo
              value={this.state && this.state.filter ? this.state.filter[0] : undefined}
              internalDataDef={this.props.internalDataDef}
              onOperatorChange={this.onOperatorChange}
              operators={this.state.allowedOperators}
            />
          </Col>
          {
            this.state.textFieldVisible ?
              <Col span={10}>
                <TextFilterField
                  value={this.state && this.state.filter ? this.state.filter[2] as string : undefined}
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
                  value={this.state && this.state.filter ? this.state.filter[2] as number : undefined}
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
                  value={this.state && this.state.filter ? this.state.filter[2] as boolean : undefined}
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
