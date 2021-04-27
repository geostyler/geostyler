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
  Button,
  Tooltip
} from 'antd';

import {
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
  Filter as GsFilter,
  ComparisonFilter as GsComparisonFilter,
  NegationFilter as GsNegationFilter,
  CombinationFilter as GsCombinationFilter
} from 'geostyler-style';

import './FilterTree.less';

import {
  Data as Data
} from 'geostyler-data';

import ComparisonFilter, { ComparisonFilterProps } from '../ComparisonFilter/ComparisonFilter';
import { localize } from '../../LocaleWrapper/LocaleWrapper';
import en_US from '../../../locale/en_US';
import {
  isCombinationFilter,
  isComparisonFilter,
  isFunctionFilter,
  isNegationFilter
} from 'geostyler-style/dist/typeguards';

interface FilterTreeLocale {
  andDrpdwnLabel: string;
  orDrpdwnLabel: string;
  notDrpdwnLabel: string;
  comparisonDrpdwnLabel: string;
  addFilterLabel: string;
  changeFilterLabel: string;
  removeFilterLabel: string;
  andFilterText: string;
  orFilterText: string;
  notFilterText: string;
}

// default props
export interface FilterTreeDefaultProps {
  /** The filter to edit */
  filter: GsFilter;
  /** Locale object containing translated text snippets */
  locale: FilterTreeLocale;
}
// non default props
export interface FilterTreeProps extends Partial<FilterTreeDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef: Data;
  /** Callback function for onFilterChange */
  onFilterChange?: ((compFilter: GsFilter) => void);
  /** Properties that will be passed to the Comparison Filters */
  filterUiProps?: Partial<ComparisonFilterProps>;
}

// state
interface FilterTreeState {
  expandedKeys: string[];
  hasError: boolean;
}

/**
 * UI for a ComparisonFilter consisting of
 *
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value
 */
export class FilterTree extends React.Component<FilterTreeProps, FilterTreeState> {

  public static defaultProps: FilterTreeDefaultProps = {
    filter: ['==', '', null],
    locale: en_US.GsFilterTree
  };

  static componentName = 'FilterTree';

  constructor(props: FilterTreeProps) {
    super(props);
    this.state = {
      expandedKeys: [],
      hasError: false
    };
  }

