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

import {
  Tree,
  Dropdown,
  Menu,
  Button
} from 'antd';

import {
  EllipsisOutlined,
  FilterOutlined,
  MinusOutlined,
  PlusOutlined
} from '@ant-design/icons';

import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEqual from 'lodash/isEqual';
import _cloneDeep from 'lodash/cloneDeep';

const TreeNode = Tree.TreeNode;

import {
  CombinationOperator,
  Filter,
} from 'geostyler-style';

import './FilterTree.less';

import {
  Data as Data
} from 'geostyler-data';

import ComparisonFilter, { ComparisonFilterProps } from '../ComparisonFilter/ComparisonFilter';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import {
  isCombinationFilter,
  isComparisonFilter,
  isGeoStylerFunction,
  isNegationFilter
} from 'geostyler-style/dist/typeguards';
import FilterUtil from '../../../Util/FilterUtil';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { GeoStylerLocale } from '../../../locale/locale';
import en_US from '../../../locale/en_US';

// default props
export interface FilterTreeDefaultProps {
  /** The filter to edit */
  filter: Filter;
  /** Locale object containing translated text snippets */
  locale: GeoStylerLocale['FilterTree'];
}
// non default props
export interface FilterTreeProps extends Partial<FilterTreeDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef?: Data;
  /** Callback function for onFilterChange */
  onFilterChange?: ((compFilter: Filter) => void);
  /** Properties that will be passed to the Comparison Filters */
  filterUiProps?: Partial<ComparisonFilterProps>;
}

/**
 * UI for a ComparisonFilter consisting of
 *
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value
 */
