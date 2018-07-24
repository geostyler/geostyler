import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import de_DE from './locale/de_DE';
// import de_DE from 'antd/lib/locale-provider/de_DE';
import { LocaleProvider } from 'antd';
import './index.css';

ReactDOM.render(
  <LocaleProvider locale={de_DE}>
    <App />
  </LocaleProvider>,
  document.getElementById('root') as HTMLElement
);
