import React, { useCallback } from 'react';
import { Expression, FCaseParameter } from 'geostyler-style';
import BooleanExpressionInput from '../../ExpressionInput/BooleanExpressionInput/BooleanExpressionInput';
import './CaseInput.less';
import { Type } from '../FunctionUI';
import UnknownInput from '../UnknownInput/UnknownInput';

export type CaseInputProps = {
  value?: FCaseParameter;
  onChange: (newValue: FCaseParameter) => void;
  type?: Type;
};

export const CaseInput: React.FC<CaseInputProps> = ({
  value,
  onChange,
  type
}) => {

  const onCaseChange = useCallback((newCase: Expression<boolean>) => {
    onChange({
      ...value,
      case: newCase
    });
  }, [value, onChange]);

  const onValueChange = useCallback((newValue: Expression<unknown>) => {
    onChange({
      ...value,
      value: newValue
    });
  }, [value, onChange]);

  return (
    <div className="gs-case-input">
      <BooleanExpressionInput
        onChange={onCaseChange}
        onCancel={() => onChange(undefined)}
        value={value?.case}
      />
      <UnknownInput
        forcedType={type}
        onChange={onValueChange}
        value={value?.value as any}
      />
    </div>
  );
};

export default CaseInput;
