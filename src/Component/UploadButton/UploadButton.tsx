import * as React from 'react';

import {
  Upload,
  Button,
  Icon
} from 'antd';
import en_US from '../../locale/en_US';

export interface CustomRequest {
  onProgress: (event: { percent: number }) => void;
  onError: (event: Error, body?: any) => void;
  onSuccess: (body: any) => void;
  data: any;
  filename: string;
  file: File;
  withCredentials: boolean;
  action: string;
  headers: any;
}

interface UploadButtonLocale {
  upload: string;
}

// default props
interface UploadButtonDefaultProps {
  locale: UploadButtonLocale;
}

// non default props
export interface UploadButtonProps extends Partial<UploadButtonDefaultProps> {
  onUpload?: (uploadObject: CustomRequest) => void;
}

/**
 * Button to upload / import geodata file.
 */
export class UploadButton extends React.Component<UploadButtonProps> {

  public static defaultProps: UploadButtonDefaultProps = {
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
