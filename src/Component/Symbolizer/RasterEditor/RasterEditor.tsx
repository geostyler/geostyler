import * as React from 'react';

import {
  Symbolizer,
  RasterSymbolizer,
  ChannelSelection,
  ContrastEnhancement,
  ColorMap
} from 'geostyler-style';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Form } from 'antd';
import OpacityField from '../Field/OpacityField/OpacityField';
import RasterChannelEditor from '../RasterChannelEditor/RasterChannelEditor';
import { Data } from 'geostyler-data';
import ContrastEnhancementField from '../Field/ContrastEnhancementField/ContrastEnhancementField';
import GammaField from '../Field/GammaField/GammaField';
import DataUtil from '../../../Util/DataUtil';
import ColorMapEditor from '../ColorMapEditor/ColorMapEditor';
import './RasterEditor.css';

const _cloneDeep = require('lodash/cloneDeep');
const _get = require('lodash/get');

// i18n
export interface RasterEditorLocale {
  opacityLabel?: string;
  hueRotateLabel?: string;
  brightnessMinLabel?: string;
  brightnessMaxLabel?: string;
  saturationLabel?: string;
  contrastLabel?: string;
  fadeDurationLabel?: string;
  resamplingLabel?: string;
  contrastEnhancementLabel?: string;
  gammaValueLabel?: string;
  colorMapLabel?: string;
  symbolizerLabel?: string;
  channelSelectionLabel?: string;
}

// default props
interface RasterEditorDefaultProps {
  locale: RasterEditorLocale;
}

// non default props
export interface RasterEditorProps extends Partial<RasterEditorDefaultProps> {
  contrastEnhancementTypes?: ContrastEnhancement['enhancementType'][];
  symbolizer: RasterSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
  internalDataDef?: Data;
  colorRamps?: {
    [name: string]: string[]
  };
}

type ShowDisplay = 'symbolizer' | 'colorMap' | 'contrastEnhancement';
export interface RasterEditorState {
  showDisplay: ShowDisplay;
}

export class RasterEditor extends React.Component<RasterEditorProps, RasterEditorState> {

  static componentName: string = 'RasterEditor';

  public static defaultProps: RasterEditorDefaultProps = {
    locale: en_US.GsRasterEditor
  };

  constructor(props: RasterEditorProps) {
    super(props);
    this.state = {
      showDisplay: 'symbolizer'
    };
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

  onChannelEditorChange = (value: ChannelSelection) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.channelSelection = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onContrastEnhancementChange = (value: ContrastEnhancement['enhancementType']) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    if (symbolizer.contrastEnhancement) {
      symbolizer.contrastEnhancement.enhancementType = value;
    } else {
      symbolizer.contrastEnhancement = {
        enhancementType: value
      };
    }
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onGammaValueChange = (value: ContrastEnhancement['gammaValue']) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    if (symbolizer.contrastEnhancement) {
      symbolizer.contrastEnhancement.gammaValue = value;
    } else {
      symbolizer.contrastEnhancement = {
        gammaValue: value
      };
    }
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onColorMapChange = (value: ColorMap) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.colorMap = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  toggleView = (showDisplay: ShowDisplay) => {
    this.setState({
      showDisplay
    });
  }

  render() {
    const {
      locale,
      symbolizer,
      internalDataDef,
      contrastEnhancementTypes,
      colorRamps
    } = this.props;

    const {
      opacity,
      contrastEnhancement,
      colorMap,
      channelSelection
    } = symbolizer;

    const {
      showDisplay
    } = this.state;

    let sourceChannelNames: string[];
    if (internalDataDef && DataUtil.isRaster(internalDataDef)) {
      sourceChannelNames = Object.keys(internalDataDef.rasterBandInfo);
    }

    sourceChannelNames = ['Redband', 'Greenband', 'Blueband'];
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const toggleViewButtonLayout = {
      wrapperCol: {span: 24}
    };

    return (
      <div className="gs-raster-symbolizer-editor" >
        {
          showDisplay !== 'symbolizer' ? null : ([
            <Form.Item
              label={locale.opacityLabel}
              {...formItemLayout}
            >
              <OpacityField
                opacity={opacity}
                onChange={this.onOpacityChange}
              />
            </Form.Item>,
            <Form.Item label={locale.contrastEnhancementLabel}
              {...formItemLayout}
            >
              <ContrastEnhancementField
                contrastEnhancement={_get(contrastEnhancement, 'enhancementType')}
                onChange={this.onContrastEnhancementChange}
              />
            </Form.Item>,
            <Form.Item
              label={locale.gammaValueLabel}
              {...formItemLayout}
            >
              <GammaField
                gamma={_get(contrastEnhancement, 'gammaValue')}
                onChange={this.onGammaValueChange}
              />
            </Form.Item>,
            <Form.Item
              className="gs-raster-editor-view-toggle"
              {...toggleViewButtonLayout}
            >
              <a onClick={() => {this.toggleView('colorMap'); }}>{`${locale.colorMapLabel} >>`}</a>
            </Form.Item>,
            <Form.Item
              className="gs-raster-editor-view-toggle"
              {...toggleViewButtonLayout}
            >
              <a onClick={() => {this.toggleView('contrastEnhancement'); }}>{`${locale.channelSelectionLabel} >>`}</a>
            </Form.Item>
          ])
        }
        {
          showDisplay !== 'contrastEnhancement' ? null : ([
            <RasterChannelEditor
              channelSelection={channelSelection}
              sourceChannelNames={sourceChannelNames}
              onChange={this.onChannelEditorChange}
              contrastEnhancementTypes={contrastEnhancementTypes}
            />,
            <Form.Item
              {...toggleViewButtonLayout}
            >
              <a onClick={() => {this.toggleView('symbolizer'); }}>{`<< ${locale.symbolizerLabel}`}</a>
            </Form.Item>
          ])
        }
        {
          showDisplay !== 'colorMap' ? null : ([
            <ColorMapEditor
              colorMap={colorMap}
              colorRamps={colorRamps}
              onChange={this.onColorMapChange}
            />,
            <Form.Item
              {...toggleViewButtonLayout}
            >
              <a onClick={() => {this.toggleView('symbolizer'); }}>{`<< ${locale.symbolizerLabel}`}</a>
            </Form.Item>
          ])
        }
      </div>
    );
  }
}

export default localize(RasterEditor, RasterEditor.componentName);
