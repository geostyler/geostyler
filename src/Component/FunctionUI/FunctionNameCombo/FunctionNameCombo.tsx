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

import { Button, Select } from 'antd';

import { useGeoStylerContext } from '../../../context/GeoStylerContext/GeoStylerContext';
import { BaseOptionType } from 'antd/lib/select';
import { functionConfigs } from '../functionConfigs';
import { GeoStylerFunction } from 'geostyler-style';
import { NodeCollapseOutlined } from '@ant-design/icons';

import './FunctionNameCombo.less';
import en_US from '../../../locale/en_US';

type Type = 'string' | 'number' | 'boolean' | 'unknown';

export interface FunctionNameComboProps {
  type?: Type;
  value?: GeoStylerFunction['name'] | undefined;
  onChange?: (functionName: GeoStylerFunction['name']) => void;
  onCancel?: (type: Type) => void;
  size?: 'large' | 'middle' | 'small';
}

/**
 * Combobox offering the geostyler functions.
 */
export const FunctionNameCombo: React.FC<FunctionNameComboProps> = ({
  value,
  onChange,
  onCancel,
  type,
  size
}) => {

  const { locale = en_US } = useGeoStylerContext();

  const options: BaseOptionType[] = functionConfigs
    .filter(config => {
      if (type) {
        return config.type === type || config.type === 'unknown';
      } else {
        return true;
      }
    })
    .map((config): BaseOptionType => {
      return {
        value: config.name,
        label: config.name
      };
    });

  return (
    <div className="gs-function-name-combo">
      <Select
        value={value}
        onChange={onChange}
        placeholder={locale.FunctionNameCombo.placeholder}
        size={size}
        options={options}
      />
      {
        onCancel &&
        <Button
          icon={<NodeCollapseOutlined />}
          onClick={() => onCancel(type)}
        />
      }
    </div>
  );
};

export default FunctionNameCombo;
