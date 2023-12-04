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
import { Checkbox } from 'antd';

import './FieldSet.less';

export interface FieldSetProps extends React.PropsWithChildren {
  /**
   * a CSS classanme
   */
  className?: string;
  /** Check/uncheck Checkbox */
  checked?: boolean;
  /** Title to be rendered on top of the FieldSet */
  title?: string;
  /** Callback function for onChange of the checkbox  */
  onCheckChange?: (e: any) => void;
}

/**
 * A container for grouping sets of fields similar to a HTML fieldset element.
 * A title and a checkbox will be rendered on the top border of the component.
 */
export const FieldSet: React.FC<FieldSetProps> = ({
  className,
  checked = true,
  title,
  onCheckChange,
  children
}) => {
  let finalClassName = 'gs-fieldset';
  finalClassName = checked ? finalClassName + ' checked' : finalClassName;
  finalClassName = className ? finalClassName + ' ' + checked : finalClassName;

  return (
    <div className={finalClassName}>
      <span className='fieldset-title'>
        <Checkbox
          checked={checked}
          onChange={onCheckChange}
        >
          {title}
        </Checkbox>
      </span>
      <div className="fieldset-body">
        {React.Children.map(children, child => {
          // Ignore all children if checkbox is unchecked
          if (checked) {
            return child;
          }
          return undefined;
        })}
      </div>
    </div>
  );
};
