import * as React from 'react';

import {
  InputNumber
} from 'antd';

// non default props
export interface FadeDurationFieldProps {
  onChange?: (opacity: number) => void;
  fadeDuration?: number;
}

/**
 * FadeDurationField
 */
export class FadeDurationField extends React.PureComponent<FadeDurationFieldProps> {

  render() {
    const {
      onChange,
      fadeDuration
    } = this.props;

    return (
      <InputNumber
        className="editor-field fadeDuration-field"
        min={0}
        step={10}
        value={fadeDuration}
        onChange={onChange}
      />
    );
  }
}

export default FadeDurationField;
