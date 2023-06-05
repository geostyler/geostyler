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
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { ColorMapEditor } from './ColorMapEditor';
import { ColorMap } from 'geostyler-style';
import RasterUtil from '../../../Util/RasterUtil';

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  const Select = ({ children, onChange }: {children: React.ReactElement; onChange: (value: any) => void}) => {
    return <select onChange={e => onChange(e.target.value)}>{children}</select>;
  };

  Select.Option = ({ children, ...otherProps }: {children: React.ReactElement}) => {
    return <option {...otherProps}>{children}</option>;
  };

  return {
    ...antd,
    Select,
  };
});

describe('ColorMapEditor', () => {
  let dummyColorMap: ColorMap;
  let colorMapEditor: RenderResult;
  let onChangeMock = jest.fn();
  beforeEach(() => {
    dummyColorMap = {
      colorMapEntries: [RasterUtil.generateColorMapEntry()],
      type: 'ramp'
    };
    colorMapEditor = render(
      <ColorMapEditor
        colorMap={dummyColorMap}
        onChange={onChangeMock}
      />
    );
  });

  afterEach(() => {
    onChangeMock.mockReset();
  });

  it('is defined', () => {
    expect(ColorMapEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(colorMapEditor.container).toBeInTheDocument();
  });

  describe('ExtendField', () => {
    it('… renders', () => {
      const extendField = colorMapEditor.container.querySelector('.extend-field');
      const extendFieldLabel = colorMapEditor.getByText('Color Depth');
      expect(extendField).toBeInTheDocument();
      expect(extendFieldLabel).toBeInTheDocument();
    });
    it('… triggers onChange as expected', () => {
      const optionOne = colorMapEditor.getByLabelText('16-bit');
      const optionTwo = colorMapEditor.getByLabelText('32-bit');
      expect(optionOne).toBeInTheDocument();
      expect(optionTwo).toBeInTheDocument();
      fireEvent.click(optionTwo);
      expect(onChangeMock).toHaveBeenCalledWith({
        ...dummyColorMap,
        extended: true
      });
      fireEvent.click(optionOne);
      expect(onChangeMock).toHaveBeenCalledWith({
        ...dummyColorMap,
        extended: false
      });
    });
  });

  describe('TypeField', () => {
    it('… renders', () => {
      const typeField = colorMapEditor.container.querySelector('.color-map-type-field');
      const typeFieldLabel = colorMapEditor.getByText('Type');
      expect(typeField).toBeInTheDocument();
      expect(typeFieldLabel).toBeInTheDocument();
    });
    it('… triggers onChange as expected', () => {
      const optionOne = colorMapEditor.getByLabelText('Interpolated');
      const optionTwo = colorMapEditor.getByLabelText('Intervals');
      const optionThree = colorMapEditor.getByLabelText('Values');
      expect(optionOne).toBeInTheDocument();
      expect(optionTwo).toBeInTheDocument();
      expect(optionThree).toBeInTheDocument();
      fireEvent.click(optionThree);
      expect(onChangeMock).toHaveBeenCalledWith({
        ...dummyColorMap,
        type: 'values'
      });
      fireEvent.click(optionTwo);
      expect(onChangeMock).toHaveBeenCalledWith({
        ...dummyColorMap,
        type: 'intervals'
      });
      fireEvent.click(optionOne);
      expect(onChangeMock).toHaveBeenCalledWith({
        ...dummyColorMap,
        type: 'ramp'
      });
    });
  });

  describe('onNrOfClassesChange', () => {
    it('… renders', () => {
      const numberOfClassesField = colorMapEditor.container.querySelector('.number-of-classes-field');
      const numberOfClassesFieldLabel = colorMapEditor.getByText('Nr. of classes');
      expect(numberOfClassesField).toBeInTheDocument();
      expect(numberOfClassesFieldLabel).toBeInTheDocument();
    });
    it('… triggers onChange as expected', () => {
      const numberOfClassesField = colorMapEditor.container.querySelector('.number-of-classes-field input')!;
      fireEvent.change(numberOfClassesField, { target: { value: '2' } });
      expect(onChangeMock).toHaveBeenCalledWith({
        ...dummyColorMap,
        colorMapEntries: [
          {
            color: '#e7000e'
          },
          {
            color: '#611e82'
          }
        ]
      });
    });

  });

  describe('ColorRampCombo', () => {
    it('… renders', () => {
      const colorRampCombo = colorMapEditor.getByRole('combobox');
      const colorRampComboLabel = colorMapEditor.getByText('Color Ramp');
      expect(colorRampCombo).toBeInTheDocument();
      expect(colorRampComboLabel).toBeInTheDocument();
    });
    it('… triggers onChange as expected', () => {
      const colorRampCombo = colorMapEditor.getByRole('combobox');
      fireEvent.change(colorRampCombo, { target: { value: 'geostyler' } });
      expect(onChangeMock).toHaveBeenCalledWith({
        ...dummyColorMap,
        colorMapEntries: [
          {
            color: '#42ca00'
          }
        ]
      });
    });
  });

  describe('Color', () => {
    describe('ColorRenderer', () => {
      it('… renders', () => {
        const colorField = colorMapEditor.container.querySelector('.gs-color-field');
        expect(colorField).toBeInTheDocument();
      });
    });
    describe('QuantityRenderer', () => {
      it('… renders', () => {
        const quantityField = colorMapEditor.container.querySelector('.gs-colormap-quantity-input');
        expect(quantityField).toBeInTheDocument();
      });

      it('… triggers onChange as expected', () => {
        const quantityField = colorMapEditor.container.querySelector('.gs-colormap-quantity-input input')!;
        fireEvent.change(quantityField, { target: { value: '2' } });
        expect(onChangeMock).toHaveBeenCalledWith({
          ...dummyColorMap,
          colorMapEntries: [
            {
              color: '#000',
              quantity: 2
            }
          ]
        });
      });
    });
    describe('LabelRenderer', () => {
      it('… renders', () => {
        const labelField = colorMapEditor.container.querySelector('.gs-colormap-label-input');
        expect(labelField).toBeInTheDocument();
      });
      it('… triggers onChange as expected', () => {
        const labelField = colorMapEditor.container.querySelector('.gs-colormap-label-input')!;
        fireEvent.change(labelField, { target: { value: 'Peter' } });
        expect(onChangeMock).toHaveBeenCalledWith({
          ...dummyColorMap,
          colorMapEntries: [
            {
              color: '#000',
              label: 'Peter'
            }
          ]
        });
      });
    });
    describe('OpacityRenderer', () => {
      it('… renders', () => {
        const opacityField = colorMapEditor.container.querySelector('.gs-colormap-opacity-input');
        expect(opacityField).toBeInTheDocument();
      });
      it('… triggers onChange as expected', () => {
        const labelField = colorMapEditor.container.querySelector('.gs-colormap-opacity-input input')!;
        fireEvent.change(labelField, { target: { value: '0.5' } });
        expect(onChangeMock).toHaveBeenCalledWith({
          ...dummyColorMap,
          colorMapEntries: [
            {
              color: '#000',
              opacity: 0.5
            }
          ]
        });
      });
    });

  });

});
