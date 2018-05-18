import * as React from 'react';

import { Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const Option = Select.Option;

// default props
interface DefaultAttributeComboProps {
  label: string;
  placeholder: string;
}
// non default props
interface AttributeComboProps extends Partial<DefaultAttributeComboProps> {
  internalDataDef: any;
  onAttributeChange: ((newAttrName: string) => void);
}

/**
 * Combobox offering the attributes to be filtered on.
 */
class AttributeCombo extends React.Component<AttributeComboProps, any> {

  public static defaultProps: DefaultAttributeComboProps = {
    label: 'Attribute',
    placeholder: 'Select Attribute',
  };

  render() {
    let options: Object[] = [];

    if (this.props.internalDataDef) {

      const attrDefs = this.props.internalDataDef.schema.properties;

      // create sth like ['foo', 'bar', 'kalle'];
      const attrNames = [];
      for (var key in attrDefs) {
        if (attrDefs.hasOwnProperty(key)) {
          attrNames.push(key);
        }
      }

      // create an option per attribute
      options = attrNames.map(attrName => {
        return (
          <Option
            key={attrName}
            value={attrName}
          >
          {attrName} ({attrDefs[attrName].type})
          </Option>
        );
      });

    }

    return (
      <div className="gs-attr-combo">

        <FormItem label={this.props.label} colon={false} >

          <Select
            style={{ width: '100%' }}
            onChange={this.props.onAttributeChange}
            placeholder={this.props.placeholder}
          >
              {options}
          </Select>

        </FormItem>

      </div>
    );
  }
}

export default AttributeCombo;
