import * as React from 'react';
import 'antd/dist/antd.css';

import {
  Style as GsStyle,
  StyleParser as GsStyleParser
} from 'geostyler-style';

import {
  Data as GsData
} from 'geostyler-data';

import OlStyleParser from 'geostyler-openlayers-parser';
import SldStyleParser from 'geostyler-sld-parser';
import GeoJsonParser from 'geostyler-geojson-parser';

import './App.css';

import Style from '../Component/Style/Style';
import StyleLoader from '../Component/DataInput/StyleLoader/StyleLoader';
import DataLoader from '../Component/DataInput/DataLoader/DataLoader';

// default props
interface DefaultAppProps {
  styleParsers: GsStyleParser[];
}
// non default props
interface AppProps extends Partial<DefaultAppProps> {
}

// state
interface AppState {
  style?: GsStyle;
  data?: GsData;
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">GeoStyler</h1>
        <StyleLoader
          parsers={[
            OlStyleParser,
            SldStyleParser
          ]}
          onStyleRead={(style: GsStyle) => {
            this.setState({style});
          }}
        />
        <DataLoader
          parsers={[
            GeoJsonParser
          ]}
          onDataRead={(data: GsData) => {
            this.setState({data});
          }}
        />
        <Style
          style={this.state.style}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default App;
