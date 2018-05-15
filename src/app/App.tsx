import * as React from 'react';
import './App.css';

import DataProviderUi from './Demo/DataProviderUi';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GeoStyler</h1>
        </header>

        <DataProviderUi />

      </div>
    );
  }
}

export default App;
