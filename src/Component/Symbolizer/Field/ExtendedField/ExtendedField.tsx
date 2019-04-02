import * as React from 'react';

import {
  Checkbox
} from 'antd';

// non default props
export interface ExtendedFieldProps {
  onChange?: (extended: boolean) => void;
  extended?: boolean;
  extendedLabel?: string;
}

/**
 * Extended Field
 */
export class ExtendedField extends React.PureComponent<ExtendedFieldProps> {

  onCheckboxChange = (evt: any) => {
    const {
      onChange
    } = this.props;

    if (onChange) {
      onChange(evt.target.checked);
    }
  }

  render() {
    const {
      extended,
      extendedLabel
    } = this.props;

    return (
      <Checkbox
        checked={extended}
        onChange={this.onCheckboxChange}
      >
      {extendedLabel}
      </Checkbox>
    );
  }
}

export default ExtendedField;
