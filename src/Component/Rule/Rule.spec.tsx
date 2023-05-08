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

import React from 'react';
import { Rule, RuleProps } from './Rule';
import TestUtil from '../../Util/TestUtil';
import en_US from '../../locale/en_US';
import {
  Rule as GsRule,
  Filter as GsFilter,
  LineSymbolizer,
} from 'geostyler-style';
import { RenderResult, act, fireEvent, render } from '@testing-library/react';

describe('Rule', () => {

  let wrapper: RenderResult;
  let onRuleChangeDummmy: jest.Mock;
  let onRemoveDummmy: jest.Mock;
  let dummyRule: GsRule = TestUtil.getLineStyle().rules[0] as GsRule;
  dummyRule.name = 'Dummy rule';
  dummyRule.scaleDenominator = {
    min: 0,
    max: 1909
  };
  dummyRule.filter = [
    '==',
    'key',
    'value'
  ];
  beforeEach(() => {
    const dummyData = TestUtil.getDummyGsData();
    onRuleChangeDummmy = jest.fn();
    onRemoveDummmy = jest.fn();
    const props: RuleProps = {
      internalDataDef: dummyData,
      onRuleChange: onRuleChangeDummmy,
      onRemove: onRemoveDummmy,
      locale: en_US.Rule,
      rule: dummyRule
    };

    wrapper = render(<Rule {...props} />);
  });

  it('is defined', () => {
    expect(Rule).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper.container).toBeInTheDocument();
  });

  describe('onNameChange', () => {
    it('calls the onNameChange prop with correct symbolizer ', async () => {
      const ruleName = 'my rule';
      let input = wrapper.queryByDisplayValue(dummyRule.name);

      const newRule: GsRule = {
        ...dummyRule,
        name: ruleName
      };

      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: ruleName
          }
        });
      });

      expect(onRuleChangeDummmy).toBeCalledWith(newRule, dummyRule);

      input = wrapper.queryByDisplayValue(ruleName);

      expect(input).toBeDefined();
    });
  });

  describe('onScaleDenominatorChange', () => {
    it('calls the onScaleDenominatorChange prop with correct symbolizer ', async () => {
      const maxScale = 1910;
      let input = wrapper.queryByDisplayValue(dummyRule.scaleDenominator.max as number);

      const newRule: GsRule = {
        ...dummyRule,
        scaleDenominator: {
          min: 0,
          max: maxScale
        }
      };

      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: maxScale
          }
        });
      });

      expect(onRuleChangeDummmy).toBeCalledWith(newRule, dummyRule);

      input = wrapper.queryByDisplayValue(maxScale);

      expect(input).toBeDefined();
    });
  });

  describe('onFilterChange', () => {
    it('calls the onFilterChange prop with correct symbolizer ', async () => {
      const filter: GsFilter = [
        '==',
        'key',
        'new value'
      ];

      let input = wrapper.queryByDisplayValue('value');

      const newRule: GsRule = {
        ...dummyRule,
        filter: filter
      };

      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: filter[2]
          }
        });
      });

      expect(onRuleChangeDummmy).toBeCalledWith(newRule, dummyRule);

      input = wrapper.queryByDisplayValue(filter[2] as string);

      expect(input).toBeDefined();
    });
  });

  describe('onSymbolizersChange', () => {
    it('calls the onSymbolizersChange prop with correct symbolizer ', async () => {
      const map = wrapper.queryByRole('presentation');

      await act(async () => {
        fireEvent.click(map);
      });

      const btn = wrapper.queryByText('Add');

      await act(async () => {
        fireEvent.click(btn);
      });

      const symbolizer = dummyRule.symbolizers.slice(0, 1)[0] as LineSymbolizer;
      symbolizer.color = '#0E1058';

      const newRule: GsRule = {
        ...dummyRule,
        symbolizers: [
          ...dummyRule.symbolizers,
          symbolizer
        ]
      };

      expect(onRuleChangeDummmy).toBeCalledWith(newRule, dummyRule);
    });
  });

  describe('onScaleCheckChange', () => {
    it('calls the onScaleCheckChange prop with correct symbolizer ', async () => {
      const input = wrapper.queryByText('Use scale');

      await act(async () => {
        fireEvent.click(input);
      });

      const newRule: GsRule = {
        ...dummyRule,
        scaleDenominator: undefined
      };

      expect(onRuleChangeDummmy).toBeCalledWith(newRule, dummyRule);
    });
  });

  describe('onFilterCheckChange', () => {
    it('calls the onFilterCheckChange prop with correct symbolizer ', async () => {
      const input = wrapper.queryByText('Use filter');

      await act(async () => {
        fireEvent.click(input);
      });

      const newRule: GsRule = {
        ...dummyRule,
        filter: undefined
      };

      expect(onRuleChangeDummmy).toBeCalledWith(newRule, dummyRule);
    });
  });

  describe('A click on the Remove Button', () => {
    it('calls the onRemove function passed as prop ', async () => {
      const removeButton = wrapper.queryByText('Remove Rule');

      await act(async () => {
        fireEvent.click(removeButton);
      });

      expect(onRemoveDummmy).toBeCalled();
    });
  });

  describe('onEditorWindowClose', () => {
    it('closes the editor window', async () => {
      const renderer = wrapper.queryByRole('presentation');

      await act(async () => {
        fireEvent.click(renderer);
      });

      const styleEditor = wrapper.queryByText('Symbolizer Editor');
      expect(styleEditor).toBeInTheDocument();

      const closeButtons = wrapper.queryAllByRole('button');

      const closeButton = closeButtons.find(btn => btn.getElementsByClassName('anticon-close').length > 0);

      await act(async () => {
        fireEvent.click(closeButton);
      });

      expect(styleEditor).not.toBeInTheDocument();
    });
  });

});
