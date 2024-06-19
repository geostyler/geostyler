import React, { useEffect, useState } from 'react';
import NumberExpressionInput from '../../ExpressionInput/NumberExpressionInput/NumberExpressionInput';
import StringExpressionInput from '../../ExpressionInput/StringExpressionInput/StringExpressionInput';
import BooleanExpressionInput from '../../ExpressionInput/BooleanExpressionInput/BooleanExpressionInput';
import { Expression, isGeoStylerNumberFunction } from 'geostyler-style';
import { isGeoStylerBooleanFunction } from 'geostyler-style';

import './UnknownInput.less';
import { Select, Tooltip } from 'antd';
import { FieldBinaryOutlined, FieldNumberOutlined, FieldStringOutlined } from '@ant-design/icons';
import { useGeoStylerLocale } from '../../../context/GeoStylerContext/GeoStylerContext';
import { Type } from '../FunctionUI';

export type UnknownInputProps = {
  value?: Expression<unknown>;
  onChange: (newValue: Expression<unknown>) => void;
  forcedType?: Type;
};

export const UnknownInput: React.FC<UnknownInputProps> = ({
  value,
  onChange,
  forcedType
}) => {

  const locale = useGeoStylerLocale('UnknownInput');
  const [type, setType] = useState<Type>(forcedType || 'string');

  useEffect(() => {
    if (typeof value === 'number' || isGeoStylerNumberFunction(value)) {
      setType('number');
    } else if (typeof value === 'boolean' || isGeoStylerBooleanFunction(value)) {
      setType('boolean');
    } else {
      setType('string');
    }
  }, [value]);

  let input = <StringExpressionInput
    onChange={onChange}
    onCancel={() => onChange(undefined)}
    value={value as string}
  />;

  if (type === 'number') {
    input = <NumberExpressionInput
      onChange={onChange}
      onCancel={() => onChange(undefined)}
      value={value as number}
    />;
  } else if (type === 'boolean') {
    input = <BooleanExpressionInput
      onChange={onChange}
      onCancel={() => onChange(undefined)}
      value={value as boolean}
    />;
  }

  const onTypeChange = (t: Type) => {
    setType(t);
    if (t === 'string') {
      onChange('');
    } else if (t === 'number') {
      onChange(0);
    } else if (t === 'boolean') {
      onChange(false);
    }
  };

  if (forcedType) {
    return (
      <div className="gs-unknown-input">
        {input}
      </div>
    );
  }

  return (
    <div className="gs-unknown-input">
      {input}
      <Tooltip title={locale.typeSelectToolip}>
        <Select
          className="gs-type-select"
          options={[
            {label: <FieldStringOutlined />, value: 'string'},
            {label: <FieldNumberOutlined />, value: 'number'},
            {label: <FieldBinaryOutlined />, value: 'boolean'}
          ]}
          value={type}
          onChange={onTypeChange}
        />
      </Tooltip>
    </div>
  );

};

export default UnknownInput;
