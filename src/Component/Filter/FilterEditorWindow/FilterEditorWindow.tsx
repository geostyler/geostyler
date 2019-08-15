import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Rnd } from 'react-rnd';
import { VectorData } from 'geostyler-data';

import './FilterEditorWindow.less';
import { Button } from 'antd';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Filter } from 'geostyler-style';
import FilterTree from '../FilterTree/FilterTree';
import { ComparisonFilterProps } from '../ComparisonFilter/ComparisonFilter';

const _isEqual = require('lodash/isEqual');
// i18n
export interface FilterEditorWindowLocale {
  filterEditor: string;
}

// default props
export interface FilterEditorWindowDefaultProps {
  locale: FilterEditorWindowLocale;
}

// non default props
export interface FilterEditorWindowProps extends Partial<FilterEditorWindowDefaultProps> {
  filter: Filter;
  internalDataDef?: VectorData;
  x?: number;
  y?: number;
  onClose?: () => void;
  onFilterChange?: (filter: Filter) => void;
  /** Properties that will be passed to the comparison filters */
  filterUiProps?: Partial<ComparisonFilterProps>;
}

/**
 * Filter Editor Window UI.
 */
export class FilterEditorWindow extends React.Component<FilterEditorWindowProps> {

  public static defaultProps: FilterEditorWindowDefaultProps = {
    locale: en_US.GsFilterEditorWindow
  };

  public shouldComponentUpdate(nextProps: FilterEditorWindowProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

  static componentName: string = 'FilterEditorWindow';

  render() {
    const {
      x,
      y,
      internalDataDef,
      onClose,
      filter,
      onFilterChange,
      filterUiProps,
      locale
    } = this.props;

    return (
      ReactDOM.createPortal(
        <Rnd
          className="filter-editor-window"
          default={{
            x: x || window.innerWidth / 2,
            y: y || window.innerHeight / 2,
            width: undefined,
            height: undefined
          }}
          enableResizing={{
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: false,
            right: false,
            top: false,
            topLeft: false,
            topRight: false
          }}
          dragHandleClassName="filter-editor-window-header"
        >
          <div className="header filter-editor-window-header">
            <span className="title">
              {locale.filterEditor}
            </span>
            <Button
              icon="close"
              size="small"
              onClick={onClose}
            />
          </div>
          <div className="filter-editor-window-body">
            <FilterTree
                internalDataDef={internalDataDef}
                filter={filter}
                onFilterChange={onFilterChange}
                filterUiProps={filterUiProps}
            />
          </div>
        </Rnd>,
        document.body
      )
    );
  }
}

export default localize(FilterEditorWindow, FilterEditorWindow.componentName);
