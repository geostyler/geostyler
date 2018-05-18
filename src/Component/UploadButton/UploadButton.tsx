import * as React from 'react';

import { Upload, Button, Icon } from 'antd';

/**
 * Button to upload / import geodata file.
 */
class UploadButton extends React.Component<any, any> {

  /** label for this field */
  label: string = 'Click To Import GeoData';

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {

    return (
      <Upload
        name="file"
        action="memory"
        customRequest={this.props.onUpload}
      >
        <Button>
          <Icon type="upload" /> {this.label}
        </Button>
      </Upload>
    );
  }
}

export default UploadButton;
