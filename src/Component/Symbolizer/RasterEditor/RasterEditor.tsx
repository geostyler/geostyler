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
import { CompositionContext, Compositions } from '../../CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import './RasterEditor.less';

import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';

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
    [name: string]: string[];
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
  };

  onChannelEditorChange = (value: ChannelSelection) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.channelSelection = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

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
  };

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
  };

  onColorMapChange = (value: ColorMap) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.colorMap = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  };

  /**
   * Toggles the editor view. Switches from SymbolizerEditor to ChannelSelection
   * or ColorMap and back.
   */
  toggleView = (showDisplay: ShowDisplay) => {
    this.setState({
      showDisplay
    });
  };

  /**
   * Wraps a Form Item around a given element and adds its locale
   * to the From Item label.
   */
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
  };

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

    const toggleViewButtonLayout = {
      wrapperCol: {span: 24}
    };

    return (
      <CompositionContext.Consumer>
        {(composition: Compositions) => (
          <div className="gs-raster-symbolizer-editor" >
            {
              showDisplay !== 'symbolizer' ? null : ([
                this.wrapFormItem(
                  locale.opacityLabel,
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'RasterEditor.opacityField',
                    onChange: this.onOpacityChange,
                    propName: 'opacity',
                    propValue: opacity,
                    defaultElement: <OpacityField />
                  })
                ),
                this.wrapFormItem(
                  locale.contrastEnhancementLabel,
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'RasterEditor.contrastEnhancementField',
                    onChange: this.onContrastEnhancementChange,
                    propName: 'contrastEnhancement',
                    propValue: _get(contrastEnhancement, 'enhancementType'),
                    defaultElement: <ContrastEnhancementField />
                  })
                ),
                this.wrapFormItem(
                  locale.gammaValueLabel,
                  CompositionUtil.handleComposition({
                    composition,
                    path: 'RasterEditor.gammaValueField',
                    onChange: this.onGammaValueChange,
                    propName: 'gamma',
                    propValue: _get(contrastEnhancement, 'gammaValue'),
                    defaultElement: <GammaField />
                  })
                ),
                <Form.Item
                  className="gs-raster-editor-view-toggle"
                  key="toggleColorMap"
                  {...toggleViewButtonLayout}
                >
                  <a onClick={() => {this.toggleView('colorMap'); }}>{`${locale.colorMapLabel} >>`}</a>
                </Form.Item>,
                <Form.Item
                  className="gs-raster-editor-view-toggle"
                  key="toggleContrastEnhancement"
                  {...toggleViewButtonLayout}
                >
                  <a onClick={() => {this.toggleView('contrastEnhancement'); }}>
                    {`${locale.channelSelectionLabel} >>`}
                  </a>
                </Form.Item>
              ])
            }
            {
              showDisplay !== 'contrastEnhancement' ? null : ([
                CompositionUtil.handleComposition({
                  composition,
                  path: 'RasterEditor.rasterChannelField',
                  onChange: this.onChannelEditorChange,
                  propName: 'channelSelection',
                  propValue: channelSelection,
                  defaultElement: (
                    <RasterChannelEditor
                      sourceChannelNames={sourceChannelNames}
                      contrastEnhancementTypes={contrastEnhancementTypes}
                    />
                  )
                }),
                <Form.Item
                  key="toggleSymbolizer"
                  {...toggleViewButtonLayout}
                >
                  <a onClick={() => {this.toggleView('symbolizer'); }}>{`<< ${locale.symbolizerLabel}`}</a>
                </Form.Item>
              ])
            }
            {
              showDisplay !== 'colorMap' ? null : ([
                CompositionUtil.handleComposition({
                  composition,
                  path: 'RasterEditor.colorMapField',
                  onChange: this.onColorMapChange,
                  propName: 'colorMap',
                  propValue: colorMap,
                  defaultElement: (
                    <ColorMapEditor
                      colorRamps={colorRamps}
                    />
                  )
                }),
                <Form.Item
                  key="toggleSymbolizer"
                  {...toggleViewButtonLayout}
                >
                  <a onClick={() => {this.toggleView('symbolizer'); }}>{`<< ${locale.symbolizerLabel}`}</a>
                </Form.Item>
              ])
            }
          </div>
        )}
      </CompositionContext.Consumer>
    );
  }
}

export default localize(RasterEditor, RasterEditor.componentName);
