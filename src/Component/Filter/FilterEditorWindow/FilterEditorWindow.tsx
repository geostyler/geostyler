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

import React, { useState } from 'react';

import { Button, Modal, ModalProps } from 'antd';
import './FilterEditorWindow.css';


import { Filter } from 'geostyler-style';
import { useGeoStylerLocale } from '../../../context/GeoStylerContext/GeoStylerContext';
import { FilterTree } from '../FilterTree/FilterTree';

export interface FilterEditorWindowProps extends Partial<ModalProps> {
  /** The filter to edit */
  filter?: Filter;
  /** The callback method that is triggered when the filter window closes */
  onClose?: () => void;
  /** The callback method that is triggered when the state changes */
  onFilterChange?: (filter: Filter) => void;
}

export const FilterEditorWindow: React.FC<FilterEditorWindowProps> = ({
  onClose,
  filter,
  onFilterChange,
  ...passThroughProps
}) => {

  const locale = useGeoStylerLocale('FilterEditorWindow');

  const [filterClone, setFilterClone] = useState<Filter>();

  const handleCancel = () => {
    setFilterClone(filter);
    onClose();
  };

  const handleRecord = () => {
    onFilterChange(filterClone);
    onClose();
  };

  return (
    <Modal
      className="filter-editor-modal"
      title={locale.filterEditor}
      onCancel={onClose}
      width={800}
      centered={true}
      footer={[
        <Button key="cancel" onClick={handleCancel}>{locale.cancelButtonLabel}</Button>,
        <Button key="record" type="primary" onClick={handleRecord}>{locale.saveButtonLabel}</Button>
      ]}
      {...passThroughProps}
    >
      <FilterTree
        filter={filterClone}
        onFilterChange={setFilterClone}
      />
    </Modal>
  );
};
