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
import React, { ReactNode, useCallback } from 'react';

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
import { FunctionConfig, functionConfigs } from './functionConfigs';
import CaseInput from './CaseInput/CaseInput';
import UnknownInput from './UnknownInput/UnknownInput';
import StepInput from './StepInput/StepInput';
import { Button, Tooltip } from 'antd';
import { useGeoStylerLocale } from '../../context/GeoStylerContext/GeoStylerContext';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export type Type = 'string' | 'number' | 'boolean' | 'unknown';

export interface FunctionUIProps<T extends GeoStylerFunction> {
  type: Type;
  value?: T;
  parentKey?: string;
  onChange?: (newValue: T) => void;
  onCancel?: (type: Type) => void;
}

export const FunctionUI = <T extends GeoStylerFunction>({
  value,
  onChange,
  parentKey,
  type,
  onCancel
}: FunctionUIProps<T>) => {

  const locale = useGeoStylerLocale('FunctionUI');
  const name = value?.name;

  const getKey = useCallback((key: string) => {
    if (parentKey) {
      return `${parentKey}-${key}`;
    }
    return key;
  }, [parentKey]);

  const updateFunctionArg = useCallback((newArgumentValue: PropertyType, index: number) => {
    const newValue = structuredClone(value);
    if (newValue.name === 'pi' || newValue.name === 'random') {
      return;
    }
    if (!Array.isArray(newValue.args)) {
      newValue.args = [];
    }
    newValue.args[index] = newArgumentValue as any;
    onChange?.(newValue);
  }, [onChange, value]);

  const getUiForArg = useCallback((cfg: FunctionConfig['args'][number], index: number, func: GeoStylerFunction) => {
    let functionArgs: Expression<any>[] = [];
    if (func.name !== 'pi' && func.name !== 'random') {
      functionArgs = func.args;
    }

    const key = getKey(func.name);
    let comp = (
      <UnknownInput
        forcedType={type}
        value={functionArgs?.[index]}
        onChange={(val) => {
          updateFunctionArg(val, index);
        }}
        inputProps={{
          placeholder: cfg.placeholder
        }}
      />
    );

    if (cfg.type === 'case') {
      comp = (
        <CaseInput
          type={type}
          value={functionArgs?.[index]}
          onChange={(val) => {
            updateFunctionArg(val, index);
          }}
        />
      );
    } else if (cfg.type === 'step') {
      comp =  (
        <StepInput
          type={type}
          value={functionArgs?.[index]}
          onChange={(val) => {
            updateFunctionArg(val, index);
          }}
        />
      );
    } else if (cfg.type === 'unknown') {
      comp =  (
        <UnknownInput
          forcedType={type}
          value={functionArgs?.[index]}
          onChange={(val) => {
            updateFunctionArg(val, index);
          }}
          inputProps={{
            placeholder: cfg.placeholder
          }}
        />
      );
    } else if (isGeoStylerFunction(functionArgs?.[index])) {
      comp = (
        <FunctionUI
          type={cfg.type}
          value={functionArgs[index]}
          parentKey={key+''+index}
          onChange={(val) => {
            updateFunctionArg(val, index);
          }}
          onCancel={t => {
            updateFunctionArg(undefined, index);
          }}
        />
      );
    } else if (cfg.type === 'number') {
      comp = (
        <NumberExpressionInput
          value={functionArgs?.[index]}
          onChange={(val) => {
            updateFunctionArg(val, index);
          }}
          inputProps={{
            placeholder: cfg.placeholder
          }}
        />
      );
    } else if (cfg.type === 'string') {
      comp = (
        <StringExpressionInput
          value={functionArgs?.[index]}
          onChange={(val) => {
            updateFunctionArg(val, index);
          }}
          inputProps={{
            placeholder: cfg.placeholder
          }}
        />
      );
    } else if (cfg.type === 'boolean') {
      comp = (
        <BooleanExpressionInput
          value={functionArgs?.[index]}
          onChange={(val) => {
            updateFunctionArg(val, index);
          }}
          labelOn={cfg.label}
          labelOff={cfg.label}
        />
      );
    }

    return (
      <div className='gs-function-arg' key={`${key}${index}`}>
        <i className='tree-icon' />
        {comp}
        {
          cfg.infinite &&
          <Tooltip title={locale.remove}>
            <Button
              type="text"
              className="remove-argument-button"
              icon={<MinusOutlined />}
              onClick={() => {
                if (value.name === 'pi' || value.name === 'random') {
                  return;
                }
                const newArgs = structuredClone(value.args);
                newArgs.splice(index, 1);
                onChange?.({
                  ...value,
                  args: newArgs
                });
              }}
            />
          </Tooltip>
        }
      </div>
    );
  }, [getKey, updateFunctionArg, type, locale, onChange, value]);

  const getUiForFunction = useCallback((func: GeoStylerFunction) => {
    const config = functionConfigs.find(cfg => cfg.name === func.name);
    let argUIs: ReactNode[] = [];

    if (value.name === 'pi' || value.name === 'random') {
      return null;
    }

    if (config.args[config.args.length - 1].infinite) {
      config.args.forEach((arg, index) => {
        if (!arg.infinite) {
          argUIs.push(getUiForArg(arg, index, func));
        } else {
          const amountOfInfiniteArgs = value.args ? value.args.length - index : 1;
          for (let i = 0; i < amountOfInfiniteArgs; i++) {
            argUIs.push(getUiForArg(arg, index + i, func));
          }
          argUIs.push(
            <div className='gs-function-arg' key={`remove-argument-${index}`}>
              <i className='tree-icon' />
              <Tooltip title={locale.add}>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    const clonedArg = structuredClone(value.args[value.args.length - 1]);
                    onChange({
                      ...value,
                      args: [
                        ...value.args,
                        clonedArg
                      ]
                    });
                  }}
                />
              </Tooltip>
            </div>
          );
        }
      });
    } else {
      argUIs = config.args.map((arg, index) => getUiForArg(arg, index, func));
    }

    return (
      <div className='gs-function-arguments'>
        {argUIs}
      </div>
    );
  }, [value, getUiForArg, locale, onChange]);

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