export const FilterTree: React.FC<FilterTreeProps> = ({
  filter: rootFilter = ['==', '', null],
  internalDataDef,
  locale = en_US.FilterTree,
  onFilterChange,
  filterUiProps
}) => {

  const [expandedKeys, setExpandedKeys] = React.useState<string[]>();

  /**
   * Changehandler for ComparsionFilters.
   *
   */
  const onComparisonFilterChange = (filter: Filter, position: string) => {
    if (_isEqual(filter, rootFilter)) {
      onFilterChange(filter);
    }

    let newFilter = _cloneDeep(rootFilter);
    if (position === '') {
      newFilter = filter;
    } else {
      _set(newFilter, position, filter);
    }

    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  /**
   * Handler for the add button.
   * Adds a filter of a given type at the given position.
   *
   */
  const onAddFilterClicked = (position: string, type: string) => {
    const newFilter = FilterUtil.addFilter(rootFilter, position, type);
    onFilterChange(newFilter);
  };

  /**
   * Changes a filter at a position to a given typ.
   *
   */
  const onChangeFilterClicked = (position: string, type: string) => {
    const newFilter = FilterUtil.changeFilter(rootFilter, position, type);
    onFilterChange(newFilter);
  };

  /**
   * Removes a filter at a given position.
   *
   */
  const removeFilter = (position: string) => {
    const newFilter = FilterUtil.removeFilter(rootFilter, position);
    onFilterChange(newFilter);
  };

  /**
   * Creates a TreeNode for a given filter at the given position.
   *
   * @return Tree.TreeNode
   */
  // TODO: This should be a single component
  const getNodeByFilter = (filter: Filter | CombinationOperator, position: string = ''): any => {
    const onMenuClick = (e: any) => {
      const keyPath: string[] = e.keyPath;
      const reversedKeyPath = keyPath.reverse();
      switch (reversedKeyPath[0]) {
        case 'add':
          onAddFilterClicked(position, reversedKeyPath[1].toString());
          break;
        case 'change':
          onChangeFilterClicked(position, reversedKeyPath[1].toString());
          break;
        case 'remove':
          removeFilter(position);
          break;
        default:
          break;
      }
    };

    const items: ItemType[] = [];
    if (isCombinationFilter(filter)) {
      items.push({
        label: locale.addFilterLabel,
        key: 'add',
        icon: <PlusOutlined />,
        children: [{
          label: locale.andDrpdwnLabel,
          key: 'and'
        }, {
          label: locale.orDrpdwnLabel,
          key: 'or'
        }, {
          label: locale.notDrpdwnLabel,
          key: 'not'
        },{
          label: locale.comparisonDrpdwnLabel,
          key: 'comparison'
        }],
      });
    }
    items.push({
      label: locale.changeFilterLabel,
      key: 'change',
      icon: <FilterOutlined />,
      children: [{
        label: locale.andDrpdwnLabel,
        key: 'and'
      }, {
        label: locale.orDrpdwnLabel,
        key: 'or'
      }, {
        label: locale.notDrpdwnLabel,
        key: 'not'
      },{
        label: locale.comparisonDrpdwnLabel,
        key: 'comparison'
      }],
    });
    items.push({
      key: 'remove',
      icon: <MinusOutlined />
    });

    const menu = (
      <Dropdown overlay={
        <Menu onClick={onMenuClick} items={items} />
      }>
        <Button
          className="filter-menu-button"
          size="small"
          icon={<EllipsisOutlined />}
        />
      </Dropdown>
    );

    let extraClassName = '';
    let title;
    const isLeaf = !(isCombinationFilter(filter) || isNegationFilter(filter));
    let children = null;

    if (isCombinationFilter(filter)) {
      const text = filter[0] === '&&' ? locale.andFilterText : locale.orFilterText;
      extraClassName = `${filter[0] === '&&' ? 'and' : 'or'}-filter`;
      title = (
        <span className="node-title">
          <span className="filter-text">{text}</span>
          {menu}
        </span>
      );
      children = filter.slice(1).map((subFilter: Filter | CombinationOperator, index: number) => {
        const pos = `${position}[${index + 1}]`;
        return getNodeByFilter(subFilter, pos);
      });
    } else if (isNegationFilter(filter)) {
      extraClassName = 'not-filter';
      title = (
        <span className="node-title">
          <span className="filter-text">{locale.notFilterText}</span>
          {menu}
        </span>
      );
      children = getNodeByFilter(filter[1], `${position}[1]`);
    } else if (isComparisonFilter(filter)) {
      extraClassName = 'comparison-filter';
      title = (
        <span className="node-title">
          <ComparisonFilter
            microUI={true}
            internalDataDef={internalDataDef}
            filter={filter}
            onFilterChange={f => onComparisonFilterChange(f, position)}
            {...filterUiProps}
          />
          {menu}
        </span>
      );
    } else if (isGeoStylerFunction(filter)) {
      extraClassName = 'function-filter';
      title = (
        <span className="node-title">
          GeoStyler function not supported yet.
          {menu}
        </span>
      );
    } else {
      extraClassName = 'unknown-filter';
      title = (
        <span className="node-title">
          Unknown filter supplied.
          {menu}
        </span>
      );
    }

    return (
      <TreeNode
        className={`style-filter-node ${extraClassName}`}
        key={position}
        isLeaf={isLeaf}
        title={title}
      >
        {children}
      </TreeNode>
    );
  };

  /**
   * Drop handler which is passed to the Tree.
   * Removes filter from the dragged position and adds it to the dropped position.
   */
  const onDrop = (dropObject: any) => {
    const {
      dragNode,
      node
    } = dropObject;

    let newFilter = [...rootFilter] as Filter;

    const dragNodePosition = dragNode.props.eventKey;
    const draggedFilter: Filter = _get(rootFilter, dragNodePosition) as Filter;
    const dragParentPosition = dragNodePosition.substring(0, dragNodePosition.length - 3);
    const dragParentFilter: Filter = dragParentPosition === ''
      ? rootFilter
      : _get(rootFilter, dragParentPosition) as Filter;
    const dragPositionArray = FilterUtil.positionStringAsArray(dragNodePosition);
    const dragSubPosition = dragPositionArray[dragPositionArray.length - 1];

    const dropTargetPosition = node.props.eventKey === '0-0' ? '' : node.props.eventKey;
    const dropParentPosition = dropTargetPosition.substring(0, dropTargetPosition.length - 3);
    const dropPositionArray = FilterUtil.positionStringAsArray(dropTargetPosition);
    const dropSubPosition = dropPositionArray[dropPositionArray.length - 1];

    const sameParent = dragParentPosition === dropParentPosition;
    const draggedLastRemaingChild = dragParentFilter.length <= 2;
    let removePositionArray = [...dragPositionArray];

    // Get remove position. Calculate the modified indexes after the node is added.

    // We dropped to the root node
    if (dropTargetPosition === '' || dropParentPosition === '') {
      const droppedBefore = dropTargetPosition === '' || dropPositionArray[0] < dragPositionArray[0];
      if (droppedBefore) {
        removePositionArray[0] = dragPositionArray[0] + 1;
      }
    }
    // We dropped inside the same CompositionFilter
    if (sameParent) {
      if (dropSubPosition < dragSubPosition) {
        const subIndex = removePositionArray.length - 1;
        removePositionArray[subIndex] = dragSubPosition + 1;
      }
    } else {
      if (draggedLastRemaingChild) {
        removePositionArray = FilterUtil.positionStringAsArray(dragParentPosition);
      }
    }

    const removePosition = FilterUtil.positionArrayAsString(removePositionArray);
    // Insert into new position
    newFilter = FilterUtil.insertAtPosition(newFilter, draggedFilter, dropTargetPosition);
    // Remove from old position
    newFilter = FilterUtil.removeAtPosition(newFilter, removePosition);

    onFilterChange(newFilter);
  };

  /**
   * Expand handler which is passed to the Tree.
   * Sets the expandedKeys to the state and so back to the tree.
   */
  const onExpand = (newExpandedKeys: (number|string)[]) => {
    setExpandedKeys(newExpandedKeys as string[]);
  };

  return (
    <Tree
      className="gs-filter-tree"
      draggable={true}
      expandedKeys={expandedKeys}
      onExpand={onExpand}
      onDrop={onDrop}
    >
      {getNodeByFilter(rootFilter)}
    </Tree>
  );
};

export default localize(FilterTree, 'FilterTree');
