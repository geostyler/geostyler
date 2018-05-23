import * as React from 'react';

import 'antd/dist/antd.css';

import './App.css';

import RuleDemo from './Demo/Rule/RuleDemo';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GeoStyler</h1>
        </header>

        <RuleDemo />

      </div>
    );
  }
}

export default App;
