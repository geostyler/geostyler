import * as React from 'react';

import { Button, Input } from 'antd';
const { TextArea } = Input;

import GeoJsonDataParser from 'geostyler-geojson-parser';
import DataProvider from '../../../DataProvider/DataProvider';
import UploadButton from '../../../Component/UploadButton/UploadButton';
import RuleUi from '../../../Component/Rule/Rule';

import { Style, Rule } from 'geostyler-style';

import './RuleDemo.css';

type RuleUiConf = {
  id: number;
};

// non default props
interface FilterDemoProps {}
// state
interface FilterDemoState {
  inputData: any; // TODO set correct type
  gsData: any;    // TODO set correct type
  gsStyleString: string;
  ruleUis: RuleUiConf[];
}

/**
 * Simple Demo UI showing the DataProvider capabilities.
 */
class RuleDemo extends React.Component<FilterDemoProps, FilterDemoState> {

  /** The GeoStyler compliant ComparisonFilter object */
  gsStyle: Style;

  rules: Rule[] = [];

  constructor(props: FilterDemoProps) {
    super(props);

    this.state = {
      inputData: null,
      gsData: null,
      gsStyleString: '',
      ruleUis: []
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
        ruleUis: [{id: 0}]
      });
    });

  }

  /**
   * Adds another ComparisonFilter to this UI
   */
  addRuleUi = () => {
    const existChildUis = this.state.ruleUis;
    const lastId = existChildUis[existChildUis.length - 1].id;
    this.setState({ruleUis: this.state.ruleUis.concat([{id: lastId + 1}])});
  }

  /**
   * 
   */
  onRuleChange = (changedRule: Rule, keyIndex: number) => {
    // detect if we have this rule already in our store
    const existingRule = this.rules[keyIndex];
    
    // add or replace the changed rule
    if (existingRule) {
      this.rules[keyIndex] = changedRule;
    } else {
      this.rules.push(changedRule);
    }
  }

  createStyle = () => {
    const style: Style = {
      // TODO detect type
      type: 'Line',
      rules: this.rules
    };

    this.setState({
      gsStyleString: JSON.stringify(style, null, 2)
    });
    
  } 

  render() {

    return (
      <div className="filter-demo-ui">

          <h2>Rule Demo</h2>

          <UploadButton
            style={{'marginBottom': '20px'}}
            onUpload={this.parseGeoJson}
          />

          {
            this.state.ruleUis.length > 0 ?
            <Button
              style={{'marginBottom': '20px', 'marginTop': '20px'}}
              shape="circle"
              icon="plus"
              size="large"
              onClick={this.addRuleUi}
            /> :
            null
          }

          {
            this.state.ruleUis.map((ruleUi: any) => (
              <RuleUi 
                key={ruleUi.id} 
                keyIndex={ruleUi.id}
                internalDataDef={this.state.gsData} 
                onRuleChange={this.onRuleChange}
              />
            ))
          }

          {
            this.state.ruleUis.length > 0 ?
            <Button
              style={{'marginBottom': '20px', 'marginTop': '20px'}}
              icon="enter"
              size="large"
              onClick={this.createStyle}
            > Create Style
            </Button> :
            null
          }

          {
            this.state.ruleUis.length > 0 ?
            <TextArea
              rows={16}
              value={this.state.gsStyleString}
              style={{width: '99%', margin: '5px'}}
              name="filter-style-ta"
              className="filter-style-ta"
            /> :
            null
          }

      </div>
    );
  }
}

export default RuleDemo;
