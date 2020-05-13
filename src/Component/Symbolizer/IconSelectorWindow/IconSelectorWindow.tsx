/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  Button
} from 'antd';

import { Rnd } from 'react-rnd';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

import IconSelector, { IconLibrary } from '../IconSelector/IconSelector';
import './IconSelectorWindow.less';

const _isEqual = require('lodash/isEqual');

// i18n
export interface IconSelectorWindowLocale {
  windowLabel?: string;
}

// default props
export interface IconSelectorWindowDefaultProps {
  locale: IconSelectorWindowLocale;
}

// non default props
export interface IconSelectorWindowProps extends Partial<IconSelectorWindowDefaultProps> {
  x?: number;
  y?: number;
  width?: number|string;
  height?: number|string;
  iconLibraries: IconLibrary[];
  selectedIconSrc?: string;
  onIconSelect?: (iconSrc: string) => void;
  onClose?: () => void;
}

export class IconSelectorWindow extends React.Component<IconSelectorWindowProps> {

  public static defaultProps: IconSelectorWindowDefaultProps = {
    locale: en_US.GsIconSelectorWindow
  };

  public shouldComponentUpdate(nextProps: IconSelectorWindowProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  static componentName: string = 'IconSelectorWindow';

  render() {
    const {
      locale,
      iconLibraries,
      x,
      y,
      width,
      height,
      onClose,
      selectedIconSrc,
      onIconSelect
    } = this.props;

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
            <IconSelector
              iconLibraries={iconLibraries}
              onIconSelect={onIconSelect}
              selectedIconSrc={selectedIconSrc}
            />
          </div>
        </Rnd>,
        document.body
      )
    );
  }
}

export default localize(IconSelectorWindow, IconSelectorWindow.componentName);
