import * as React from 'react';

import {
  Input
} from 'antd';
import { IconMime } from 'geostyler-style';

// default props
interface ImageFieldDefaultProps {
  image: string;
  label: string;
  placeholder: string;
}

// non default props
interface ImageFieldProps extends Partial<ImageFieldDefaultProps> {
  onChange: ((image: string, mime?: IconMime) => void);
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

  /**
   * Extract image mime-type from filename. Supported mime-types are
   * image/png, image/jpeg, image/gif and image/svg+xml
   *
   * @param {String} path The image filepath
   * @return {IconMime} The mime-type of the image or undefined if mime-type not supported
   */
  getImageFormat = (path: string): IconMime => {
    const imgExt = path.split('.').pop();
    switch (imgExt) {
      case 'png':
      case 'jpeg':
      case 'gif':
        return `image/${imgExt}` as IconMime;
      case 'svg':
        return `image/${imgExt}+xml` as IconMime;
      default:
        return undefined;
    }
  }

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
            const mime = this.getImageFormat(value);
            onChange(value, mime);
          }}
        />
      </div>
    );
  }
}

export default ImageField;
