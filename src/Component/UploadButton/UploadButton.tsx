import * as React from 'react';

import { Upload, Button, Icon } from 'antd';

// default props
interface DefaultUploadButton {
  label: string;
  onUpload: (uploadObject: any) => void;
}

// non default props
interface UploadButtonProps extends Partial<DefaultUploadButton> {
}

/**
 * Button to upload / import geodata file.
 */
class UploadButton extends React.Component<UploadButtonProps, {}> {

  public static defaultProps: DefaultUploadButton = {
    label: 'Upload',
    onUpload: () => {return; }
  };

  render() {
    const {
      onUpload,
      label
    } = this.props;

    return (
      <Upload
        name="file"
        action="memory"
        customRequest={onUpload}
      >
        <Button>
          <Icon type="upload" /> {label}
        </Button>
      </Upload>
    );
  }
}

export default UploadButton;
