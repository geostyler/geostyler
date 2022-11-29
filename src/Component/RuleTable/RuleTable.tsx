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

import React, { useEffect, useRef, useState } from 'react';
import { CqlParser } from 'geostyler-cql-parser';

import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEqual from 'lodash/isEqual';
import _cloneDeep from 'lodash/cloneDeep';

import {
  Table,
  Input,
  InputNumber,
  Popover,
  Tooltip,
} from 'antd';

import {
  Rule as GsRule,
  Symbolizer as GsSymbolizer,
  Filter as GsFilter,
  Symbolizer
} from 'geostyler-style';

import {
  Data
} from 'geostyler-data';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

import './RuleTable.less';
import { OlRendererProps } from '../Renderer/OlRenderer/OlRenderer';
import FilterEditorWindow from '../Filter/FilterEditorWindow/FilterEditorWindow';
import SymbolizerEditorWindow from '../Symbolizer/SymbolizerEditorWindow/SymbolizerEditorWindow';
import { TableProps, ColumnProps } from 'antd/lib/table';
import FilterUtil, { CountResult } from '../../Util/FilterUtil';
import { SLDRendererAdditonalProps } from '../Renderer/SLDRenderer/SLDRenderer';
import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';
import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';
import DataUtil from '../../Util/DataUtil';
import RuleReorderButtons from './RuleReorderButtons/RuleReorderButtons';
import { BgColorsOutlined, BlockOutlined, EditOutlined } from '@ant-design/icons';
import { GeoStylerLocale } from '../../locale/locale';
import Renderer from '../Renderer/Renderer/Renderer';

// i18n
export interface RuleTableLocale {
  symbolizersColumnTitle: string;
  nameColumnTitle: string;
  filterColumnTitle: string;
  minScaleColumnTitle: string;
  maxScaleColumnTitle: string;
  amountColumnTitle: string;
  duplicatesColumnTitle: string;
  // locale from antd
  filterConfirm?: string;
  filterReset?: string;
  emptyText?: string;
}

export interface RuleRecord extends GsRule {
  key: number;
  amount?: number;
  duplicates?: number;
  maxScale?: number;
  minScale?: number;
}

// default props
interface RuleTableDefaultProps extends Partial<TableProps<RuleRecord>> {
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['RuleTable'];
  /** The renderer to use */
  rendererType: 'SLD' | 'OpenLayers';
  /** Display the number of features that match a rule */
  showAmountColumn: boolean;
  /** Display the number of features that match more than one rule */
  showDuplicatesColumn: boolean;
}

// non default props
export interface RuleTableProps extends Partial<RuleTableDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  data?: Data;
  /** List of rules to display in rule table */
  rules: GsRule[];
  /** Properties of the SLD renderer */
  sldRendererProps?: SLDRendererAdditonalProps;
  /** Properties of the OpenLayers renderer */
  oLRendererProps?: Partial<OlRendererProps>;
  /** The footer of the rule table */
  footer?: (currentPageData?: any) => React.ReactNode;
  /** The callback function that is triggered when the rules change */
  onRulesChange?: (rules: GsRule[]) => void;
  /** The callback function that is triggered when the selection changes */
  onSelectionChange?: (selectedRowKeys: string[], selectedRows: any[]) => void;
  /** Properties that will be passed to the Comparison Filters */
  filterUiProps?: Partial<ComparisonFilterProps>;
  /** List of supported icons ordered as library */
  iconLibraries?: IconLibrary[];
  /** Object containing predefined color ramps */
  colorRamps?: {
    [name: string]: string[];
  };
}

const COMPONENTNAME = 'RuleTable';

