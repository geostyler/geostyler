import * as React from 'react';

import {
  Tree
} from 'antd';

const _uniqueId = require('lodash/uniqueId');

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

  getNodeByFilter = (filter: GsFilter): any => {
    const {
      internalDataDef
    } = this.props;

    const nodeKey = _uniqueId('treenode_');

    const operator = filter[0];

    if (operator === '&&') {
      const combinedFilters = filter.slice(1);
      return (
        <TreeNode
          className="style-filter-node and-filter"
          key={nodeKey}
          isLeaf={false}
          title="And"
        >
          {combinedFilters.map(subFilter => this.getNodeByFilter(subFilter))}
        </TreeNode>
      );
    } else if (operator === '||') {
      const combinedFilters = filter.slice(1);
      return (
        <TreeNode
          className="style-filter-node or-filter"
          key={nodeKey}
          isLeaf={false}
          title="Or"
        >
          {combinedFilters.map(subFilter => this.getNodeByFilter(subFilter))}
        </TreeNode>
      );
    } else if (operator === '!') {
      return (
        <TreeNode
          className="style-filter-node not-filter"
          key={nodeKey}
          isLeaf={false}
          title="Not"
        >
          {this.getNodeByFilter(filter[1])}
        </TreeNode>
      );
    } else {
      return (
        <TreeNode
          className="style-filter-node comparison-filter"
          key={nodeKey}
          isLeaf={true}
          title={
            <ComparisonFilterUi // Could be ComparionsFilterNode
              microUI={true}
              internalDataDef={internalDataDef}
              filter={filter as GsComparisonFilter}
              onFilterChange={() => ''}
            />
          }
        />
      );
    }
  }

  render() {
    const {
      filter
    } = this.props;
    return (
      <Tree
        className="gs-filter-tree"
        draggable={true}
      >
        {this.getNodeByFilter(filter)}
      </Tree>
    );
  }
}

export default FilterTree;
