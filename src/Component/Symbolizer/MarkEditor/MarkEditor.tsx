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

  render() {
    const {
      locale,
      onSymbolizerChange
    } = this.props;
    const {
      symbolizer
    } = this.state;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    return (
      <div className="gs-mark-symbolizer-editor" >
        <Form.Item
          label={locale.wellKnownNameFieldLabel}
          {...formItemLayout}
        >
          <WellKnownNameField
            wellKnownName={symbolizer.wellKnownName}
            onChange={this.onWellKnownNameChange}
          />
        </Form.Item>
        <WellKnownNameEditor
          symbolizer={symbolizer}
          onSymbolizerChange={onSymbolizerChange}
        />
      </div>
    );
  }
}

export default localize(MarkEditor, MarkEditor.componentName);
