import * as React from 'react';

import OlMap from 'ol/map';
import OlLayerBase from 'ol/layer/base';
import OlControl from 'ol/control/control';
import OlInteraction from 'ol/interaction/interaction';
import OlLayerVector from 'ol/layer/vector';
import OlSourceVector from 'ol/source/vector';
import OlGeomPoint from 'ol/geom/point';
import OlGeomLineString from 'ol/geom/linestring';
import OlGeomPolygon from 'ol/geom/polygon';
import OlFormatGeoJSON from 'ol/format/geojson';
import OlFeature from 'ol/feature';
import OlView from 'ol/view';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOSM from 'ol/source/osm';
import OlStyle from 'ol/style/style';
import OlStyleImage from 'ol/style/image';
import OlStyleFill from 'ol/style/fill';
import OlStyleText from 'ol/style/text';

import { Symbolizer, SymbolizerKind } from 'geostyler-style';

import './Preview.css';

import {
  Button,
  Tabs
} from 'antd';

const TabPane = Tabs.TabPane;

import 'ol/ol.css';
import './Preview.css';
import Editor from '../Editor/Editor';

import OlStyleParser from 'geostyler-openlayers-parser';

const _get = require('lodash/get');
const _isEqual = require('lodash/isEqual');
const _cloneDeep = require('lodash/cloneDeep');

import { Data } from 'geostyler-data';
import { DefaultIconEditorProps } from '../IconEditor/IconEditor';

import { localize } from '../../LocaleWrapper/LocaleWrapper';

// i18n
export interface PreviewLocale {
  openEditorText: string;
  closeEditorText: string;
}

// default props
export interface DefaultPreviewProps {
  projection: string;
  dataProjection: string;
  showOsmBackground: boolean;
  mapHeight: number;
  map: OlMap | undefined;
  layers: OlLayerBase[] | undefined;
  controls: OlControl[] | undefined;
  interactions: OlInteraction[] | undefined;
  unknownSymbolizerText?: string;
  iconEditorProps?: DefaultIconEditorProps;
  locale?: PreviewLocale;
}

// non default props
interface PreviewProps extends Partial<DefaultPreviewProps> {
  internalDataDef?: Data;
  symbolizer: Symbolizer[];
  onSymbolizerChange: (symbolizer: Symbolizer, key: number) => void;
  onAddSymbolizer?: () => void;
  onRemoveSymbolizer?: (symbolizer: Symbolizer) => void;
}

// state
interface PreviewState {
  symbolizer: Symbolizer[];
  editorVisible: boolean;
  mapTargetId: string;
}

/**
 * Symbolizer preview UI.
 */
export class Preview extends React.Component<PreviewProps, PreviewState> {

  /** reference to the underlying OpenLayers map */
  map: OlMap;

  /** refrence to the vector layer for the passed in features  */
  dataLayer: OlLayerVector;

  public static defaultProps: DefaultPreviewProps = {
    projection: 'EPSG:3857',
    dataProjection: 'EPSG:4326',
    showOsmBackground: true,
    mapHeight: 267,
    map: undefined,
    layers: undefined,
    controls: undefined,
    interactions: undefined
  };

  constructor(props: PreviewProps) {
    super(props);

    const randomId = Math.floor((1 + Math.random()) * 0x10000);
    this.state = {
      editorVisible: false,
      symbolizer: props.symbolizer,
      mapTargetId: `map_${randomId}`
    };
  }

  static componentName: string = 'Preview';

  static getDerivedStateFromProps(
      nextProps: PreviewProps,
      prevState: PreviewState): Partial<PreviewState> {

    return {
      symbolizer: nextProps.symbolizer
    };
  }

  componentDidUpdate(prevProps: PreviewProps, prevState: PreviewState) {
    if (this.dataLayer) {
      this.applySymbolizerToMapFeatures(this.state.symbolizer);
    }

    const features = this.props.internalDataDef ? this.props.internalDataDef.exampleFeatures : undefined;
    const prevFeatures = prevProps.internalDataDef ? prevProps.internalDataDef.exampleFeatures : undefined;
    let equal: boolean = true;
    if (!_isEqual(features, prevFeatures)) {
      equal = false;
    }
    this.state.symbolizer.some((symb: Symbolizer, idx: number) => {
      if (!prevState.symbolizer[idx] || !_isEqual(symb.kind, prevState.symbolizer[idx].kind)) {
        equal = false;
        return true;
      } else {
        return false;
      }
    });
    if (!equal) {
      this.updateFeatures();
    }
  }

