import * as React from 'react';

import {
  Symbolizer,
  IconSymbolizer
} from 'geostyler-style';

import OpacityField from '../Field/OpacityField/OpacityField';
import ImageField from '../Field/ImageField/ImageField';
import { IconLibrary } from '../IconSelector/IconSelector';

const _cloneDeep = require('lodash/cloneDeep');
const _isEmpty = require('lodash/isEmpty');
const _isEqual = require('lodash/isEqual');
import RotateField from '../Field/RotateField/RotateField';
import SizeField from '../Field/SizeField/SizeField';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';

import { CompositionContext, Compositions } from '../../CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';

// i18n
export interface IconEditorLocale {
  imageLabel?: string;
  sizeLabel?: string;
  rotateLabel?: string;
  opacityLabel?: string;
  iconTooltipLabel?: string;
}

// default props
export interface IconEditorDefaultProps {
  locale: IconEditorLocale;
}

// non default props
export interface IconEditorProps extends Partial<IconEditorDefaultProps> {
  symbolizer: IconSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  iconLibraries?: IconLibrary[];
}

export class IconEditor extends React.Component<IconEditorProps> {

  public static defaultProps: IconEditorDefaultProps = {
    locale: en_US.GsIconEditor
  };

  public shouldComponentUpdate(nextProps: IconEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  static componentName: string = 'IconEditor';

  onImageSrcChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.image = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
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

  wrapFormItem = (locale: string, element: React.ReactElement): React.ReactElement => {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return element == null ? null : (
      <Form.Item
      label={locale}
      {...formItemLayout}
      >
        {element}
      </Form.Item>
    );
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

    return (
      <CompositionContext.Consumer>
        {(composition: Compositions) => (
          <div className="gs-icon-symbolizer-editor" >
            {
              this.wrapFormItem(
                locale.imageLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'IconEditor.imageField',
                  onChange: this.onImageSrcChange,
                  propName: 'value',
                  propValue: imageSrc,
                  defaultElement: (
                    <ImageField
                      iconLibraries={iconLibraries}
                      tooltipLabel={locale.iconTooltipLabel}
                    />
                  )
                })
              )
            }
            {
              this.wrapFormItem(
                locale.sizeLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'IconEditor.sizeField',
                  onChange: this.onSizeChange,
                  propName: 'size',
                  propValue: size,
                  defaultElement: <SizeField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.rotateLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'IconEditor.rotateField',
                  onChange: this.onRotateChange,
                  propName: 'rotate',
                  propValue: rotate,
                  defaultElement: <RotateField />
                })
              )
            }
            {
              this.wrapFormItem(
                locale.opacityLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'IconEditor.opacityField',
                  onChange: this.onOpacityChange,
                  propName: 'opacity',
                  propValue: opacity,
                  defaultElement: <OpacityField />
                })
              )
            }
          </div>
        )}
      </CompositionContext.Consumer>
    );
  }
}

export default localize(IconEditor, IconEditor.componentName);
