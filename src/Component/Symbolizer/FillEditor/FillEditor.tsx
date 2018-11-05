import * as React from 'react';
import { Collapse } from 'antd';

import {
  Symbolizer,
  FillSymbolizer,
  PointSymbolizer
} from 'geostyler-style';

import ColorField from '../Field/ColorField/ColorField';
import OpacityField from '../Field/OpacityField/OpacityField';
import GraphicEditor from '../GraphicEditor/GraphicEditor';
import WidthField from '../Field/WidthField/WidthField';

const _cloneDeep = require('lodash/cloneDeep');
const _get = require('lodash/get');
const _isEqual = require('lodash/isEqual');

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import LineDashField from '../Field/LineDashField/LineDashField';

const Panel = Collapse.Panel;

// i18n
export interface FillEditorLocale {
  fillOpacityLabel?: string;
  fillColorLabel?: string;
  outlineColorLabel?: string;
  outlineWidthLabel?: string;
  graphicFillTypeLabel?: string;
  outlineDasharrayLabel?: string;
}

interface FillEditorDefaultProps {
  locale: FillEditorLocale;
}

// non default props
interface FillEditorProps extends Partial<FillEditorDefaultProps> {
  symbolizer: FillSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
}

export class FillEditor extends React.Component<FillEditorProps> {

  static componentName: string = 'FillEditor';

  public static defaultProps: FillEditorDefaultProps = {
    locale: en_US.GsFillEditor
  };

  public shouldComponentUpdate(nextProps: FillEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  onFillColorChange = (value: string) => {
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.color = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onFillOpacityChange = (value: number) => {
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.opacity = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onOutlineColorChange = (value: string) => {
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.outlineColor = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onOutlineWidthChange = (value: number) => {
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.outlineWidth = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onOutlineDasharrayChange = (value: number[]) => {
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.outlineDasharray = value;
    this.props.onSymbolizerChange(symbolizer);
  }

  onGraphicChange = (gFill: PointSymbolizer) => {
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);
    symbolizer.graphicFill = gFill;
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const {
      symbolizer
    } = this.props;

    const {
      color,
      opacity,
      outlineColor,
      graphicFill,
      outlineWidth,
      outlineDasharray
    } = symbolizer;

    const {
      locale
    } = this.props;

    return (
      <div className="gs-fill-symbolizer-editor" >
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="General" key="1">
            <ColorField
              color={color}
              label={locale.fillColorLabel}
              onChange={this.onFillColorChange}
            />
            <OpacityField
              opacity={opacity}
              label={locale.fillOpacityLabel}
              onChange={this.onFillOpacityChange}
            />
            <ColorField
              color={outlineColor}
              label={locale.outlineColorLabel}
              onChange={this.onOutlineColorChange}
            />
            <WidthField
              width={outlineWidth}
              label={locale.outlineWidthLabel}
              onChange={this.onOutlineWidthChange}
            />
            <LineDashField
              dashArray={outlineDasharray}
              label={locale.outlineDasharrayLabel}
              onChange={this.onOutlineDasharrayChange}
            />
          </Panel>
          <Panel header="Graphic Fill" key="2">
              <GraphicEditor
                graphicTypeFieldLabel={locale.graphicFillTypeLabel}
                graphic={graphicFill}
                graphicType={_get(graphicFill, 'kind')}
                onGraphicChange={this.onGraphicChange}
              />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default localize(FillEditor, FillEditor.componentName);
