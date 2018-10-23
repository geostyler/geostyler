import * as React from 'react';

import {
  Tree,
  Icon,
  Dropdown,
  Menu,
  Button,
  Tooltip
} from 'antd';

const _get = require('lodash/get');
const _set = require('lodash/set');

const TreeNode = Tree.TreeNode;

import {
  Filter as GsFilter,
  ComparisonFilter as GsComparisonFilter
} from 'geostyler-style';

import './FilterTree.css';

import {
  Data as Data
} from 'geostyler-data';

import ComparisonFilterUi from '../ComparisonFilter/ComparisonFilter';
import { TreeNode } from 'antd/lib/tree-select';

// default props
export interface DefaultFilterTreeProps {
  filter: GsFilter;
}
// non default props
interface FilterTreeProps extends Partial<DefaultFilterTreeProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef: Data;
  /** Callback function for onFilterChange */
  onFilterChange?: ((compFilter: GsFilter) => void);
}

// state
interface FilterTreeState {
  expandedKeys: string[];
}

/**
 * UI for a ComparisonFilter consisting of
 *
 *   - A combo to select the attribute
 *   - A combo to select the operator
 *   - An input field for the value
 */
class FilterTree extends React.Component<FilterTreeProps, FilterTreeState> {

  public static defaultProps: DefaultFilterTreeProps = {
    filter: ['==', '', null]
  };

  constructor(props: FilterTreeProps) {
    super(props);
    this.state = {
      expandedKeys: []
    };
  }

  /**
   * Changehandler for ComparsionFilters.
   *
   */
  onComparisonFilterChange = (filter: GsFilter, position: string) => {
    const {
      filter: rootFilter
    } = this.props;
    if (filter === rootFilter) {
      this.props.onFilterChange(filter);
    }

    let newFilter = [...rootFilter];
    if (position === '') {
      newFilter = filter;
    } else {
      _set(newFilter, position, filter);
    }

    this.props.onFilterChange(newFilter);
  }

  /**
   * Creates a TreeNode for a given filter at the given position.
   *
   * @return Tree.TreeNode
   */
  getNodeByFilter = (filter: GsFilter, position: string = ''): any => {
    const {
      internalDataDef
    } = this.props;
    const operator = filter[0];

    let showRemoveButton = false;

    const parentPosition = position.substring(0, position.length - 3);
    const parentFilter = position === '' ? null : this.getFilterAtPosition(parentPosition);

    if (parentFilter) {
      const parentOperator = parentFilter[0];
      if (parentOperator === '&&' || parentOperator === '||') {
        showRemoveButton = true;
      }
    }

    const addFilterMenu = (
      <Menu onClick={({key}) => this.addFilter(position, key)}>
        <Menu.Item key="and">And-Filter</Menu.Item>
        <Menu.Item key="or">Or-Filter</Menu.Item>
        <Menu.Item key="not">Not-Filter</Menu.Item>
        <Menu.Item key="comparison">Comparison-Filter</Menu.Item>
      </Menu>
    );

    const changeFilterMenu = (
      <Menu onClick={({key}) => this.changeFilter(position, key)}>
        <Menu.Item key="and">And-Filter</Menu.Item>
        <Menu.Item key="or">Or-Filter</Menu.Item>
        <Menu.Item key="not">Not-Filter</Menu.Item>
        <Menu.Item key="comparison">Comparison-Filter</Menu.Item>
      </Menu>
    );

    const addButton = (
      <Tooltip title="Add Filter" placement="top">
        <Dropdown
          trigger={['click']}
          overlay={addFilterMenu}
        >
          <Button size="small">
            <Icon type="plus"/>
          </Button>
        </Dropdown>
      </Tooltip>
    );

    const removeButton = (
      <Tooltip title="Remove Filter" placement="right">
        <Button
          size="small"
          onClick={() => this.removeFilter(position)}
        >
          <Icon
            type="minus"
          />
        </Button>
      </Tooltip>
    );

    const changeButton = (
      <Tooltip title="Change Filter" placement="left">
        <Dropdown
          trigger={['click']}
          overlay={changeFilterMenu}
        >
          <Button size="small">
            <Icon type="filter"/>
          </Button>
        </Dropdown>
      </Tooltip>
    );

    if (operator === '&&') {
      const combinedFilters = filter.slice(1);
      return (
        <TreeNode
          className="style-filter-node and-filter"
          key={position}
          isLeaf={false}
          title={
            <span className="node-title">
              <span className="filter-text">And</span>
              <span className="filter-tools">
                {changeButton}
                {addButton}
                {showRemoveButton ? removeButton : undefined}
              </span>
            </span>
          }
        >
          {
            combinedFilters.map((subFilter, index) => {
              const pos = `${position}[${index + 1}]`;
              return this.getNodeByFilter(subFilter, pos);
            })
          }
        </TreeNode>
      );
    } else if (operator === '||') {
      const combinedFilters = filter.slice(1);
      return (
        <TreeNode
          className="style-filter-node or-filter"
          key={position}
          isLeaf={false}
          title={
            <span className="node-title">
              <span className="filter-text">Or</span>
              <span className="filter-tools">
                {changeButton}
                {addButton}
                {showRemoveButton ? removeButton : undefined}
              </span>
            </span>
          }
        >
          {
            combinedFilters.map((subFilter, index) => {
              const pos = `${position}[${index + 1}]`;
              return this.getNodeByFilter(subFilter, pos);
            })
          }
        </TreeNode>
      );
    } else if (operator === '!') {
      return (
        <TreeNode
          className="style-filter-node not-filter"
          key={position}
          isLeaf={false}
          title={
            <span className="node-title">
              <span className="filter-text">Not</span>
              <span className="filter-tools">
                {changeButton}
                {showRemoveButton ? removeButton : undefined}
              </span>
            </span>
          }
        >
          {this.getNodeByFilter(filter[1], `${position}[1]`)}
        </TreeNode>
      );
    } else {
      return (
        <TreeNode
          className="style-filter-node comparison-filter"
          key={position}
          isLeaf={true}
          title={
            <span className="node-title">
              <span>
                <ComparisonFilterUi
                  microUI={true}
                  internalDataDef={internalDataDef}
                  filter={filter as GsComparisonFilter}
                  onFilterChange={f => this.onComparisonFilterChange(f, position)}
                />
              </span>
              <span className="filter-tools">
                {changeButton}
                {showRemoveButton ? removeButton : undefined}
              </span>
            </span>
          }
        />
      );
    }
  }

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
    const newFilter: GsFilter = [...filter];

