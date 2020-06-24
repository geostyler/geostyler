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

const _get = require('lodash/get');

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
export class GraphicEditor extends React.Component <GraphicEditorProps> {

  public static defaultProps: GraphicEditorDefaultProps = {
    graphicTypeFieldLabel: 'Graphic-Type'
  };

  /**
   * Get the right Editor depending on kind of PointSymbolizer
   *
   * @param {PointSymbolizer} graphic Pointsymbolizer that should be editable
   * @param {any} iconEditorProps PassTroughProps for IconEditor
   * @return {React.ReactNode} MarkEditor or IconEditor or undefined
   */
  getGraphicFields = (graphic: PointSymbolizer, iconEditorProps?: any): React.ReactNode => {
    const {
      onGraphicChange,
      iconLibraries
    } = this.props;
    if (_get(graphic, 'kind') === 'Mark') {
      let markGraphic: MarkSymbolizer = graphic as MarkSymbolizer;
      return (
        <MarkEditor
          symbolizer={markGraphic}
          onSymbolizerChange={onGraphicChange}
        />
      );
    } else if (_get(graphic, 'kind') === 'Icon') {
      return (
        <IconEditor
          symbolizer={graphic}
          onSymbolizerChange={onGraphicChange}
          iconLibraries={iconLibraries}
          {...iconEditorProps}
        />
      );
    } else {
      return undefined;
    }
  }

  /**
   * If GraphicType changed, call props.onGraphicChange with default PointSymbolizers.
   * If GraphicType was unselected, call props.onGraphicChange with undefined to reset values.
   *
   * @param {GraphicType} gType currently selected GraphicType
   */
  onGraphicTypeChange = (gType: GraphicType): void => {
    const {
      onGraphicChange
    } = this.props;

    if (onGraphicChange) {
      if (gType === 'Mark') {
        onGraphicChange(SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer);
      } else if (gType === 'Icon') {
        onGraphicChange(SymbolizerUtil.generateSymbolizer('Icon') as IconSymbolizer);
      } else {
        onGraphicChange(undefined);
      }
    }
  }

  render() {
    const {
      graphic,
      graphicType,
      graphicTypeFieldLabel,
      graphicTypeFieldProps,
      iconEditorProps
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div>
        <Form.Item
          label={graphicTypeFieldLabel}
          {...formItemLayout}
        >
          <GraphicTypeField
            graphicType={graphicType}
            onChange={this.onGraphicTypeChange}
            {...graphicTypeFieldProps}
          />
        </Form.Item>
        {this.getGraphicFields(graphic, iconEditorProps)}
    </div>
    );
  }
}

export default GraphicEditor;
