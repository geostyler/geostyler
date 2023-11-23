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

import React from 'react';

import {
  Form
} from 'antd';

import { SourceChannelNameField } from '../SourceChannelNameField/SourceChannelNameField';
import { ChannelSelection, GrayChannel } from 'geostyler-style';

import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import { useGeoStylerLocale } from '../../../../context/GeoStylerContext/GeoStylerContext';
import { getFormItemConfig } from '../../../../Util/FormItemUtil';

export interface GrayChannelFieldProps {
  sourceChannelNames?: string[];
  onChange?: (channelSelection: ChannelSelection) => void;
  channelSelection?: ChannelSelection;
}

/**
 * GrayChannelField to map a band to grayscale
 */
export const GrayChannelField: React.FC<GrayChannelFieldProps> = ({
  onChange,
  channelSelection,
  sourceChannelNames
}) => {

  const locale = useGeoStylerLocale('GrayChannelField');

  const onGrayChannelChange = (value: string) => {
    const gray = value;
    let newChannelSelection: GrayChannel;
    if (channelSelection && channelSelection.hasOwnProperty('grayChannel')) {
      newChannelSelection = _cloneDeep(channelSelection) as GrayChannel;
      newChannelSelection.grayChannel.sourceChannelName = gray;
    } else {
      newChannelSelection = {
        grayChannel: {
          sourceChannelName: gray
        }
      };
    }
    if (onChange) {
      onChange(newChannelSelection);
    }
  };

  const itemConfig = getFormItemConfig();

  return (
    <div>
      <Form.Item
        {...itemConfig}
        label={locale.grayLabel}
      >
        <SourceChannelNameField
          sourceChannelNames={sourceChannelNames}
          onChange={onGrayChannelChange}
          sourceChannelName={_get(channelSelection, 'grayChannel.sourceChannelName')}
        />
      </Form.Item>
    </div>
  );
};
