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
  PointSymbolizer,
  GraphicType,
  MarkSymbolizer,
  IconSymbolizer
} from 'geostyler-style';
import MarkEditor from '../MarkEditor/MarkEditor';
import IconEditor, { IconEditorProps } from '../IconEditor/IconEditor';
import GraphicTypeField, { GraphicTypeFieldProps } from '../Field/GraphicTypeField/GraphicTypeField';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import { IconLibrary } from '../IconSelector/IconSelector';
import { Form } from 'antd';

import _get from 'lodash/get';

export interface GraphicEditorDefaultProps {
  /** Label being used on TypeField */
  graphicTypeFieldLabel: string;
}

// non default props
export interface GraphicEditorProps extends Partial<GraphicEditorDefaultProps> {
  /** PointSymbolizer that is being used as graphic */
  graphic: PointSymbolizer;
  /** Currently selected GraphicType */
  graphicType: GraphicType;
  /** Gets called when changing a graphic */
  onGraphicChange?: (graphic: PointSymbolizer) => void;
  /** Default GraphicTypeFieldProps */
  graphicTypeFieldProps?: GraphicTypeFieldProps;
  /** Default IconEditorProps */
  iconEditorProps?: Partial<IconEditorProps>;
  iconLibraries?: IconLibrary[];
}

/** GraphicEditor to select between different graphic options */
export const GraphicEditor: React.FC<GraphicEditorProps> = ({
  graphicTypeFieldLabel = 'Graphic-Type',
  graphic,
  graphicType,
  onGraphicChange,
  graphicTypeFieldProps,
  iconEditorProps,
  iconLibraries
}) => {

  let graphicsField: React.ReactNode;
  if (graphic?.kind === 'Mark') {
    let markGraphic: MarkSymbolizer = graphic as MarkSymbolizer;
    graphicsField = <MarkEditor
      symbolizer={markGraphic}
      onSymbolizerChange={onGraphicChange}
    />;
  } else if (graphic?.kind === 'Icon') {
    graphicsField =  <IconEditor
      symbolizer={graphic}
      onSymbolizerChange={onGraphicChange}
      iconLibraries={iconLibraries}
      {...iconEditorProps}
    />;
  }

  /**
   * If GraphicType changed, call props.onGraphicChange with default PointSymbolizers.
   * If GraphicType was unselected, call props.onGraphicChange with undefined to reset values.
   *
   * @param newGraphicType currently selected GraphicType
   */
  const onGraphicTypeChange = (newGraphicType: GraphicType): void => {
    if (onGraphicChange) {
      if (newGraphicType === 'Mark') {
        onGraphicChange(SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer);
      } else if (newGraphicType === 'Icon') {
        onGraphicChange(SymbolizerUtil.generateSymbolizer('Icon') as IconSymbolizer);
      } else {
        onGraphicChange(undefined);
      }
    }
  };

  return (
    <div>
      <Form.Item
        label={graphicTypeFieldLabel}
      >
        <GraphicTypeField
          graphicType={graphicType}
          onChange={onGraphicTypeChange}
          {...graphicTypeFieldProps}
        />
      </Form.Item>
      {graphicsField}
    </div>
  );
};

export default GraphicEditor;
