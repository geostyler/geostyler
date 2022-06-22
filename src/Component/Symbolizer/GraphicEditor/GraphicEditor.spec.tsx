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
import { GraphicEditor, GraphicEditorProps } from './GraphicEditor';
import {
  GraphicType,
  MarkSymbolizer,
  IconSymbolizer
} from 'geostyler-style';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import { render, act, fireEvent } from '@testing-library/react';

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  const Select = ({ children, onChange }) => {
    return <select onChange={e => onChange(e.target.value)}>{children}</select>;
  };
  Select.Option = ({ children, ...otherProps }) => {
    return <option {...otherProps}>{children}</option>;
  };
  return {
    ...antd,
    Select,
  };
});

describe('GraphicEditor', () => {

  const dummyGraphicType: GraphicType = 'Mark';
  const dummyGraphicMark: MarkSymbolizer = SymbolizerUtil.markSymbolizer;
  const dummyGraphicIcon: IconSymbolizer = SymbolizerUtil.iconSymbolizer;
  const onGraphicChangeSpy = jest.fn();
  const props: GraphicEditorProps = {
    graphic: dummyGraphicMark,
    graphicType: dummyGraphicType,
    onGraphicChange: onGraphicChangeSpy
  };

  it('is defined', () => {
    expect(GraphicEditor).toBeDefined();
  });


  it('renders correctly', () => {
    const graphicEditor = render(<GraphicEditor {...props} />);
    expect(graphicEditor.container).toBeInTheDocument();
  });

  it('renders MarkEditor if graphic is Mark', () => {
    const graphicEditor = render(<GraphicEditor {...props} graphic={dummyGraphicMark} />);
    const markEditor = graphicEditor.container.querySelector('.gs-mark-symbolizer-editor');
    expect(markEditor).toBeInTheDocument();
  });

  it('renders IconEditor if graphic is Icon', () => {
    const graphicEditor = render(<GraphicEditor {...props} graphic={dummyGraphicIcon} />);
    const iconEditor = graphicEditor.container.querySelector('.gs-icon-symbolizer-editor');
    expect(iconEditor).toBeInTheDocument();
  });

  it('renders nothing if graphicType is not Mark or Icon', () => {
    const graphicType: any = 'peter';
    const graphic: any = {};
    const graphicEditor = render(<GraphicEditor
      graphicType={graphicType}
      graphic={graphic}
    />);
    const markEditor = graphicEditor.container.querySelector('.gs-mark-symbolizer-editor');
    const iconEditor = graphicEditor.container.querySelector('.gs-icon-symbolizer-editor');
    expect(markEditor).not.toBeInTheDocument();
    expect(iconEditor).not.toBeInTheDocument();
  });

  it('handles onGraphicTypeChange', async () => {

    const graphicEditor = render(<GraphicEditor {...props} />);
    expect(onGraphicChangeSpy).not.toHaveBeenCalled();

    const selectField = graphicEditor.container.querySelector('select');
    await act(async() => {
      fireEvent.change(selectField!, {
        target: { value: 'Icon' }
      });
    });
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(dummyGraphicIcon);

    await act(async() => {
      fireEvent.change(selectField!, {
        target: { value: 'Mark' }
      });
    });
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(dummyGraphicMark);

    await act(async() => {
      fireEvent.change(selectField!, {
        target: { value: 'Wrong' }
      });
    });
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(undefined);

    await act(async() => {
      fireEvent.change(selectField!, {
        target: { value: undefined }
      });
    });
    expect(onGraphicChangeSpy).toHaveBeenCalled();
    expect(onGraphicChangeSpy).toHaveBeenCalledWith(undefined);
  });
});
