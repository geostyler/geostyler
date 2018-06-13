import * as React from 'react';

import {
  Select
} from 'antd';
import { SymbolizerKind } from 'geostyler-style';
const Option = Select.Option;

// default props
interface KindFieldDefaultProps {
  kind: SymbolizerKind;
  symbolizerKinds: SymbolizerKind[];
  label: string;
}

// non default props
interface KindFieldProps extends Partial<KindFieldDefaultProps> {
  onChange: ((kind: SymbolizerKind) => void);
}

/**
 * KindField
 */
class KindField extends React.Component<KindFieldProps, {}> {

  public static defaultProps: KindFieldDefaultProps = {
    kind: 'Circle',
    symbolizerKinds: ['Circle', 'Fill', 'Icon', 'Line', 'Text'],
    label: 'Kind'
  };

  getKindSelectOptions = () => {
    return this.props.symbolizerKinds!.map(kind => {
      return (
        <Option
          key={kind}
          value={kind}
        >
          {kind}
        </Option>
      );
    });
  }

  render() {
    const {
      kind,
      label,
      onChange
    } = this.props;

    return (
      <div className="editor-field kind-field">
        <span className="label">{`${label}:`}</span>
        <Select
          value={kind}
          onChange={onChange}
        >
          {this.getKindSelectOptions()}
        </Select>
      </div>
    );
  }
}

export default KindField;
