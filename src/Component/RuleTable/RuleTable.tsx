import * as React from 'react';

const _get = require('lodash/get');
const _set = require('lodash/set');
const _isEqual = require('lodash/isEqual');
const _cloneDeep = require('lodash/cloneDeep');

import {
  Table,
  Input,
  InputNumber
} from 'antd';

import {
  Rule as GsRule,
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

import {
  Data as GsData
} from 'geostyler-data';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';

import './RuleTable.css';
import Renderer from '../Symbolizer/Renderer/Renderer';
import { EditorWindow } from '../Symbolizer/EditorWindow/EditorWindow';
import { TableProps } from 'antd/lib/table';

// i18n
export interface RuleTableLocale {
  symbolizersColumnTitle: string;
  nameColumnTitle: string;
  filterColumnTitle: string;
  minScaleColumnTitle: string;
  maxScaleColumnTitle: string;
}

// default props
interface RuleTableDefaultProps extends Partial<TableProps<RuleRecord>> {
  locale: RuleTableLocale;
}

// non default props
interface RuleTableProps extends Partial<RuleTableDefaultProps> {
  data?: GsData;
  rules: GsRule[];
  onRulesChange?: (rules: GsRule[]) => void;
  onSelectionChange?: (selectedRowKeys: string[], selectedRows: any[]) => void;
}

// state
interface RuleTableState {
  ruleEditIndex: number;
  editorVisible: boolean;
}

export interface RuleRecord extends GsRule {
  key: number;
}

export class RuleTable extends React.Component<RuleTableProps, RuleTableState> {

  static componentName: string = 'RuleTable';

  constructor(props: RuleTableProps) {
    super(props);
    this.state = {
      ruleEditIndex: null,
      editorVisible: false
    };
  }

  public static defaultProps: RuleTableDefaultProps = {
    locale: en_US.GsRuleTable
  };

  public shouldComponentUpdate(nextProps: RuleTableProps, nextState: RuleTableState): boolean {
    const diffProps = !_isEqual(this.props, nextProps);
    const diffState = !_isEqual(this.state, nextState);
    return diffProps || diffState;
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

  onSymbolizerClick = (record: RuleRecord) => {
    this.setState({
      ruleEditIndex: record.key,
      editorVisible: true
    });
  }

  symbolizerRenderer = (text: string, record: RuleRecord, index: number) => {
    return (
      <Renderer
        symbolizers={record.symbolizers}
        onClick={() => {
          this.onSymbolizerClick(record);
        }}
      />
    );
  }

  nameRenderer = (text: string, record: RuleRecord, index: number) => {
    return (
      <Input
        value={record.name}
        onChange={(event) => {
          const newName = event.target.value;
          this.setValueForRule(record.key, 'name', newName);
        }}
      />
    );
  }

  filterRenderer = (text: string, record: RuleRecord, index: number) => {
    return (
      <Input
        value={JSON.stringify(record.filter)}
        onChange={(event) => {
          try {
            const newFilter = JSON.parse(event.target.value);
            this.setValueForRule(record.key, 'filter', newFilter);
          } catch (error) {
            // TODO Feedback
          }
        }}
      />
    );
  }

  minScaleRenderer = (text: string, record: RuleRecord, index: number) => {
    const minScaleDenominator = _get(record, 'scaleDenominator.min');
    const value = minScaleDenominator ? parseFloat(minScaleDenominator) : undefined;
    return (
      <InputNumber
        value={value}
        min={0}
        formatter={val => `1:${val}`}
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
        value={value}
        min={0}
        formatter={val => `1:${val}`}
        parser={(val: string) => parseFloat(val.replace('1:', ''))}
        onChange={(newValue: number) => {
          this.setValueForRule(record.key, 'scaleDenominator.max', newValue);
        }}
      />
    );
  }

  onSymbolizersChange = (symbolizers: GsSymbolizer[]) => {
    const {
      ruleEditIndex,
    } = this.state;
    this.setValueForRule(ruleEditIndex, 'symbolizers', symbolizers);
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

  onRendererClick = () => {
    const {
      editorVisible
    } = this.state;

    this.setState({
      editorVisible: !editorVisible
    });
  }

  onEditorWindowClose = () => {
    this.setState({
      editorVisible: false
    });
  }

  render() {
    const {
      locale,
      rules,
      ...restProps
    } = this.props;
    const {
      ruleEditIndex,
      editorVisible
    } = this.state;

    return (
      <div>
        <Table
          className="gs-rule-table"
          columns={[{
            title: locale.symbolizersColumnTitle,
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
          }]}
          dataSource={this.getRuleRecords()}
          pagination={false}
          {...restProps}
        />
        {
          !editorVisible ? null :
            <EditorWindow
              onClose={this.onEditorWindowClose}
              symbolizers={rules[ruleEditIndex].symbolizers}
              onSymbolizersChange={this.onSymbolizersChange}
            />
        }
      </div>
    );
  }
}

export default localize(RuleTable, RuleTable.componentName);
