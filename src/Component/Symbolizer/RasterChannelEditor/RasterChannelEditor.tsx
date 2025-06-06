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

import React, { useState } from 'react';

import {
  Form,
  Select,
  Tabs
} from 'antd';
const Option = Select.Option;

import {
  ChannelSelection,
  Channel,
  ContrastEnhancement,
  isGrayChannel,
  isRgbChannel
} from 'geostyler-style';
import { ChannelField } from '../Field/ChannelField/ChannelField';

import _get from 'lodash-es/get.js';

import {
  InputConfig,
  useGeoStylerComposition,
  useGeoStylerLocale
} from '../../../context/GeoStylerContext/GeoStylerContext';
import { getFormItemConfig } from '../../../Util/FormItemUtil';

export interface RasterChannelEditorComposableProps {
  channelSelectionField?: InputConfig<'rgb' | 'gray'>;
}

export interface RasterChannelEditorInternalProps {
  sourceChannelNames?: string[];
  onChange?: (channelSelection: ChannelSelection) => void;
  channelSelection?: ChannelSelection;
  contrastEnhancementTypes?: ContrastEnhancement['enhancementType'][];
}

export type RasterChannelEditorProps = RasterChannelEditorInternalProps & RasterChannelEditorComposableProps;

/**
 * RasterChannelEditor to map bands to rgb or grayscale
 */
export const RasterChannelEditor: React.FC<RasterChannelEditorProps> = (props) => {

  const composition = useGeoStylerComposition('RasterChannelEditor');
  const composed = { ...props, ...composition };
  const {
    channelSelection,
    channelSelectionField,
    contrastEnhancementTypes,
    onChange,
    sourceChannelNames
  } = composed;

  const locale = useGeoStylerLocale('RasterChannelEditor');

  const defaultRgbOrGray = !channelSelection
    ? channelSelectionField?.default || 'rgb'
    : isGrayChannel(channelSelection) ? 'gray' : 'rgb';
  const [rgbOrGray, setRgbOrGray] = useState(defaultRgbOrGray);
  const defaultSelectedTab = !channelSelection ? 'red' : isGrayChannel(channelSelection) ? 'gray' : 'red';
  const [selectedTab, setSelectedTab] = useState<'red' | 'green' | 'blue' | 'gray'>(defaultSelectedTab);

  const onSelectionChange = (selection: 'rgb' | 'gray') => {
    setRgbOrGray(selection);
  };

  const getTabLabel = (band: 'red' | 'green' | 'blue' | 'gray'): string => {
    const label = _get(locale, `${band}BandLabel`) ? _get(locale, `${band}BandLabel`) : band;
    return label;
  };

  /**
   * Updates ChannelField. Removes old props if channel type changes
   * from GrayChannel to RGBChannel or vice versa.
   */
  const onChannelFieldChange = (name: 'red' | 'green' | 'blue' | 'gray', channel: Channel) => {
    let newChannelSelection: any;
    const key = `${name}Channel` as const;

    if (!channelSelection
      || (isGrayChannel(channelSelection) && name !== 'gray')
      || (isRgbChannel(channelSelection) && name === 'gray')) {
      newChannelSelection = {};
      newChannelSelection[key] = channel;
    } else {
      newChannelSelection = structuredClone(channelSelection);
      newChannelSelection[key] = channel;
    }

    if (onChange) {
      onChange(newChannelSelection);
    }
  };

  const onTabChange = (key: string) => {
    setSelectedTab(key as 'red' | 'green' | 'blue' | 'gray');
  };

  let redChannel: Channel;
  if (channelSelection && isRgbChannel(channelSelection) && channelSelection.redChannel) {
    redChannel = channelSelection.redChannel;
  }
  let greenChannel: Channel;
  if (channelSelection && isRgbChannel(channelSelection) && channelSelection.greenChannel) {
    greenChannel = channelSelection.greenChannel;
  }
  let blueChannel: Channel;
  if (channelSelection && isRgbChannel(channelSelection) && channelSelection.blueChannel) {
    blueChannel = channelSelection.blueChannel;
  }
  let grayChannel: Channel;
  if (channelSelection && isGrayChannel(channelSelection) && channelSelection.grayChannel) {
    grayChannel = channelSelection.grayChannel;
  }

  const itemConfig = getFormItemConfig();

  return (
    <div>
      <Form.Item
        {...itemConfig}
      >
        <span>{locale.titleLabel}</span>
      </Form.Item>
      {
        channelSelectionField?.visibility === false ? null : (
          <Form.Item
            {...itemConfig}
            label={locale.channelSelectionLabel}
          >
            <Select
              className="editor-field rgb-or-gray-field"
              allowClear={true}
              value={rgbOrGray}
              onChange={onSelectionChange}
            >
              <Option
                key="rgb"
                value="rgb"
              >{locale.channelSelectionRgbLabel}</Option>
              <Option
                key="gray"
                value="gray"
              >{locale.channelSelectionGrayLabel}</Option>
            </Select>
          </Form.Item>
        )
      }
      {!rgbOrGray ? null :
        rgbOrGray === 'rgb' ? (
          <Tabs
            onChange={onTabChange}
            type="card"
            activeKey={selectedTab}
            items={[
              {
                key: 'red',
                label: getTabLabel('red'),
                children: (
                  <ChannelField
                    channel={redChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      onChannelFieldChange('red', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                )
              }, {
                key: 'green',
                label: getTabLabel('green'),
                children: (
                  <ChannelField
                    channel={greenChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      onChannelFieldChange('green', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                )
              }, {
                key: 'blue',
                label: getTabLabel('blue'),
                children: (
                  <ChannelField
                    channel={blueChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      onChannelFieldChange('blue', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                )
              }
            ]}
          />
        ) : (
          <Tabs
            onChange={onTabChange}
            type="card"
            activeKey={'gray'}
            items={[
              {
                key: 'gray',
                label: getTabLabel('gray'),
                children: (
                  <ChannelField
                    channel={grayChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      onChannelFieldChange('gray', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                )
              }
            ]}
          />
        )
      }
    </div>
  );
};
