
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
import _cloneDeep from 'lodash/cloneDeep';

import {
  Table,
  Input,
  InputNumber,
  Popover,
  Tooltip,
  Button,
  Space
} from 'antd';

import {
  Rule as GsRule,
  Symbolizer as GsSymbolizer,
  Filter as GsFilter,
} from 'geostyler-style';

import './RuleTable.css';
import { FilterEditorWindow } from '../Filter/FilterEditorWindow/FilterEditorWindow';
import { SymbolizerEditorWindow } from '../Symbolizer/SymbolizerEditorWindow/SymbolizerEditorWindow';
import { ColumnProps, TableProps } from 'antd/lib/table';
import FilterUtil, { CountResult } from '../../Util/FilterUtil';
import DataUtil from '../../Util/DataUtil';
import { RuleReorderButtons } from './RuleReorderButtons/RuleReorderButtons';
import { BgColorsOutlined, BlockOutlined, EditOutlined, CopyOutlined, CloseOutlined } from '@ant-design/icons';
import { Renderer } from '../Renderer/Renderer/Renderer';
import {
  useGeoStylerComposition,
  useGeoStylerData,
  useGeoStylerLocale
} from '../../context/GeoStylerContext/GeoStylerContext';
import { RuleComposableProps } from '../RuleCard/RuleCard';

export interface RuleRecord extends GsRule {
  key: number;
  amount?: number;
  duplicates?: number;
  maxScale?: number;
  minScale?: number;
}

export interface RuleTableInternalProps {
  /** The renderer to use */
  rendererType?: 'SLD' | 'OpenLayers';
  /** List of rules to display in rule table */
  rules: GsRule[];
  /** The footer of the rule table */
  footer?: (currentPageData?: any) => React.ReactNode;
  /** The callback function that is triggered when the rules change */
  onRulesChange?: (rules: GsRule[]) => void;
  /** The callback function that is triggered when the selection changes */
  onSelectionChange?: (selectedRowKeys: string[], selectedRows: any[]) => void;
  onCloneRule?: (rule: RuleRecord) => void;
  onRemoveRule?: (rule: RuleRecord) => void;
  /** Properties that will be passed to the Comparison Filters */
}

export type RuleTableProps = RuleTableInternalProps & RuleComposableProps & TableProps<RuleRecord>;

