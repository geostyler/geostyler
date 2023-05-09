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

import React, { useContext } from 'react';
import {
  Collapse,
  Form
} from 'antd';

import {
  Symbolizer,
  FillSymbolizer,
  PointSymbolizer,
  GraphicType
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import GraphicEditor from '../GraphicEditor/GraphicEditor';
import WidthField from '../Field/WidthField/WidthField';

import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import LineDashField from '../Field/LineDashField/LineDashField';
import withDefaultsContext from '../../../hoc/withDefaultsContext';
import type GeoStylerLocale from '../../../locale/locale';
import {
  UnsupportedPropertiesContext
} from '../../../context/UnsupportedPropertiesContext/UnsupportedPropertiesContext';
import UnsupportedPropertiesUtil from '../../../Util/UnsupportedPropertiesUtil';
import { useGeoStylerComposition } from '../../../context/GeoStylerContext/GeoStylerContext';

const Panel = Collapse.Panel;

interface FillEditorDefaultProps {
  locale: GeoStylerLocale['FillEditor'];
}

// non default props
export interface FillEditorProps extends Partial<FillEditorDefaultProps> {
  symbolizer: FillSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

const COMPONENTNAME = 'FillEditor';

export const FillEditor: React.FC<FillEditorProps> = (props) => {

  const composition = useGeoStylerComposition('FillEditor', {});

  const composed = {...props, ...composition};

  const {
    locale = en_US.FillEditor,
    symbolizer,
    onSymbolizerChange
  } = composed;

  const {
    unsupportedProperties,
    options
  } = useContext(UnsupportedPropertiesContext);

  const onFillColorChange = (value: string) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onFillOpacityChange = (value: number) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.fillOpacity = value;

    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOpacityChange = (value: number) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.opacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineOpacityChange = (value: number) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineOpacity = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineColorChange = (value: string) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineColor = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineWidthChange = (value: number) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineWidth = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onOutlineDasharrayChange = (value: number[]) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.outlineDasharray = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const onGraphicChange = (newGraphicFill: PointSymbolizer) => {
    const symbolizerClone: FillSymbolizer = _cloneDeep(symbolizer);
    symbolizerClone.graphicFill = newGraphicFill;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizerClone);
    }
  };

  const {
    color,
    fillOpacity,
    outlineColor,
    graphicFill,
    outlineWidth,
    outlineDasharray,
    opacity,
    outlineOpacity
  } = symbolizer;

  const getSupportProps = (propName: keyof FillSymbolizer) => {
    return UnsupportedPropertiesUtil.getSupportProps<FillSymbolizer>({
      propName,
      symbolizerName: 'FillSymbolizer',
      unsupportedProperties,
      ...options
    });
  };

  return (
    <div className="gs-fill-symbolizer-editor" >
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="General" key="1">
          {
            composition.fillColorField?.visibility === false ? null : (
              <Form.Item
                label={locale.fillColorLabel}
                {...getSupportProps('color')}
              >
                <ColorField
                  color={color as string}
                  defaultValue={composition.fillColorField?.default}
                  onChange={onFillColorChange}
                />
              </Form.Item>
            )
          }
          {
            composition.fillOpacityField?.visibility === false ? null : (
              <Form.Item
                label={locale.fillOpacityLabel}
                {...getSupportProps('fillOpacity')}
              >
                <OpacityField
                  opacity={fillOpacity as number}
                  defaultValue={composition.fillOpacityField?.default}
                  onChange={onFillOpacityChange}
                />
              </Form.Item>
            )
          }
          {
            composition.opacityField?.visibility === false ? null : (
              <Form.Item
                label={locale.opacityLabel}
                {...getSupportProps('opacity')}
              >
                <OpacityField
                  opacity={opacity as number}
                  defaultValue={composition.opacityField?.default}
                  onChange={onOpacityChange}
                />
              </Form.Item>
            )
          }
          {
            composition.outlineOpacityField?.visibility === false ? null : (
              <Form.Item
                label={locale.outlineOpacityLabel}
                {...getSupportProps('outlineOpacity')}
              >
                <OpacityField
                  opacity={outlineOpacity as number}
                  defaultValue={composition.outlineOpacityField?.default}
                  onChange={onOutlineOpacityChange}
                />
              </Form.Item>
            )
          }
          {
            composition.outlineColorField?.visibility === false ? null : (
              <Form.Item
                label={locale.outlineColorLabel}
                {...getSupportProps('outlineColor')}
              >
                <ColorField
                  color={outlineColor as string}
                  defaultValue={composition.outlineColorField?.default}
                  onChange={onOutlineColorChange}
                />
              </Form.Item>
            )
          }
          {
            composition.outlineWidthField?.visibility === false ? null : (
              <Form.Item
                label={locale.outlineWidthLabel}
                {...getSupportProps('outlineWidth')}
              >
                <WidthField
                  width={outlineWidth as number}
                  defaultValue={composition.outlineWidthField?.default}
                  onChange={onOutlineWidthChange}
                />
              </Form.Item>
            )
          }
          {
            composition.outlineDasharrayField?.visibility === false ? null : (
              <Form.Item
                label={locale.outlineDasharrayLabel}
                {...getSupportProps('outlineDasharray')}
              >
                <LineDashField
                  dashArray={outlineDasharray as number[]}
                  onChange={onOutlineDasharrayChange}
                />
              </Form.Item>
            )
          }
        </Panel>
        <Panel header="Graphic Fill" key="2">
          {/* TODO allow changing graphicFill via composition context */}
          <GraphicEditor
            graphicTypeFieldLabel={locale.graphicFillTypeLabel}
            graphic={graphicFill}
            graphicType={_get(graphicFill, 'kind') as GraphicType}
            onGraphicChange={onGraphicChange}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default withDefaultsContext(localize(FillEditor, COMPONENTNAME));
