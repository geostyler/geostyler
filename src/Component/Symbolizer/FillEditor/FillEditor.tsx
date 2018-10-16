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

const _cloneDeep = require('lodash/cloneDeep');
const _get = require('lodash/get');

import { localize } from '../../LocaleWrapper/LocaleWrapper';

const Panel = Collapse.Panel;

// i18n
export interface FillEditorLocale {
  fillOpacityLabel?: string;
  fillColorLabel?: string;
  outlineColorLabel?: string;
  graphicFillTypeLabel?: string;
}

// non default props
interface FillEditorProps {
  symbolizer: FillSymbolizer;
  onSymbolizerChange: ((changedSymb: Symbolizer) => void);
  locale?: FillEditorLocale;
}

export class FillEditor extends React.Component<FillEditorProps, {}> {

  static componentName: string = 'FillEditor';

  onSymbolizerChange = (symbolizer: Symbolizer) => {
    this.props.onSymbolizerChange(symbolizer);
  }

  render() {
    const symbolizer = _cloneDeep(this.props.symbolizer);

    const {
      color,
      opacity,
      outlineColor,
      graphicFill
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
