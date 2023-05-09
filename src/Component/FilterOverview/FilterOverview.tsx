/* eslint-disable camelcase */
/* Released under the BSD 2-Clause License
 *
 * Copyright © 2021-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

import React from 'react';

import {
  Filter as GsFilter
} from 'geostyler-style';

import './FilterOverview.less';
import { localize } from '../LocaleWrapper/LocaleWrapper';
import { Button, Divider, Tree } from 'antd';
import FilterUtil from '../../Util/FilterUtil';
import { PlusOutlined } from '@ant-design/icons';
import type GeoStylerLocale from '../../locale/locale';
import en_US from '../../locale/en_US';

// default props
interface FilterOverviewDefaultProps {
  locale: GeoStylerLocale['FilterOverview'];
  /** The callback when the editing of the filter was triggered. */
  onEditFilterClick?: () => void;
}

// non default props
export interface FilterOverviewProps extends Partial<FilterOverviewDefaultProps> {
  /** A GeoStyler-Style object. */
  filter?: GsFilter;
}

export const FilterOverview: React.FC<FilterOverviewProps> = ({
  filter,
  onEditFilterClick = () => {},
  locale = en_US.FilterOverview,
}) => {

  let treeData = [];
  if (filter) {
    treeData = FilterUtil.filterToTree(filter);
  }

  return (
    <div className='gs-filter-overview'>
      <h2>{locale.filterTitle}</h2>
      <Divider />
      {
        filter ? (
          <Tree
            treeData={treeData}
            defaultExpandAll
            selectable={false}
            showLine={{showLeafIcon: false}}
            switcherIcon={<div></div>}
            onClick={onEditFilterClick}
          />
        ) : (
          <div className='gs-filter-overview-add'>
            <Button
              type='text'
              icon={<PlusOutlined />}
              size='large'
              onClick={onEditFilterClick}
            />
          </div>
        )
      }
    </div>
  );
};

export default localize(FilterOverview, 'FilterOverview');
