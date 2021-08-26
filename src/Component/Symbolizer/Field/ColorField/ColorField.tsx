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

import * as React from 'react';

import {
  Button
} from 'antd';
import { SwapOutlined } from '@ant-design/icons';

import './ColorField.less';

import { localize } from '../../../LocaleWrapper/LocaleWrapper';
// import en_US from '../../../../locale/en_US';

import _isEqual from 'lodash/isEqual';
import { useState } from 'react';
import { isExpression, Expression } from 'geostyler-style';
import BaseColorField from './BaseColorField/BaseColorField';
import ExpressionField from '../ExpressionField/ExpressionField';

// i18n
export interface ColorFieldLocale {
  closeText: string;
  editText: string;
  chooseText: string;
}

// default props
interface ColorFieldDefaultProps {
  locale: ColorFieldLocale;
}

// non default props
export interface ColorFieldProps extends Partial<ColorFieldDefaultProps> {
  onChange?: (color: string|Expression) => void;
  color?: string | Expression;
  defaultValue?: string | Expression;
}

export const COMPONENTNAME = 'ColorField';

export const ColorField: React.FC<ColorFieldProps> = ({
  onChange = () => undefined,
  color,
  defaultValue
}) => {

  const expressionFromDefaultValue = () => {
    if (color) {
      if (isExpression(color)) {
        return color;
      }
      if (defaultValue && isExpression(defaultValue)) {
        return defaultValue;
      }
    } else {
      if (defaultValue && isExpression(defaultValue)) {
        return defaultValue;
      }
    }
    return undefined;
  };

  const stringFromDefaultValue = () => {
    if (color) {
      if (!isExpression(color)) {
        return color;
      }
      if (defaultValue && !isExpression(defaultValue)) {
        return defaultValue;
      }
    } else {
      if (defaultValue && !isExpression(defaultValue)) {
        return defaultValue;
      }
    }
    return undefined;
  };

  const [showExpression, setShowExpression] = useState<boolean>(
    expressionFromDefaultValue() && isExpression(expressionFromDefaultValue()));
  const [colorString, setColorString] = useState<string>(stringFromDefaultValue());
  const [colorExpression, setColorExpression] = useState<Expression>(expressionFromDefaultValue());

  const onExpressionChange = (newColor: Expression) => {
    setColorExpression(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };

  const onStringChange = (newColor: string) => {
    setColorString(newColor);
    if (onChange) {
      onChange(newColor);
    }
  };

  const toggleShowExpression = () => {
    const newShowExpression = !showExpression;
    setShowExpression(newShowExpression);
    if (newShowExpression) {
      if (!colorExpression && colorString) {
        const colorExpr: Expression = {type: 'literal', value: colorString};
        setColorExpression(colorExpr);
        onExpressionChange(colorExpr);
      } else {
        onExpressionChange(colorExpression);
      }
    } else {
      onStringChange(colorString);
    }
  };

  return (
    <div>
      {
        showExpression ?
          <ExpressionField
            expression={colorExpression}
            onChange={onExpressionChange}
          />
          :
          <BaseColorField
            color={colorString}
            onChange={onStringChange}
          />
      }
      <Button
        type='primary'
        size='small'
        icon={<SwapOutlined/>}
        onClick={toggleShowExpression}
      />
    </div>
  );
};

export default localize(ColorField, COMPONENTNAME);
