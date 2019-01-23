import * as React from 'react';

import {
  Select
} from 'antd';
const Option = Select.Option;

// default props
interface FontPickerDefaultProps {
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
    fontOptions: [
      'Arial', 'Verdana', 'Sans-serif',
      'Courier New', 'Lucida Console', 'Monospace',
      'Times New Roman', 'Georgia', 'Serif'
    ]
  };

  render() {
    const {
      font,
      onChange,
      fontOptions
    } = this.props;

    const children: JSX.Element[] = [];
    if (fontOptions) {
      fontOptions.forEach(fontOpt => {
        children.push(<Option key={fontOpt}>{fontOpt}</Option>);
      });
    }

    return (
      <Select
        className="editor-field font-picker"
        mode="tags"
        value={font}
        onChange={onChange}
      >
        {children}
      </Select>
    );
  }
}

export default FontPicker;
