import * as React from 'react';

const _get = require('lodash/get');
const _set = require('lodash/set');
const _isEqual = require('lodash/isEqual');
const _cloneDeep = require('lodash/cloneDeep');

import {
  Table,
  Input,
  InputNumber,
  Icon,
  Popover,
  Tooltip
} from 'antd';

import {
  Rule as GsRule,
  Symbolizer as GsSymbolizer,
  Filter as GsFilter,
  Symbolizer
} from 'geostyler-style';

import {
  Data as GsData
} from 'geostyler-data';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

import './RuleTable.css';
import Renderer, { RendererProps } from '../Symbolizer/Renderer/Renderer';
import FilterEditorWindow from '../Filter/FilterEditorWindow/FilterEditorWindow';
import SymbolizerEditorWindow from '../Symbolizer/SymbolizerEditorWindow/SymbolizerEditorWindow';
import { TableProps } from 'antd/lib/table';
import FilterUtil from '../../Util/FilterUtil';
import { SLDRenderer, SLDRendererAdditonalProps } from '../Symbolizer/SLDRenderer/SLDRenderer';
import { ComparisonFilterProps } from '../Filter/ComparisonFilter/ComparisonFilter';
import { IconLibrary } from '../Symbolizer/IconSelector/IconSelector';

// i18n
export interface RuleTableLocale {
  symbolizersColumnTitle: string;
  nameColumnTitle: string;
  filterColumnTitle: string;
  minScaleColumnTitle: string;
  maxScaleColumnTitle: string;
  amountColumnTitle: string;
  duplicatesColumnTitle: string;
}

// default props
interface RuleTableDefaultProps extends Partial<TableProps<RuleRecord>> {
  locale: RuleTableLocale;
  rendererType: 'SLD' | 'OpenLayers';
  sldRendererProps?: SLDRendererAdditonalProps;
  oLRendererProps?: Partial<RendererProps>;
  showAmountColumn: boolean;
  showDuplicatesColumn: boolean;
}

// non default props
export interface RuleTableProps extends Partial<RuleTableDefaultProps> {
  data?: GsData;
  rules: GsRule[];
  footer?: (currentPageData?: any) => React.ReactNode;
  onRulesChange?: (rules: GsRule[]) => void;
  onSelectionChange?: (selectedRowKeys: string[], selectedRows: any[]) => void;
  /** Properties that will be passed to the Comparison Filters */
  filterUiProps?: Partial<ComparisonFilterProps>;
  iconLibraries?: IconLibrary[];
}

// state
interface RuleTableState {
  ruleEditIndex: number;
  symbolizerEditorVisible: boolean;
  symbolizerEditorPosition: DOMRect;
  filterEditorVisible: boolean;
  filterEditorPosition: DOMRect;
  hasError: boolean;
  data: GsData;
  rules: GsRule[];
  counts: number[];
  duplicates: number[];
}

export interface RuleRecord extends GsRule {
  key: number;
}

export class RuleTable extends React.Component<RuleTableProps, RuleTableState> {

  static componentName: string = 'RuleTable';

  constructor(props: RuleTableProps) {
    super(props);
    this.state = {
      ruleEditIndex: undefined,
      symbolizerEditorVisible: false,
      symbolizerEditorPosition: undefined,
      filterEditorVisible: false,
      filterEditorPosition: undefined,
      hasError: false,
      data: undefined,
      rules: undefined,
      counts: undefined,
      duplicates: undefined
    };
  }

  public static defaultProps: RuleTableDefaultProps = {
    locale: en_US.GsRuleTable,
    rendererType: 'OpenLayers',
    showAmountColumn: true,
    showDuplicatesColumn: true
  };

  static getDerivedStateFromProps(nextProps: RuleTableProps, prevState: RuleTableState) {
    let countsAndDuplicates;
    try {
      let filtersEqual = true;
      nextProps.rules.forEach((rule, index) => {
        try {
          filtersEqual = filtersEqual && _isEqual(prevState.rules[index].filter, rule.filter);
        } catch (e) {
          filtersEqual = false;
        }
      });
      // we should refrain from using _isEqual on the data as it's very slow on largish datasets
      // thus it's the responsibility of the calling code to make sure the object only gets updated when actual data
      // changes
      if (filtersEqual && nextProps.data === prevState.data) {
        return {};
      }
      countsAndDuplicates = FilterUtil.calculateCountAndDuplicates(nextProps.rules, nextProps.data);
    } catch (e) {
      // make sure to update state when checks/calculation fails
    }
    return {
      data: nextProps.data,
      rules: nextProps.rules,
      counts: countsAndDuplicates.counts,
      duplicates: countsAndDuplicates.duplicates
    };
  }

