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
const _isEqual = require('lodash/isEqual');

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';

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

export interface LineEditorDefaultProps {
  /** Language package */
  locale: LineEditorLocale;
}

// non default props
export interface LineEditorProps extends Partial<LineEditorDefaultProps> {
  /** Symbolizer */
  symbolizer: LineSymbolizer;
  /** Callback when symbolizer changes */
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

export class LineEditor extends React.Component<LineEditorProps> {

  public shouldComponentUpdate(nextProps: LineEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  public static defaultProps: LineEditorDefaultProps = {
    locale: en_US.GsLineEditor
  };

  static componentName: string = 'LineEditor';

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  onColorChange = (value: string) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.color = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onWidthChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.width = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onOpacityChange = (value: number) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.opacity = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onDasharrayChange = (value: number[]) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.dasharray = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onDashOffsetChange = (value: LineSymbolizer['dashOffset']) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.dashOffset = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onCapChange = (value: LineSymbolizer['cap']) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.cap = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onJoinChange = (value: LineSymbolizer['join']) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.join = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onGraphicStrokeChange = (gStroke: PointSymbolizer) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.graphicStroke = gStroke;
    this.props.onSymbolizerChange(symbolizer);
  }

  onGraphicFillChange = (gFill: PointSymbolizer) => {
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.graphicFill = gFill;
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      symbolizer
     } = this.props;

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
              onChange={this.onColorChange}
            />
            <WidthField
              width={width}
              label={locale.widthLabel}
              onChange={this.onWidthChange}
            />
            <OpacityField
              opacity={opacity}
              label={locale.opacityLabel}
              onChange={this.onOpacityChange}
            />
            <LineDashField
              dashArray={dasharray}
              label={locale.dashLabel}
              onChange={this.onDasharrayChange}
            />
            <OffsetField
              offset={dashOffset}
              label={locale.dashOffsetLabel}
              onChange={this.onDashOffsetChange}
              disabled={symbolizer.dasharray === undefined || _get(symbolizer, 'dasharray.length') === 0}
            />
            <LineCapField
              cap={cap}
              label={locale.capLabel}
              onChange={this.onCapChange}
            />
            <LineJoinField
              join={join}
              label={locale.joinLabel}
              onChange={this.onJoinChange}
            />
          </Panel>
          <Panel header="Graphic Stroke" key="2">
            <GraphicEditor
              graphicTypeFieldLabel={locale.graphicStrokeTypeLabel}
              graphic={graphicStroke}
              graphicType={_get(graphicStroke, 'kind')}
              onGraphicChange={this.onGraphicStrokeChange}
            />
          </Panel>
          <Panel header="Graphic Fill" key="3">
            <GraphicEditor
              graphicTypeFieldLabel={locale.graphicFillTypeLabel}
              graphic={graphicFill}
              graphicType={_get(graphicFill, 'kind')}
              onGraphicChange={this.onGraphicFillChange}
            />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default localize(LineEditor, LineEditor.componentName);
