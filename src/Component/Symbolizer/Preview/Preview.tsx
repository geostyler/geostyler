import * as React from 'react';

import * as ol from 'openlayers';

import { FeatureCollection, GeometryObject } from 'geojson';
import { Symbolizer } from 'geostyler-style';

import 'openlayers/css/ol.css';
import './Preview.css';

// default props
interface DefaultPreviewProps {
  projection: string;
  dataProjection: string;
  showOsmBackground: boolean;
  mapHeight: number;
}
// non default props
interface PreviewProps extends Partial<DefaultPreviewProps> {
  features: FeatureCollection<GeometryObject>;
  symbolizer: Symbolizer;
}
// state
interface PreviewState {
  symbolizer: Symbolizer;
}

/**
 * Symbolizer preview UI.
 */
class Preview extends React.Component<PreviewProps, PreviewState> {

  public static defaultProps: DefaultPreviewProps = {
    projection: 'EPSG:3857',
    dataProjection: 'EPSG:4326',
    showOsmBackground: true,
    mapHeight: 200
  };

  constructor(props: PreviewProps) {
    super(props);

    this.state = {
      symbolizer: this.props.symbolizer
    };
  }

  /** reference to the underlying OpenLayers map */
  map: ol.Map;

  public componentDidMount() {

    const map = new ol.Map({
      layers: [],
      target: 'map',
      view: new ol.View({
        projection: this.props.projection,
        center: [0, 0],
        zoom: 1
      })
    });

    if (this.props.showOsmBackground) {
      const osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
      });
      map.addLayer(osmLayer);
    }

    // add features and zoom to them (when existing)
    if (this.props.features) {

      const format = new ol.format.GeoJSON({
        defaultDataProjection: this.props.dataProjection,
        featureProjection: map.getView().getProjection()
      });

      const vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: format.readFeatures(this.props.features)
        }),
        style: this.symbolizer2OlStyle(this.state.symbolizer)
      });

      map.addLayer(vectorLayer);

      // zoom to feature extent
      const extent = vectorLayer.getSource().getExtent();
      map.getView().fit(extent);

    }

    this.map = map;
  }

  /**
   * Dummy implementation to transform the incoming symbolizer to an OpenLayers
   * style object.
   * Will be replaced by an appropiate GeoStyler parser (once it is ready)
   *
   * TODO replace parsing logic with appropriate GeoStyler parser
   */
  symbolizer2OlStyle = (symbolizer: Symbolizer): any => {
    if (symbolizer.kind === 'Circle') {
      return new ol.style.Style({
        image: new ol.style.Circle({
          radius: symbolizer.radius || 4,
          stroke: new ol.style.Stroke({
            color: symbolizer.strokeColor || symbolizer.color,
            width: symbolizer.strokeWidth || 1
          }),
          fill: new ol.style.Fill({
            color: symbolizer.color
          })
        })
      });
    }
  }

  render() {

    return (
      <div className="gs-symbolizer-preview" >
        <div id="map" className="map" style={{ height: this.props.mapHeight }} />
      </div>
    );
  }
}

export default Preview;
