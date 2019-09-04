import * as React from 'react';

import {
  Collapse,
  Form
} from 'antd';

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

export interface FieldConfig {
  color?: React.ReactNode | false;
  width?: React.ReactNode | false;
  opacity?: React.ReactNode | false;
  dash?: React.ReactNode | false;
  dashOffset?: React.ReactNode | false;
  cap?: React.ReactNode | false;
  join?: React.ReactNode | false;
  graphicStrokeType?: React.ReactNode | false;
  graphicFillType?: React.ReactNode | false;
}

export interface LineEditorDefaultProps {
  /** Language package */
  locale: LineEditorLocale;
  fieldConfig?: FieldConfig;
}

// non default props
export interface LineEditorProps extends Partial<LineEditorDefaultProps> {
  /** Symbolizer */
  symbolizer: LineSymbolizer;
  /** Callback when symbolizer changes */
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

interface LineEditorState {
  fieldConfig?: FieldConfig;
}

export class LineEditor extends React.Component<LineEditorProps, LineEditorState> {

  public shouldComponentUpdate(nextProps: LineEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  public static defaultProps: LineEditorDefaultProps = {
    locale: en_US.GsLineEditor,
    fieldConfig: {
      color: <ColorField/>,
      width: <WidthField/>,
      opacity: <OpacityField/>,
      dash: <LineDashField/>,
      dashOffset: <OffsetField/>,
      cap: <LineCapField/>,
      join: <LineJoinField/>,
      graphicStrokeType: false,
      graphicFillType: false
    }
  };

  static getDerivedStateFromProps(props: LineEditorProps, state: LineEditorState) {
    return {
      fieldConfig: {
        ...LineEditor.defaultProps.fieldConfig,
        ...props.fieldConfig
      }
    };
  }

  static componentName: string = 'LineEditor';

  onColorChange = (value: string) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.color = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onWidthChange = (value: number) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.width = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
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

  onDasharrayChange = (value: number[]) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.dasharray = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onDashOffsetChange = (value: LineSymbolizer['dashOffset']) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.dashOffset = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onCapChange = (value: LineSymbolizer['cap']) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.cap = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onJoinChange = (value: LineSymbolizer['join']) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.join = value;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onGraphicStrokeChange = (gStroke: PointSymbolizer) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.graphicStroke = gStroke;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  onGraphicFillChange = (gFill: PointSymbolizer) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.graphicFill = gFill;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
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

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    const {
      fieldConfig: {
        color: colorFieldConfig
      }
    } = this.state;
    let colorField;
    if (colorFieldConfig) {
      colorField = React.cloneElement(
        colorFieldConfig as React.ReactElement,
        {color, onChange: this.onColorChange}
      );
    }

    return (
      <div className="gs-line-symbolizer-editor" >
        <Collapse bordered={false} defaultActiveKey={['1']} onChange={(key: string) => (null)}>
          <Panel header="General" key="1">
            <Form.Item
              label={locale.colorLabel}
              {...formItemLayout}
            >
              {colorField}
            </Form.Item>
            <Form.Item
              label={locale.widthLabel}
              {...formItemLayout}
            >
              <WidthField
                width={width}
                onChange={this.onWidthChange}
              />
            </Form.Item>
            <Form.Item
              label={locale.opacityLabel}
              {...formItemLayout}
            >
              <OpacityField
                opacity={opacity}
                onChange={this.onOpacityChange}
              />
            </Form.Item>
            <Form.Item
              label={locale.dashLabel}
              {...formItemLayout}
            >
              <LineDashField
                dashArray={dasharray}
                onChange={this.onDasharrayChange}
              />
            </Form.Item>
            <Form.Item
              label={locale.dashOffsetLabel}
              {...formItemLayout}
            >
              <OffsetField
                offset={dashOffset}
                onChange={this.onDashOffsetChange}
                disabled={symbolizer.dasharray === undefined || _get(symbolizer, 'dasharray.length') === 0}
              />
            </Form.Item>
            <Form.Item
              label={locale.capLabel}
              {...formItemLayout}
            >
              <LineCapField
                cap={cap}
                onChange={this.onCapChange}
                />
            </Form.Item>
            <Form.Item
              label={locale.joinLabel}
              {...formItemLayout}
            >
              <LineJoinField
                join={join}
                onChange={this.onJoinChange}
              />
            </Form.Item>
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
