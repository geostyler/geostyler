import * as React from 'react';

import './DataProviderUi.css';

import DataProvider from '../../DataProvider/DataProvider';
import GeoJsonDataParser from 'geostyler-geojson-parser';

/**
 * Simple Demo UI showing the DataProvider capabilities.
 */
class DataProviderUi extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    const exampleGeojson = {
      type: 'FeatureCollection',
        features: [
          {
            id: 1,
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [1, 1]
            },
            properties: {
              propString: 'A feature with ID 1',
              propNumber: 10,
              propBoolean: true,
              propArray: ['1111', 'Berga', 'foo'],
              anotherPropNumber: 400.5
            }
          },
          {
            id: 2,
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [2, 2]
            },
            properties: {
              propString: 'A feature with ID 2',
              propNumber: 20,
              propBoolean: true,
              propArray: ['2222', 'Berga', 'foo'],
              anotherPropNumber: 200.5
            }
          }
        ]
      };

    this.state = {
      inputData: JSON.stringify(exampleGeojson, null, 2),
      internalData: '' 
    };
  }

  /**
   * Keeps the input data value of the textarea in sync with the corresponding state property
   */
  updateInputValue(evt: any): any {
    this.setState({
      inputData: evt.target.value
    });
  }

  /**
   * Transforms the input data (GeoJSON) to the intranal data structure (via DataProvider) and writes 
   * the output to the second textarea
   */
  processInputData(evt: any): void {
    const parsers = [{
      format: 'GeoJSON',
      instance: new GeoJsonDataParser()
    }];
    const dataProvider = new DataProvider(parsers);

    const geojson = JSON.parse(this.state.inputData);

    const internalData = dataProvider.importData(geojson, 'GeoJSON');

    this.setState({
      internalData: JSON.stringify(internalData, null, 2)
    });

  }
  render() {
    return (
      <div className="data-prov-ui">
        
          <h2>DataProvider Demo UI</h2>
        
          <p>Paste a valid GeoJSON FeatureCollection into the first textarea and hit "Transform"</p>

          <textarea 
            name="input-data-ta"
            className="data-prov-ta"
            value={this.state.inputData}
            onChange={e => this.updateInputValue(e)}
          />

          <div className="data-prov-select"> 
            <select>
              <option value="GeoJSON">GeoJSON</option>
            </select>
          </div>

          <div>
            <button 
              name="Transform"
              onClick={e => this.processInputData(e)}
            >Transform
            </button>
          </div>

          <textarea 
            name="output-data-ta" 
            value={this.state.internalData}
            className="data-prov-ta"
          />
      </div>
    );
  }
}

export default DataProviderUi;
