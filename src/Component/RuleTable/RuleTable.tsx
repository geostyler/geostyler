
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

import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CqlParser } from 'geostyler-cql-parser';

import _get from 'lodash-es/get.js';
import _set from 'lodash-es/set.js';
import _cloneDeep from 'lodash-es/cloneDeep.js';

import {
  Table,
  Input,
  Popover,
  Tooltip,
  Button,
  Space
} from 'antd';

import {
  Rule as GsRule,
  Symbolizer as GsSymbolizer,
  Filter as GsFilter,
  ScaleDenominator
} from 'geostyler-style';

import './RuleTable.css';
import { FilterEditorWindow } from '../Filter/FilterEditorWindow/FilterEditorWindow';
import { SymbolizerEditorWindow } from '../Symbolizer/SymbolizerEditorWindow/SymbolizerEditorWindow';
import { ColumnProps, TableProps } from 'antd/lib/table';
import FilterUtil, { CountResult } from '../../Util/FilterUtil';
import DataUtil from '../../Util/DataUtil';
import {
  BgColorsOutlined,
  BlockOutlined,
  EditOutlined,
  CopyOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Renderer } from '../Renderer/Renderer/Renderer';
import {
  useGeoStylerComposition,
  useGeoStylerData,
  useGeoStylerLocale
} from '../../context/GeoStylerContext/GeoStylerContext';
import { RuleComposableProps } from '../RuleCard/RuleCard';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { useDragDropSensors } from '../../hook/UseDragDropSensors';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableRow } from '../DraggableTableRow/DraggableTablerow';

import { InputScaleDenominator } from '../ScaleDenominator/InputScaleDenominator';
import { SelectScaleDenominator } from '../ScaleDenominator/SelectScaleDenominator';

export interface RuleRecord extends GsRule {
  key: string;
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
  onCloneRule?: (index: number) => void;
  onRemoveRule?: (index: number) => void;
  /** Properties that will be passed to the Comparison Filters */
}

export type RuleTableProps = RuleTableInternalProps & RuleComposableProps & TableProps<RuleRecord>;

export const RuleTable: React.FC<RuleTableProps> = (props) => {

  const data = useGeoStylerData();
  const scaleDenominators  = data?.scaleDenominators;

  const composition = useGeoStylerComposition('Rule');

  // Reading the `Style` composition to get the `disableMultiEdit` property
  // and show `actionsField` column by default when true
  const styleComposition = useGeoStylerComposition('Style');
  const composed = { ...props, ...composition };
  const {
    amountField,
    duplicateField,
    filterField,
    scalesField,
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


  const createUniqueIds = () => {
    return rules.map<string>(() => crypto.randomUUID());
  };

  // these ids are used to keep track of the position of a row after a reorder per drag and drop happens,
  // which then allows us to provide semantically correct React keys, which ensure correct behaviour for drag and drop
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
    } catch {
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

  const scaleRenderer = (text: string, record: RuleRecord, index: number) => {
    const scaleDenominator = _get(record, 'scaleDenominator');
    return scaleDenominators ?
      <SelectScaleDenominator
        scaleDenominators={scaleDenominators}
        scaleDenominator={scaleDenominator}
        onChange={(newValue: ScaleDenominator) => {
          setValueForRule(index, 'scaleDenominator', newValue);
        }}
      /> :
      <InputScaleDenominator scaleDenominator={scaleDenominator} onChange={(newValue: ScaleDenominator) => {
        setValueForRule(index, 'scaleDenominator', newValue);
      }} />;
  };

  // TODO: Refactor to stand alone component
  const amountRenderer = (text: string, record: RuleRecord, index: number) => {
    let amount: (number | '-') = '-';
    const filter: GsFilter | undefined = record.filter;
    if (data && filter) {
      try {
        amount = counts[index] || 0;
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
  const duplicatesRenderer = (text: string, record: RuleRecord, index: number) => {
    let calculatedDuplicates: (number | '-') = '-';
    if (data && rules) {
      try {
        calculatedDuplicates = duplicates[index];
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

  const actionsRenderer = (text: string, record: RuleRecord, index: number) => {
    return (
      <Space.Compact block>
        {!(actionsField.clone === false) &&
          <Button
            className="gs-rule-table-action-buttons"
            icon={<CopyOutlined />}
            title={locale.actionCloneLabel}
            color="default"
            variant="text"
            onClick={() => onCloneRule?.(index)}
          />
        }
        {!(actionsField.remove === false) &&
          <Button
            className="gs-rule-table-action-buttons"
            icon={<CloseOutlined />}
            color="default"
            variant="text"
            title={locale.actionRemoveLabel}
            onClick={() => onRemoveRule?.(index)}
            disabled={rules.length <= 1}
          />
        }
      </Space.Compact>
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

  const columns: ColumnProps<RuleRecord>[] = [
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

  if (!(scalesField?.visibility === false)) {
    columns.push({
      title: locale.scalesColumnTitle,
      dataIndex: 'scaleDenominator',
      render: scaleRenderer
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

  // remaps the selected keys from uuids to indices
  const onChangeSelection: typeof antdTableProps.rowSelection.onChange = (keys, rows, infos) => {
    return antdTableProps.rowSelection?.onChange?.(keys.map(k => uniqueIds.current.indexOf(k as string)), rows, infos);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id) { return; }

    const activeIndex = ruleRecords.findIndex((i) => i.key === active.id);
    const overIndex = ruleRecords.findIndex((i) => i.key === over?.id);

    const previouslySelectedRowKeys =
      antdTableProps?.rowSelection?.selectedRowKeys?.map(
        (k) => uniqueIds.current[k as number]
      );

    uniqueIds.current = arrayMove(uniqueIds.current, activeIndex, overIndex);
    onRulesChange(arrayMove(rules, activeIndex, overIndex));

    if (!antdTableProps.rowSelection || antdTableProps.rowSelection.selectedRowKeys?.length === 0) { return; }
    // if the user of the RuleTable controls the selection via input, we need to update the selection by
    // changing the selected indices to their respective indices after reordering.
    // this will ensure that the same items remain selected, instead of the items at the same indices.

    onChangeSelection(
      previouslySelectedRowKeys,
      arrayMove(ruleRecords, activeIndex, overIndex).filter((r) => previouslySelectedRowKeys.includes(r.key)),
      null
    );
  };

  if (hasError) {
    return <h1>An error occurred in the RuleTable UI.</h1>;
  }

  // if the user provides a rowSelection we need to "patch" some properties to do the remapping of uuids to indices,
  // since all external uses of the RulesTable assume that a selected key is equal to the index of that rule.
  const rowSelection: TableProps<RuleRecord>['rowSelection'] = antdTableProps.rowSelection ? {
    ...antdTableProps.rowSelection,
    selectedRowKeys: antdTableProps.rowSelection.selectedRowKeys.map(k => uniqueIds.current[k as number]),
    onChange: onChangeSelection
  } : undefined;

  return (
    <div className="gs-rule-table">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
        <SortableContext items={uniqueIds.current} strategy={verticalListSortingStrategy}>
          <Table
            columns={columns}
            dataSource={ruleRecords}
            pagination={false}
            rowKey='key'
            components={{
              header: {
                row: (rowProps: PropsWithChildren) => (
                  <tr>
                    {/* the empty table header is creating a placeholder column for the drag handle */}
                    <th></th>
                    {rowProps.children}
                  </tr>
                )
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

