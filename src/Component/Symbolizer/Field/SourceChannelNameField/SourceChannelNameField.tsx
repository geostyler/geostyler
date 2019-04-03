import * as React from 'react';

import {
  Input,
  Select
} from 'antd';
const Option = Select.Option;

// default props
interface SourceChannelNameFieldDefaultProps {
  placeholder: string;
}

// non default props
export interface SourceChannelNameFieldProps extends Partial<SourceChannelNameFieldDefaultProps> {
  sourceChannelNames?: string[];
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
    const {
      sourceChannelNames
    } = this.props;

    return sourceChannelNames.map(sourceChannelName => {
      return (
          <Option
              key={sourceChannelName}
              value={sourceChannelName}
          >
          {sourceChannelName}
          </Option>
      );
    });
  }

  render() {
    const {
      sourceChannelName,
      sourceChannelNames,
      onChange,
      placeholder
    } = this.props;

    return (
      <div>
        {
          sourceChannelNames && sourceChannelNames.length > 0 ?
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
