import * as React from 'react';

import {
  Symbolizer
} from 'geostyler-style';

import './MultiEditor.less';

import 'ol/ol.css';
import { Data } from 'geostyler-data';

import { Tabs, Button } from 'antd';
import Editor from '../Editor/Editor';
const TabPane = Tabs.TabPane;

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import { IconLibrary } from '../IconSelector/IconSelector';

const _isEqual = require('lodash/isEqual');

// i18n
export interface MultiEditorLocale {
  add: string;
  remove: string;
}

// default props
interface MultiEditorDefaultProps {
  locale: MultiEditorLocale;
}

// non default props
export interface MultiEditorProps extends Partial<MultiEditorDefaultProps> {
  internalDataDef?: Data;
  editorProps?: any;
  symbolizers: Symbolizer[];
  onSymbolizersChange?: (symbolizers: Symbolizer[]) => void;
  iconLibraries?: IconLibrary[];
}

export class MultiEditor extends React.Component<MultiEditorProps> {

  public shouldComponentUpdate(nextProps: MultiEditorProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  static componentName: string = 'MultiEditor';

  public static defaultProps: MultiEditorDefaultProps = {
    locale: en_US.GsMultiEditor
  };

  addSymbolizer = () => {
    const {
      onSymbolizersChange,
      symbolizers
    } = this.props;
    const symbolizerKind = symbolizers.length > 0 ? symbolizers[0].kind : undefined;
    const newSymbolizer = SymbolizerUtil.generateSymbolizer(symbolizerKind);
    if (onSymbolizersChange) {
      onSymbolizersChange([...symbolizers, newSymbolizer]);
    }
  }

  removeSymbolizer = (key: number) => {
    const {
      onSymbolizersChange,
      symbolizers
    } = this.props;
    const symbolizersClone = [...symbolizers];
    symbolizersClone.splice(key, 1);
    if (onSymbolizersChange) {
      onSymbolizersChange(symbolizersClone);
    }
  }

  onSymbolizerChange = (symbolizer: Symbolizer, key: number) => {
    const {
      onSymbolizersChange,
      symbolizers
    } = this.props;
    const symbolizersClone = [...symbolizers];
    symbolizersClone[key] = symbolizer;
    if (onSymbolizersChange) {
      onSymbolizersChange(symbolizersClone);
    }
  }

  render() {
    const {
      symbolizers,
      editorProps,
      locale,
      internalDataDef,
      iconLibraries,
      ...passThroughProps
    } = this.props;

    const tabs = symbolizers.map((symbolizer: Symbolizer, idx: number) => {
        return (
          <TabPane
            className="gs-symbolizer-multi-editor-tab"
            key={idx.toString()}
            tab={idx}
            closable={true}
          >
            <Editor
              symbolizer={symbolizer}
              onSymbolizerChange={(sym: Symbolizer) => {
                this.onSymbolizerChange(sym, idx);
              }}
              internalDataDef={internalDataDef}
              iconLibraries={iconLibraries}
              {...editorProps}
            />
            {symbolizers.length === 1 ? null :
              <Button
                onClick={() => {
                  this.removeSymbolizer(idx);
                }}
              >
                {locale.remove}
              </Button>
            }
          </TabPane>
        );
      });

    return (
      <Tabs
        className="gs-symbolizer-multi-editor"
        defaultActiveKey="0"
        animated={false}
        tabBarExtraContent={(
          <Button onClick={this.addSymbolizer}>
            {locale.add}
          </Button>
        )}
        {...passThroughProps}
      >
        {tabs}
      </Tabs>
    );
  }
}

export default localize(MultiEditor, MultiEditor.componentName);