// export class RuleTable extends React.Component<RuleTableProps, RuleTableState> {
export const RuleTable: React.FC<RuleTableProps> = ({
  locale = en_US.RuleTable,
  rendererType = 'OpenLayers',
  showAmountColumn = true,
  showDuplicatesColumn = true,
  data: dataProp,
  rules: rulesProp,
  onRulesChange,
  filterUiProps,
  iconLibraries,
  colorRamps,
  sldRendererProps,
  oLRendererProps,
  ...restProps
}) => {

  const [ruleEditIndex, setRuleEditIndex] = useState<number>();
  const [symbolizerEditorVisible, setSymbolizerEditorVisible] = useState<boolean>();
  const [symbolizerEditorPosition, setSymbolizerEditorPosition] = useState<DOMRect>();
  const [filterEditorVisible, setFilterEditorVisible] = useState<boolean>();
  const [filterEditorPosition, setFilterEditorPosition] = useState<DOMRect>();
  const [hasError, setHasError] = useState<boolean>();
  const [data, setData] = useState<Data>();
  const [rules, setRules] = useState<GsRule[]>();
  const [counts, setCounts] = useState<number[]>();
  const [duplicates, setDuplicates] = useState<number[]>();

  /**
   * The Parser to read and write CQL Filter
   *
   */
  const { current: cqlParser} = useRef(new CqlParser());

  useEffect(() => {
    let countsAndDuplicates: CountResult = {};
    try {
      if (dataProp && DataUtil.isVector(dataProp)) {
        countsAndDuplicates = FilterUtil.calculateCountAndDuplicates(rulesProp, dataProp);
      } else {
        countsAndDuplicates = {};
      }
    } catch (e) {
      setHasError(true);
      // make sure to update state when checks/calculation fails
    }
    setData(dataProp);
    setRules(rulesProp);
    setCounts(countsAndDuplicates?.counts);
    setDuplicates(countsAndDuplicates?.duplicates);
  }, [rulesProp, dataProp]);

  const ruleRecords = rules?.map((rule: GsRule, index: number): RuleRecord => {
    return {
      key: index,
      ...rule
    };
  });

  const onSymbolizerClick = (record: RuleRecord, newSymbolizerEditorPosition: DOMRect) => {
    setRuleEditIndex(record.key);
    setSymbolizerEditorVisible(true);
    setSymbolizerEditorPosition(newSymbolizerEditorPosition);
    setFilterEditorVisible(false);
  };

  const symbolizerRenderer = (text: string, record: RuleRecord) => {
    const onSymbolizerRendererClick = (symbolizers: Symbolizer[], event: any) => {
      const filterPosition = event.target.getBoundingClientRect();
      onSymbolizerClick(record, filterPosition);
    };

    return (
      <Renderer
        rendererType={rendererType}
        data={data}
        symbolizers={record.symbolizers}
        onSymbolizerClick={onSymbolizerRendererClick}
        sldRendererProps={sldRendererProps}
        oLRendererProps={oLRendererProps}
      />
    );
  };

  // TODO: Refactor to stand alone component
  const nameRenderer = (text: string, record: RuleRecord) => {
    return (
      <Popover
        content={record.name}
        title={locale.nameColumnTitle}
      >
        <Input
          value={record.name}
          name="name-renderer"
          onChange={(event) => {
            const target = event.target;
            setValueForRule(record.key, 'name', target.value);
          }}
        />
      </Popover>
    );
  };

  // TODO: Refactor to stand alone component
  const filterRenderer = (text: string, record: RuleRecord) => {
    const cql = cqlParser.write(record.filter) as string;
    let filterCell: React.ReactNode;
    const inputSearch = (
      <Input.Search
        className="gs-rule-table-filter-cell"
        name="filter-renderer"
        value={cql}
        onChange={() => {
          // TODO The CQL representation is currently not editable
          // const value = event.target.value;
          // try {
          //   const newFilter = FilterUtil.readFromCql(value);
          //   this.setValueForRule(record.key, 'filter', newFilter);
          // } catch (error) {
          //   // TODO Feedback
          // }
        }}
        enterButton={<EditOutlined />}
        onSearch={(value, event: any) => {
          const filterPosition = event.target.getBoundingClientRect();
          onFilterEditClick(record.key, filterPosition);
        }}
      />);
    if (cql && cql.length > 0) {
      filterCell = (
        <Popover
          content={cql}
          title={locale.filterColumnTitle}
        >
          {inputSearch}
        </Popover>);
    } else {
      filterCell = inputSearch;
    }
    return filterCell;
  };

  const onFilterEditClick = (newRuleEditIndex: number, newFilterEditorPosition: DOMRect) => {
    setRuleEditIndex(newRuleEditIndex);
    setFilterEditorPosition(newFilterEditorPosition);
    setSymbolizerEditorVisible(false);
    setFilterEditorVisible(true);
  };

  // TODO: Refactor to stand alone component
  const minScaleRenderer = (text: string, record: RuleRecord) => {
    const minScaleDenominator = _get(record, 'scaleDenominator.min');
    const value = minScaleDenominator ? parseFloat(minScaleDenominator as any) : undefined;
    return (
      <InputNumber
        className="scale-denominator min-scale-denominator"
        name="min-scale-renderer"
        value={value}
        min={0}
        formatter={val => val ? `1:${val}` : ''}
        parser={(val: string) => parseFloat(val.replace('1:', ''))}
        onChange={(newValue: number) => {
          setValueForRule(record.key, 'scaleDenominator.min', newValue);
        }}
      />
    );
  };

  // TODO: Refactor to stand alone component
  const maxScaleRenderer = (text: string, record: RuleRecord) => {
    const maxScaleDenominator = _get(record, 'scaleDenominator.max');
    const value = maxScaleDenominator ? parseFloat(maxScaleDenominator as any) : undefined;
    return (
      <InputNumber
        className="scale-denominator max-scale-denominator"
        name="max-scale-renderer"
        value={value}
        min={0}
        formatter={val => val ? `1:${val}` : ''}
        parser={(val: string) => parseFloat(val.replace('1:', ''))}
        onChange={(newValue: number) => {
          setValueForRule(record.key, 'scaleDenominator.max', newValue);
        }}
      />
    );
  };

  // TODO: Refactor to stand alone component
  const amountRenderer = (text: string, record: RuleRecord) => {
    let amount: (number|'-') = '-';
    const filter: GsFilter|undefined = record.filter;
    if (data && filter) {
      try {
        amount = counts[record?.key] || 0;
      } catch (error) {
        amount = '-';
      }
    } else if (data && DataUtil.isVector(data)) {
      amount = data.exampleFeatures.features.length;
    }
    return (
      <div className="ant-input gs-rule-table-numeric-cell amount-renderer">
        {amount}
      </div>
    );
  };

  // TODO: Refactor to stand alone component
  const duplicatesRenderer = (text: string, record: RuleRecord) => {
    let calculatedDuplicates: (number|'-') = '-';
    if (data && rules) {
      try {
        calculatedDuplicates = duplicates[record.key];
      } catch (error) {
        calculatedDuplicates = '-';
      }
    }
    return (
      <div className="ant-input gs-rule-table-numeric-cell duplicates-renderer">
        {calculatedDuplicates}
      </div>
    );
  };

  const ruleReorderRenderer = (record: RuleRecord) => {
    return (
      <RuleReorderButtons
        ruleIndex={record.key}
        rules={rules}
        onRulesMove={onRulesChange}
      />
    );
  };

  const onSymbolizersChange = (symbolizers: GsSymbolizer[]) => {
    setValueForRule(ruleEditIndex, 'symbolizers', symbolizers);
  };

  const onFilterChange = (filter: GsFilter) => {
    setValueForRule(ruleEditIndex, 'filter', filter);
  };

  const setValueForRule = (ruleIndex: number, key: string, value: any) => {
    const rulesClone = _cloneDeep(rules);
    _set(rulesClone[ruleIndex], key, value);
    if (onRulesChange) {
      onRulesChange(rulesClone);
    }
  };

  const onSymbolizerEditorWindowClose = () => {
    setSymbolizerEditorVisible(false);
  };

  const onFilterEditorWindowClose = () => {
    setFilterEditorVisible(false);
  };

  const columns: ColumnProps<RuleRecord>[] = [{
    dataIndex: '',
    width: 70,
    render: ruleReorderRenderer
  },
  {
    title: (
      <Tooltip title={locale.symbolizersColumnTitle}>
        <BgColorsOutlined />
      </Tooltip>),
    dataIndex: 'symbolizers',
    render: symbolizerRenderer
  }, {
    title: locale.nameColumnTitle,
    dataIndex: 'name',
    render: nameRenderer
  }, {
    title: locale.filterColumnTitle,
    dataIndex: 'filter',
    render: filterRenderer
  }, {
    title: locale.minScaleColumnTitle,
    dataIndex: 'minScale',
    render: minScaleRenderer
  }, {
    title: locale.maxScaleColumnTitle,
    dataIndex: 'maxScale',
    render: maxScaleRenderer
  }];

  if (showAmountColumn) {
    columns.push({
      title: (<Tooltip title={locale.amountColumnTitle}>Σ</Tooltip>),
      dataIndex: 'amount',
      render: amountRenderer
    });
  }
  if (showDuplicatesColumn) {
    columns.push({
      title: (
        <Tooltip title={locale.duplicatesColumnTitle}>
          <BlockOutlined />
        </Tooltip>),
      dataIndex: 'duplicates',
      render: duplicatesRenderer
    });
  };

  if (hasError) {
    return <h1>An error occurred in the RuleTable UI.</h1>;
  }

  return (
    <div className="gs-rule-table">
      <Table
        columns={columns}
        dataSource={ruleRecords}
        pagination={false}
        {...restProps}
      />
      {
        !symbolizerEditorVisible ? null :
          <SymbolizerEditorWindow
            x={
              symbolizerEditorPosition
                ? symbolizerEditorPosition.x + symbolizerEditorPosition.width
                : undefined
            }
            y={symbolizerEditorPosition ? symbolizerEditorPosition.y : undefined}
            onClose={onSymbolizerEditorWindowClose}
            internalDataDef={data}
            symbolizers={rules[ruleEditIndex]?.symbolizers}
            onSymbolizersChange={onSymbolizersChange}
            iconLibraries={iconLibraries}
            colorRamps={colorRamps}
          />
      }
      {
        !filterEditorVisible ? null :
          <FilterEditorWindow
            x={filterEditorPosition ? filterEditorPosition.x : undefined}
            y={
              filterEditorPosition
                ? filterEditorPosition.y + filterEditorPosition.height
                : undefined
            }
            onClose={onFilterEditorWindowClose}
            filter={rules[ruleEditIndex].filter}
            onFilterChange={onFilterChange}
            filterUiProps={filterUiProps}
            internalDataDef={data && DataUtil.isVector(data) ? data : undefined}
          />
      }
    </div>
  );
};

export default localize(RuleTable, COMPONENTNAME);
