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

export class FillEditor extends React.Component<FillEditorProps, {}> {

  static componentName: string = 'FillEditor';

  public static defaultProps: FillEditorDefaultProps = {
    locale: en_US.GsFillEditor
  };

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const symbolizer: FillSymbolizer = _cloneDeep(this.props.symbolizer);

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
              onChange={(value: string) => {
                symbolizer.color = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
            <OpacityField
              opacity={opacity}
              label={locale.fillOpacityLabel}
              onChange={(value: number) => {
                symbolizer.opacity = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
            <ColorField
              color={outlineColor}
              label={locale.outlineColorLabel}
              onChange={(value: string) => {
                symbolizer.outlineColor = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
            <WidthField
              width={outlineWidth}
              label={locale.outlineWidthLabel}
              onChange={(value: number) => {
                symbolizer.outlineWidth = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
            <LineDashField
              dashArray={outlineDasharray}
              label={locale.outlineDasharrayLabel}
              onChange={(value: number[]) => {
                symbolizer.outlineDasharray = value;
                this.props.onSymbolizerChange(symbolizer);
              }}
            />
          </Panel>
          <Panel header="Graphic Fill" key="2">
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

export default localize(FillEditor, FillEditor.componentName);
