/* Released under the BSD 2-Clause License
 *
 * Copyright © 2023-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

import {
  Expression,
  GeoStylerFunction,
  PropertyType,
  isGeoStylerFunction
} from 'geostyler-style';
import FunctionNameCombo from './FunctionNameCombo/FunctionNameCombo';

import './FunctionUI.less';
import StringExpressionInput from '../ExpressionInput/StringExpressionInput/StringExpressionInput';
import NumberExpressionInput from '../ExpressionInput/NumberExpressionInput/NumberExpressionInput';
import BooleanExpressionInput from '../ExpressionInput/BooleanExpressionInput/BooleanExpressionInput';
import { functionConfigs } from './functionConfigs';

type Type = 'string' | 'number' | 'boolean' | 'unknown';

export interface FunctionUIProps<T extends GeoStylerFunction> {
  type: Type;
  value?: T;
  onChange?: (newValue: T) => void;
  onCancel?: (type: Type) => void;
}

export const FunctionUI: React.FC<FunctionUIProps<GeoStylerFunction>> = ({
  value,
  onChange,
  type,
  onCancel,
  ...passThroughProps
}) => {

  const name = value?.name;

  const getUiForFunction = (func: GeoStylerFunction) => {
    const config = functionConfigs.find(cfg => cfg.name === func.name);
    return (
      <div className='gs-function-arguments'>
        {config?.args?.map((cfg, index) => getUiForArg(cfg, index, func))}
      </div>
    );
  };

  const getUiForArg = (cfg: any, index: number, func: GeoStylerFunction) => {
    let functionArgs: Expression<any>[] = [];
    if (func.name !== 'pi' && func.name !== 'random') {
      functionArgs = func.args;
    }

    if (isGeoStylerFunction(functionArgs?.[index])) {
      return (
        <div className='gs-function-arg'>
          <i className='tree-icon' />
          <FunctionUI
            type={cfg.type}
            value={functionArgs[index]}
            onChange={(val) => {
              updateFunctionArg(val, index);
            }}
            onCancel={t => {
              const val = t === 'number' ? 0 : '';
              updateFunctionArg(val, index);
            }}
          />
        </div>
      );
    } else if (cfg.type === 'number') {
      return (
        <div className='gs-function-arg'>
          <i className='tree-icon' />
          <NumberExpressionInput
            value={functionArgs?.[index]}
            onChange={(val) => {
              updateFunctionArg(val, index);
            }}
            inputProps={{
              placeholder: cfg.placeholder
            }}
          />
        </div>
      );
    } else if (cfg.type === 'string') {
      return (
        <div className='gs-function-arg'>
          <i className='tree-icon' />
          <StringExpressionInput
            value={functionArgs?.[index]}
            onChange={(val) => {
              updateFunctionArg(val, index);
            }}
            inputProps={{
              placeholder: cfg.placeholder
            }}
          />
        </div>
      );
    } else if (cfg.type === 'boolean') {
      return (
        <div className='gs-function-arg'>
          <i className='tree-icon' />
          <BooleanExpressionInput
            value={functionArgs?.[index]}
            onChange={(val) => {
              updateFunctionArg(val, index);
            }}
            label={cfg.label}
          />
        </div>
      );
    }
    return functionArgs[index]?.toString();
  };

  function updateFunctionArg(newArgumentValue: PropertyType, index: number) {
    if (value.name === 'pi' || value.name === 'random') {
      return;
    }
    const newValue = structuredClone(value);
    if (!Array.isArray(newValue.args)) {
      newValue.args = [];
    }
    newValue.args[index] = newArgumentValue as any;
    onChange?.(newValue);
  };

  function updateFunctionName(functionName: GeoStylerFunction['name']) {
    const newValue = structuredClone(value);
    onChange?.({
      ...newValue,
      name: functionName as any
    });
  };

  return (
    <div className='gs-function-ui'>
      <FunctionNameCombo
        type={type}
        value={name}
        onChange={updateFunctionName}
        onCancel={onCancel}
      />
      {value && getUiForFunction(value)}
    </div>
  );
};

export default FunctionUI;
