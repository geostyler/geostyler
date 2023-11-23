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
  Symbolizer,
  RasterSymbolizer,
  ChannelSelection,
  ContrastEnhancement,
  ColorMap
} from 'geostyler-style';

import { Form } from 'antd';
import { OpacityField, OpacityFieldProps } from '../Field/OpacityField/OpacityField';
import { RasterChannelEditor } from '../RasterChannelEditor/RasterChannelEditor';
import { ContrastEnhancementField } from '../Field/ContrastEnhancementField/ContrastEnhancementField';
import { GammaField, GammaFieldProps } from '../Field/GammaField/GammaField';
import DataUtil from '../../../Util/DataUtil';
import { ColorMapEditor } from '../ColorMapEditor/ColorMapEditor';

import './RasterEditor.less';

import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';

import {
  InputConfig,
  useGeoStylerComposition,
  useGeoStylerLocale,
  useGeoStylerData,
  useGeoStylerUnsupportedProperties
} from '../../../context/GeoStylerContext/GeoStylerContext';
import VisibilityField, { VisibilityFieldProps } from '../Field/VisibilityField/VisibilityField';
import { getFormItemConfig } from '../../../Util/FormItemUtil';

export interface RasterEditorComposableProps {
  opacityField?: InputConfig<OpacityFieldProps['value']>;
  // TODO add support for default values in ContrastEnhancementField
  contrastEnhancementField?: {
    visibility?: boolean;
  };
  colorMapEditor?: {
    visibility?: boolean;
  };
  rasterChannelEditor?: {
    visibility?: boolean;
  };
  gammaValueField?: InputConfig<GammaFieldProps['gamma']>;
  colorRamps?: {
    [name: string]: string[];
  };
  // TODO add support for default values in VisibilityField
  visibilityField?: InputConfig<VisibilityFieldProps['visibility']>;
}

