import * as React from 'react';

import {
  Input
} from 'antd';

// default props
interface ImageFieldDefaultProps {
  image: string;
  label: string;
  placeholder: string;
}

// non default props
interface ImageFieldProps extends Partial<ImageFieldDefaultProps> {
  onChange: ((image: string) => void);
}

/**
 * ImageField
 */
class ImageField extends React.Component<ImageFieldProps, {}> {

  public static defaultProps: ImageFieldDefaultProps = {
    image: 'img/openLayers_logo.svg',
    label: 'Image',
    placeholder: 'URL to image'
  };

  render() {
    const {
      image,
      label,
      placeholder,
      onChange
    } = this.props;

    return (
      <div className="editor-field image-field">
        <span className="label">{`${label}:`}</span>
        <Input
          value={image}
          placeholder={placeholder}
          defaultValue={image}
          onChange={(evt: any) => {
            const value = evt.target.value;
            onChange(value);
          }}
        />
      </div>
    );
  }
}

export default ImageField;