export const RuleTable: React.FC<RuleTableProps> = (props) => {

  const data = useGeoStylerData();

  const composition = useGeoStylerComposition('Rule') as RuleComposableProps;

  // Reading the `Style` composition to get the `disableMultiEdit` property
  // and show `actionsField` column by default when true
  const styleComposition = useGeoStylerComposition('Style');
  const composed = { ...props, ...composition };
  const {
    amountField,
    duplicateField,
    filterField,
    maxScaleField,
    minScaleField,
    nameField,
    /** show actions column by default if disableMultiEdit is true */
    actionsField = {
      visibility: styleComposition.disableMultiEdit === true
    },
    onRulesChange,
    rendererType = 'OpenLayers',
    rules,
    onCloneRule,
    onRemoveRule,
    // The composableProps include the antd table props
    ...antdTableProps
  } = composed;

  const locale = useGeoStylerLocale('RuleTable');

  const [ruleEditIndex, setRuleEditIndex] = useState<number>();
  const [symbolizerEditorVisible, setSymbolizerEditorVisible] = useState<boolean>();
  const [filterEditorVisible, setFilterEditorVisible] = useState<boolean>();
  const [hasError, setHasError] = useState<boolean>();
  const [counts, setCounts] = useState<number[]>();
  const [duplicates, setDuplicates] = useState<number[]>();

  /**
   * The Parser to read and write CQL Filter
   *
   */
  const { current: cqlParser } = useRef(new CqlParser());

  useEffect(() => {
    let countsAndDuplicates: CountResult = {};
    try {
      if (data && DataUtil.isVector(data)) {
        countsAndDuplicates = FilterUtil.calculateCountAndDuplicates(rules, data);
      } else {
        countsAndDuplicates = {};
      }
    } catch {
      setHasError(true);
      // make sure to update state when checks/calculation fails
    }
    setCounts(countsAndDuplicates?.counts);
    setDuplicates(countsAndDuplicates?.duplicates);
  }, [rules, data]);

  const ruleRecords = rules?.map((rule: GsRule, index: number): RuleRecord => {
    return {
      key: index,
      ...rule
    };
  });

  const onSymbolizerClick = (record: RuleRecord) => {
    setRuleEditIndex(record.key);
    setSymbolizerEditorVisible(true);
    setFilterEditorVisible(false);
  };

  const symbolizerRenderer = (text: string, record: RuleRecord) => {
    const onSymbolizerRendererClick = () => {
      onSymbolizerClick(record);
    };

    return (
      <div className={'gs-symbolizer-wrapper'}>
        <Renderer
          rendererType={rendererType}
          symbolizers={record.symbolizers}
        />
        <Button
          className={'square-button'}
          type={'primary'}
          icon={<EditOutlined />}
          onClick={onSymbolizerRendererClick} />
      </div>
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
        onSearch={() => {
          onFilterEditClick(record.key);
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

  const onFilterEditClick = (newRuleEditIndex: number) => {
    setRuleEditIndex(newRuleEditIndex);
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
    let amount: (number | '-') = '-';
    const filter: GsFilter | undefined = record.filter;
    if (data && filter) {
      try {
        amount = counts[record?.key] || 0;
      } catch {
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
    let calculatedDuplicates: (number | '-') = '-';
    if (data && rules) {
      try {
        calculatedDuplicates = duplicates[record.key];
      } catch {
        calculatedDuplicates = '-';
      }
    }
    return (
      <div className="ant-input gs-rule-table-numeric-cell duplicates-renderer">
        {calculatedDuplicates}
      </div>
    );
  };

  const actionsRenderer = (text: string, record: RuleRecord) => {
    return (
      <Space.Compact block>
        {!(actionsField.clone === false) &&
          <Button
            className="gs-rule-table-action-buttons"
            icon={<CopyOutlined />}
            title={locale.actionCloneLabel}
            color="default"
            variant="text"
            onClick={() => {
              if (onCloneRule) {
                onCloneRule(record);
              }
            }}
          />
        }
        {!(actionsField.remove === false) &&
          <Button
            className="gs-rule-table-action-buttons"
            icon={<CloseOutlined />}
            color="default"
            variant="text"
            title={locale.actionRemoveLabel}
            onClick={() => {
              if (onRemoveRule) {
                onRemoveRule(record);
              }
            }}
            disabled={rules.length <= 1}
          />
        }
      </Space.Compact>
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
      </Tooltip>
    ),
    dataIndex: 'symbolizers',
    render: symbolizerRenderer
  }];

  if (!(nameField?.visibility === false)) {
    columns.push({
      title: locale.nameColumnTitle,
      dataIndex: 'name',
      render: nameRenderer
    });
  }

  if (!(filterField?.visibility === false)) {
    columns.push({
      title: locale.filterColumnTitle,
      dataIndex: 'filter',
      render: filterRenderer
    });
  }

  if (!(minScaleField?.visibility === false)) {
    columns.push({
      title: locale.minScaleColumnTitle,
      dataIndex: 'minScale',
      render: minScaleRenderer
    });
  }

  if (!(maxScaleField?.visibility === false)) {
    columns.push({
      title: locale.maxScaleColumnTitle,
      dataIndex: 'maxScale',
      render: maxScaleRenderer
    });
  }

  if (!(amountField?.visibility === false)) {
    columns.push({
      title: (<Tooltip title={locale.amountColumnTitle}>Σ</Tooltip>),
      dataIndex: 'amount',
      render: amountRenderer
    });
  }

  if (!(duplicateField?.visibility === false)) {
    columns.push({
      title: (
        <Tooltip title={locale.duplicatesColumnTitle}>
          <BlockOutlined />
        </Tooltip>),
      dataIndex: 'duplicates',
      render: duplicatesRenderer
    });
  };

  if (!(actionsField?.visibility === false)) {
    columns.push({
      title: locale.actionsColumnTitle,
      render: actionsRenderer,
    });
  }

  if (hasError) {
    return <h1>An error occurred in the RuleTable UI.</h1>;
  }

  return (
    <div className="gs-rule-table">
      <Table
        columns={columns}
        dataSource={ruleRecords}
        pagination={false}
        {...antdTableProps}
      />
      <SymbolizerEditorWindow
        open={symbolizerEditorVisible}
        onClose={onSymbolizerEditorWindowClose}
        symbolizers={rules?.[ruleEditIndex]?.symbolizers}
        onSymbolizersChange={onSymbolizersChange}
      />
      <FilterEditorWindow
        open={filterEditorVisible}
        onClose={onFilterEditorWindowClose}
        filter={rules?.[ruleEditIndex]?.filter}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};
