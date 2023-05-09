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

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import {
  ChannelSelection,
  Channel,
  ContrastEnhancement,
  isGrayChannel,
  isRgbChannel
} from 'geostyler-style';
import ChannelField from '../Field/ChannelField/ChannelField';

import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import { GeoStylerLocale } from '../../../locale/locale';
import { useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

// default props
interface RasterChannelEditorDefaultProps {
  locale: GeoStylerLocale['RasterChannelEditor'];
}

// non default props
export interface RasterChannelEditorProps extends Partial<RasterChannelEditorDefaultProps> {
  sourceChannelNames?: string[];
  onChange?: (channelSelection: ChannelSelection) => void;
  channelSelection?: ChannelSelection;
  contrastEnhancementTypes?: ContrastEnhancement['enhancementType'][];
}

const COMPONENTNAME = 'RasterChannelEditor';

/**
 * RasterChannelEditor to map bands to rgb or grayscale
 */
export const RasterChannelEditor: React.FC<RasterChannelEditorProps> = (props) => {

  const composition = useGeoStylerComposition('RasterChannelEditor', {});

  const composed = {...props, ...composition};

  const {
    locale = en_US.RasterChannelEditor,
    sourceChannelNames,
    onChange,
    channelSelection,
    contrastEnhancementTypes
  } = composed;

  const defaultRgbOrGray = !channelSelection
    ? composition.channelSelectionField?.default || 'rgb'
    : isGrayChannel(channelSelection) ? 'gray' : 'rgb';
  const [rgbOrGray, setRgbOrGray] = useState(defaultRgbOrGray);
  const defaultSelectedTab = !channelSelection ? 'red' : isGrayChannel(channelSelection) ? 'gray' : 'red';
  const [selectedTab, setSelectedTab] = useState<'red' | 'green' | 'blue' | 'gray'>(defaultSelectedTab);

  const onSelectionChange = (selection: 'rgb'|'gray') => {
    setRgbOrGray(selection);
  };

  const getTabLabel = (band: 'red' | 'green' | 'blue' | 'gray'): string => {
    let label = _get(locale, `${band}BandLabel`) ? _get(locale, `${band}BandLabel`) : band;
    return label;
  };

  /**
   * Updates ChannelField. Removes old props if channel type changes
   * from GrayChannel to RGBChannel or vice versa.
   */
  const onChannelFieldChange = (name: 'red' | 'green' | 'blue' | 'gray', channel: Channel) => {
    let newChannelSelection: ChannelSelection;

    if (!channelSelection
      || (isGrayChannel(channelSelection) && name !== 'gray')
      || (isRgbChannel(channelSelection) && name === 'gray')) {
      newChannelSelection = {} as ChannelSelection;
      // @ts-ignore
      newChannelSelection[`${name}Channel`] = channel;
    } else {
      newChannelSelection = _cloneDeep(channelSelection);
      // @ts-ignore
      newChannelSelection[`${name}Channel`] = channel;
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

  return (
    <div>
      <Form.Item
      >
        <span>{locale.titleLabel}</span>
      </Form.Item>
      {
        composition.channelSelectionField?.visibility === false ? null : (
          <Form.Item
            label={locale.channelSelectionLabel}
          >
            <Select
              className="editor-field rgb-or-gray-field"
              allowClear={true}
              value={rgbOrGray as 'rgb' | 'gray'}
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
      { !rgbOrGray ? null :
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

export default localize(RasterChannelEditor, COMPONENTNAME);
