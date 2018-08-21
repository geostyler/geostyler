import * as React from 'react';
import {
  PointSymbolizer,
  GraphicType,
  MarkSymbolizer,
  IconSymbolizer
} from 'geostyler-style';
import MarkEditor from '../MarkEditor/MarkEditor';
import IconEditor, { DefaultIconEditorProps } from '../IconEditor/IconEditor';
import GraphicTypeField, { DefaultGraphicTypeFieldProps } from '../Field/GraphicTypeField/GraphicTypeField';

const _get = require('lodash/get');

export interface DefaultGraphicEditorProps {
  /** Label being used on TypeField */
  graphicTypeFieldLabel: string;
  /** Default GraphicTypeFieldProps */
  graphicTypeFieldProps?: DefaultGraphicTypeFieldProps;
  /** Default IconEditorProps */
  iconEditorProps?: DefaultIconEditorProps;
}

// non default props
interface GraphicEditorProps extends Partial<DefaultGraphicEditorProps> {
  /** PointSymbolizer that is being used as graphic */
  graphic: PointSymbolizer;
  /** Currently selected GraphicType */
  graphicType: GraphicType;
  /** Gets called when changing a graphic */
  onGraphicChange: ((graphic: PointSymbolizer) => void);
}

/** GraphicEditor to select between different graphic options */
class GraphicEditor extends React.Component <GraphicEditorProps, {}> {

  public static defaultProps: DefaultGraphicEditorProps = {
    graphicTypeFieldLabel: 'Graphic-Type',
    iconEditorProps: {
      defaultIconSource: 'img/openLayers_logo.svg'
    }
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
   * Get a default MarkGraphic
   *
   * @return {MarkSymbolizer} WellKnownName Circle
   */
  getDefaultMarkGraphic = (): MarkSymbolizer => {
    return ({
      kind: 'Mark',
      wellKnownName: 'Circle'
    });
  }

  /**
   * Get a default IconGraphic
   *
   * @return {IconSymbolizer} Icon
   */
  getDefaultIconGraphic = (): IconSymbolizer => {
    return ({
      kind: 'Icon',
      image: this.props.iconEditorProps.defaultIconSource
    });
  }

  /**
   * If GraphicType changed, call props.onGraphicChange with default PointSymbolizers.
   * If GraphicType was unselected, call props.onGraphicChange with undefined to reset values.
   *
   * @param {GraphicType} gType currently selected GraphicType
   */
  onGraphicTypeChange = (gType: GraphicType): void => {
    if (gType === 'Mark') {
      this.props.onGraphicChange(this.getDefaultMarkGraphic());
    } else if (gType === 'Icon') {
      this.props.onGraphicChange(this.getDefaultIconGraphic());
    } else {
      this.props.onGraphicChange(undefined);
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
