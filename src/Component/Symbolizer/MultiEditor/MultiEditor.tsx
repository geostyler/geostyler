import * as React from 'react';

import {
  Symbolizer
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
  onSymbolizerChange: (symbolizer: Symbolizer, idx: number) => void;
  locale: MultiEditorLocale;
}

// non default props
export interface MultiEditorProps extends Partial<DefaultMultiEditorProps> {
  internalDataDef?: Data;
  editorProps?: any;
}

// state
interface MultiEditorState {
}

class MultiEditor extends React.Component<MultiEditorProps, MultiEditorState> {

  static componentName: string = 'MultiEditor';

  constructor(props: any) {
    super(props);
  }

  render() {
    const {
      onAdd,
      onRemove,
      symbolizers,
      editorProps,
      onSymbolizerChange,
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
                onSymbolizerChange(sym, idx);
              }}
              {...editorProps}
            />
            {idx === 0 ? null :
              <Button
                onClick={() => {
                  onRemove(symbolizer, idx);
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
        tabBarExtraContent={<Button onClick={onAdd}>{locale.add}</Button>}
        {...passThroughProps}
      >
        {tabs}
      </Tabs>
    );
  }
}

export default localize(MultiEditor, MultiEditor.componentName);
