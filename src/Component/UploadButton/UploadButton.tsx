import * as React from 'react';

import {
  Upload,
  Button,
  Icon
} from 'antd';
import en_US from '../../locale/en_US';

interface UploadButtonLocale {
  upload: string;
}

const _isEqual = require('lodash/isEqual');

// default props
interface DefaultUploadButton {
  locale: UploadButtonLocale;
}

// non default props
export interface UploadButtonProps extends Partial<DefaultUploadButton> {
  onUpload?: (uploadObject: any) => void;
}

/**
 * Button to upload / import geodata file.
 */
export class UploadButton extends React.Component<UploadButtonProps> {

  public shouldComponentUpdate(nextProps: UploadButtonProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  public static defaultProps: DefaultUploadButton = {
    locale: en_US.GsUploadButton
  };

  render() {
    const {
      onUpload,
      locale
    } = this.props;

    return (
      <Upload
        name="file"
        action="memory"
        customRequest={onUpload}
      >
        <Button>
          <Icon type="upload" /> {locale.upload}
        </Button>
      </Upload>
    );
  }
}

export default UploadButton;
