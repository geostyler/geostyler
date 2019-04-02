import * as React from 'react';

import {
  Form
} from 'antd';

import { Data } from 'geostyler-data';
import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';
import SourceChannelNameSelectionField from '../SourceChannelNameField/SourceChannelNameField';
import { ChannelSelection, RGBChannel } from 'geostyler-style';

const _get = require('lodash/get');
const _cloneDeep = require('lodash/cloneDeep');

// i18n
export interface RgbChannelFieldLocale {
  redLabel: string;
  greenLabel: string;
  blueLabel: string;
}

// default props
interface RgbChannelFieldDefaultProps {
  locale: RgbChannelFieldLocale;
}

// non default props
export interface RgbChannelFieldProps extends Partial<RgbChannelFieldDefaultProps> {
  internalDataDef?: Data;
  onChange?: (channelSelection: ChannelSelection) => void;
  channelSelection?: ChannelSelection;
}

/**
 * RgbChannelField to map different bands to rgb
 */
export class RgbChannelField extends React.Component<RgbChannelFieldProps> {

  static componentName: string = 'RgbChannelField';

  public static defaultProps: RgbChannelFieldDefaultProps = {
    locale: en_US.GsRgbChannelField
  };

  onRedChannelChange = (red: string) => {
    const {
      channelSelection,
      onChange
    } = this.props;

    let rgb: RGBChannel;
    if (!channelSelection || (channelSelection && channelSelection.hasOwnProperty('grayChannel'))) {
      rgb = {
        redChannel: {
          sourceChannelName: red
        }
      } as RGBChannel;
    } else {
      rgb = _cloneDeep(channelSelection);
      rgb.redChannel = {
        sourceChannelName: red
      };
    }
    // const {
    //   redChannel
    // } = channelSelection as RGBChannel;

    // const newRedChannel: Channel = {
    //   sourceChannelName: red,
    //   ...redChannel
    // };
    // let rgb: ChannelSelection = {
    //   redChannel: newRedChannel,
    //   ...channelSelection
    // };
    onChange(rgb);
  }

  onGreenChannelChange = (green: string) => {
    const {
      channelSelection,
      onChange
    } = this.props;
    let rgb: RGBChannel;
    if (!channelSelection || (channelSelection && channelSelection.hasOwnProperty('grayChannel'))) {
      rgb = {
        greenChannel: {
          sourceChannelName: green
        }
      } as RGBChannel;
    } else {
      rgb = _cloneDeep(channelSelection);
      rgb.greenChannel = {
        sourceChannelName: green
      };
    }
    // const {
    //   greenChannel
    // } = channelSelection as RGBChannel;

    // const newGreenChannel: Channel = {
    //   sourceChannelName: green,
    //   ...greenChannel
    // };
    // let rgb: ChannelSelection = {
    //   greenChannel: newGreenChannel,
    //   ...channelSelection
    // };
    onChange(rgb);
  }

  onBlueChannelChange = (blue: string) => {
    const {
      channelSelection,
      onChange
    } = this.props;
    let rgb: RGBChannel;
    if (!channelSelection || (channelSelection && channelSelection.hasOwnProperty('grayChannel'))) {
      rgb = {
        blueChannel: {
          sourceChannelName: blue
        }
      } as RGBChannel;
    } else {
      rgb = _cloneDeep(channelSelection);
      rgb.blueChannel = {
        sourceChannelName: blue
      };
    }
    // const {
    //   blueChannel
    // } = channelSelection as RGBChannel;

    // const newBlueChannel: Channel = {
    //   sourceChannelName: blue,
    //   ...blueChannel
    // };
    // let rgb: ChannelSelection = {
    //   blueChannel: newBlueChannel,
    //   ...channelSelection
    // };
    onChange(rgb);
  }

  render() {
    const {
      internalDataDef,
      channelSelection,
      locale
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div>
        <Form.Item
          label={locale.redLabel}
          {...formItemLayout}
        >
          <SourceChannelNameSelectionField
            internalDataDef={internalDataDef}
            onChange={this.onRedChannelChange}
            sourceChannelName={_get(channelSelection, 'redChannel.sourceChannelName')}
          />
        </Form.Item>
        <Form.Item
          label={locale.greenLabel}
          {...formItemLayout}
        >
          <SourceChannelNameSelectionField
            internalDataDef={internalDataDef}
            onChange={this.onGreenChannelChange}
            sourceChannelName={_get(channelSelection, 'greenChannel.sourceChannelName')}
          />
        </Form.Item>
        <Form.Item
          label={locale.blueLabel}
          {...formItemLayout}
        >
          <SourceChannelNameSelectionField
            internalDataDef={internalDataDef}
            onChange={this.onBlueChannelChange}
            sourceChannelName={_get(channelSelection, 'blueChannel.sourceChannelName')}
          />
        </Form.Item>
      </div>
    );
  }
}

export default localize(RgbChannelField, RgbChannelField.componentName);
