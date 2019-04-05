import * as React from 'react';

import {
  Form
} from 'antd';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';
import SourceChannelNameField from '../SourceChannelNameField/SourceChannelNameField';
import { ChannelSelection, GrayChannel } from 'geostyler-style';

const _get = require('lodash/get');
const _cloneDeep = require('lodash/cloneDeep');

// i18n
export interface GrayChannelFieldLocale {
  grayLabel: string;
}

// default props
interface GrayChannelFieldDefaultProps {
  locale: GrayChannelFieldLocale;
}

// non default props
export interface GrayChannelFieldProps extends Partial<GrayChannelFieldDefaultProps> {
  sourceChannelNames?: string[];
  onChange?: (channelSelection: ChannelSelection) => void;
  channelSelection?: ChannelSelection;
}

/**
 * GrayChannelField to map a band to grayscale
 */
export class GrayChannelField extends React.Component<GrayChannelFieldProps> {

  static componentName: string = 'GrayChannelField';

  public static defaultProps: GrayChannelFieldDefaultProps = {
    locale: en_US.GsGrayChannelField
  };

  onGrayChannelChange = (value: string) => {
    const {
      channelSelection,
      onChange
    } = this.props;

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
  }

  render() {
    const {
      sourceChannelNames,
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
          label={locale.grayLabel}
          {...formItemLayout}
        >
          <SourceChannelNameField
            sourceChannelNames={sourceChannelNames}
            onChange={this.onGrayChannelChange}
            sourceChannelName={_get(channelSelection, 'grayChannel.sourceChannelName')}
          />
        </Form.Item>
      </div>
    );
  }
}

export default localize(GrayChannelField, GrayChannelField.componentName);
