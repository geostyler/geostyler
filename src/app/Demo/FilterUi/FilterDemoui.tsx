import * as React from 'react';

import { Button } from 'antd';

import GeoJsonDataParser from 'geostyler-geojson-parser';
import DataProvider from '../../../DataProvider/DataProvider';
import ComparisonFilter from '../../../Component/Filter/ComparisonFilter/ComparisonFilter';
import UploadButton from '../../../Component/UploadButton/UploadButton';

import './FilterDemoUi.css';

/**
 * Simple Demo UI showing the DataProvider capabilities.
 */
class FilterDemoUi extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      inputData: null,
      internalData: null,
      comparisonFilters: [],
      addButtonVisible: false
    };
  }

  /**
   *
   * @param e
   */
  parseGeoJson = (e: any) => {
    var reader = new FileReader();
    reader.readAsText(e.file);
    reader.onload = () => {

      const fileContent = reader.result;
      const geojson = JSON.parse(fileContent);

      // Show that you have to call onSuccess with `<some string>, file`
      e.onSuccess('done', e.file);

      this.setState({
        inputData: geojson
      });

      // parse to internal data structure
      this.processInputData();
    };

  }

  /**
   * Loads and parses the input geodata and stores it to the state of this component.
   */
  processInputData(): void {

    // create the DataProvider with some format parsers (only GeoJSON at the moment)
    const format = 'GeoJSON';
    const parsers = [{
      format: format,
      instance: new GeoJsonDataParser()
    }];
    const dataProvider = new DataProvider(parsers);

    // parse the input data
    const internalDataPromise = dataProvider.importData(this.state.inputData, format);

    internalDataPromise.then((internalData) => {
      this.setState({
        internalData: internalData,
        comparisonFilters: [{id: 1}],
        addButtonVisible: true
      });
    });

  }

  /**
   * Adds another ComparisonFilter to this UI
   */
  addComparisonFilter = () => {
    const existChildUis = this.state.comparisonFilters;
    const lastId = existChildUis[existChildUis.length - 1].id;
    this.setState({comparisonFilters: this.state.comparisonFilters.concat([{id: lastId + 1}])});
  }

  render() {

    return (
      <div className="filter-demo-ui">

          <h2>Filter Demo UI</h2>

          <UploadButton
            style={{'marginBottom': '20px'}}
            onUpload={this.parseGeoJson}
          />

          {
            this.state.addButtonVisible ?
            <Button
              style={{'marginBottom': '20px', 'marginTop': '20px'}}
              shape="circle"
              icon="plus"
              size="large"
              onClick={this.addComparisonFilter}
            /> :
            null
          }

          {
            this.state.comparisonFilters.map((cmpFilterConf: any) => (
              <ComparisonFilter key={cmpFilterConf.id} internalDataDef={this.state.internalData} />
            ))
          }

      </div>
    );
  }
}

export default FilterDemoUi;