  updateFeatures() {
    // Remove previous features
    this.dataLayer.getSource().clear();

    const format = new OlFormatGeoJSON({
      defaultDataProjection: this.props.dataProjection,
      featureProjection: this.map.getView().getProjection()
    });
    // add data features to style according to symbolizer and zoom to them (when existing)
    if (this.props.internalDataDef && this.props.internalDataDef.exampleFeatures) {
      const olFeatures = format.readFeatures(this.props.internalDataDef.exampleFeatures);
      this.dataLayer.getSource().addFeatures(olFeatures);
    // create a simple feature to see the symbolizer anyway
    } else {
      const geom = this.getSampleGeomFromSymbolizer();
      const sampleFeature = new OlFeature({
        geometry: geom.transform('EPSG:4326', 'EPSG:3857'),
        Name: 'Sample Feature'
      });
      this.dataLayer.getSource().addFeature(sampleFeature);
    }
    
    // zoom to feature extent
    const extent = this.dataLayer.getSource().getExtent();
    this.map.getView().fit(extent, {
      maxZoom: 20
    });
  }

  public componentDidMount() {
    let map: OlMap;
    if (!this.props.map) {
      // create a new OL map and bind it to this preview DIV
      map = new OlMap({
        layers: [],
        controls: [],
        interactions: [],
        target: this.state.mapTargetId,
        view: new OlView({
          projection: this.props.projection
        })
      });
    } else {
      // use passed in OL map and bind it to this preview DIV
      map = this.props.map;
      map.setTarget(this.state.mapTargetId);
    }

    // show an OSM background layer if configured and no map was passed in
    if (!this.props.map && this.props.showOsmBackground) {
      const osmLayer = new OlLayerTile({
        source: new OlSourceOSM()
      });
      map.addLayer(osmLayer);
    }

    // add configured OL control to map, when no map was passed in
    if (!this.props.map && this.props.controls) {
      this.props.controls.forEach((ctrl) => {
        map.addControl(ctrl);
      });
    }

    // add configured OL interaction to map, when no map was passed in
    if (!this.props.map && this.props.interactions) {
      this.props.interactions.forEach((iac) => {
        map.addInteraction(iac);
      });
    }

    // add configured additional layers
    if (this.props.layers) {
      this.props.layers.forEach((layer) => {
        map.addLayer(layer);
      });
    }

    const vectorLayer = new OlLayerVector({
      source: new OlSourceVector()
    });

    map.addLayer(vectorLayer);
    this.dataLayer = vectorLayer;

    this.map = map;
    this.updateFeatures();
    this.applySymbolizerToMapFeatures(this.state.symbolizer);
  }

  getSampleGeomFromSymbolizer = () => {
    const kind: SymbolizerKind = _get(this.state, 'symbolizer[0].kind');
    switch (kind) {
      case 'Circle':
      case 'Icon':
      case 'Text':
        return new OlGeomPoint([7.10066, 50.735851]);
      case 'Fill':
        return new OlGeomPolygon([[
            [7.1031761169433585, 50.734268655851345],
            [7.109270095825195, 50.734268655851345, ],
            [7.109270095825195, 50.73824770380063],
            [7.1031761169433585, 50.73824770380063],
            [7.1031761169433585, 50.734268655851345, ]
          ]]);
      case 'Line':
        return new OlGeomLineString([
          [7.062578201293945, 50.721786104206004],
          [7.077512741088867, 50.729610159968296],
          [7.082319259643555, 50.732435192351126],
          [7.097940444946289, 50.73748722929948],
          [7.106866836547852, 50.73775882875318],
          [7.117509841918945, 50.73889952925885],
          [7.129182815551758, 50.7504679214779]
        ]);
      default:
        return new OlGeomPoint([7.10066, 50.735851]);
    }
  }

  /**
   *
   */
  onEditButtonClicked = () => {
    this.setState({
      editorVisible: !this.state.editorVisible
    });
  }

