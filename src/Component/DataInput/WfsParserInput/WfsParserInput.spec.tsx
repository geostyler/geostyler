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
import { ReadParams } from 'geostyler-wfs-parser';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { WfsParserInput } from './WfsParserInput';
import en_US from '../../../locale/en_US';

const locale = en_US.WfsParserInput;

describe('WfsParserInput', () => {

  it('is defined', () => {
    expect(WfsParserInput).toBeDefined();
  });

  it('renders correctly', () => {
    const onClickMock = jest.fn();
    const field = render(<WfsParserInput onClick={onClickMock} />);
    expect(field.container).toBeInTheDocument();
  });

  describe('onUrlChange', () => {
    it('shows and error when url is to short', async() => {
      const onClickMock = jest.fn();
      const field = render(<WfsParserInput onClick={onClickMock} />);
      // const input = field.container.querySelector('input.wfs-url-input');
      // https://github.com/ant-design/ant-design/issues/35600
      // Due to a bug in antd the class is set on the wrong element.
      // Has to be undone once this bug is fixed.
      const input = field.container.querySelector('span.wfs-url-input > input');
      fireEvent.change(input!, { target: { value: '' }});
      expect(await field.findByRole('alert')).toBeInTheDocument();
      expect(await field.findByText('Url is required')).toBeInTheDocument();
    });
  });

  describe('onTypeNameChange', () => {
    it('shows and error when typeName is to short', async() => {
      const onClickMock = jest.fn();
      const field = render(<WfsParserInput onClick={onClickMock} />);
      // const input = field.container.querySelector('input.wfs-typename-input');
      // https://github.com/ant-design/ant-design/issues/35600
      // Due to a bug in antd the class is set on the wrong element.
      // Has to be undone once this bug is fixed.
      const input = field.container.querySelector('span.wfs-typename-input > input');
      fireEvent.change(input!, { target: { value: '' }});
      expect(await field.findByRole('alert')).toBeInTheDocument();
      expect(await field.findByText('TypeName is required')).toBeInTheDocument();
    });
  });

  describe('onClick', () => {
    it('calls the passed method with the entered values', async() => {
      const mockParams: ReadParams = {
        url: 'my mock url',
        requestParams: {
          version: '2.0.0',
          typeNames: 'my mock typeName',
          featureID: 'mock feature id',
          count: 999
        }
      };
      const onClickMock = jest.fn();
      const field = render(<WfsParserInput onClick={onClickMock} />);

      // url
      // const urlInput = field.container.querySelector('input.wfs-url-input');
      // https://github.com/ant-design/ant-design/issues/35600
      // Due to a bug in antd the class is set on the wrong element.
      // Has to be undone once this bug is fixed.
      const urlInput = field.container.querySelector('span.wfs-url-input > input');
      fireEvent.change(urlInput!, { target: { value: mockParams.url }});
      // typename
      // const typeNameInput = field.container.querySelector('input.wfs-typename-input');
      // https://github.com/ant-design/ant-design/issues/35600
      // Due to a bug in antd the class is set on the wrong element.
      // Has to be undone once this bug is fixed.
      const typeNameInput = field.container.querySelector('span.wfs-typename-input > input');
      fireEvent.change(typeNameInput!, { target: { value: mockParams.requestParams.typeNames }});
      // feature id
      // const featureIdInput = field.container.querySelector('input.wfs-featureid-input');
      // https://github.com/ant-design/ant-design/issues/35600
      // Due to a bug in antd the class is set on the wrong element.
      // Has to be undone once this bug is fixed.
      const featureIdInput = field.container.querySelector('span.wfs-featureid-input > input');
      fireEvent.change(featureIdInput!, { target: { value: mockParams.requestParams.featureID }});
      // version
      const input = await field.findAllByRole('combobox');
      await act(async() => {
        fireEvent.mouseDown(input[0]);
      });
      fireEvent.click(await screen.findByTitle(mockParams.requestParams.version));
      // maxfeatures
      const maxFeatures = await field.findByRole('spinbutton');
      fireEvent.change(maxFeatures, { target: { value: 999 }});

      fireEvent.click(await field.findByText(locale.requestButtonText));
      expect(onClickMock).toHaveBeenCalledWith(mockParams);
    });
  });
});