    switch (type) {
      case 'and':
        addedFilter = ['&&', ['==', '', ''], ['==', '', '']];
        break;
      case 'or':
        addedFilter = ['||', ['==', '', ''], ['==', '', '']];
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
      newFilter.push(addedFilter);
    } else {
      const previousFilter = _get(newFilter, position);
      previousFilter.push(addedFilter);
      _set(newFilter, position, previousFilter);
    }

    onFilterChange(newFilter);
  }

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
    const newFilter: GsFilter = [...filter];
    const previousFilter = position === '' ? newFilter : _get(newFilter, position);

    switch (type) {
      case 'and':
        if (previousFilter && previousFilter[0] === '&&' || previousFilter[0] === '||' ) {
          addedFilter = previousFilter;
          addedFilter[0] = '&&';
        } else {
          addedFilter = ['&&', ['==', '', ''], ['==', '', '']];
        }
        break;
      case 'or':
        if (previousFilter && previousFilter[0] === '&&' || previousFilter[0] === '||' ) {
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
  }

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
    const parentFilter = this.getFilterAtPosition(parentPosition);
    let newFilter;

    if (parentFilter.length <= 2) {
      newFilter = this.removeAtPosition(filter, parentPosition);
    } else {
      newFilter = this.removeAtPosition(filter, position);
    }

    onFilterChange(newFilter);
  }

  /**
   * Transforms a position String like '[2][3]' to an positionArray like [2, 3].
   */
  positionStringAsArray = (positionString: string) => {
    return positionString
      .replace('][', ',')
      .replace(']', '')
      .replace('[', '')
      .split(',')
      .map(i => parseInt(i, 10));
  }

  /**
   * Transforms am positionArray like [2, 3] to a string like '[2][3]'.
   */
  positionArrayAsString = (positionArray: number[]) => {
    return `[${positionArray.toString().replace(',', '][')}]`;
  }

  /**
   * Returns the filter at a specific position.
   */
  getFilterAtPosition = (position: string) => {
    const {
      filter: rootFilter
    } = this.props;
    if (position === '') {
      return rootFilter;
    } else {
      return _get(rootFilter, position);
    }
  }

  /**
   * Removes a subfilter from a given filter at the given position.
   */
  removeAtPosition = (filter: GsFilter, position: string): GsFilter => {
    let newFilter = [...filter];
    const dragNodeSubPosition = position.substr(position.length - 3);
    const dragNodeIndex = parseInt(dragNodeSubPosition.slice(1, 2), 10);
    const parentPosition = position.substring(0, position.length - 3);

    let parentFilter = newFilter;
    if (parentPosition !== '') {
      parentFilter = _get(newFilter, parentPosition);
    }
    parentFilter.splice(dragNodeIndex, 1);
    return newFilter;
  }

  /**
   * Inserts a given subfilter to a given parentfilter by its position and its
   * dropPosition.
   */
  insertAtPosition = (
    rootFilter: GsFilter,
    insertFilter: GsFilter,
    position: string,
    dropPosition: number
  ) => {
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
        dropTargetIsComparison
          ? newSubFilter.splice(dropTargetSubIndex + 1, 0, insertFilter)
          : newSubFilter.push(insertFilter);
        break;
      // after
      case 2:
        newSubFilter.splice(dropTargetSubIndex + 1, 0, insertFilter);
        break;
      default:
        break;
    }
    return newFilter;
  }

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

    let newFilter = [...rootFilter];

    const dragNodePosition = dragNode.props.eventKey;
    const draggedFilter = _get(rootFilter, dragNodePosition);
    const dragParentPosition = dragNodePosition.substring(0, dragNodePosition.length - 3);
    const dragParentFilter = dragParentPosition === '' ? rootFilter : _get(rootFilter, dragParentPosition);
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
  }

  /**
   * Expand handler which is passed to the Tree.
   * Sets the expandedKeys to the state and so back to the tree.
   */
  onExpand = (expandedKeys: string[]) => {
    this.setState({expandedKeys});
  }

  render() {
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

export default FilterTree;
