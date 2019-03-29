import * as React from 'react';

import {
  InputNumber
} from 'antd';

// non default props
export interface ContrastFieldProps {
  onChange?: (opacity: number) => void;
  contrast?: number;
}

/**
 * ContrastField
 */
export class ContrastField extends React.PureComponent<ContrastFieldProps> {

  render() {
    const {
      onChange,
      contrast
    } = this.props;

    return (
      <InputNumber
        className="editor-field contrast-field"
        min={-1}
        max={1}
        step={0.1}
        value={contrast}
        onChange={onChange}
      />
    );
  }
}

export default ContrastField;
