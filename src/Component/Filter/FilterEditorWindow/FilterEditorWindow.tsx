/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Rnd } from 'react-rnd';
import { VectorData } from 'geostyler-data';

import './FilterEditorWindow.less';
import { Button } from 'antd';

import { CloseOutlined } from '@ant-design/icons';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import { Filter } from 'geostyler-style';
import FilterTree from '../FilterTree/FilterTree';
import { ComparisonFilterProps } from '../ComparisonFilter/ComparisonFilter';

import _isEqual from 'lodash/isEqual';
// i18n
export interface FilterEditorWindowLocale {
  filterEditor: string;
}

// default props
export interface FilterEditorWindowDefaultProps {
  /** Locale object containing translated text snippets */
  locale: FilterEditorWindowLocale;
}

// non default props
export interface FilterEditorWindowProps extends Partial<FilterEditorWindowDefaultProps> {
  /** The filter to edit */
  filter: Filter;
  /** Layer metadata in the GeoStyler VectorData format */
  internalDataDef?: VectorData;
  /** Pixel ordinate of the x-axis */
  x?: number;
  /** Pixel ordinate of the y-axis */
  y?: number;
  /** The callback method that is triggered when the filter window closes */
  onClose?: () => void;
  /** The callback method that is triggered when the state changes */
  onFilterChange?: (filter: Filter) => void;
  /** Properties that will be passed to the comparison filters */
  filterUiProps?: Partial<ComparisonFilterProps>;
}

/**
 * Filter Editor Window UI.
 */
export class FilterEditorWindow extends React.Component<FilterEditorWindowProps> {

    static componentName: string = 'FilterEditorWindow';

  public static defaultProps: FilterEditorWindowDefaultProps = {
    locale: en_US.GsFilterEditorWindow
  };

  public shouldComponentUpdate(nextProps: FilterEditorWindowProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

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
              icon={<CloseOutlined />}
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
