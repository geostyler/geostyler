import * as React from 'react';

import {
  Radio
} from 'antd';

// non default props
export interface ExtendedFieldProps {
  onChange?: (extended: boolean) => void;
  extended?: boolean;
}

/**
 * Extended Field
 */
export class ExtendedField extends React.PureComponent<ExtendedFieldProps> {

  onExtendedChange = (evt: any) => {
    const {
      onChange
    } = this.props;

    if (onChange) {
      onChange(evt.target.value);
    }
  }

  render() {
    const {
      extended
    } = this.props;

    return (
      <Radio.Group
        defaultValue={extended == true ? extended : false}
        buttonStyle="solid"
        onChange={this.onExtendedChange}
        size="small"
      >
        <Radio.Button value={false}>16-bit</Radio.Button>
        <Radio.Button value={true}>32-bit</Radio.Button>
      </Radio.Group>
    );
  }
}

export default ExtendedField;