  public shouldComponentUpdate = (nextProps: FilterTreeProps, nextState: FilterTreeState): boolean => {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true
    });
  }

  /**
   * Changehandler for ComparsionFilters.
   *
   */
  onComparisonFilterChange = (filter: GsFilter, position: string) => {
    const {
      filter: rootFilter
    } = this.props;
    if (_isEqual(filter, rootFilter)) {
      this.props.onFilterChange(filter);
    }

    let newFilter = _cloneDeep(rootFilter);
    if (position === '') {
      newFilter = filter;
    } else {
      _set(newFilter, position, filter);
    }

    this.props.onFilterChange(newFilter);
  };

  /**
   * Creates a TreeNode for a given filter at the given position.
   *
   * @return Tree.TreeNode
   */
  getNodeByFilter = (filter: GsFilter, position: string = ''): any => {
    const {
      internalDataDef,
      locale,
      filterUiProps
    } = this.props;

    const addFilterMenu = (
      <Menu onClick={({key}) => this.addFilter(position, key.toString())}>
        <Menu.Item key="and">{locale.andDrpdwnLabel}</Menu.Item>
        <Menu.Item key="or">{locale.orDrpdwnLabel}</Menu.Item>
        <Menu.Item key="not">{locale.notDrpdwnLabel}</Menu.Item>
        <Menu.Item key="comparison">{locale.comparisonDrpdwnLabel}</Menu.Item>
      </Menu>
    );

    const changeFilterMenu = (
      <Menu onClick={({key}) => this.changeFilter(position, key.toString())}>
        <Menu.Item key="and">{locale.andDrpdwnLabel}</Menu.Item>
        <Menu.Item key="or">{locale.orDrpdwnLabel}</Menu.Item>
        <Menu.Item key="not">{locale.notDrpdwnLabel}</Menu.Item>
        <Menu.Item key="comparison">{locale.comparisonDrpdwnLabel}</Menu.Item>
      </Menu>
    );

    const addButton = (
      <Tooltip title={locale.addFilterLabel} placement="top">
        <Dropdown
          trigger={['click']}
          overlay={addFilterMenu}
        >
          <Button size="small">
            <PlusOutlined />
          </Button>
        </Dropdown>
      </Tooltip>
    );

    const removeButton = (
      <Tooltip title={locale.removeFilterLabel} placement="right">
        <Button
          size="small"
          onClick={() => this.removeFilter(position)}
        >
          <MinusOutlined />
        </Button>
      </Tooltip>
    );

    const changeButton = (
      <Tooltip title={locale.changeFilterLabel} placement="left">
        <Dropdown
          trigger={['click']}
          overlay={changeFilterMenu}
        >
          <Button size="small">
            <FilterOutlined />
          </Button>
        </Dropdown>
      </Tooltip>
    );

    if (isCombinationFilter(filter)) {
      const combinedFilters = filter.slice(1);
      return (
        <TreeNode
          className="style-filter-node and-filter"
          key={position}
          isLeaf={false}
          title={
            <span className="node-title">
              <span className="filter-text">{locale.andFilterText}</span>
              <span className="filter-tools">
                {changeButton}
                {addButton}
                {removeButton}
              </span>
            </span>
          }
        >
          {
            combinedFilters.map((subFilter: GsFilter, index: number) => {
              const pos = `${position}[${index + 1}]`;
              return this.getNodeByFilter(subFilter, pos);
            })
          }
        </TreeNode>
      );
    } else if (isNegationFilter(filter)) {
      return (
        <TreeNode
          className="style-filter-node not-filter"
          key={position}
          isLeaf={false}
          title={
            <span className="node-title">
              <span className="filter-text">{locale.notFilterText}</span>
              <span className="filter-tools">
                {changeButton}
                {removeButton}
              </span>
            </span>
          }
        >
          {this.getNodeByFilter(filter[1], `${position}[1]`)}
        </TreeNode>
      );
    } else if (isComparisonFilter(filter)) {
      return (
        <TreeNode
          className="style-filter-node comparison-filter"
          key={position}
          isLeaf={true}
          title={
            <span className="node-title">
              <span>
                <ComparisonFilter
                  microUI={true}
                  internalDataDef={internalDataDef}
                  filter={filter}
                  onFilterChange={f => this.onComparisonFilterChange(f, position)}
                  {...filterUiProps}
                />
              </span>
              <span className="filter-tools">
                {changeButton}
                {removeButton}
              </span>
            </span>
          }
        />
      );
    } else if (isFunctionFilter(filter)) {
      <TreeNode
        className="style-filter-node function-filter"
        key={position}
        isLeaf={true}
        title={
          <span className="node-title">
            Function filter not supported yet.
          </span>
        }
      />;
    } else {
      <TreeNode
        className="style-filter-node unknown-filter"
        key={position}
        isLeaf={true}
        title={
          <span className="node-title">
            Unknown filter supplied.
          </span>
        }
      />;
    }
  };

  /**
   * Handler for the add button.
   * Adds a filter of a given type at the given position.
   *
   */
  addFilter = (position: string, type: string) => {
    const {
      filter,
      onFilterChange
    } = this.props;

    let addedFilter: GsFilter ;
    let newFilter: GsFilter = _cloneDeep(filter);

    switch (type) {
      case 'and':
        addedFilter = ['&&', ['==', '', ''], ['==', '', '']] as GsCombinationFilter;
        break;
      case 'or':
        addedFilter = ['||', ['==', '', ''], ['==', '', '']] as GsCombinationFilter;
        break;
      case 'not':
        addedFilter = ['!', ['==', '', '']] as GsNegationFilter;
        break;
      case 'comparison':
      default:
        addedFilter = ['==', '', ''] as GsComparisonFilter;
        break;
    }

    if (position === '') {
      newFilter = newFilter as GsCombinationFilter;
      newFilter.push(addedFilter);
    } else {
      const previousFilter: GsCombinationFilter = _get(newFilter, position);
      previousFilter.push(addedFilter);
      _set(newFilter, position, previousFilter);
    }

    onFilterChange(newFilter);
  };

  /**
   * Changes a filter at a position to a given typ.
   *
   */
  changeFilter = (position: string, type: string) => {
    const {
      filter,
      onFilterChange
    } = this.props;

    let addedFilter: GsFilter ;
    const newFilter: GsFilter = _cloneDeep(filter);
    const previousFilter = position === '' ? newFilter : _get(newFilter, position);

    switch (type) {
      case 'and':
        if (previousFilter && (previousFilter[0] === '&&' || previousFilter[0] === '||' )) {
          addedFilter = previousFilter;
          addedFilter[0] = '&&';
        } else {
          addedFilter = ['&&', ['==', '', ''], ['==', '', '']];
        }
        break;
      case 'or':
        if (previousFilter && (previousFilter[0] === '&&' || previousFilter[0] === '||' )) {
          addedFilter = previousFilter;
          addedFilter[0] = '||';
        } else {
          addedFilter = ['||', ['==', '', ''], ['==', '', '']];
        }
        break;
      case 'not':
        addedFilter = ['!', ['==', '', '']];
        break;
      case 'comparison':
      default:
        addedFilter = ['==', '', ''];
        break;
    }

    if (position === '') {
      onFilterChange(addedFilter);
      return;
    } else {
      _set(newFilter, position, addedFilter);
    }

    onFilterChange(newFilter);
  };

  /**
   * Removes a filter at a given position.
   *
   */
  removeFilter = (position: string) => {
    const {
      filter,
      onFilterChange
    } = this.props;

    const parentPosition = position.substring(0, position.length - 3);
    const parentFilter: GsFilter = this.getFilterAtPosition(parentPosition);
    let newFilter: GsFilter;

    if (position === '') {
      newFilter = undefined;
    } else if (parentFilter.length <= 2) {
      newFilter = this.removeAtPosition(filter, parentPosition);
    } else {
      newFilter = this.removeAtPosition(filter, position);
    }

    onFilterChange(newFilter);
  };

  /**
   * Transforms a position String like '[2][3]' to an positionArray like [2, 3].
   */
  positionStringAsArray = (positionString: string) => {
    return positionString
      .replace(/\]\[/g, ',')
      .replace(/\]/g, '')
      .replace(/\[/g, '')
      .split(',')
      .map(i => parseInt(i, 10));
  };

  /**
   * Transforms am positionArray like [2, 3] to a string like '[2][3]'.
   */
  positionArrayAsString = (positionArray: number[]) => {
    return `[${positionArray.toString().replace(/,/g, '][')}]`;
  };

  /**
   * Returns the filter at a specific position.
   */
  getFilterAtPosition = (position: string) => {
    const {
      filter
    } = this.props;
    if (position === '') {
      return filter;
    } else {
      return _get(filter, position);
    }
  };

  /**
   * Removes a subfilter from a given filter at the given position.
   */
  removeAtPosition = (filter: GsFilter, position: string): GsFilter => {
    let newFilter = [...filter] as GsFilter;
    const dragNodeSubPosition = position.substr(position.length - 3);
    const dragNodeIndex = parseInt(dragNodeSubPosition.slice(1, 2), 10);
    const parentPosition = position.substring(0, position.length - 3);

    let parentFilter = newFilter;
    if (parentPosition !== '') {
      parentFilter = _get(newFilter, parentPosition);
    }
    parentFilter.splice(dragNodeIndex, 1);
    return newFilter;
  };

  /**
   * Inserts a given subfilter to a given parentfilter by its position and its
   * dropPosition.
   */
  insertAtPosition = (
    rootFilter: GsFilter,
    insertFilter: GsFilter,
    position: string,
    dropPosition: number
  ): GsFilter => {
    const dropTargetParentPosition = position.substring(0, position.length - 3);
    const dropTargetSubPosition = position.substr(position.length - 3);
    const dropTargetSubIndex = dropTargetParentPosition === ''
      ? 1
      : parseInt(dropTargetSubPosition.slice(1, 2), 10);
    const dropTargetIsComparison = !['&', '||', '!'].includes(insertFilter[0]);
    let newFilter = [...rootFilter];

    const newSubFilter = dropTargetParentPosition === ''
      ? newFilter
      : _get(newFilter, dropTargetParentPosition);

    // Add to new position
    switch (dropPosition) {
      // before
      case 0:
        newSubFilter.splice(dropTargetSubIndex, 0, insertFilter);
        break;
      // on
      case 1:
        if (dropTargetIsComparison) {
          newSubFilter.splice(dropTargetSubIndex + 1, 0, insertFilter);
        } else {
          newSubFilter.push(insertFilter);
        }
        break;
      // after
      case 2:
        newSubFilter.splice(dropTargetSubIndex + 1, 0, insertFilter);
        break;
      default:
        break;
    }
    return newFilter as GsFilter;
  };

  /**
   * Drop handler which is passed to the Tree.
   * Removes filter from the dragged position and adds it to the dropped position.
   */
  onDrop = (dropObject: any) => {
    const {
      filter: rootFilter
    } = this.props;
    const {
      dragNode,
      dropPosition,
      node
    } = dropObject;

    let newFilter = [...rootFilter] as GsFilter;

    const dragNodePosition = dragNode.props.eventKey;
    const draggedFilter: GsFilter = _get(rootFilter, dragNodePosition) as GsFilter;
    const dragParentPosition = dragNodePosition.substring(0, dragNodePosition.length - 3);
    const dragParentFilter: GsFilter = dragParentPosition === ''
      ? rootFilter
      : _get(rootFilter, dragParentPosition) as GsFilter;
    const dragPositionArray = this.positionStringAsArray(dragNodePosition);
    const dragSubPosition = dragPositionArray[dragPositionArray.length - 1];

    const dropTargetPosition = node.props.eventKey === '0-0' ? '' : node.props.eventKey;
    const dropParentPosition = dropTargetPosition.substring(0, dropTargetPosition.length - 3);
    const dropPositionArray = this.positionStringAsArray(dropTargetPosition);
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
        removePositionArray = this.positionStringAsArray(dragParentPosition);
      }
    }

    const removePosition = this.positionArrayAsString(removePositionArray);
    // Insert into new position
    newFilter = this.insertAtPosition(newFilter, draggedFilter, dropTargetPosition, dropPosition);
    // Remove from old position
    newFilter = this.removeAtPosition(newFilter, removePosition);

    this.props.onFilterChange(newFilter);
  };

  /**
   * Expand handler which is passed to the Tree.
   * Sets the expandedKeys to the state and so back to the tree.
   */
  onExpand = (expandedKeys: string[]) => {
    this.setState({expandedKeys});
  };

  render() {
    if (this.state.hasError) {
      return <h1>An error occured in the FilterTree UI.</h1>;
    }
    const {
      filter
    } = this.props;
    const {
      expandedKeys
    } = this.state;
    return (
      <Tree
        className="gs-filter-tree"
        draggable={true}
        expandedKeys={expandedKeys}
        onExpand={this.onExpand}
        onDrop={this.onDrop}
      >
        {this.getNodeByFilter(filter)}
      </Tree>
    );
  }
}

export default localize(FilterTree, FilterTree.componentName);
