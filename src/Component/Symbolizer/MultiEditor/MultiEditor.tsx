import * as React from 'react';

import {
  Symbolizer, IconSymbolizer, MarkSymbolizer, SymbolizerKind
} from 'geostyler-style';

import './MultiEditor.css';

import 'ol/ol.css';
import { Data } from 'geostyler-data';

import { Tabs, Button } from 'antd';
import Editor from '../Editor/Editor';
const TabPane = Tabs.TabPane;

import { localize } from '../../LocaleWrapper/LocaleWrapper';

// i18n
export interface MultiEditorLocale {
  add: string;
  remove: string;
}

// default props
interface DefaultMultiEditorProps {
  onAdd: () => void;
  onRemove: (symbolizer: Symbolizer, idx: number) => void;
  symbolizers: Symbolizer[];
  onSymbolizersChange: (symbolizers: Symbolizer[]) => void;
  locale: MultiEditorLocale;
}

// non default props
export interface MultiEditorProps extends Partial<DefaultMultiEditorProps> {
  internalDataDef?: Data;
  editorProps?: any;
}

export class MultiEditor extends React.Component<MultiEditorProps> {

  static componentName: string = 'MultiEditor';

  addSymbolizer = () => {
    const {
      onSymbolizersChange,
      symbolizers
    } = this.props;
    const symbolizerKind = symbolizers.length > 0 ? symbolizers[0].kind : undefined;
    const newSymbolizer = this.getDefaultSymbolizer(symbolizerKind);
    onSymbolizersChange([...symbolizers, newSymbolizer]);
  }

  removeSymbolizer = (key: number) => {
    const {
      onSymbolizersChange,
      symbolizers
    } = this.props;
    const symbolizersClone = [...symbolizers];
    symbolizersClone.splice(key, 1);
    onSymbolizersChange(symbolizersClone);
  }

  onSymbolizerChange = (symbolizer: Symbolizer, key: number) => {
    const {
      onSymbolizersChange,
      symbolizers
    } = this.props;
    const symbolizersClone = [...symbolizers];
    symbolizersClone[key] = symbolizer;
    onSymbolizersChange(symbolizersClone);
  }

  /**
   *
   */
  getDefaultSymbolizer(kind?: SymbolizerKind): Symbolizer {
    if (kind) {
      if (kind === 'Mark') {
        return {
          kind,
          wellKnownName: 'Circle'
        } as MarkSymbolizer;
      } else if (kind === 'Icon') {
        return {
          kind,
          image: ''
        } as IconSymbolizer;
      } else {
        return {
          kind
        } as Symbolizer;
      }
    } else {
      return {
        kind: 'Mark',
        wellKnownName: 'Circle'
      } as MarkSymbolizer;
    }
  }

  render() {
    const {
      onAdd,
      onRemove,
      symbolizers,
      editorProps,
      locale,
      ...passThroughProps
    } = this.props;

    const tabs = symbolizers.map((symbolizer: Symbolizer, idx: number) => {
        return (
          <TabPane
            className="gs-symbolizer-multi-editor-tab"
            key={idx}
            tab={idx}
            closable={true}
          >
            <Editor
              symbolizer={symbolizer}
              onSymbolizerChange={(sym: Symbolizer) => {
                this.onSymbolizerChange(sym, idx);
              }}
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
