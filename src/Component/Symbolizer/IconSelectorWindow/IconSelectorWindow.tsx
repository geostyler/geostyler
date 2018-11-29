import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  Avatar,
  Button,
  Card,
  Select
} from 'antd';
const Option = Select.Option;

import { Rnd } from 'react-rnd';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

import './IconSelectorWindow.css';

const _isEqual = require('lodash/isEqual');

// i18n
export interface IconSelectorWindowLocale {
  windowLabel?: string;
  librarySelectLabel?: string;
}

// default props
export interface IconSelectorWindowDefaultProps {
  locale: IconSelectorWindowLocale;
  x?: number;
  y?: number;
  width?: number|string;
  height?: number|string;
}

export type IconLibrary = {
  name: string;
  icons: {
    src: string;
    caption: string;
  }[];
};

interface IconSelectorWindowState {
  selectedIcon?: {libIndex: number; iconIndex: number; };
  selectedLibIndex: number;
}

// non default props
export interface IconSelectorWindowProps extends Partial<IconSelectorWindowDefaultProps> {
  iconLibraries: IconLibrary[];
  selectedIconSrc?: string;
  onIconSelect?: (iconSrc: string) => void;
  onClose?: () => void;
}

export class IconSelectorWindow extends React.Component<IconSelectorWindowProps, IconSelectorWindowState> {

  public static defaultProps: IconSelectorWindowDefaultProps = {
    locale: en_US.GsIconSelectorWindow
  };

  constructor (props: IconSelectorWindowProps) {
    super(props);

    let selection: any = {};
    if (props.selectedIconSrc) {
      selection = IconSelectorWindow.getSelectedIconFromSrc(props.selectedIconSrc, props.iconLibraries);
    }

    this.state = {
      selectedLibIndex: selection.libIndex || 0
    };
  }

  public shouldComponentUpdate(nextProps: IconSelectorWindowProps, nextState: IconSelectorWindowState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  static getDerivedStateFromProps (props: IconSelectorWindowProps, state: IconSelectorWindowState)
    : IconSelectorWindowState {
      if (props.selectedIconSrc) {
        const selection =  IconSelectorWindow.getSelectedIconFromSrc(props.selectedIconSrc, props.iconLibraries);
        return {
          selectedIcon: selection,
          selectedLibIndex: state.selectedLibIndex
        };
      } else {
        return {
          selectedLibIndex: state.selectedLibIndex
        };
      }
  }

  static componentName: string = 'IconSelectorWindow';

  static getSelectedIconFromSrc (src: string, iconLibraries: IconLibrary[])
    : { libIndex: number; iconIndex: number; } {
    let libIndex: number;
    let iconIndex: number;
    let found: boolean = false;

    for (let i = 0; i < iconLibraries.length; i++) {
      const lib = iconLibraries[i];
      if (found) {
        break;
      }
      for (let j = 0; j < lib.icons.length; j++) {
        const icon = lib.icons[j];
        if (icon.src === src) {
          libIndex = i;
          iconIndex = j;
          found = true;
          break;
        }
      }
    }

    return {
      libIndex,
      iconIndex
    };
  }

  libChange = (value: number) => {
    this.setState({
      selectedLibIndex: value
    });
  }

  getGallery = (icon: any, index: number): React.ReactNode => {
    const {
      selectedLibIndex,
      selectedIcon
    } = this.state;

    const {
      onIconSelect
    } = this.props;

    let gridClassName = 'gs-icon-selector-window-grid';
    if (selectedIcon && selectedIcon.libIndex === selectedLibIndex && selectedIcon.iconIndex === index) {
      gridClassName += ' gs-icon-selector-window-grid-selected';
    }
    return (
      <Card.Grid
        key={index.toString()}
        className={gridClassName}
        // @ts-ignore
        onClick={() => {
          if (onIconSelect) {
            onIconSelect(icon.src);
          }
        }}
      >
        <Avatar
          className="gs-icon-selector-window-grid-avatar"
          size="default"
          src={icon.src}
          alt={icon.caption}
          shape="square"
          />
        <Card.Meta
          className="gs-icon-selector-window-grid-description"
          description={icon.caption}
        />
      </Card.Grid>
    );
  }

  render() {
    const {
      locale,
      iconLibraries,
      x,
      y,
      width,
      height,
      onClose
    } = this.props;

    const {
      selectedLibIndex
    } = this.state;

    return (
      ReactDOM.createPortal(
        <Rnd
          className="gs-icon-selector-window"
          default={{
            x: x || window.innerWidth / 2,
            y: y || window.innerHeight / 2,
            width: width || '50%',
            height: height || '50%'
          }}
          enableResizing={{
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: false,
            right: false,
            top: false,
            topLeft: false,
            topRight: false
          }}
          bounds="window"
          dragHandleClassName="gs-icon-selector-window-header"
        >
          <div className="header gs-icon-selector-window-header">
            <span className="title">
              {locale.windowLabel}
            </span>
            <Button
              icon="close"
              size="small"
              onClick={onClose}
            />
          </div>
          <div className="gs-icon-selector-window-body">
            <div className="gs-lib-row">
              <span className="gs-label">{`${locale.librarySelectLabel}:`}</span>
              <Select
                className="gs-select"
                allowClear={false}
                defaultValue={selectedLibIndex}
                onChange={this.libChange}
                >
                {
                  iconLibraries.map((lib: IconLibrary, index: number) => {
                    return (
                      <Option value={index} key={index.toString()}>{lib.name}</Option>
                      );
                    })
                  }
              </Select>
            </div>
            <Card className="gs-icon-selector-window-card">
              {
                iconLibraries[selectedLibIndex].icons.map((icon: any, index: number) => {
                  return this.getGallery(icon, index);
                })
              }
            </Card>
          </div>
        </Rnd>,
        document.body
      )
    );
  }
}

export default localize(IconSelectorWindow, IconSelectorWindow.componentName);
