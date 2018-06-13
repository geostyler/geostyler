import * as React from 'react';

import {
  Select
} from 'antd';
const Option = Select.Option;

// default props
interface FontPickerDefaultProps {
  font: string[];
  label: string;
  fontOptions: string[];
}

// non default props
interface FontPickerProps extends Partial<FontPickerDefaultProps> {
  onChange: ((font: string[]) => void);
}

/**
 * FontPicker to select font types / families
 */
class FontPicker extends React.Component<FontPickerProps, {}> {

  public static defaultProps: FontPickerDefaultProps = {
    font: ['Arial'],
    label: 'Font',
    fontOptions: ['Arial', 'Verdana', 'Courier New', 'Lucida Console', 'Times New Roman', 'Georgia']
  };

  render() {
    const {
      font,
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
        <Select mode="tags" value={font} style={{ width: 90 }} onChange={this.props.onChange}>
          {children}
        </Select>
      </div>
    );
  }
}

export default FontPicker;
