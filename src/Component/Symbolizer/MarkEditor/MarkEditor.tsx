import * as React from 'react';

import {
  Symbolizer,
  MarkSymbolizer,
  WellKnownName
} from 'geostyler-style';

import WellKnownNameField from '../Field/WellKnownNameField/WellKnownNameField';
import WellKnownNameEditor from '../WellKnownNameEditor/WellKnownNameEditor';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { CompositionContext, Compositions } from '../../CompositionContext/CompositionContext';
import CompositionUtil from '../../../Util/CompositionUtil';
import { Form } from 'antd';

const _cloneDeep = require('lodash/cloneDeep');

// i18n
export interface MarkEditorLocale {
  wellKnownNameFieldLabel: string;
}

// default props
interface MarkEditorDefaultProps {
  locale: MarkEditorLocale;
}

// non default props
export interface MarkEditorProps extends Partial<MarkEditorDefaultProps> {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

interface MarkEditorState {
  symbolizer: MarkSymbolizer;
}

export class MarkEditor extends React.Component<MarkEditorProps, MarkEditorState> {

  constructor(props: MarkEditorProps) {
    super(props);
    this.state = {
      symbolizer: {
        kind: 'Mark',
        wellKnownName: 'Circle'
      }
    };
  }

  static componentName: string = 'MarkEditor';

  public static defaultProps: MarkEditorDefaultProps = {
    locale: en_US.GsMarkEditor
  };

  static getDerivedStateFromProps(
      nextProps: MarkEditorProps,
      prevState: MarkEditorState): Partial<MarkEditorState> {
    return {
      symbolizer: nextProps.symbolizer
    };
  }

  onWellKnownNameChange = (wkn: WellKnownName) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.state.symbolizer);
    symbolizer.wellKnownName = wkn;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  /**
   * Wraps a Form Item around a given element and adds its locale
   * to the From Item label.
   */
  wrapFormItem = (locale: string, element: React.ReactElement): React.ReactElement => {
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return element == null ? null : (
      <Form.Item
      label={locale}
      {...formItemLayout}
      >
        {element}
      </Form.Item>
    );
  }

  render() {
    const {
      locale,
      onSymbolizerChange
    } = this.props;
    const {
      symbolizer
    } = this.state;

    return (
      <CompositionContext.Consumer>
        {(composition: Compositions) => (
          <div className="gs-mark-symbolizer-editor" >
            {
              this.wrapFormItem(
                locale.wellKnownNameFieldLabel,
                CompositionUtil.handleComposition({
                  composition,
                  path: 'MarkEditor.wellKnownNameField',
                  onChange: this.onWellKnownNameChange,
                  propName: 'wellKnownName',
                  propValue: symbolizer.wellKnownName,
                  defaultElement: <WellKnownNameField />
                })
              )
            }
            <WellKnownNameEditor
              symbolizer={symbolizer}
              onSymbolizerChange={onSymbolizerChange}
            />
          </div>
        )}
      </CompositionContext.Consumer>
    );
  }
}

export default localize(MarkEditor, MarkEditor.componentName);
