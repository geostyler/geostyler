import * as React from 'react';
import { Select } from 'antd';

import { GraphicType } from 'geostyler-style';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../../locale/en_US';

const _get = require('lodash/get');
const _isEqual = require('lodash/isEqual');

const Option = Select.Option;

interface GraphicTypeFieldLocale {
  /** Rendered Text for Mark Option */
  Mark: string;
  /** Rendered Text for Icon Option */
  Icon: string;
}

export interface DefaultGraphicTypeFieldProps {
  /** List of selectable GraphicTypes for Select */
  graphicTypes: GraphicType[];
  /** Label rendered next to Select */
  label: String;
  /** Language package */
  locale: GraphicTypeFieldLocale;
  /** If true GraphicTypeField can be cleared  */
  clearable: boolean;
}

export interface GraphicTypeFieldProps extends DefaultGraphicTypeFieldProps {
  /** Currently selected GraphicType */
  graphicType?: GraphicType;
  /** Callback when selection changes */
  onChange: ((type: GraphicType) => void);
}

/** GraphicTypeField to select between different GraphicTypes */
export class GraphicTypeField extends React.Component <GraphicTypeFieldProps> {

  static componentName: string = 'GraphicTypeField';

  public static defaultProps: DefaultGraphicTypeFieldProps = {
    locale: en_US.GsGraphicTypeField,
    graphicTypes: ['Mark', 'Icon'],
    label: 'Graphic',
    clearable: true
  };

  public shouldComponentUpdate(nextProps: GraphicTypeFieldProps): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    return diffProps;
  }

  /**
   * Iterates over props.graphicTypes and returns an Option according to GraphicType
   *
   * @param {GraphicTypeFieldLocale} locale Language package used for the displayed text of an Option
   * @return {React.ReactNode[]} List of Options
   */
  getTypeSelectOptions = (locale: GraphicTypeFieldLocale): React.ReactNode[] => {
    return (this.props.graphicTypes.map((type: GraphicType) => {
      const loc = _get(locale, type) || type;
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
      clearable,
      ...passThroughProps
    } = this.props;

    return (
      <div className="editor-field graphictype-field">
        <span className="label">{`${label}:`}</span>
        <Select
          value={graphicType}
          onChange={onChange}
          allowClear={clearable}
          {...passThroughProps}
        >
          {this.getTypeSelectOptions(locale)}
        </Select>
      </div>
    );
  }
}

export default localize(GraphicTypeField, GraphicTypeField.componentName);
