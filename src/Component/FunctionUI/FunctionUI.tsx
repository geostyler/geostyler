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

import {
  Expression,
  GeoStylerFunction,
  PropertyType,
  isGeoStylerFunction
} from 'geostyler-style';
import FunctionNameCombo from './FunctionNameCombo/FunctionNameCombo';
import Input from 'antd/lib/input/Input';
import Checkbox from 'antd/lib/checkbox/Checkbox';

import './FunctionUI.less';
import { geostylerFunctionConfigs } from './FunctionNameCombo/GeoStylerFunctions';
import { EyeTwoTone, FunctionOutlined } from '@ant-design/icons';

export interface FunctionUIProps {
  type: 'number' | 'string' | 'boolean' | 'unknown';
  value: GeoStylerFunction;
  onChange?: (newValue: GeoStylerFunction) => void;
}

export const FunctionUI: React.FC<FunctionUIProps> = ({
  value,
  onChange,
  type,
  ...passThroughProps
}) => {

  const {
    name
  } = value;

  const getUiForFunction = (func: GeoStylerFunction) => {
    const config = geostylerFunctionConfigs.find(cfg => cfg.name === func.name);
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

    if (isGeoStylerFunction(functionArgs[index])) {
      return (
        <div className='gs-function-arg'>
          <i className='tree-icon' />
          <FunctionUI
            type={cfg.type}
            value={functionArgs[index]}
            onChange={(val) => {
              updateFunctionArg(val, index);
            }}
          />
        </div>
      );
    } else if (cfg.type === 'number') {
      return (
        <div className='gs-function-arg'>
          <i className='tree-icon' />
          <Input
            placeholder={cfg.placeholder}
            value={functionArgs[index]}
            onChange={(evt) => {
              updateFunctionArg(evt.target.value, index);
            }}
            // suffix={
            //   <EyeTwoTone
            //     className='fx-icon'
            //     onClick={() => {
            //       updateFunctionArg({
            //         name: 'property',
            //         args: ['']
            //       }, index);
            //     }}
            //   />
            // }
          />
        </div>
      );
    } else if (cfg.type === 'string') {
      return (
        <div className='gs-function-arg'>
          <i className='tree-icon' />
          <Input
            placeholder={cfg.placeholder}
            value={functionArgs[index]}
            onChange={(evt) => {
              updateFunctionArg(evt.target.value, index);
            }}
            suffix={<FunctionOutlined />}
          />
        </div>
      );
    } else if (cfg.type === 'boolean') {
      return (
        <div className='gs-function-arg'>
          <i className='tree-icon' />
          <Checkbox
            checked={functionArgs[index]}
            onChange={(evt) => {
              updateFunctionArg(evt.target.checked, index);
            }}
          >
            {cfg.labe}
          </Checkbox>
        </div>
      );
    }
    return functionArgs[index].toString();
  };

  function updateFunctionArg(newArgumentValue: PropertyType, index: number) {
    if (value.name === 'pi' || value.name === 'random') {
      return;
    }
    const newValue = structuredClone(value);
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
      />
      {getUiForFunction(value)}
    </div>
  );
};

export default FunctionUI;
