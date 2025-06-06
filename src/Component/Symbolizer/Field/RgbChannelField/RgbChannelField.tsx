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

import React, { useMemo } from 'react';

import {
  Form
} from 'antd';

import { SourceChannelNameField } from '../SourceChannelNameField/SourceChannelNameField';
import { isGeoStylerFunction, RGBChannel } from 'geostyler-style';

import _cloneDeep from 'lodash-es/cloneDeep.js';
import { useGeoStylerLocale } from '../../../../context/GeoStylerContext/GeoStylerContext';
import { getFormItemConfig } from '../../../../Util/FormItemUtil';

export interface RgbChannelFieldProps {
  sourceChannelNames?: string[];
  onChange?: (channelSelection: RGBChannel) => void;
  value?: RGBChannel;
}

/**
 * RgbChannelField to map different bands to rgb
 */
export const RgbChannelField: React.FC<RgbChannelFieldProps> = ({
  sourceChannelNames,
  onChange,
  value
}) => {

  const locale = useGeoStylerLocale('RgbChannelField');
  const redChannelname = useMemo(() => {
    return isGeoStylerFunction(value?.redChannel?.sourceChannelName)
      ? undefined
      : value?.redChannel?.sourceChannelName;
  }, [value]);
  const greenChannelName = useMemo(() => {
    return isGeoStylerFunction(value?.greenChannel?.sourceChannelName)
      ? undefined
      : value?.greenChannel?.sourceChannelName;
  }, [value]);
  const blueChannelName = useMemo(() => {
    return isGeoStylerFunction(value?.blueChannel?.sourceChannelName)
      ? undefined
      : value?.blueChannel?.sourceChannelName;
  }, [value]);

  const onRedChannelChange = (red: string) => {
    let rgb: RGBChannel;
    if (!value || (value && Object.prototype.hasOwnProperty.call(value, 'grayChannel'))) {
      rgb = {
        redChannel: {
          sourceChannelName: red
        }
      } as RGBChannel;
    } else {
      rgb = _cloneDeep(value as RGBChannel);
      rgb.redChannel = {
        sourceChannelName: red
      };
    }
    if (onChange) {
      onChange(rgb);
    }
  };

  const onGreenChannelChange = (green: string) => {
    let rgb: RGBChannel;
    if (!value || (value && Object.prototype.hasOwnProperty.call(value, 'grayChannel'))) {
      rgb = {
        greenChannel: {
          sourceChannelName: green
        }
      } as RGBChannel;
    } else {
      rgb = _cloneDeep(value as RGBChannel);
      rgb.greenChannel = {
        sourceChannelName: green
      };
    }
    if (onChange) {
      onChange(rgb);
    }
  };

  const onBlueChannelChange = (blue: string) => {
    let rgb: RGBChannel;
    if (!value || (value && Object.prototype.hasOwnProperty.call(value, 'grayChannel'))) {
      rgb = {
        blueChannel: {
          sourceChannelName: blue
        }
      } as RGBChannel;
    } else {
      rgb = _cloneDeep(value as RGBChannel);
      rgb.blueChannel = {
        sourceChannelName: blue
      };
    }
    if (onChange) {
      onChange(rgb);
    }
  };

  const itemConfig = getFormItemConfig();

  return (
    <div>
      <Form.Item
        {...itemConfig}
        label={locale.redLabel}
      >
        <SourceChannelNameField
          sourceChannelNames={sourceChannelNames}
          onChange={onRedChannelChange}
          value={redChannelname}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.greenLabel}
      >
        <SourceChannelNameField
          sourceChannelNames={sourceChannelNames}
          onChange={onGreenChannelChange}
          value={greenChannelName}
        />
      </Form.Item>
      <Form.Item
        {...itemConfig}
        label={locale.blueLabel}
      >
        <SourceChannelNameField
          sourceChannelNames={sourceChannelNames}
          onChange={onBlueChannelChange}
          value={blueChannelName}
        />
      </Form.Item>
    </div>
  );
};