export interface RasterEditorInternalProps {
  contrastEnhancementTypes?: ContrastEnhancement['enhancementType'][];
  symbolizer: RasterSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

type ShowDisplay = 'symbolizer' | 'colorMapEditor' | 'rasterChannelEditor';

export type RasterEditorProps = RasterEditorInternalProps & RasterEditorComposableProps;

export const RasterEditor: React.FC<RasterEditorProps> = (props) => {

  const data = useGeoStylerData();

  const composition = useGeoStylerComposition('RasterEditor');
  const composed = { ...props, ...composition };
  const {
    colorMapEditor,
    colorRamps,
    contrastEnhancementField,
    contrastEnhancementTypes,
    gammaValueField,
    onSymbolizerChange,
    opacityField,
    rasterChannelEditor,
    visibilityField,
    symbolizer
  } = composed;

  const locale = useGeoStylerLocale('RasterEditor');

  const {
    getFormItemSupportProps
  } = useGeoStylerUnsupportedProperties(symbolizer);

  const [showDisplay, setShowDisplay] = useState<ShowDisplay>('symbolizer');

  const onOpacityChange = (value: RasterSymbolizer['opacity']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onChannelEditorChange = (value: ChannelSelection) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.channelSelection = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onContrastEnhancementChange = (value: ContrastEnhancement['enhancementType']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    if (symbolizerClone.contrastEnhancement) {
      symbolizerClone.contrastEnhancement.enhancementType = value;
    } else {
      symbolizerClone.contrastEnhancement = {
        enhancementType: value
      };
    }
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onGammaValueChange = (value: ContrastEnhancement['gammaValue']) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    if (symbolizerClone.contrastEnhancement) {
      symbolizerClone.contrastEnhancement.gammaValue = value;
    } else {
      symbolizerClone.contrastEnhancement = {
        gammaValue: value
      };
    }
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onColorMapChange = (value: ColorMap) => {
    const symbolizerClone = _cloneDeep(symbolizer);
    symbolizerClone.colorMap = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onVisibilityChange = (newVisibility: RasterSymbolizer['visibility']) => {
    const symbolizerClone: RasterSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.visibility = newVisibility;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const {
    opacity,
    contrastEnhancement,
    colorMap,
    channelSelection,
    visibility
  } = symbolizer;

  let sourceChannelNames: string[];
  if (data && DataUtil.isRaster(data)) {
    sourceChannelNames = Object.keys(data.rasterBandInfo);
  }

  const toggleViewButtonLayout = {
    wrapperCol: { span: 24 }
  };

  const itemConfig = getFormItemConfig();

  return (
    <div className="gs-raster-symbolizer-editor" >
      {
        showDisplay !== 'symbolizer' ? null : (
          <>
            {
              visibilityField?.visibility === false ? null : (
                <Form.Item
                  {...itemConfig}
                  label={locale.visibilityLabel}
                >
                  <VisibilityField
                    visibility={visibility}
                    onChange={onVisibilityChange}
                  />
                </Form.Item>
              )
            }
            {
              opacityField?.visibility === false ? null : (
                <Form.Item
                  {...itemConfig}
                  label={locale.opacityLabel}
                  {...getFormItemSupportProps('opacity')}
                >
                  {
                    <OpacityField
                      value={opacity}
                      defaultValue={opacityField?.default as number}
                      onChange={onOpacityChange}
                    />
                  }
                </Form.Item>
              )
            }
            {
              contrastEnhancementField?.visibility === false ? null : (
                <Form.Item
                  {...itemConfig}
                  label={locale.contrastEnhancementLabel}
                  {...getFormItemSupportProps('contrastEnhancement')}
                >
                  <ContrastEnhancementField
                    contrastEnhancement={_get(contrastEnhancement, 'enhancementType')}
                    onChange={onContrastEnhancementChange}
                  />
                </Form.Item>
              )
            }
            {
              gammaValueField?.visibility === false ? null : (
                <Form.Item
                  {...itemConfig}
                  label={locale.gammaValueLabel}
                  {...getFormItemSupportProps('contrastEnhancement')}
                >
                  <GammaField
                    gamma={_get(contrastEnhancement, 'gammaValue') as number}
                    defaultValue={gammaValueField?.default}
                    onChange={onGammaValueChange}
                  />
                </Form.Item>
              )
            }
            {
              colorMapEditor?.visibility === false ? null : (
                <Form.Item
                  {...itemConfig}
                  className="gs-raster-editor-view-toggle"
                  {...toggleViewButtonLayout}
                >
                  <a onClick={() => setShowDisplay('colorMapEditor')}>
                    {`${locale.colorMapLabel} >>`}
                  </a>
                </Form.Item>
              )
            }
            {
              rasterChannelEditor?.visibility === false ? null : (
                <Form.Item
                  {...itemConfig}
                  className="gs-raster-editor-view-toggle"
                  {...toggleViewButtonLayout}
                >
                  <a onClick={() => setShowDisplay('rasterChannelEditor')}>
                    {`${locale.channelSelectionLabel} >>`}
                  </a>
                </Form.Item>
              )
            }
          </>
        )
      }
      {
        showDisplay !== 'rasterChannelEditor' ? null : (
          <>
            <RasterChannelEditor
              channelSelection={channelSelection}
              sourceChannelNames={sourceChannelNames}
              contrastEnhancementTypes={contrastEnhancementTypes}
              onChange={onChannelEditorChange}
            />
            <Form.Item
              {...toggleViewButtonLayout}
            >
              <a onClick={() => setShowDisplay('symbolizer')}>
                {`<< ${locale.symbolizerLabel}`}
              </a>
            </Form.Item>
          </>
        )
      }
      {
        showDisplay !== 'colorMapEditor' ? null : (
          <>
            <ColorMapEditor
              colorMap={colorMap}
              colorRamps={colorRamps}
              onChange={onColorMapChange}
            />
            <Form.Item
              {...toggleViewButtonLayout}
            >
              <a onClick={() => setShowDisplay('symbolizer')}>
                {`<< ${locale.symbolizerLabel}`}
              </a>
            </Form.Item>
          </>
        )
      }
    </div>
  );
};
