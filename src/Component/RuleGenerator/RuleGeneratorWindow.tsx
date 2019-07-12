import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { brewer, InterpolationMode } from 'chroma-js';

import { Rnd } from 'react-rnd';

import {
  Rule
} from 'geostyler-style';

import { Data } from 'geostyler-data';

import './RuleGeneratorWindow.css';
import { Button } from 'antd';

import { localize } from '../LocaleWrapper/LocaleWrapper';
import en_US from '../../locale/en_US';
import RuleGenerator from './RuleGenerator';

const _isEqual = require('lodash/isEqual');
const _isFinite = require('lodash/isFinite');
// i18n
export interface RuleGeneratorWindowLocale {
  ruleGenerator: string;
}

// default props
export interface RuleGeneratorWindowDefaultProps {
  locale: RuleGeneratorWindowLocale;
}

// non default props
export interface RuleGeneratorWindowProps extends Partial<RuleGeneratorWindowDefaultProps> {
  internalDataDef: Data;
  x?: number;
  y?: number;
  onClose?: () => void;
  onRulesChange?: (rules: Rule[]) => void;
  colorRamps?: {
    [name: string]: string[]
  };
  useBrewerColorRamps?: boolean;
  colorSpaces?: (InterpolationMode)[];
}

/**
 * Symbolizer editorwindow UI.
 */
export class RuleGeneratorWindow extends React.Component<RuleGeneratorWindowProps> {

  public static defaultProps: RuleGeneratorWindowDefaultProps = {
    locale: en_US.GsRuleGeneratorWindow
  };

  public shouldComponentUpdate(nextProps: RuleGeneratorWindowProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

  static componentName: string = 'RuleGeneratorWindow';

  render() {
    const {
      x,
      y,
      onClose,
      onRulesChange,
      locale,
      internalDataDef,
      colorRamps,
      colorSpaces,
      useBrewerColorRamps
    } = this.props;

    let ramps = colorRamps;
    if (colorRamps && useBrewerColorRamps) {
      ramps = Object.assign(colorRamps, brewer);
    }

    return (
      ReactDOM.createPortal(
        <Rnd
          className="rule-generator-window"
          default={{
            x: _isFinite(x) ? x : window.innerWidth / 2,
            y: _isFinite(y) ? y : window.innerHeight / 2,
            width: undefined,
            height: undefined
          }}
          enableResizing={{
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: false,
            right: false,
            top: false,
            topLeft: false,
            topRight: false
          }}
          bounds="window"
          dragHandleClassName="rule-generator-window-header"
        >
          <div className="header rule-generator-window-header">
            <span className="title">
              {locale.ruleGenerator}
            </span>
            <Button
              icon="close"
              size="small"
              onClick={onClose}
            />
          </div>
          <RuleGenerator
            internalDataDef={internalDataDef}
            onRulesChange={onRulesChange}
            colorRamps={ramps}
            colorSpaces={colorSpaces}
          />
        </Rnd>,
        document.body
      )
    );
  }
}

export default localize(RuleGeneratorWindow, RuleGeneratorWindow.componentName);
