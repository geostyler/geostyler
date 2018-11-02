import * as React from 'react';

import { Select, Form, Input } from 'antd';
import { Data } from 'geostyler-data';
const Option = Select.Option;

// default props
interface DefaultAttributeComboProps {
  /** Label for this field */
  label: string;
  /** The default text to place into the empty field */
  placeholder: string;
  /** Initial value set to the field */
  value: string | undefined;
  /** Set true to hide the attribute's type in the select options */
  hideAttributeType: boolean;
  /**
   * A custom filter function which is passed each attribute.
   * Should return true to accept each attribute or false to reject it.
   */
  attributeNameFilter: (attrName: string) => boolean;
  /** Mapping function for attribute names of this combo */
  attributeNameMappingFunction?: (originalAttributeName: string) => string;
  /** Validation status */
  validateStatus: 'success' | 'warning' | 'error' | 'validating';
  /** Element to show a help text */
  help: React.ReactNode;
}
// non default props
interface AttributeComboProps extends Partial<DefaultAttributeComboProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef?: Data;
  /** Callback function for onChange */
  onAttributeChange: ((newAttrName: string) => void);
}

interface AttributeComboState {
  value: string | undefined;
}

/**
 * Combobox offering the attributes to be filtered on.
 */
class AttributeCombo extends React.Component<AttributeComboProps, AttributeComboState> {

  public static defaultProps: DefaultAttributeComboProps = {
    label: 'Attribute',
    placeholder: 'Select Attribute',
    value: undefined,
    hideAttributeType: false,
    attributeNameFilter: () => true,
    attributeNameMappingFunction: n => n,
    validateStatus: 'success',
    help: 'Please select an attribute.'
  };

  constructor(props: AttributeComboProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  static getDerivedStateFromProps(
     nextProps: AttributeComboProps,
     prevState: AttributeComboState): Partial<AttributeComboState> {
    return {
      value: nextProps.value
    };
  }

  render() {
    const {
      internalDataDef,
      onAttributeChange,
      label,
      placeholder,
      attributeNameFilter,
      hideAttributeType
    } = this.props;

    let options: Object[] = [];

    if (internalDataDef) {
      const attrDefs = internalDataDef.schema.properties;

      // create sth like ['foo', 'bar', 'kalle'];
      const attrNames = [];
      for (var key in attrDefs) {
        if (attrDefs.hasOwnProperty(key)) {
          attrNames.push(key);
        }
      }

      // create an option per attribute
      options = attrNames.filter(attributeNameFilter!).map(attrName => {
        const attrNameMapped = this.props.attributeNameMappingFunction(attrName);
        return (
          <Option
            key={attrName}
            value={attrName}
          >
            {hideAttributeType ? attrNameMapped : `${attrNameMapped} (${attrDefs[attrName].type})`}
          </Option>
        );
      });
    }

    const helpTxt = this.props.validateStatus !== 'success' ? this.props.help : null;

    return (
      <div className="gs-attr-combo">
        <Form.Item
          label={label}
          colon={false}
          validateStatus={this.props.validateStatus}
          help={helpTxt}
        >
          {
            internalDataDef ?
              <Select
                value={this.state.value}
                style={{ width: '100%' }}
                onChange={onAttributeChange}
                placeholder={placeholder}
              >
                {options}
              </Select>
              :
              <Input
                value={this.state.value}
                placeholder={placeholder}
                style={{ width: '100%' }}
                onChange={(event) => {
                  onAttributeChange(event.target.value);
                }}
              />
          }
        </Form.Item>
      </div>
    );
  }
}

export default AttributeCombo;
