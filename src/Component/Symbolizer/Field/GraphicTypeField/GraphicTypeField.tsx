import * as React from 'react';
import { Select } from 'antd';

import { GraphicType } from 'geostyler-style';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';

const _get = require('lodash/get');

const Option = Select.Option;

interface GraphicTypeFieldLocale {
  /** Rendered Text for Mark Option */
  Mark: string;
  /** Rendered Text for Icon Option */
  Icon: string;
}

export interface DefaultGraphicTypeFieldProps {
  /** List of selectable GraphicTypes for Select */
  graphicTypes?: GraphicType[];
  /** Label rendered next to Select */
  label?: String;
  /** Language package */
  locale?: GraphicTypeFieldLocale;
}

interface GraphicTypeFieldProps extends DefaultGraphicTypeFieldProps {
  /** Currently selected GraphicType */
  graphicType?: GraphicType;
  /** Callback when selection changes */
  onChange: ((type: GraphicType) => void);
}

/** GraphicTypeField to select between different GraphicTypes */
export class GraphicTypeField extends React.Component <GraphicTypeFieldProps, {}> {

  static componentName: string = 'GraphicTypeField';

  public static defaultProps: DefaultGraphicTypeFieldProps = {
    graphicTypes: ['Mark', 'Icon'],
    label: 'Graphic'
  };

  /**
   * Iterates over props.graphicTypes and returns an Option according to GraphicType
   *
   * @param {GraphicTypeFieldLocale} locale Language package used for the displayed text of an Option
   * @return {React.ReactNode[]} List of Options
   */
  getTypeSelectOptions = (locale: GraphicTypeFieldLocale): React.ReactNode[] => {
    return (this.props.graphicTypes.map((type: GraphicType) => {
      const loc = _get(locale, 'graphicTypes[' + type + ']') || type;
      return (
        <Option
          key={type}
          value={type}
        >
          {loc}
        </Option>
      );
    }));
  }

  render() {
    const {
      label,
      locale,
      graphicType,
      graphicTypes,
      onChange,
      ...passThroughProps
    } = this.props;

    return (
      <div className="editor-field graphictype-field">
        <span className="label">{`${label}:`}</span>
        <Select
          value={graphicType}
          onChange={onChange}
          allowClear={true}
          {...passThroughProps}
        >
          {this.getTypeSelectOptions(locale)}
        </Select>
      </div>
    );
  }
}

export default localize(GraphicTypeField, GraphicTypeField.componentName);
