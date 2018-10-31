import * as React from 'react';
import SldStyleParser from 'geostyler-sld-parser';
const _isEqual = require('lodash/isEqual');

import './SLDRenderer.css';
import { StyleParserConstructable, Style, Symbolizer } from 'geostyler-style';
import HTTPUtil from '../../../Util/HTTPUtil';

// non default props
interface SLDRendererProps {
  onClick?: (symbolizers: Symbolizer[]) => void;
  symbolizers: Symbolizer[];
  wmsBaseUrl: string;
  layer: string;
}

// state
interface SLDRendererState {
  alt: string;
  legendDataUrl: string;
}

/**
 * Symbolizer Renderer UI.
 */
export class SLDRenderer extends React.Component<SLDRendererProps, SLDRendererState> {

  _styleParser: StyleParserConstructable;

  constructor(props: SLDRendererProps) {
    super(props);
    this.state = {
      alt: 'No Image set',
      legendDataUrl: ''
    };
    this._styleParser = new SldStyleParser();
  }

  public componentDidMount() {
    const {
      symbolizers
    } = this.props;
    this.setLegendGraphicUrlForRule(symbolizers);
  }

  componentDidUpdate(prevProps: SLDRendererProps) {
    const {
      symbolizers
    } = this.props;

    if (!_isEqual(symbolizers, prevProps.symbolizers)) {
      this.setLegendGraphicUrlForRule(symbolizers);
    }
  }

  /**
   * The function that sets the legends graphic for each rule
   *
   * @param {Object} rule The Sld rule
   */
  setLegendGraphicUrlForRule = (symbolizers: Symbolizer[]) => {
    const {
      wmsBaseUrl,
      layer
    } = this.props;

    const style: Style = {
      name: 'sld-renderer-style',
      rules: [{
        name: '',
        symbolizers: symbolizers
      }]
    };
    this._styleParser.writeStyle(style)
      .then((sld) => {
        const params = {
          'SERVICE': 'WMS',
          'VERSION': '1.3.0',
          'REQUEST': 'GetLegendGraphic',
          'FORMAT': 'image/png',
          'TRANSPARENT': 'true',
          'LAYER': layer,
          'SLD_BODY': sld,
          'WIDTH': 100 * 1.5,
          'HEIGHT': 100
        };
        HTTPUtil.post({
          url: wmsBaseUrl,
          params: params
        })
          .then((response: any) => {
            if (response && response.ok) {
              response.blob().then((blob: Blob) => {
                const legendDataUrl = window.URL.createObjectURL(blob);
                this.setState({legendDataUrl});
              });
            }
          })
          .catch((error: any) => {
            this.setState({
              alt: error
            });
          });
      });
  }

  render() {
    const {
      onClick,
      symbolizers
    } = this.props;
    const {
      alt,
      legendDataUrl
    } = this.state;
    return (
      <div
        onClick={() => {
          if (onClick) {
            onClick(symbolizers);
          }
        }}
        className="gs-symbolizer-sldrenderer"
      >
        <img
          src={legendDataUrl}
          alt={alt}
        />
      </div>
    );
  }

}

export default SLDRenderer;
