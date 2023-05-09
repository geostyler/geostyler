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
  Form
} from 'antd';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';
import SourceChannelNameField from '../SourceChannelNameField/SourceChannelNameField';
import { ChannelSelection, RGBChannel } from 'geostyler-style';

import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import type GeoStylerLocale from '../../../../locale/locale';

// default props
interface RgbChannelFieldDefaultProps {
  locale: GeoStylerLocale['RgbChannelField'];
}

// non default props
export interface RgbChannelFieldProps extends Partial<RgbChannelFieldDefaultProps> {
  sourceChannelNames?: string[];
  onChange?: (channelSelection: ChannelSelection) => void;
  channelSelection?: ChannelSelection;
}

/**
 * RgbChannelField to map different bands to rgb
 */
export const RgbChannelField: React.FC<RgbChannelFieldProps> = ({
  sourceChannelNames,
  onChange,
  channelSelection,
  locale = en_US.RgbChannelField
}) => {

  const onRedChannelChange = (red: string) => {
    let rgb: RGBChannel;
    if (!channelSelection || (channelSelection && channelSelection.hasOwnProperty('grayChannel'))) {
      rgb = {
        redChannel: {
          sourceChannelName: red
        }
      } as RGBChannel;
    } else {
      rgb = _cloneDeep(channelSelection as RGBChannel);
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
    if (!channelSelection || (channelSelection && channelSelection.hasOwnProperty('grayChannel'))) {
      rgb = {
        greenChannel: {
          sourceChannelName: green
        }
      } as RGBChannel;
    } else {
      rgb = _cloneDeep(channelSelection as RGBChannel);
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
    if (!channelSelection || (channelSelection && channelSelection.hasOwnProperty('grayChannel'))) {
      rgb = {
        blueChannel: {
          sourceChannelName: blue
        }
      } as RGBChannel;
    } else {
      rgb = _cloneDeep(channelSelection as RGBChannel);
      rgb.blueChannel = {
        sourceChannelName: blue
      };
    }
    if (onChange) {
      onChange(rgb);
    }
  };

  return (
    <div>
      <Form.Item
        label={locale.redLabel}
      >
        <SourceChannelNameField
          sourceChannelNames={sourceChannelNames}
          onChange={onRedChannelChange}
          sourceChannelName={_get(channelSelection, 'redChannel.sourceChannelName')}
        />
      </Form.Item>
      <Form.Item
        label={locale.greenLabel}
      >
        <SourceChannelNameField
          sourceChannelNames={sourceChannelNames}
          onChange={onGreenChannelChange}
          sourceChannelName={_get(channelSelection, 'greenChannel.sourceChannelName')}
        />
      </Form.Item>
      <Form.Item
        label={locale.blueLabel}
      >
        <SourceChannelNameField
          sourceChannelNames={sourceChannelNames}
          onChange={onBlueChannelChange}
          sourceChannelName={_get(channelSelection, 'blueChannel.sourceChannelName')}
        />
      </Form.Item>
    </div>
  );
};

export default localize(RgbChannelField, 'RgbChannelField');
