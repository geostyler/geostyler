import * as React from 'react';

import {
  Symbolizer,
  IconSymbolizer
} from 'geostyler-style';

import OpacityField from '../Field/OpacityField/OpacityField';
import ImageField from '../Field/ImageField/ImageField';

import {
  cloneDeep as _cloneDeep,
  isEmpty as _isEmpty
} from 'lodash';
import RotateField from '../Field/RotateField/RotateField';
import SizeField from '../Field/SizeField/SizeField';

// default props
export interface DefaultIconEditorProps {
  imageLabel: string;
  opacityLabel: string;
  rotateLabel: string;
  sizeLabel: string;
  defaultIconSource: string;
}

// non default props
interface IconEditorProps extends Partial<DefaultIconEditorProps> {
  symbolizer: IconSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

class IconEditor extends React.Component<IconEditorProps, {}> {

  public static defaultProps: DefaultIconEditorProps = {
    imageLabel: 'Source',
    opacityLabel: 'Opacity',
    rotateLabel: 'Rotation',
    sizeLabel: 'Size',
    defaultIconSource: 'https://upload.wikimedia.org/wikipedia/commons/6/67/OpenLayers_logo.svg'
  };

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      defaultIconSource,
      imageLabel,
      opacityLabel,
      rotateLabel,
      sizeLabel
    } = this.props;

    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      opacity,
      image,
      size,
      rotate
    } = symbolizer;

    const imageSrc = !_isEmpty(image) ? image : defaultIconSource;

    return (
      <div className="gs-icon-symbolizer-editor" >
        <ImageField
          image={imageSrc}
          label={imageLabel}
          onChange={(value: string) => {
            symbolizer.image = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <SizeField
          size={size}
          label={sizeLabel}
          onChange={(value: number) => {
            symbolizer.size = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <RotateField
          rotate={rotate}
          label={rotateLabel}
          onChange={(value: number) => {
            symbolizer.rotate = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
        <OpacityField
          opacity={opacity}
          label={opacityLabel}
          onChange={(value: number) => {
            symbolizer.opacity = value;
            this.props.onSymbolizerChange(symbolizer);
          }}
        />
      </div>
    );
  }
}

export default IconEditor;
