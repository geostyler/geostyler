import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { LocaleProvider } from 'antd';
import en_US from '../locale/en_US';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LocaleProvider locale={en_US}>
      <App />
    </LocaleProvider>
  , div);
});
