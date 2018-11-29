import * as React from 'react';

import {
  Input,
  Icon,
  Tooltip
} from 'antd';

import IconSelectorWindow, { IconLibrary } from '../../IconSelectorWindow/IconSelectorWindow';

import './ImageField.css';

// default props
interface ImageFieldDefaultProps {
  label: string;
  tooltipLabel: string;
  placeholder: string;
}

// non default props
export interface ImageFieldProps extends Partial<ImageFieldDefaultProps> {
  value?: string;
  onChange?: (image: string) => void;
  iconLibraries?: IconLibrary[];
}

interface ImageFieldState {
  windowVisible: boolean;
}

/**
 * ImageField
 */
export class ImageField extends React.PureComponent<ImageFieldProps, ImageFieldState> {

  public static defaultProps: ImageFieldDefaultProps = {
    label: 'Image',
    tooltipLabel: 'Open Gallery',
    placeholder: 'URL to image'
  };

  constructor(props: ImageFieldProps) {
    super(props);
    this.state = {
      windowVisible: false
    };
  }

  getIconSelectorButton = () => {
    const {
      tooltipLabel
    } = this.props;

    return (
      <Tooltip title={tooltipLabel}>
        <Icon className="gs-image-field-gallery-icon" type="picture" onClick={this.openWindow}/>
      </Tooltip>
    );
  }

  openWindow = () => {
    this.setState({
      windowVisible: true
    });
  }

  closeWindow = () => {
    this.setState({
      windowVisible: false
    });
  }

  render() {
    const {
      value,
      label,
      placeholder,
      onChange,
      iconLibraries
    } = this.props;

    const {
      windowVisible
    } = this.state;

    return (
      <div className="editor-field image-field">
        <span className="label">{`${label}:`}</span>
        {
          iconLibraries ?
            (<Input
              value={value}
              placeholder={placeholder}
              defaultValue={value}
              addonAfter={this.getIconSelectorButton()}
              onChange={(evt: any) => {
                if (onChange) {
                  onChange(evt.target.value);
                }
              }}
            />)
          :
            (<Input
              value={value}
              placeholder={placeholder}
              defaultValue={value}
              onChange={(evt: any) => {
                if (onChange) {
                  onChange(evt.target.value);
                }
              }}
            />)
        }
        {
          !windowVisible ? null :
          <IconSelectorWindow
            onClose={this.closeWindow}
            iconLibraries={iconLibraries}
            selectedIconSrc={value}
            onIconSelect={(src: string) => {
              if (onChange) {
                onChange(src);
              }
            }}
          />
        }
      </div>
    );
  }
}

export default ImageField;
