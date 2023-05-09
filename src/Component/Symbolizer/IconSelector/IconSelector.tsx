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

import React, { useEffect, useState } from 'react';

import {
  Avatar,
  Card,
  Select
} from 'antd';
const Option = Select.Option;

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

import './IconSelector.less';

import _isEqual from 'lodash/isEqual';
import type GeoStylerLocale from '../../../locale/locale';

// default props
export interface IconSelectorDefaultProps {
  locale: GeoStylerLocale['IconSelector'];
}

export type IconLibrary = {
  name: string;
  icons: {
    src: string;
    caption: string;
  }[];
};

type SelectedIcon = {
  libIndex: number;
  iconIndex: number;
};

// non default props
export interface IconSelectorProps extends Partial<IconSelectorDefaultProps> {
  iconLibraries: IconLibrary[];
  selectedIconSrc?: string;
  onIconSelect?: (iconSrc: string) => void;
}
const COMPONENTNAME = 'IconSelector';

export const IconSelector: React.FC<IconSelectorProps> = ({
  locale = en_US.IconSelector,
  iconLibraries,
  selectedIconSrc,
  onIconSelect
}) => {

  const [selectedLibIndex, setSelectedLibIndex] = useState<number>();
  const [selectedIcon, setSelectedIcon] = useState<SelectedIcon>();

  const getSelectedIconFromSrc = (src: string, newIconLibraries: IconLibrary[]): SelectedIcon => {
    let libIndex: number;
    let iconIndex: number;
    let found: boolean = false;

    for (let i = 0; i < newIconLibraries.length; i++) {
      const lib = newIconLibraries[i];
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
  };

  useEffect(() => {
    let selection: any = {};
    if (selectedIconSrc) {
      selection = getSelectedIconFromSrc(selectedIconSrc, iconLibraries);
    }
    setSelectedLibIndex(selection.libIndex);
    setSelectedIcon(selection);
  }, [selectedIconSrc, iconLibraries]);


  const libChange = (newLibIndex: number) => {
    setSelectedLibIndex(newLibIndex);
  };

  const getGallery = (icon: any, index: number): React.ReactNode => {
    let gridClassName = 'gs-icon-selector-grid';
    if (selectedIcon && selectedIcon.libIndex === selectedLibIndex && selectedIcon.iconIndex === index) {
      gridClassName += ' gs-icon-selector-grid-selected';
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
  };

  return (
    <div className="gs-icon-selector">
      <div className="gs-lib-row">
        <span className="gs-label">{`${locale.librarySelectLabel}:`}</span>
        <Select
          className="gs-select"
          allowClear={false}
          defaultValue={selectedLibIndex}
          onChange={libChange}
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
          iconLibraries[selectedLibIndex]?.icons?.map((icon: any, index: number) => {
            return getGallery(icon, index);
          })
        }
      </Card>
    </div>
  );
};

export default localize(IconSelector, COMPONENTNAME);
