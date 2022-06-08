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
const TabPane = Tabs.TabPane;

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

// i18n
export interface RasterChannelEditorLocale {
  channelSelectionLabel: string;
  redBandLabel: string;
  greenBandLabel: string;
  blueBandLabel: string;
  grayBandLabel: string;
  channelSelectionGrayLabel: string;
  channelSelectionRgbLabel: string;
  titleLabel: string;
}

// default props
interface RasterChannelEditorDefaultProps {
  locale: RasterChannelEditorLocale;
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
export const RasterChannelEditor: React.FC<RasterChannelEditorProps> = ({
  locale = en_US.GsRasterChannelEditor,
  sourceChannelNames,
  onChange,
  channelSelection,
  contrastEnhancementTypes
}) => {

  const defaultRgbOrGray = !channelSelection ? 'rgb' : isGrayChannel(channelSelection) ? 'gray' : 'rgb';
  const [rgbOrGray, setRgbOrGray] = useState(defaultRgbOrGray);
  const defaultSelectedTab = !channelSelection ? 'red' : isGrayChannel(channelSelection) ? 'gray' : 'red';
  const [selectedTab, setSelectedTab] = useState(defaultSelectedTab);

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
  const onChannelFieldChange = (name: string, channel: Channel) => {
    let newChannelSelection: ChannelSelection;

    if (!channelSelection
      || (isGrayChannel(channelSelection) && name !== 'gray')
      || (isRgbChannel(channelSelection) && name === 'gray')) {
      newChannelSelection = {} as ChannelSelection;
      newChannelSelection[`${name}Channel`] = channel;
    } else {
      newChannelSelection = _cloneDeep(channelSelection);
      newChannelSelection[`${name}Channel`] = channel;
    }

    if (onChange) {
      onChange(newChannelSelection);
    }
  };

  const onTabChange = (key: 'red' | 'green' | 'blue' | 'gray') => {
    setSelectedTab(key);
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

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };

  return (
    <div>
      <Form.Item
        {...formItemLayout}
      >
        <span>{locale.titleLabel}</span>
      </Form.Item>
      <Form.Item
        label={locale.channelSelectionLabel}
        {...formItemLayout}
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
      { !rgbOrGray ? null :
        (
          <Tabs onChange={onTabChange} type="card" activeKey={selectedTab}>
            {
              rgbOrGray === 'rgb' ? ([
                <TabPane tab={getTabLabel('red')} key="red">
                  <ChannelField
                    channel={redChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      onChannelFieldChange('red', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                </TabPane>,
                <TabPane tab={getTabLabel('green')} key="green">
                  <ChannelField
                    channel={greenChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      onChannelFieldChange('green', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                </TabPane>,
                <TabPane tab={getTabLabel('blue')} key="blue">
                  <ChannelField
                    channel={blueChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      onChannelFieldChange('blue', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                </TabPane>]
              ) : (
                <TabPane tab={getTabLabel('gray')} key="gray">
                  <ChannelField
                    channel={grayChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      onChannelFieldChange('gray', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                </TabPane>
              )
            }
          </Tabs>
        )
      }
    </div>
  );
};

export default localize(RasterChannelEditor, COMPONENTNAME);
