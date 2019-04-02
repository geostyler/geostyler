import * as React from 'react';

import {
  Input,
  Select
} from 'antd';
import { Data } from 'geostyler-data';
const Option = Select.Option;

// default props
interface SourceChannelNameFieldDefaultProps {
  placeholder: string;
}

// non default props
export interface SourceChannelNameFieldProps extends Partial<SourceChannelNameFieldDefaultProps> {
  internalDataDef?: Data;
  onChange?: (sourceChannelName: string) => void;
  sourceChannelName?: string;
}

/**
 * SourceChannelNameField to select between different source channel options
 */
export class SourceChannelNameSelectionField extends React.Component<SourceChannelNameFieldProps> {

  public static defaultProps: SourceChannelNameFieldDefaultProps = {
    placeholder: 'Name of band'
  };

  getSourceChannelNameSelectOptions = () => {
    // const {
    //   internalDataDef
    // } = this.props;
    // TODO set bands to internalDataDef.XYZ.bands as soon as geostyler-data supports raster data
    const bands: any[] = [];
    return bands.map(band => {
      return (
          <Option
              key={band}
              value={band}
          >
          {band}
          </Option>
      );
    });
  }

  render() {
    const {
      // internalDataDef,
      sourceChannelName,
      onChange,
      placeholder
    } = this.props;

    // TODO set bands to internalDataDef.XYZ.bands as soon as geostyler-data supports raster data
    const bands: any[] = [];

    return (
      <div>
        {
          bands && bands.length > 0 ?
          (
            <Select
              className="editor-field sourceChannelName-field"
              value={sourceChannelName}
              onChange={onChange}
              >
              {this.getSourceChannelNameSelectOptions()}
            </Select>
          ) : (
            <Input
              className="editor-field sourceChannelName-field"
              defaultValue={sourceChannelName}
              value={sourceChannelName}
              placeholder={placeholder}
              onChange={(evt: any) => {
                if (onChange) {
                  onChange(evt.target.value);
                }
              }}
            />
          )
        }
      </div>
    );
  }
}

export default SourceChannelNameSelectionField;
