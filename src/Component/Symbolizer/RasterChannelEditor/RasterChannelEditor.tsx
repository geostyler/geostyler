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
  RGBChannel,
  GrayChannel,
  ContrastEnhancement
} from 'geostyler-style';
import ChannelField from '../Field/ChannelField/ChannelField';

const _get = require('lodash/get');
const _cloneDeep = require('lodash/cloneDeep');

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

interface RasterChannelEditorState {
  rgbOrGray: 'rgb' | 'gray' | undefined;
  selectedTab: 'red' | 'green' | 'blue' | 'gray';
}

/**
 * RasterChannelEditor to map bands to rgb or grayscale
 */
export class RasterChannelEditor extends React.Component<RasterChannelEditorProps, RasterChannelEditorState> {

  static componentName: string = 'RasterChannelEditor';

  constructor(props: RasterChannelEditorProps) {
    super(props);
    const channelSelection = _get(props, 'channelSelection');
    const grayChannel = _get(props, 'channelSelection.grayChannel');
    this.state = {
      rgbOrGray: !channelSelection ? 'rgb' : grayChannel ? 'gray' : 'rgb',
      selectedTab: !channelSelection ? 'red' : grayChannel ? 'gray' : 'red'
    };
  }

  public static defaultProps: RasterChannelEditorDefaultProps = {
    locale: en_US.GsRasterChannelEditor
  };

  onSelectionChange = (rgbOrGray: 'rgb'|'gray') => {
    const {
      onChange
    } = this.props;

    this.setState({
      rgbOrGray
    }, () => {
      // reset channelSelection
      if (!rgbOrGray) {
        onChange(undefined);
      }
    });
  }

  getTabLabel = (band: 'red' | 'green' | 'blue' | 'gray'): string => {
    const {
      locale
    } = this.props;

    let label = _get(locale, `${band}BandLabel`) ? _get(locale, `${band}BandLabel`) : band;
    return label;
  }

  /**
   * Checks if ChannelSelection is of type RGBChannel.
   */
  isRgbChannel = (channels: ChannelSelection): channels is RGBChannel => {
    return (
      (channels as RGBChannel).redChannel !== undefined
      || (channels as RGBChannel).greenChannel !== undefined
      || (channels as RGBChannel).blueChannel !== undefined
    );
  }

  /**
   * Checks if ChannelSelection is of type GrayChannel.
   */
  isGrayChannel = (channels: ChannelSelection): channels is GrayChannel => {
    return (channels as GrayChannel).grayChannel !== undefined;
  }

  /**
   * Updates ChannelField. Removes old props if channel type changes
   * from GrayChannel to RGBChannel or vice versa.
   */
  onChannelFieldChange = (name: string, channel: Channel) => {
    const {
      channelSelection,
      onChange
    } = this.props;
    let newChannelSelection: ChannelSelection;

    if (!channelSelection
      || (this.isGrayChannel(channelSelection) && name !== 'gray')
      || (this.isRgbChannel(channelSelection) && name === 'gray')) {
      newChannelSelection = {} as ChannelSelection;
      newChannelSelection[`${name}Channel`] = channel;
    } else {
      newChannelSelection = _cloneDeep(channelSelection);
      newChannelSelection[`${name}Channel`] = channel;
    }

    if (onChange) {
      onChange(newChannelSelection);
    }
  }

  onTabChange = (key: 'red' | 'green' | 'blue' | 'gray') => {
    const {
      selectedTab,
      ...restState
    } = this.state;
    this.setState({
      selectedTab: key,
      ...restState
    });
  }

  render() {
    const {
      sourceChannelNames,
      channelSelection,
      contrastEnhancementTypes,
      locale
    } = this.props;

    const {
      rgbOrGray
    } = this.state;

    let redChannel: Channel;
    if (channelSelection && this.isRgbChannel(channelSelection) && channelSelection.redChannel) {
      redChannel = channelSelection.redChannel;
    }
    let greenChannel: Channel;
    if (channelSelection && this.isRgbChannel(channelSelection) && channelSelection.greenChannel) {
      greenChannel = channelSelection.greenChannel;
    }
    let blueChannel: Channel;
    if (channelSelection && this.isRgbChannel(channelSelection) && channelSelection.blueChannel) {
      blueChannel = channelSelection.blueChannel;
    }
    let grayChannel: Channel;
    if (channelSelection && this.isGrayChannel(channelSelection) && channelSelection.grayChannel) {
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
            onChange={this.onSelectionChange}
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
            <Tabs onChange={this.onTabChange} type="card">
            {
              rgbOrGray === 'rgb' ? ([
                <TabPane tab={this.getTabLabel('red')} key="red">
                  <ChannelField
                    channel={redChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      this.onChannelFieldChange('red', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                </TabPane>,
                <TabPane tab={this.getTabLabel('green')} key="green">
                  <ChannelField
                    channel={greenChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      this.onChannelFieldChange('green', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                </TabPane>,
                <TabPane tab={this.getTabLabel('blue')} key="blue">
                  <ChannelField
                    channel={blueChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      this.onChannelFieldChange('blue', channel);
                    }}
                    sourceChannelNames={sourceChannelNames}
                  />
                </TabPane>]
              ) : (
                <TabPane tab={this.getTabLabel('gray')} key="gray">
                  <ChannelField
                    channel={grayChannel}
                    contrastEnhancementTypes={contrastEnhancementTypes}
                    onChange={(channel: Channel) => {
                      this.onChannelFieldChange('gray', channel);
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
  }
}

export default localize(RasterChannelEditor, RasterChannelEditor.componentName);
