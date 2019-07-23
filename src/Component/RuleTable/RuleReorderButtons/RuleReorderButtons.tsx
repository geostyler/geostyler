import * as React from 'react';
import { Button } from 'antd';

import {
  Rule as GsRule,
} from 'geostyler-style';

import en_US from '../../../locale/en_US';

const ButtonGroup = Button.Group;
const _cloneDeep = require('lodash/cloneDeep');

// i18n
export interface RuleReorderButtonsLocale {
  ruleMoveUpTip: string;
  ruleMoveDownTip: string;
}

// default props
interface RuleReorderButtonsDefaultProps {
  locale: RuleReorderButtonsLocale;
}
// non default props
export interface RuleReorderButtonsProps extends Partial<RuleReorderButtonsDefaultProps> {
  /** Index of the correspondig Rule object */
  ruleIndex: number;
  /** Callback for click = move a rule position */
  onRulesMove?: (rules: GsRule[]) => void;
  /** all rules */
  rules: GsRule[];
}

/**
 * Button to remove a rule.
 */
export class RuleReorderButtons extends React.Component<RuleReorderButtonsProps> {

  public static defaultProps: RuleReorderButtonsDefaultProps = {
    locale: en_US.GsRuleReorderButtons
  };

  onRuleOrderChange = (moveDown: boolean) => {
    const {
      ruleIndex,
      rules,
      onRulesMove
    } = this.props;

    const nextRuleIndex = moveDown ? ruleIndex + 1 : ruleIndex - 1;
    const rulesClone = _cloneDeep(rules);
    // shift rule one position up / down in rules array
    rulesClone.splice(nextRuleIndex, 0, rulesClone.splice(ruleIndex, 1)[0]);

    if (onRulesMove) {
      onRulesMove(rulesClone);
    }
  }

  render() {
    const {
      locale,
      ruleIndex,
      rules,
    } = this.props;

    return (
      <ButtonGroup>
        <Button icon="up"
          disabled={ruleIndex === 0}
          title={locale.ruleMoveUpTip}
          onClick={() => {
            this.onRuleOrderChange(false);
          }}
        />
        <Button icon="down"
          disabled={ruleIndex === rules.length - 1}
          title={locale.ruleMoveDownTip}
          onClick={() => {
            this.onRuleOrderChange(true);
          }}
        />
      </ButtonGroup>
    );
  }
}

export default RuleReorderButtons;
