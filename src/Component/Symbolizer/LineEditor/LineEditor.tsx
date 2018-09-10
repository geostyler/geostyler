import * as React from 'react';

import { Collapse } from 'antd';

import {
  Symbolizer,
  LineSymbolizer,
  PointSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import WidthField from '../Field/WidthField/WidthField';
import LineDashField from '../Field/LineDashField/LineDashField';
import LineCapField from '../Field/LineCapField/LineCapField';
import LineJoinField from '../Field/LineJoinField/LineJoinField';
import OffsetField from '../Field/OffsetField/OffsetField';
import GraphicEditor from '../GraphicEditor/GraphicEditor';

const _cloneDeep = require('lodash/cloneDeep');
const _get = require('lodash/get');

import { localize } from '../../LocaleWrapper/LocaleWrapper';

const Panel = Collapse.Panel;

// i18n
export interface LineEditorLocale {
  colorLabel?: string;
  widthLabel?: string;
  opacityLabel?: string;
  dashLabel?: string;
  dashOffsetLabel?: string;
  capLabel?: string;
  joinLabel?: string;
  graphicStrokeTypeLabel?: string;
  graphicFillTypeLabel?: string;
}

// non default props
interface LineEditorProps {
  /** Symbolizer */
  symbolizer: LineSymbolizer;
  /** Callback when symbolizer changes */
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
  /** Language package */
  locale?: LineEditorLocale;
}

export class LineEditor extends React.Component<LineEditorProps, {}> {

  static componentName: string = 'LineEditor';

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      color,
      width,
      opacity,
      dasharray,
      cap,
      join,
      dashOffset,
      graphicStroke,
      graphicFill
    } = symbolizer;

    const {
      locale
    } = this.props;

    return (
      <div className="gs-line-symbolizer-editor" >
        <Collapse bordered={false} defaultActiveKey={['1']} onChange={(key: string) => (null)}>
          <Panel header="General" key="1">
            <ColorField
              color={color}
              label={locale.colorLabel}
              onChange={(value: string) => {
                symbolizer.color = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
            <WidthField
              width={width}
              label={locale.widthLabel}
              onChange={(value: number) => {
                symbolizer.width = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
            <OpacityField
              opacity={opacity}
              label={locale.opacityLabel}
              onChange={(value: number) => {
                symbolizer.opacity = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
            <LineDashField
              dashArray={dasharray}
              label={locale.dashLabel}
              onChange={(value: number[]) => {
                symbolizer.dasharray = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
            <OffsetField
              offset={dashOffset}
              label={locale.dashOffsetLabel}
              onChange={(value: LineSymbolizer['dashOffset']) => {
                symbolizer.dashOffset = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
              disabled={symbolizer.dasharray === undefined || _get(symbolizer, 'dasharray.length') === 0}
            />
            <LineCapField
              cap={cap}
              label={locale.capLabel}
              onChange={(value: LineSymbolizer['cap']) => {
                symbolizer.cap = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
            <LineJoinField
              join={join}
              label={locale.joinLabel}
              onChange={(value: LineSymbolizer['join']) => {
                symbolizer.join = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
          </Panel>
          <Panel header="Graphic Stroke" key="2">
            <GraphicEditor
              graphicTypeFieldLabel={locale.graphicStrokeTypeLabel}
              graphic={graphicStroke}
              graphicType={_get(graphicStroke, 'kind')}
              onGraphicChange={(gStroke: PointSymbolizer) => {
                symbolizer.graphicStroke = gStroke;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
          </Panel>
          <Panel header="Graphic Fill" key="3">
            <GraphicEditor
              graphicTypeFieldLabel={locale.graphicFillTypeLabel}
              graphic={graphicFill}
              graphicType={_get(graphicFill, 'kind')}
              onGraphicChange={(gFill: PointSymbolizer) => {
                symbolizer.graphicFill = gFill;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default localize(LineEditor, LineEditor.componentName);
