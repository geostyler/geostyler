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

import { VectorData } from 'geostyler-data';

import './FilterEditorWindow.less';
import { Modal, ModalProps } from 'antd';

import { localize } from '../../LocaleWrapper/LocaleWrapper';
import { Filter } from 'geostyler-style';
import FilterTree from '../FilterTree/FilterTree';
import { ComparisonFilterProps } from '../ComparisonFilter/ComparisonFilter';
import type GeoStylerLocale from '../../../locale/locale';
import en_US from '../../../locale/en_US';

// non default props
export interface FilterEditorWindowProps extends Partial<ModalProps> {
  /** Locale object containing translated text snippets */
  locale?: GeoStylerLocale['FilterEditorWindow'];
  /** The filter to edit */
  filter?: Filter;
  /** Layer metadata in the GeoStyler VectorData format */
  internalDataDef?: VectorData;
  /** The callback method that is triggered when the filter window closes */
  onClose?: () => void;
  /** The callback method that is triggered when the state changes */
  onFilterChange?: (filter: Filter) => void;
  /** Properties that will be passed to the comparison filters */
  filterUiProps?: Partial<ComparisonFilterProps>;
}

export const FilterEditorWindow: React.FC<FilterEditorWindowProps> = ({
  internalDataDef,
  onClose,
  filter,
  onFilterChange,
  filterUiProps,
  locale = en_US.FilterEditorWindow,
  ...passThroughProps
}) => {

  return (
    <Modal
      className="filter-editor-modal"
      title={locale.filterEditor}
      onCancel={onClose}
      width={800}
      footer={false}
      centered={true}
      {...passThroughProps}
    >
      <FilterTree
        internalDataDef={internalDataDef}
        filter={filter}
        onFilterChange={onFilterChange}
        filterUiProps={filterUiProps}
      />
    </Modal>
  );
};

export default localize(FilterEditorWindow, 'FilterEditorWindow');
