/* eslint-disable camelcase */
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

import React from 'react';

import {
  Rule as GsRule,
} from 'geostyler-style';
import { CqlParser } from 'geostyler-cql-parser';

import './RuleCard.less';
import
  Renderer
  // { RendererProps }
  from '../Symbolizer/Renderer/Renderer';
import FilterUtil from '../../Util/FilterUtil';
// import {
  // SLDRenderer,
  // SLDRendererAdditonalProps } from '../Symbolizer/SLDRenderer/SLDRenderer';
import DataUtil from '../../Util/DataUtil';
import { Data } from 'geostyler-data';
// import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';
// import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';
import { Divider, Card, Typography } from 'antd';
import { BlockOutlined, FilterFilled, MinusOutlined } from '@ant-design/icons';
const { Text } = Typography;

// i18n
export interface RuleCardLocale {
}

// default props
interface RuleCardDefaultProps {
}

// non default props
export interface RuleCardProps extends Partial<RuleCardDefaultProps> {
  /** The rule to display. */
  rule: GsRule;
  /** The number of features that are also matched by other rules. */
  duplicates?: number;
  /** Reference to internal data object (holding schema and example features). */
  data?: Data;
  /** The callback when the card was clicked. */
  onClick?: () => void;
}

export const RuleCard: React.FC<RuleCardProps> = ({
  rule,
  duplicates,
  onClick,
  data
}) => {

  let amount;
  if (data && DataUtil.isVector(data) && rule.filter && rule.filter.length) {
    amount = FilterUtil.getMatches(rule.filter, data).length;
  }

  const cqlParser = new CqlParser();
  let cql;
  if (rule.filter && rule.filter.length) {
    cql = cqlParser.write(rule.filter);
  }

  return (
    <Card
      className='gs-rule-card'
      hoverable={true}
      onClick={onClick}
    >
      <Renderer
        symbolizers={rule.symbolizers}
      />
      <Divider type='vertical'/>
      <div className='gs-rule-card-content'>
        <h2>{rule.name}</h2>
        <span>1:{rule.scaleDenominator?.min || '-'} <MinusOutlined /> 1:{rule.scaleDenominator?.max || '-'}</span>
        <span className='gs-rule-card-content-icon-row'>
          <Text type='secondary'>
            <span className='gs-rule-card-icon'>Σ</span>
            {amount !== undefined ? amount : '-'}
          </Text>
          <Text type='secondary'>
            <BlockOutlined className='gs-rule-card-icon' />
            {duplicates !== undefined ? duplicates : '-'}
          </Text>
        </span>
        <span className='gs-rule-card-cql'>
          {
            rule.filter?.length && (
              <Text type='secondary'>
                <FilterFilled className='gs-rule-card-icon' />
              </Text>
            )
          }
          <Text type='secondary'>{cql}</Text>
        </span>
      </div>
    </Card>
  );
};

export default RuleCard;
