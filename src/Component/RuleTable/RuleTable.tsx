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

import React, { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
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

import './RuleTable.css';
import { FilterEditorWindow } from '../Filter/FilterEditorWindow/FilterEditorWindow';
import { SymbolizerEditorWindow } from '../Symbolizer/SymbolizerEditorWindow/SymbolizerEditorWindow';
import { ColumnProps, TableProps } from 'antd/lib/table';
import FilterUtil, { CountResult } from '../../Util/FilterUtil';
import DataUtil from '../../Util/DataUtil';
import { RuleReorderButtons } from './RuleReorderButtons/RuleReorderButtons';
import { BgColorsOutlined, BlockOutlined, EditOutlined, HolderOutlined } from '@ant-design/icons';
import { Renderer } from '../Renderer/Renderer/Renderer';
import {
  useGeoStylerComposition,
  useGeoStylerData,
  useGeoStylerLocale
} from '../../context/GeoStylerContext/GeoStylerContext';
import { RuleComposableProps } from '../RuleCard/RuleCard';
import { closestCenter, DndContext, DragEndEvent, useDraggable } from '@dnd-kit/core';
import { useDragDropSensors } from '../../hook/UseDragDropSensors';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


export interface RuleRecord extends GsRule {
  key: string;
  index: number;
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
  /** Properties that will be passed to the Comparison Filters */
}

export type RuleTableProps = RuleTableInternalProps & RuleComposableProps & TableProps<RuleRecord>;

export const RuleTable: React.FC<RuleTableProps> = (props) => {

  const data = useGeoStylerData();

  const composition = useGeoStylerComposition('Rule');
  const composed = { ...props, ...composition };
  const {
    amountField,
    duplicateField,
    filterField,
    maxScaleField,
    minScaleField,
    nameField,
    onRulesChange,
    rendererType = 'OpenLayers',
    rules,
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


  const createUniqueIds = () => {
    return rules.map<string>(() => crypto.randomUUID());
  };

  const uniqueIds = useRef(createUniqueIds());

  const sensors = useDragDropSensors();

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
    } catch (e) {
      setHasError(true);
      // make sure to update state when checks/calculation fails
    }
    setCounts(countsAndDuplicates?.counts);
    setDuplicates(countsAndDuplicates?.duplicates);
  }, [rules, data]);


  if (uniqueIds.current.length < rules.length) {
    uniqueIds.current = createUniqueIds();
  }

  const ruleRecords = rules?.map((rule: GsRule, index: number): RuleRecord => {
    return {
      ...rule,
      index,
      key: uniqueIds.current[index]
    };
  });

  const onSymbolizerClick = (index: number) => {
    setRuleEditIndex(index);
    setSymbolizerEditorVisible(true);
    setFilterEditorVisible(false);
  };

  const symbolizerRenderer = (text: string, record: RuleRecord, index: number) => {
    const onSymbolizerRendererClick = () => {
      onSymbolizerClick(index);
    };

    return (
      <Renderer
        rendererType={rendererType}
        symbolizers={record.symbolizers}
        onClick={onSymbolizerRendererClick}
      />
    );
  };

  // TODO: Refactor to stand alone component
  const nameRenderer = (text: string, record: RuleRecord, index: number) => {
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
            setValueForRule(index, 'name', target.value);
          }}
        />
      </Popover>
    );
  };

  // TODO: Refactor to stand alone component
  const filterRenderer = (text: string, record: RuleRecord, index: number) => {
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
          onFilterEditClick(index);
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
  const minScaleRenderer = (text: string, record: RuleRecord, index: number) => {
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
          setValueForRule(index, 'scaleDenominator.min', newValue);
        }}
      />
    );
  };

  // TODO: Refactor to stand alone component
  const maxScaleRenderer = (text: string, record: RuleRecord, index: number) => {
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
          setValueForRule(index, 'scaleDenominator.max', newValue);
        }}
      />
    );
  };

  // TODO: Refactor to stand alone component
  const amountRenderer = (text: string, record: RuleRecord, index: number) => {
    let amount: (number | '-') = '-';
    const filter: GsFilter | undefined = record.filter;
    if (data && filter) {
      try {
        amount = counts[index] || 0;
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
  const duplicatesRenderer = (text: string, record: RuleRecord, index: number) => {
    let calculatedDuplicates: (number | '-') = '-';
    if (data && rules) {
      try {
        calculatedDuplicates = duplicates[index];
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

  const ruleReorderRenderer = (text: unknown, record: RuleRecord, index: number) => {
    return (
      <RuleReorderButtons
        ruleIndex={index}
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


  const changeSelection: TableProps<RuleRecord>['rowSelection']['onChange'] = (keys, rows, infos) => {
    return antdTableProps.rowSelection.onChange(keys, rows, infos);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id) { return; }

    const activeIndex = ruleRecords.findIndex((i) => i.key === active.id);
    const overIndex = ruleRecords.findIndex((i) => i.key === over?.id);

    const previouslySelectedRowKeys = antdTableProps.rowSelection.selectedRowKeys.map(k => uniqueIds.current[k as number]);
    uniqueIds.current = arrayMove(uniqueIds.current, activeIndex, overIndex);
    onRulesChange(arrayMove(rules, activeIndex, overIndex));
    console.log(previouslySelectedRowKeys, ruleRecords, uniqueIds);
    ruleRecords.forEach((r) => r.index = uniqueIds.current.indexOf(r.key));
    changeSelection(previouslySelectedRowKeys.map(k => uniqueIds.current.indexOf(k)), ruleRecords.filter(r => previouslySelectedRowKeys.includes(r.key)), null);
  };

  if (hasError) {
    return <h1>An error occurred in the RuleTable UI.</h1>;
  }

  const rowSelection: TableProps<RuleRecord>['rowSelection'] = {
    ...antdTableProps.rowSelection,
    selectedRowKeys: antdTableProps.rowSelection.selectedRowKeys.map(k => uniqueIds.current[k as number]),
    onChange: changeSelection
  };

  return (
    <div className="gs-rule-table">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
        <SortableContext items={ruleRecords.map(r => r.key)} strategy={verticalListSortingStrategy}>
          <Table
            columns={columns}
            dataSource={ruleRecords}
            pagination={false}
            rowKey={'key'}
            components={{
              header: {
                row: ({ ...props }) => {
                  return (<><tr><th></th>{props.children}</tr></>);
                }
              },
              body: {
                row: DraggableRow,
              }
            }}
            {...antdTableProps}
            rowSelection={rowSelection}
          />
        </SortableContext>
      </DndContext>
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

const DraggableRow: React.FC<{ 'data-row-key': string, children: ReactNode }> = ({ 'data-row-key': id, children, ...props }) => {
  const { attributes, listeners, transform, transition, setNodeRef, setActivatorNodeRef } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    'background-color': 'white'
  };

  return (
    <tr {...props} key={id} ref={setNodeRef} {...attributes} style={style}>
      <td ref={setActivatorNodeRef} {...listeners}><HolderOutlined /></td>{children}
    </tr>
  );
};
