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
import SymbolizerUtil from 'src/Util/SymbolizerUtil';

const _get = require('lodash/get');

export interface DefaultGraphicEditorProps {
  /** Label being used on TypeField */
  graphicTypeFieldLabel: string;
}

// non default props
interface GraphicEditorProps extends Partial<DefaultGraphicEditorProps> {
  /** PointSymbolizer that is being used as graphic */
  graphic: PointSymbolizer;
  /** Currently selected GraphicType */
  graphicType: GraphicType;
  /** Gets called when changing a graphic */
  onGraphicChange: ((graphic: PointSymbolizer) => void);
  /** Default GraphicTypeFieldProps */
  graphicTypeFieldProps?: GraphicTypeFieldProps;
  /** Default IconEditorProps */
  iconEditorProps?: Partial<IconEditorProps>;
}

/** GraphicEditor to select between different graphic options */
class GraphicEditor extends React.Component <GraphicEditorProps, {}> {

  public static defaultProps: DefaultGraphicEditorProps = {
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
    if (_get(graphic, 'kind') === 'Mark') {
      let markGraphic: MarkSymbolizer = graphic as MarkSymbolizer;
      return (
        <MarkEditor
          symbolizer={markGraphic}
          onSymbolizerChange={(symb: MarkSymbolizer) => {
            this.props.onGraphicChange(symb);
          }}
        />
      );
    } else if (_get(graphic, 'kind') === 'Icon') {
      return (
        <IconEditor
          symbolizer={graphic}
          onSymbolizerChange={(symb: IconSymbolizer) => {
            this.props.onGraphicChange(symb);
          }}
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

    if (gType === 'Mark') {
      onGraphicChange(SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer);
    } else if (gType === 'Icon') {
      onGraphicChange(SymbolizerUtil.generateSymbolizer('Icon') as IconSymbolizer);
    } else {
      onGraphicChange(undefined);
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

    return (
      <div>
      <GraphicTypeField
        label={graphicTypeFieldLabel}
        graphicType={graphicType}
        onChange={(type: GraphicType) => {
          this.onGraphicTypeChange(type);
        }}
        {...graphicTypeFieldProps}
      />
      {this.getGraphicFields(graphic, iconEditorProps)}
    </div>
    );
  }
}

export default GraphicEditor;
