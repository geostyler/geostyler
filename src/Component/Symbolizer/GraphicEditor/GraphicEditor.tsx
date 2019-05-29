import * as React from 'react';
import {
  PointSymbolizer,
  GraphicType,
  MarkSymbolizer,
  IconSymbolizer,
  FontIconSymbolizer
} from 'geostyler-style';
import MarkEditor from '../MarkEditor/MarkEditor';
import IconEditor, { IconEditorProps } from '../IconEditor/IconEditor';
import FontIconEditor, { FontIconEditorProps } from '../FontIconEditor/FontIconEditor';
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
  /** Default FontIconEditorProps */
  fontIconEditorProps?: Partial<FontIconEditorProps>;
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
  getGraphicFields = (graphic: PointSymbolizer, iconEditorProps?: any, fontIconEditorProps?: any): React.ReactNode => {
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
    } else if (_get(graphic, 'kind') === 'FontIcon') {
      return (
        <FontIconEditor
          symbolizer={graphic}
          onSymbolizerChange={onGraphicChange}
          // iconLibraries={iconLibraries}
          {...fontIconEditorProps}
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
      } else if (gType === 'FontIcon') {
        onGraphicChange(SymbolizerUtil.generateSymbolizer('FontIcon') as FontIconSymbolizer);
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
      iconEditorProps,
      fontIconEditorProps
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
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
        {this.getGraphicFields(graphic, iconEditorProps, fontIconEditorProps)}
    </div>
    );
  }
}

export default GraphicEditor;
