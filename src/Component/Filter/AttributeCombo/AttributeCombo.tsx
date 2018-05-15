import * as React from 'react';

import { Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
const Option = Select.Option;

/**
 * Combobox offering the attributes to be filtered on.
 */
class AttributeCombo extends React.Component<any, any> {

  /** the internal data object (definition structure) */
  internalDataDef: any;

  /** label  for this combobox */
  label: string = 'Attribute';

  /** placeholder shown when combobox has no selection */
  placeholder: string = 'Select Attribute';

  onAttributeChange: Function;

  constructor(props: any) {
    super(props);

    this.state = {};
  }

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

        <FormItem label={this.label} colon={false} labelCol={{span: 3, offset: 0}}>

          <Select style={{ width: '100%' }} onChange={this.props.onAttributeChange} placeholder={this.placeholder}>
              {options}
          </Select>

        </FormItem>

      </div>
    );
  }
}

export default AttributeCombo;
