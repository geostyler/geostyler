import * as React from 'react';

import { Button } from 'antd';

import GeoJsonDataParser from 'geostyler-geojson-parser';
import DataProvider from '../../../DataProvider/DataProvider';
import ComparisonFilter from '../../../Component/Filter/ComparisonFilter/ComparisonFilter';

import './FilterDemoUi.css';

/**
 * Simple Demo UI showing the DataProvider capabilities.
 */
class FilterDemoUi extends React.Component<any, any> {

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
      internalData: '',
      childUis: [{id: 1}]
    };

    this.processInputData();
  }

  /**
   * Loads and parses the input geodata and stores it to the state of this component.
   */
  processInputData(): void {

    const parsers = [{
      format: 'GeoJSON',
      instance: new GeoJsonDataParser()
    }];
    const dataProvider = new DataProvider(parsers);

    const geojson = JSON.parse(this.state.inputData);

    const internalDataPromise = dataProvider.importData(geojson, 'GeoJSON');

    internalDataPromise.then((internalData) => {
      this.setState({
        internalData: internalData
      });
    });

  }

  /**
   * Adds another ComparisonFilter to this UI
   */
  addComparisonFilter = () => {
    const existChildUis = this.state.childUis;
    const lastId = existChildUis[existChildUis.length - 1].id;
    this.setState({childUis: this.state.childUis.concat([{id: lastId + 1}])});
  }

  render() {

    return (
      <div className="filter-demo-ui">

          <h2>Filter Demo UI</h2>

          <Button
            style={{'marginBottom': '20px'}}
            shape="circle"
            icon="plus"
            size="large"
            onClick={this.addComparisonFilter}
          />

          {
            this.state.childUis.map((cmpFilterConf: any) => (
              <ComparisonFilter key={cmpFilterConf.id} internalDataDef={this.state.internalData} />
            ))
          }

      </div>
    );
  }
}

export default FilterDemoUi;
