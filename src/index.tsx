import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import * as moment from 'moment';
import 'moment/locale/de';
import de_DE from './locale/de_DE';
import en_US from './locale/en_US';
import { LocaleProvider } from 'antd';
import { Locale } from 'antd/lib/locale-provider/index';
import './index.css';

interface GsLocale extends Locale {
  GsRule: object;
  GsApp: object;
  GsStyleLoader: object;
  GsDataLoader: object;
  GsStyle: object;
  GsCodeEditor: object;
  GsPreview: object;
  GsCircleEditor: object;
  GsColorField: object;
  GsFillEditor: object;
  GsIconEditor: object;
  GsLineEditor: object;
  GsTextEditor: object;
  GsKindField: object;
  GsScaleDenominator: object;
}

interface DefaultStarterState {
  locale: GsLocale;
}

class Starter extends React.Component <{}, DefaultStarterState>{

  constructor(props: any) {
    super(props);
    this.state = {
      locale: en_US
    };
  }
  
  onChange = (e: boolean) => {
    if(e){
      moment.locale('de');
      this.setState({locale: de_DE})
    } else {
      moment.locale('en');
      this.setState({locale: en_US});
    }
  };

  render() {
    const {
      locale
    } = this.state;

    return (
      <LocaleProvider locale={locale}>
        <div>
          <div>
            <button onClick={()=>{this.onChange(true)}}>German</button>
            <button onClick={()=>{this.onChange(false)}}>English</button>
          </div>
          <App />
        </div>
      </LocaleProvider>
    );
  }
}

ReactDOM.render(
  <Starter />,
  document.getElementById('root') as HTMLElement
);