  /**
   * Transforms the incoming symbolizer to an OpenLayers style object the
   * GeoStyler parser and applies it to the vector features on the map.
   *
   * @param {Symbolizer} symbolizer The symbolizer as holding the style to apply
   */
  applySymbolizerToMapFeatures = (symbolizer: Symbolizer[]): any => {
    const styleParser = new OlStyleParser();

    // we have to wrap the symbolizer in a Style object since the writeStyle
    // only accepts a Style object
    const style = {
      name: 'WrapperStyle4Symbolizer',
      rules: [{
        symbolizer: symbolizer
      }]
    };
    // parser style to OL style
    styleParser.writeStyle(style)
      .then((olStyles: (OlStyle|ol.StyleFunction)[][]) => {
        
        const textSymbolizerIdxs: number[] = [];
        olStyles[0].forEach((olStyle: OlStyle|ol.StyleFunction, idx: number) => {
          if (!(olStyle instanceof OlStyle)) {
            textSymbolizerIdxs.push(idx);
          }
        });

        // If at least one textSymbolizer is being used, restructure to 
        // return a function that returns an array of styles. This needs to be done,
        // because openlayers only supports returning a single function, or an array of
        // styles, but not both mixed.
        if (textSymbolizerIdxs.length > 0) {
          const newStyleFuncWithTextStyleFn = (feat: OlFeature, resolution: number) => {
            // IMPORTANT: need to copy olStyles, otherwise page crashes when changing window size. 
            //            Closure problems...
            const olStylesCopy = _cloneDeep(olStyles);
            // push all TextSymbolizers into textStyleFns
            const textStyleFns: ol.StyleFunction[] = [];
            textSymbolizerIdxs.forEach((idx: number) => {
              const textFn: ol.StyleFunction = olStylesCopy[0][idx] as ol.StyleFunction;
              textStyleFns.push(textFn);
            });
            // create new array with ol.style.Text styles based on textStyleFns
            const textStyles: OlStyle[] = textStyleFns.map((textStyleFn: ol.StyleFunction) => {
              const textStyle: OlStyle = textStyleFn(feat, resolution) as OlStyle;
              const text: OlStyleText = textStyle.getText();
              return new OlStyle({
                text: text
              });
            });

            // remove all TextSymbolizers from olStyles 
            for (let i = textSymbolizerIdxs.length - 1; i >= 0; i--) {
              olStylesCopy[0].splice(textSymbolizerIdxs[i], 1);
            }

            // push all non-text styles to nonFnStyles and create new ol.style Objects
            const nonFnStyles: OlStyle[] = olStylesCopy[0] as OlStyle[];
            nonFnStyles.map((olStyle: OlStyle) => {
                if (olStyle.getFill() instanceof OlStyleFill) {
                  return new OlStyle({
                    fill: olStyle.getFill()
                  });
                } else if (olStyle.getImage() instanceof OlStyleImage) {
                  return new OlStyle({
                    image: olStyle.getImage()
                  });
                } else {
                  return new OlStyle({
                    stroke: olStyle.getStroke()
                  });
                }
            });
            // return array of styles that includes text and non-text styles
            return [...textStyles, ...nonFnStyles];
          };
          this.dataLayer.setStyle(newStyleFuncWithTextStyleFn);
          return newStyleFuncWithTextStyleFn;
          
        } else {
          
          // apply new OL style to vector layer
          this.dataLayer.setStyle(olStyles[0] as OlStyle[]);
          return olStyles[0];

        }
      });
  }

  /**
   * Checks if removeSymbolizer Button or addSymbolizer Button was clicked.
   * Calls corresponding function, if it was passed through props.
   */
  onAddRemoveSymbolizer = (tabIdx: string, action: string) => {
    if (action === 'add') {
      if (this.props.onAddSymbolizer) {
        this.props.onAddSymbolizer();
      }
    } else if (action === 'remove') {
      const symbIdx = parseInt(tabIdx, 10);
      const symb: Symbolizer = this.props.symbolizer[symbIdx];
      if (this.props.onRemoveSymbolizer) {
        this.props.onRemoveSymbolizer(symb);
      }
    }
  }

  getUIFromSymbolizers = (symbolizers: Symbolizer[], editorProps: any): React.ReactNode => {
    return(
      <Tabs
        className="gs-symbolizer-preview-tabs"
        type="editable-card"
        defaultActiveKey="0"
        onEdit={this.onAddRemoveSymbolizer}
      >
        {
          symbolizers.map(
            (symb: Symbolizer, idx: number) => {
              return (
                <TabPane
                  key={idx}
                  tab={idx}
                  closable={this.props.symbolizer.length > 1}
                >
                  <Editor
                    symbolizer={symb}
                    onSymbolizerChange={(sym: Symbolizer) => {
                      this.props.onSymbolizerChange(sym, idx);
                    }}
                    {...editorProps}
                  />
                </TabPane>
              );
            }
          )
        }
      </Tabs>
  );
  }

  render() {
    const {
      mapHeight,
      projection,
      map,
      controls,
      interactions,
      dataProjection,
      showOsmBackground,
      locale,
      symbolizer,
      onSymbolizerChange,
      ...editorProps
    } = this.props;

    return (
      <div className="gs-symbolizer-preview">
        <div
          id={this.state.mapTargetId}
          className="map"
          style={{ height: mapHeight }}
        >
          <Button
            className="gs-edit-preview-button"
            icon="edit"
            onClick={this.onEditButtonClicked}
          >
            {this.state.editorVisible ? locale.closeEditorText : locale.openEditorText}
          </Button>
          {
            this.state.editorVisible ?
              this.getUIFromSymbolizers(this.state.symbolizer, {...editorProps}) : null
          }
        </div>
      </div>
    );
  }
}

export default localize(Preview, Preview.componentName);