  public shouldComponentUpdate(nextProps: RuleTableProps, nextState: RuleTableState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true
    });
  }

  getRuleRecords = (): RuleRecord[] => {
    const {
      rules
    } = this.props;
    return rules.map((rule: GsRule, index: number): RuleRecord => {
      return {
        key: index,
        ...rule
      };
    });
  }

  onSymbolizerClick = (record: RuleRecord, symbolizerEditorPosition: DOMRect) => {
    this.setState({
      ruleEditIndex: record.key,
      symbolizerEditorVisible: true,
      symbolizerEditorPosition,
      filterEditorVisible: false
    });
  }

  symbolizerRenderer = (text: string, record: RuleRecord) => {
    const {
      rendererType,
      sldRendererProps
    } = this.props;

    const onSymbolizerClick = (symbolizers: Symbolizer[], event: any) => {
      const filterPosition = event.target.getBoundingClientRect();
      this.onSymbolizerClick(record, filterPosition);
    };

    return (
      rendererType === 'SLD' ? (
        <SLDRenderer
          symbolizers={record.symbolizers}
          onClick={onSymbolizerClick}
          {...sldRendererProps}
        />
      ) : (
          <Renderer
            symbolizers={record.symbolizers}
            onClick={onSymbolizerClick}
          />
        )
    );
  }

  nameRenderer = (text: string, record: RuleRecord) => {
    const {
      locale
    } = this.props;

    const input = (
      <Input
        value={record.name}
        onChange={(event) => {
          const target = event.target;
          this.setValueForRule(record.key, 'name', target.value);
        }}
      />);
    return (
      <Popover
        content={record.name}
        title={locale.nameColumnTitle}
      >
        {input}
      </Popover>
    );
  }

  filterRenderer = (text: string, record: RuleRecord) => {
    const {
      locale
    } = this.props;
    const cql = FilterUtil.writeAsCql(record.filter);
    let filterCell: React.ReactNode;
    const inputSearch = (
      <Input.Search
        className="gs-rule-table-filter-cell"
        value={cql}
        onChange={(event) => {
          // TODO The CQL representation is currently not editable
          // const value = event.target.value;
          // try {
          //   const newFilter = FilterUtil.readFromCql(value);
          //   this.setValueForRule(record.key, 'filter', newFilter);
          // } catch (error) {
          //   // TODO Feedback
          // }
        }}
        enterButton={(
          <Icon
            type="edit"
          />
        )}
        onSearch={(value, event: any) => {
          const filterPosition = event.target.getBoundingClientRect();
          this.onFilterEditClick(record.key, filterPosition);
        }}
      />);
    if (cql.length > 0) {
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
  }

  onFilterEditClick = (ruleEditIndex: number, filterEditorPosition: DOMRect) => {
    this.setState({
      ruleEditIndex,
      filterEditorPosition,
      symbolizerEditorVisible: false,
      filterEditorVisible: true
    });
  }

  minScaleRenderer = (text: string, record: RuleRecord, index: number) => {
    const minScaleDenominator = _get(record, 'scaleDenominator.min');
    const value = minScaleDenominator ? parseFloat(minScaleDenominator) : undefined;
    return (
      <InputNumber
        className="scale-denominator min-scale-denominator"
        value={value}
        min={0}
        formatter={val => val ? `1:${val}` : ''}
        parser={(val: string) => parseFloat(val.replace('1:', ''))}
        onChange={(newValue: number) => {
          this.setValueForRule(record.key, 'scaleDenominator.min', newValue);
        }}
      />
    );
  }

  maxScaleRenderer = (text: string, record: RuleRecord, index: number) => {
    const maxScaleDenominator = _get(record, 'scaleDenominator.max');
    const value = maxScaleDenominator ? parseFloat(maxScaleDenominator) : undefined;
    return (
      <InputNumber
        className="scale-denominator max-scale-denominator"
        value={value}
        min={0}
        formatter={val => val ? `1:${val}` : ''}
        parser={(val: string) => parseFloat(val.replace('1:', ''))}
        onChange={(newValue: number) => {
          this.setValueForRule(record.key, 'scaleDenominator.max', newValue);
        }}
      />
    );
  }

  amountRenderer = (text: string, record: RuleRecord) => {
    const {
      data
    } = this.props;
    let amount: (number|'-') = '-';
    const filter: GsFilter|undefined = record.filter;
    if (data && filter) {
      try {
        amount = this.state.counts[record.key];
      } catch (error) {
        amount = '-';
      }
    } else if (data) {
      amount = data.exampleFeatures.features.length;
    }
    return (
      <div className="ant-input gs-rule-table-numeric-cell">{amount}</div>
    );
  }

  duplicatesRenderer = (text: string, record: RuleRecord) => {
    const {
      data,
      rules
    } = this.props;

    let duplicates: (number|'-') = '-';
    if (data && rules) {
      try {
        duplicates = this.state.duplicates[record.key];
      } catch (error) {
        duplicates = '-';
      }
    }
    return (
      <div className="ant-input gs-rule-table-numeric-cell">{duplicates}</div>
    );
  }

  onSymbolizersChange = (symbolizers: GsSymbolizer[]) => {
    const {
      ruleEditIndex,
    } = this.state;
    this.setValueForRule(ruleEditIndex, 'symbolizers', symbolizers);
  }

  onFilterChange = (filter: GsFilter) => {
    const {
      ruleEditIndex,
    } = this.state;
    this.setValueForRule(ruleEditIndex, 'filter', filter);
  }

  setValueForRule = (ruleIndex: number, key: string, value: any) => {
    const {
      onRulesChange,
      rules
    } = this.props;
    const rulesClone = _cloneDeep(rules);
    _set(rulesClone[ruleIndex], key, value);
    if (onRulesChange) {
      onRulesChange(rulesClone);
    }
  }

  onSymbolizerEditorWindowClose = () => {
    this.setState({
      symbolizerEditorVisible: false
    });
  }

  onFilterEditorWindowClose = () => {
    this.setState({
      filterEditorVisible: false
    });
  }

  getColumns = () => {
    const {
      locale,
      showAmountColumn,
      showDuplicatesColumn
    } = this.props;

    const columns = [{
      title: (
        <Tooltip title={locale.symbolizersColumnTitle}>
          <Icon type="bg-colors" />
        </Tooltip>),
      dataIndex: 'symbolizers',
      render: this.symbolizerRenderer
    }, {
      title: locale.nameColumnTitle,
      dataIndex: 'name',
      render: this.nameRenderer
    }, {
      title: locale.filterColumnTitle,
      dataIndex: 'filter',
      render: this.filterRenderer
    }, {
      title: locale.minScaleColumnTitle,
      dataIndex: 'minScale',
      render: this.minScaleRenderer
    }, {
      title: locale.maxScaleColumnTitle,
      dataIndex: 'maxScale',
      render: this.maxScaleRenderer
      }];

    if (showAmountColumn) {
      columns.push({
        title: (<Tooltip title={locale.amountColumnTitle}>Σ</Tooltip>),
        dataIndex: 'amount',
        render: this.amountRenderer
      });
    }
    if (showDuplicatesColumn) {
      columns.push({
        title: (
          <Tooltip title={locale.duplicatesColumnTitle}>
            <Icon type="block" />
          </Tooltip>),
        dataIndex: 'duplicates',
        render: this.duplicatesRenderer
      });
    }

    return columns;
  }

  render() {
    if (this.state.hasError) {
      return <h1>An error occured in the RuleTable UI.</h1>;
    }
    const {
      locale,
      rules,
      filterUiProps,
      data,
      iconLibraries,
      showAmountColumn,
      showDuplicatesColumn,
      ...restProps
    } = this.props;
    const {
      ruleEditIndex,
      symbolizerEditorVisible,
      symbolizerEditorPosition,
      filterEditorVisible,
      filterEditorPosition
    } = this.state;

    return (
      <div>
        <Table
          className="gs-rule-table"
          columns={this.getColumns()}
          dataSource={this.getRuleRecords()}
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
              onClose={this.onSymbolizerEditorWindowClose}
              internalDataDef={data}
              symbolizers={rules[ruleEditIndex].symbolizers}
              onSymbolizersChange={this.onSymbolizersChange}
              iconLibraries={iconLibraries}
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
              onClose={this.onFilterEditorWindowClose}
              filter={rules[ruleEditIndex].filter}
              onFilterChange={this.onFilterChange}
              filterUiProps={filterUiProps}
              internalDataDef={data}
            />
        }
      </div>
    );
  }
}

export default localize(RuleTable, RuleTable.componentName);
