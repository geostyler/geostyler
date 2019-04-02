import * as React from 'react';

import {
  InputNumber
} from 'antd';

// non default props
export interface GammaFieldProps {
  onChange?: (opacity: number) => void;
  gamma?: number;
}

/**
 * Gamma Field
 */
export class GammaField extends React.PureComponent<GammaFieldProps> {

  render() {
    const {
      onChange,
      gamma
    } = this.props;

    return (
      <InputNumber
        className="editor-field gamma-field"
        min={0}
        step={0.1}
        value={gamma}
        onChange={onChange}
      />
    );
  }
}

export default GammaField;
