import * as React from 'react';

import {
  Input
} from 'antd';

// default props
interface ImageFieldDefaultProps {
  label: string;
  placeholder: string;
}

// non default props
interface ImageFieldProps extends Partial<ImageFieldDefaultProps> {
  value?: string;
  onChange: ((image: string) => void);
}

/**
 * ImageField
 */
class ImageField extends React.PureComponent<ImageFieldProps> {

  public static defaultProps: ImageFieldDefaultProps = {
    label: 'Image',
    placeholder: 'URL to image'
  };

  render() {
    const {
      value,
      label,
      placeholder,
      onChange
    } = this.props;

    return (
      <div className="editor-field image-field">
        <span className="label">{`${label}:`}</span>
        <Input
          value={value}
          placeholder={placeholder}
          defaultValue={value}
          onChange={(evt: any) => {
            onChange(evt.target.value);
          }}
        />
      </div>
    );
  }
}

export default ImageField;
