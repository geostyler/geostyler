import * as React from 'react';

import {
  Symbolizer,
  FontIconSymbolizer
} from 'geostyler-style';

import OpacityField from '../Field/OpacityField/OpacityField';
// import ImageField from '../Field/ImageField/ImageField';
import FontPicker from '../Field/FontPicker/FontPicker';
import { IconLibrary } from '../IconSelector/IconSelector';

const _cloneDeep = require('lodash/cloneDeep');
const _isEmpty = require('lodash/isEmpty');
const _isEqual = require('lodash/isEqual');
import RotateField from '../Field/RotateField/RotateField';
import SizeField from '../Field/SizeField/SizeField';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';
import { Rnd } from 'react-rnd';

// i18n
export interface FontIconEditorLocale {
  imageLabel?: string;
  sizeLabel?: string;
  rotateLabel?: string;
  opacityLabel?: string;
  iconTooltipLabel?: string;
}

// default props
export interface FontIconEditorDefaultProps {
  locale: FontIconEditorLocale;
}

// non default props
export interface FontIconEditorProps extends Partial<FontIconEditorDefaultProps> {
  symbolizer: FontIconSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  iconLibraries?: IconLibrary[];
}

export class FontIconEditor extends React.Component<FontIconEditorProps> {

  public static defaultProps: FontIconEditorDefaultProps = {
    locale: en_US.GsFontIconEditor
  };

  public shouldComponentUpdate(nextProps: FontIconEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  static componentName: string = 'FontIconEditor';

  onFontIconChange = (value: any) => {
    debugger;
    // const {
    //   onSymbolizerChange
    // } = this.props;
    // const symbolizer = _cloneDeep(this.props.symbolizer);
    // symbolizer.image = value;
    // if (onSymbolizerChange) {
    //   onSymbolizerChange(symbolizer);
    // }
  }

  onSizeChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.size = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onRotateChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.rotate = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onOpacityChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  render() {
    const {
      locale
    } = this.props;

    const {
      symbolizer,
      iconLibraries
    } = this.props;

    const {
      opacity,
      image,
      size,
      rotate
    } = symbolizer;

    const imageSrc = !_isEmpty(image) ? image : 'URL to Icon';

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div className="gs-fonticon-symbolizer-editor" >
        <Form.Item
          label={locale.imageLabel}
          {...formItemLayout}
        >
          {/* <ImageField
            value={imageSrc}
            iconLibraries={iconLibraries}
            tooltipLabel={locale.iconTooltipLabel}
            onChange={this.onImageSrcChange}
          /> */}
          <FontPicker onChange={this.onFontIconChange} />
        </Form.Item>
        <Form.Item
          label={locale.sizeLabel}
          {...formItemLayout}
        >
          <SizeField
            size={size}
            onChange={this.onSizeChange}
          />
        </Form.Item>
        <Form.Item
          label={locale.rotateLabel}
          {...formItemLayout}
        >
          <RotateField
            rotate={rotate}
            onChange={this.onRotateChange}
          />
        </Form.Item>
        <Form.Item
          label=
          {locale.opacityLabel}
          {...formItemLayout}
        >
          <OpacityField
            opacity={opacity}
            onChange={this.onOpacityChange}
          />
        </Form.Item>
        <Rnd
          // className="gs-icon-selector-window"
          default={{
            x: 0,///*x || */window.innerWidth / 2,
            y: 0,///*y || */window.innerHeight / 2,
            width: 300,///*width || */'50%',
            height: 300///*height || */'50%'
          }}
          // enableResizing={{
          //   bottom: false,
          //   bottomLeft: false,
          //   bottomRight: false,
          //   left: false,
          //   right: false,
          //   top: false,
          //   topLeft: false,
          //   topRight: false
          // }}
          bounds="window"
          // dragHandleClassName="gs-icon-selector-window-header"
        >
          <div className="header gs-icon-selector-window-header">
            <span className="title">
              {/*{locale.windowLabel}*/}peter
            </span>
            {/* <Button
              icon="close"
              size="small"
              onClick={onClose}
            /> */}
          </div>
          <div className="gs-icon-selector-window-body">
            {/* <IconSelector
              iconLibraries={iconLibraries}
              onIconSelect={onIconSelect}
              selectedIconSrc={selectedIconSrc}
            /> */}
          </div>
          PETERPETERPETERPETERPETERPETERPETERPETERPETER
        </Rnd>
      </div>
    );
  }
}

export default localize(FontIconEditor, FontIconEditor.componentName);
