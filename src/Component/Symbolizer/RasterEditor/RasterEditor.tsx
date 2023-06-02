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

import React, { useContext, useState } from 'react';

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
import OpacityField, { OpacityFieldProps } from '../Field/OpacityField/OpacityField';
import RasterChannelEditor from '../RasterChannelEditor/RasterChannelEditor';
import { Data } from 'geostyler-data';
import ContrastEnhancementField,
{ ContrastEnhancementFieldProps } from '../Field/ContrastEnhancementField/ContrastEnhancementField';
import GammaField, { GammaFieldProps } from '../Field/GammaField/GammaField';
import DataUtil from '../../../Util/DataUtil';
import ColorMapEditor from '../ColorMapEditor/ColorMapEditor';

import './RasterEditor.less';

import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import type GeoStylerLocale from '../../../locale/locale';
import {
  UnsupportedPropertiesContext
} from '../../../context/UnsupportedPropertiesContext/UnsupportedPropertiesContext';
import UnsupportedPropertiesUtil from '../../../Util/UnsupportedPropertiesUtil';
import { InputConfig, useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

export interface RasterEditorComposableProps {
  opacityField?: InputConfig<OpacityFieldProps['value']>;
  // TODO add support for default values in ContrastEnhancementField
  contrastEnhancementField?: Omit<InputConfig<ContrastEnhancementFieldProps['contrastEnhancement']>, 'default'>;
  gammaValueField?: InputConfig<GammaFieldProps['gamma']>;
}

export interface RasterEditorInternalProps {
  locale?: GeoStylerLocale['RasterEditor'];
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
const COMPONENTNAME = 'RasterEditor';

export type RasterEditorProps = RasterEditorInternalProps & RasterEditorComposableProps;

export const RasterEditor: React.FC<RasterEditorProps> = (props) => {

  const composition = useGeoStylerComposition('RasterEditor');
  // const colorMapComposition = useGeoStylerComposition('ColorMapEditor');
  // const rasterChannelComposition = useGeoStylerComposition('RasterChannelEditor');

  const composed = {...props, ...composition};
  const {
    colorRamps,
    contrastEnhancementField,
    contrastEnhancementTypes,
    gammaValueField,
    internalDataDef,
    locale = en_US.RasterEditor,
    onSymbolizerChange,
    opacityField,
    symbolizer
  } = composed;

  const {
    unsupportedProperties,
    options
  } = useContext(UnsupportedPropertiesContext);

  const [showDisplay, setShowDisplay] = useState('symbolizer');

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

  const {
    opacity,
    contrastEnhancement,
    colorMap,
    channelSelection
  } = symbolizer;

  let sourceChannelNames: string[];
  if (internalDataDef && DataUtil.isRaster(internalDataDef)) {
    sourceChannelNames = Object.keys(internalDataDef.rasterBandInfo);
  }

  const toggleViewButtonLayout = {
    wrapperCol: {span: 24}
  };

  const getSupportProps = (propName: keyof RasterSymbolizer) => {
    return UnsupportedPropertiesUtil.getSupportProps<RasterSymbolizer>({
      propName,
      symbolizerName: 'RasterSymbolizer',
      unsupportedProperties,
      ...options
    });
  };

  return (
    <div className="gs-raster-symbolizer-editor" >
      {
        showDisplay !== 'symbolizer' ? null : (
          <>
            {
              opacityField?.visibility === false ? null : (
                <Form.Item
                  label={locale.opacityLabel}
                  {...getSupportProps('opacity')}
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
                  label={locale.contrastEnhancementLabel}
                  {...getSupportProps('contrastEnhancement')}
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
                  label={locale.gammaValueLabel}
                  {...getSupportProps('contrastEnhancement')}
                >
                  <GammaField
                    gamma={_get(contrastEnhancement, 'gammaValue') as number}
                    defaultValue={gammaValueField?.default}
                    onChange={onGammaValueChange}
                  />
                </Form.Item>
              )
            }
            <Form.Item
              className="gs-raster-editor-view-toggle"
              {...toggleViewButtonLayout}
            >
              <a onClick={() => setShowDisplay('colorMap')}>
                {`${locale.colorMapLabel} >>`}
              </a>
            </Form.Item>
            <Form.Item
              className="gs-raster-editor-view-toggle"
              {...toggleViewButtonLayout}
            >
              <a onClick={() => setShowDisplay('contrastEnhancement')}>
                {`${locale.channelSelectionLabel} >>`}
              </a>
            </Form.Item>
          </>
        )
      }
      {
        showDisplay !== 'contrastEnhancement' ? null : (
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
        showDisplay !== 'colorMap' ? null : (
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

export default localize(RasterEditor, COMPONENTNAME);
