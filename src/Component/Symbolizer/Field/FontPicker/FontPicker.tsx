import * as React from 'react';

import {
  Select
} from 'antd';
const Option = Select.Option;

const _isEqual = require('lodash/isEqual');

// default props
interface FontPickerDefaultProps {
  label: string;
  fontOptions: string[];
}

// non default props
export interface FontPickerProps extends Partial<FontPickerDefaultProps> {
  onChange?: (fonts: string[]) => void;
  font?: string[];
}

/**
 * FontPicker to select font types / families
 */
export class FontPicker extends React.Component<FontPickerProps> {

  public static defaultProps: FontPickerDefaultProps = {
    label: 'Font',
    fontOptions: [
      'Arial', 'Verdana', 'Sans-serif',
      'Courier New', 'Lucida Console', 'Monospace',
      'Times New Roman', 'Georgia', 'Serif'
    ]
  };

  public shouldComponentUpdate(nextProps: FontPickerProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  render() {
    const {
      font,
      onChange,
      label,
      fontOptions
    } = this.props;

    const children: JSX.Element[] = [];
    if (fontOptions) {
      fontOptions.forEach(fontOpt => {
        children.push(<Option key={fontOpt}>{fontOpt}</Option>);
      });
    }

    return (
      <div className="editor-field font-picker">
        <span className="label">{`${label}:`}</span>
        <Select
          mode="tags"
          value={font}
          onChange={onChange}
        >
          {children}
        </Select>
      </div>
    );
  }
}

export default FontPicker;
