import * as React from 'react';

import {
  Avatar,
  Card,
  Select
} from 'antd';
const Option = Select.Option;

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

import './IconSelector.less';

const _isEqual = require('lodash/isEqual');

// i18n
export interface IconSelectorLocale {
  librarySelectLabel?: string;
}

// default props
export interface IconSelectorDefaultProps {
  locale: IconSelectorLocale;
}

export type IconLibrary = {
  name: string;
  icons: {
    src: string;
    caption: string;
  }[];
};

interface IconSelectorState {
  selectedIcon?: {libIndex: number; iconIndex: number; };
  selectedLibIndex: number;
}

// non default props
export interface IconSelectorProps extends Partial<IconSelectorDefaultProps> {
  iconLibraries: IconLibrary[];
  selectedIconSrc?: string;
  onIconSelect?: (iconSrc: string) => void;
}

export class IconSelector extends React.Component<IconSelectorProps, IconSelectorState> {

  public static defaultProps: IconSelectorDefaultProps = {
    locale: en_US.GsIconSelector
  };

  constructor (props: IconSelectorProps) {
    super(props);

    let selection: any = {};
    if (props.selectedIconSrc) {
      selection = IconSelector.getSelectedIconFromSrc(props.selectedIconSrc, props.iconLibraries);
    }

    this.state = {
      selectedLibIndex: selection.libIndex || 0
    };
  }

  public shouldComponentUpdate(nextProps: IconSelectorProps, nextState: IconSelectorState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  static getDerivedStateFromProps (props: IconSelectorProps, state: IconSelectorState)
    : IconSelectorState {
      if (props.selectedIconSrc) {
        const selection =  IconSelector.getSelectedIconFromSrc(props.selectedIconSrc, props.iconLibraries);
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

  static componentName: string = 'IconSelector';

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

    let gridClassName = 'gs-icon-selector-grid';
    if (selectedIcon && selectedIcon.libIndex === selectedLibIndex && selectedIcon.iconIndex === index) {
      gridClassName += ' gs-icon-selector-grid-selected';
    }
    return (
      // @ts-ignore
      <Card.Grid
        key={index.toString()}
        className={gridClassName}
        onClick={() => {
          if (onIconSelect) {
            onIconSelect(icon.src);
          }
        }}
      >
        <Avatar
          className="gs-icon-selector-grid-avatar"
          size="default"
          src={icon.src}
          alt={icon.caption}
          shape="square"
          />
        <Card.Meta
          className="gs-icon-selector-grid-description"
          description={icon.caption}
        />
      </Card.Grid>
    );
  }

  render() {
    const {
      locale,
      iconLibraries
    } = this.props;

    const {
      selectedLibIndex
    } = this.state;

    return (
      <div className="gs-icon-selector">
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
        <Card className="gs-icon-selector-card">
          {
            iconLibraries[selectedLibIndex].icons.map((icon: any, index: number) => {
              return this.getGallery(icon, index);
            })
          }
        </Card>
      </div>
    );
  }
}

export default localize(IconSelector, IconSelector.componentName);
