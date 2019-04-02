import * as React from 'react';

import {
  Form,
  Select
} from 'antd';
const Option = Select.Option;

import { Data } from 'geostyler-data';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import RgbChannelField from '../Field/RgbChannelField/RgbChannelField';
import { ChannelSelection } from 'geostyler-style';
import GrayChannelField from '../Field/GrayChannelField/GrayChannelField';

const _get = require('lodash/get');

// i18n
export interface RasterChannelEditorLocale {
  channelSelectionLabel: string;
}

// default props
interface RasterChannelEditorDefaultProps {
  locale: RasterChannelEditorLocale;
}

// non default props
export interface RasterChannelEditorProps extends Partial<RasterChannelEditorDefaultProps> {
  internalDataDef?: Data;
  onChange?: (channelSelection: ChannelSelection) => void;
  channelSelection?: ChannelSelection;
}

interface RasterChannelEditorState {
  rgbOrGray: 'rgb' | 'gray' | undefined;
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
      rgbOrGray: !channelSelection ? undefined : grayChannel ? 'gray' : 'rgb'
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

  render() {
    const {
      internalDataDef,
      channelSelection,
      onChange,
      locale
    } = this.props;

    const {
      rgbOrGray
    } = this.state;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div>
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
            >rgb</Option>
            <Option
              key="gray"
              value="gray"
            >gray</Option>
          </Select>
        </Form.Item>
        {
          rgbOrGray === 'rgb' ?
            (<RgbChannelField
              internalDataDef={internalDataDef}
              channelSelection={channelSelection}
              onChange={onChange}
            />) : rgbOrGray === 'gray' ?
            (<GrayChannelField
              internalDataDef={internalDataDef}
              channelSelection={channelSelection}
              onChange={onChange}
            />) : null
        }
      </div>
    );
  }
}

export default localize(RasterChannelEditor, RasterChannelEditor.componentName);
