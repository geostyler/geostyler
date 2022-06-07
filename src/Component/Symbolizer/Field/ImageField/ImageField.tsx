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

import {
  Input,
  Tooltip
} from 'antd';

import IconSelectorWindow from '../../IconSelectorWindow/IconSelectorWindow';
import { IconLibrary } from '../../IconSelector/IconSelector';

import './ImageField.less';
import { PictureOutlined } from '@ant-design/icons';

// default props
interface ImageFieldDefaultProps {
  /** The tooltip label for the iconLibraries button. */
  tooltipLabel: string;
  /** The placeholder text when no value was provided yet. */
  placeholder: string;
  /** True, if the iconLibrary should not be opened in a window. False otherwise. */
  windowless: boolean;
  /**
   * The callback when the iconLibraries button was clicked.
   * This will only be called, when 'windowless' is true.
   */
  onIconLibrariesClick: () => void;
}

// non default props
export interface ImageFieldProps extends Partial<ImageFieldDefaultProps> {
  /** The value of the image field. */
  value?: string;
  /** The callback that is triggered when the value changes. */
  onChange?: (image: string) => void;
  /** Predefined list of icons to select from. */
  iconLibraries?: IconLibrary[];
}

/**
 * ImageField
 */
export const ImageField: React.FC<ImageFieldProps> = ({
  onChange,
  value,
  iconLibraries,
  tooltipLabel = 'Open Gallery',
  placeholder = 'URL to image',
  windowless = false,
  onIconLibrariesClick = () => {}
}) => {

  const [windowVisible, setWindowVisible] = React.useState<boolean>(false);

  const getIconSelectorButton = () => {
    return (
      <Tooltip title={tooltipLabel}>
        <PictureOutlined className="gs-image-field-gallery-icon" type="picture" onClick={openWindow} />
      </Tooltip>
    );
  };

  const openWindow = () => {
    if (windowless) {
      onIconLibrariesClick();
    } else {
      setWindowVisible(true);
    }
  };

  const closeWindow = () => {
    setWindowVisible(false);
  };

  return (
    <div className="editor-field gs-image-field">
      <Input
        className={iconLibraries ? 'gs-image-field-gallery-addon' : undefined}
        value={value}
        placeholder={placeholder}
        defaultValue={value}
        addonAfter={iconLibraries ? getIconSelectorButton() : undefined}
        onChange={(evt: any) => {
          if (onChange) {
            onChange(evt.target.value);
          }
        }}
      />
      {
        !windowVisible ? null :
          <IconSelectorWindow
            onClose={closeWindow}
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
};

export default ImageField;
