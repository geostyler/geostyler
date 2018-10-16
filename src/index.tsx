import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import * as moment from 'moment';
import 'moment/locale/de';
import de_DE from './locale/de_DE';
import en_US from './locale/en_US';
import { LocaleProvider } from 'antd';
import { Locale } from 'antd/lib/locale-provider/index';
import { AppLocale } from './app/App';
import { RuleLocale } from './Component/Rule/Rule';
import { StyleLoaderLocale } from './Component/DataInput/StyleLoader/StyleLoader';
import { DataLoaderLocale } from './Component/DataInput/DataLoader/DataLoader';
import { StyleLocale } from './Component/Style/Style';
import { CodeEditorLocale } from './Component/CodeEditor/CodeEditor';
import { PreviewLocale } from './Component/Symbolizer/Preview/Preview';
import { ColorFieldLocale } from './Component/Symbolizer/Field/ColorField/ColorField';
import { FillEditorLocale } from './Component/Symbolizer/FillEditor/FillEditor';
import { IconEditorLocale } from './Component/Symbolizer/IconEditor/IconEditor';
import { LineEditorLocale } from './Component/Symbolizer/LineEditor/LineEditor';
import { TextEditorLocale } from './Component/Symbolizer/TextEditor/TextEditor';
import { KindFieldLocale } from './Component/Symbolizer/Field/KindField/KindField';
import { ScaleDenominatorLocale } from './Component/ScaleDenominator/ScaleDenominator';
import './index.css';

export interface GsLocale extends Locale {
  GsRule: RuleLocale;
  GsApp: AppLocale;
  GsStyleLoader: StyleLoaderLocale;
  GsDataLoader: DataLoaderLocale;
  GsStyle: StyleLocale;
  GsCodeEditor: CodeEditorLocale;
  GsPreview: PreviewLocale;
  GsColorField: ColorFieldLocale;
  GsFillEditor: FillEditorLocale;
  GsIconEditor: IconEditorLocale;
  GsLineEditor: LineEditorLocale;
  GsTextEditor: TextEditorLocale;
  GsKindField: KindFieldLocale;
  GsScaleDenominator: ScaleDenominatorLocale;
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
