import * as React from 'react';
import 'antd/dist/antd.css';

import {
  Style as GsStyle,
  StyleParser as GsStyleParser
} from 'geostyler-style';

import {
  Data as GsData
} from 'geostyler-data';

import SldStyleParser from 'geostyler-sld-parser';
import GeoJsonParser from 'geostyler-geojson-parser';

import './App.css';

import Style from '../Component/Style/Style';
import StyleLoader from '../Component/DataInput/StyleLoader/StyleLoader';
import DataLoader from '../Component/DataInput/DataLoader/DataLoader';
import CodeEditor from '../Component/CodeEditor/CodeEditor';

import GeoStylerTemplateStyle from './data/TemplateStyle';

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
    this.state = {
      style: GeoStylerTemplateStyle
    };
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className="App-title">GeoStyler</h1>
        </header>
        <div className="settings">
          <StyleLoader
            parsers={[
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
        </div>
        <div className="main-content">
          <div className="gui-wrapper">
            <h2>Graphical Editor</h2>
            <Style
              style={this.state.style}
              data={this.state.data}
              onStyleChange={(style: GsStyle) => {
                this.setState({style});
              }}
            />
          </div>
          <div className="editor-wrapper">
            <h2>Code Editor</h2>
            <CodeEditor
              style={this.state.style}
              parsers={[
                SldStyleParser
              ]}
              onStyleChange={(style: GsStyle) => {
                this.setState({style});
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
