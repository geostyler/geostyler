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

import React, { useCallback } from 'react';

import {
  Tooltip
} from 'antd';

import { IconSelectorWindow } from '../../IconSelectorWindow/IconSelectorWindow';
import { IconLibrary } from '../../IconSelector/IconSelector';

import './ImageField.less';
import { PictureOutlined } from '@ant-design/icons';
import { Expression, IconSymbolizer, Sprite, isSprite } from 'geostyler-style';
import StringExpressionInput from '../../../ExpressionInput/StringExpressionInput/StringExpressionInput';

import './ImageField.less';
import { FieldSet } from '../../../FieldSet/FieldSet';
import NumberExpressionInput from '../../../ExpressionInput/NumberExpressionInput/NumberExpressionInput';

export interface ImageFieldProps {
  /** The tooltip label for the iconLibraries button. */
  tooltipLabel?: string;
  /** The tooltip label for the sprite button. */
  spriteTooltipLabel?: string;
  /** The placeholder text when no value was provided yet. */
  placeholder?: string;
  /** True, if the iconLibrary should not be opened in a window. False otherwise. */
  windowless?: boolean;
  /** Disables the sprite input fields */
  disableSprite?: boolean;
  /**
   * The callback when the iconLibraries button was clicked.
   * This will only be called, when 'windowless' is true.
   */
  onIconLibrariesClick?: () => void;
  /** The value of the image field. */
  value?: IconSymbolizer['image'];
  /** The callback that is triggered when the value changes. */
  onChange?: (image: IconSymbolizer['image']) => void;
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
  spriteTooltipLabel = 'Use sprite',
  placeholder = 'URL to image',
  windowless = false,
  disableSprite = false,
  onIconLibrariesClick = () => { }
}) => {

  const [windowVisible, setWindowVisible] = React.useState<boolean>(false);

  const openWindow = () => {
    if (windowless) {
      onIconLibrariesClick();
    } else {
      setWindowVisible(true);
    }
  };

  const onCheckSpriteChange = useCallback(() => {
    if (isSprite(value)) {
      onChange?.(value.source);
    } else {
      onChange?.({
        source: value as string,
        position: [0, 0],
        size: [0, 0]
      });
    }
  }, [value, onChange]);

  const onSpriteChange = useCallback((
    val: Expression<number> | Expression<string> | undefined,
    key: 'x' | 'y' | 'width' | 'height' | 'source'
  ) => {
    if (!onChange) {
      return;
    }
    const newValue = (structuredClone(value) || {}) as Sprite ;
    const index = key === 'x' || key === 'width' ? 0 : 1;
    const target = key === 'x' || key === 'y' ? 'position' : 'size';
    if (key === 'source') {
      newValue.source = val as Expression<string>;
    } else {
      newValue[target][index] = val as Expression<number>;
    }
    onChange(newValue);
  }, [value, onChange]);

  const closeWindow = () => {
    setWindowVisible(false);
  };

  const stringValue = (isSprite(value) ? value.source : value) as string;


  return (
    <>
      <div className="editor-field gs-image-field">
        <StringExpressionInput
          className={iconLibraries ? 'gs-image-field-gallery-addon' : undefined}
          value={stringValue}
          inputProps={{
            placeholder: placeholder,
            addonAfter: iconLibraries && (
              <Tooltip title={tooltipLabel}>
                <PictureOutlined className="gs-image-field-gallery-icon" type="picture" onClick={openWindow} />
              </Tooltip>
            )
          }}
          onChange={(val: any) => {
            if (isSprite(value)) {
              onSpriteChange(val, 'source');
            } else {
              onChange?.(val);
            }
          }}
        />
        {
          !disableSprite &&
            <FieldSet title={spriteTooltipLabel} checked={isSprite(value)} onCheckChange={onCheckSpriteChange} >
              {isSprite(value) &&
                <div className='spriterow'>
                  <span>
                    x
                    <NumberExpressionInput value={value.position[0]} onChange={(val) => onSpriteChange(val, 'x')} />
                  </span>
                  <span>
                    y
                    <NumberExpressionInput value={value.position[1]} onChange={(val) => onSpriteChange(val, 'y')} />
                  </span>
                  <span>
                    width
                    <NumberExpressionInput value={value.size[0]} onChange={(val) => onSpriteChange(val, 'width')} />
                  </span>
                  <span>
                    height
                    <NumberExpressionInput value={value.size[1]} onChange={(val) => onSpriteChange(val, 'height')} />
                  </span>
                </div>
              }
            </FieldSet>
        }
      </div>
      <IconSelectorWindow
        open={windowVisible}
        onClose={closeWindow}
        iconLibraries={iconLibraries}
        selectedIconSrc={stringValue}
        onIconSelect={(src: string) => {
          if (onChange) {
            onChange(src);
          }
        }}
      />
    </>
  );
};
