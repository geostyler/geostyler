import * as React from 'react';

import { Button, Input } from 'antd';
const { TextArea } = Input;

import GeoJsonDataParser from 'geostyler-geojson-parser';
import DataProvider from '../../../DataProvider/DataProvider';
import ComparisonFilterUi from '../../../Component/Filter/ComparisonFilter/ComparisonFilterUi';
import UploadButton from '../../../Component/UploadButton/UploadButton';

import { ComparisonFilter } from 'geostyler-style';

import './FilterDemoUi.css';

/**
 * Simple Demo UI showing the DataProvider capabilities.
 */
class FilterDemoUi extends React.Component<any, any> {

  /** The GeoStyler compliant ComparisonFilter object */
  gsFilter: ComparisonFilter;

  constructor(props: any) {
    super(props);

    this.state = {
      inputData: null,
      gsData: null,
      gsFilterString: '',
      comparisonFilters: []
    };
  }

  /**
   * Parses the uploaded / imported GeoJSON and forwards it to the DataProvider
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
        gsData: internalData,
        comparisonFilters: [{id: 1}]
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

  /**
   * Reacts if the underlying ComparisonFilter changes and save it as member.
   */
  onFilterChange = (compFilter: ComparisonFilter) => {
    this.gsFilter = compFilter;
  }

  /**
   * Serializes the ComparisonFilter object and stores it in the state obejct.
   */
  createFilter = () => {
    this.setState({
      gsFilterString: JSON.stringify(this.gsFilter, null, 2)
    });
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
            this.state.comparisonFilters.length > 0 ?
            <Button
              style={{'marginBottom': '20px', 'marginTop': '20px'}}
              shape="circle"
              icon="plus"
              size="large"
              onClick={this.addComparisonFilter}
              // disabled since we cannot handle multiple filters at the moment
              disabled={true}
            /> :
            null
          }

          {
            this.state.comparisonFilters.map((cmpFilterConf: any) => (
              <ComparisonFilterUi
                key={cmpFilterConf.id}
                internalDataDef={this.state.gsData}
                onFilterChange={this.onFilterChange}
              />
            ))
          }

          {
            this.state.comparisonFilters.length > 0 ?
            <Button
              style={{'marginBottom': '20px', 'marginTop': '20px'}}
              icon="enter"
              size="large"
              onClick={this.createFilter}
            > Create Filter
            </Button> :
            null
          }

          {
            this.state.comparisonFilters.length > 0 ?
            <TextArea
              rows={2}
              value={this.state.gsFilterString}
              style={{width: '99%', height: '300px', margin: '5px'}}
              name="filter-style-ta"
              className="filter-style-ta"
            /> :
            null
          }

      </div>
    );
  }
}

export default FilterDemoUi;
