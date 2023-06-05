/* Released under the BSD 2-Clause License
 *
 * Copyright © 2021-present, terrestris GmbH & Co. KG and GeoStyler contributors
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
import { act, fireEvent, render } from '@testing-library/react';
import { CardStyle } from './CardStyle';
import { Rule, Style, Symbolizer } from 'geostyler-style';
import SymbolizerUtil from '../../Util/SymbolizerUtil';

describe('CardStyle', () => {

  let onStyleChangeDummy: jest.Mock;
  let dummyStyle: Style;
  let dummyRule: Rule;
  let dummySymbolizer: Symbolizer;

  beforeEach(() => {
    onStyleChangeDummy = jest.fn();

    dummyStyle = {
      name: 'foo',
      rules: []
    };

    dummyRule = {
      name: 'foo',
      symbolizers: []
    };

    dummySymbolizer = SymbolizerUtil.generateSymbolizer('Icon');
  });

  it('is defined', () => {
    expect(CardStyle).toBeDefined();
  });

  it('renders correctly', () => {
    const cardStyle = render(<CardStyle />);
    expect(cardStyle.container).toBeInTheDocument();
  });

  describe('onStyleChange', () => {

    it('calls a passed onStyleChange function', async () => {
      const cardStyle = render(<CardStyle onStyleChange={onStyleChangeDummy} />);
      const input = cardStyle.container.querySelector('.gs-namefield');
      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: 'foo'
          }
        });
      });

      expect(onStyleChangeDummy).toHaveBeenCalled();
    });

    it('calls a passed onStyleChange function with the changed style as argument', async () => {
      const name = 'bar';
      const cardStyle = render(<CardStyle style={dummyStyle} onStyleChange={onStyleChangeDummy} />);
      const input = cardStyle.container.querySelector('.gs-namefield');
      await act(async () => {
        fireEvent.change(input, {
          target: {
            value: name
          }
        });
      });

      dummyStyle.name = name;

      expect(onStyleChangeDummy).toHaveBeenCalledWith(dummyStyle);
    });
  });

  describe('StyleOverview', () => {

    it('is shown by default', () => {
      const cardStyle = render(<CardStyle />);
      const styleOverview = cardStyle.container.querySelector('.gs-style-overview');
      expect(styleOverview).not.toBeNull();
    });

    it('switches to RuleOverview when clicking on a rule', async () => {
      dummyStyle.rules = [dummyRule];
      const cardStyle = render(<CardStyle style={dummyStyle} />);
      const ruleCard = cardStyle.container.querySelector('.gs-rule-card');

      await act(async () => {
        fireEvent.click(ruleCard);
      });

      const ruleOverview = cardStyle.container.querySelector('.gs-rule-overview');
      expect(ruleOverview).not.toBeNull();
    });

    it('switches to the RuleGenerator when clicking on the classification button', async () => {
      const cardStyle = render(<CardStyle />);

      const classificationButton = cardStyle.container.querySelector('.gs-classification-button');
      await act(async () => {
        fireEvent.click(classificationButton);
      });

      const ruleGenerator = cardStyle.container.querySelector('.gs-rule-generator');
      expect(ruleGenerator).not.toBeNull();
    });

    it('switches to the BulkEditor when clicking on the multi-edit button', async () => {
      const cardStyle = render(<CardStyle />);

      const multiSelectToggle = cardStyle.container.querySelector('.gs-multi-select-toggle');
      await act(async () => {
        fireEvent.click(multiSelectToggle);
      });

      const multiEditButton = cardStyle.container.querySelector('.gs-edit-rules-button');
      await act(async () => {
        fireEvent.click(multiEditButton);
      });

      const ruleGenerator = cardStyle.container.querySelector('.gs-bulkeditor');
      expect(ruleGenerator).not.toBeNull();
    });
  });

  describe('RuleOverview', () => {

    it('switches to SymbolizerView when clickin on a symbolizer', async () => {
      dummyRule.symbolizers = [dummySymbolizer];
      dummyStyle.rules = [dummyRule];
      const cardStyle = render(<CardStyle style={dummyStyle} />);

      const ruleCard = cardStyle.container.querySelector('.gs-rule-card');
      await act(async () => {
        fireEvent.click(ruleCard);
      });

      const symbolizerCard = cardStyle.container.querySelector('.gs-symbolizer-card');
      await act(async () => {
        fireEvent.click(symbolizerCard);
      });

      const editorView = cardStyle.container.querySelector('.gs-symbolizer-editor');
      expect(editorView).not.toBeNull();
    });

    it('switches to the FilterTree when clicking on the add filter button', async () => {
      dummyRule.symbolizers = [dummySymbolizer];
      dummyStyle.rules = [dummyRule];
      const cardStyle = render(<CardStyle style={dummyStyle} />);

      const ruleCard = cardStyle.container.querySelector('.gs-rule-card');
      await act(async () => {
        fireEvent.click(ruleCard);
      });

      const addFilterButton = cardStyle.container.querySelector('.gs-filter-overview-add button');
      await act(async () => {
        fireEvent.click(addFilterButton);
      });

      const filterTree = cardStyle.container.querySelector('.gs-filter-tree');
      expect(filterTree).not.toBeNull();
    });
  });

  // describe('RuleGenerator', () => {

  //   TODO make this test work
  //   it('switches to the StyleOverview when clicking on classify button', async () => {
  //     const cardStyle = render(<CardStyle />);

  //     const classificationButton = cardStyle.container.querySelector('.gs-classification-button');
  //     await act(async () => {
  //       fireEvent.click(classificationButton);
  //     });

  //     const attributeInput = await cardStyle.findByPlaceholderText('Select Attribute');
  //     await act(async () => {
  //       fireEvent.change(attributeInput, {
  //         target: {
  //           value: 'foo'
  //         }
  //       });
  //     });

  //     const classifyButton = cardStyle.container.querySelector('.gs-rule-generator-submit-button');
  //     await act(async () => {
  //       fireEvent.click(classifyButton);
  //     });

  //     const styleOverview = cardStyle.container.querySelector('.gs-style-overview');
  //     expect(styleOverview).not.toBeNull();
  //   });
  // });

});
