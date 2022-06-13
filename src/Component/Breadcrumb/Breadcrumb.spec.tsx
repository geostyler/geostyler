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
import { render, act, fireEvent } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {

  let onClickDummy: jest.Mock;
  beforeEach(() => {
    onClickDummy = jest.fn();
  });

  it('is defined', () => {
    expect(Breadcrumb).toBeDefined();
  });

  it('renders correctly', () => {
    const field = render(<Breadcrumb crumbs={[]} />);
    expect(field.container).toBeInTheDocument();
  });

  describe('onClick', () => {

    it('calls a passed onClick function', async () => {
      const crumbsTitle = 'bar';
      const crumbs = [{view: 'foo', title: crumbsTitle, indices: []}];
      const breadcrumb = render(<Breadcrumb crumbs={crumbs} onClick={onClickDummy} />);
      const breadcrumbItem = await breadcrumb.findByText(crumbsTitle);
      await act(async () => {
        fireEvent.click(breadcrumbItem);
      });
      expect(onClickDummy).toHaveBeenCalled();
    });

    it('calls a passed onClick function with the clicked view and its indices', async () => {
      const view = 'foo';
      const title = 'bar';
      const indices = [0];

      const crumbs = [{view, title, indices}];
      const breadcrumb = render(<Breadcrumb crumbs={crumbs} onClick={onClickDummy} />);
      const breadcrumbItem = await breadcrumb.findByText(title);
      await act(async () => {
        fireEvent.click(breadcrumbItem);
      });
      expect(onClickDummy).toHaveBeenCalledWith(view, indices);
    });

  });

  describe('onPrevClick', () => {

    it('calls a passed onClick function', async () => {
      const view = 'foo';
      const title = 'bar';
      const indices = [0];

      const crumbs = [{view, title, indices}, {view, title, indices}];
      const breadcrumb = render(<Breadcrumb crumbs={crumbs} onClick={onClickDummy} />);
      const prevButton = breadcrumb.container.querySelector('.gs-breadcrumb-prev-button');
      await act(async () => {
        fireEvent.click(prevButton);
      });
      expect(onClickDummy).toHaveBeenCalled();
    });

    it('calls a passed onClick function with the opts of the next to last crumb', async () => {
      const view = 'foo';
      const title = 'bar';
      const indices = [0];

      const crumbs = [{view, title, indices}, {view: 'foz', title: 'baz', indices: [1]}];
      const breadcrumb = render(<Breadcrumb crumbs={crumbs} onClick={onClickDummy} />);
      const prevButton = breadcrumb.container.querySelector('.gs-breadcrumb-prev-button');
      await act(async () => {
        fireEvent.click(prevButton);
      });
      expect(onClickDummy).toHaveBeenCalledWith(view, indices);
    });
  });

});
