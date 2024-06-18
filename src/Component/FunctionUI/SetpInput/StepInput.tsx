import React, { useCallback } from 'react';
import { Expression, FStepParameter } from 'geostyler-style';
import { Input } from 'antd';
import './StepInput.less';
import NumberExpressionInput from '../../ExpressionInput/NumberExpressionInput/NumberExpressionInput';

export type StepInputProps = {
  value?: FStepParameter;
  onChange: (newValue: FStepParameter) => void;
};

export const StepInput: React.FC<StepInputProps> = ({
  value,
  onChange
}) => {

  const onBoundaryChante = useCallback((newBoundary: Expression<number>) => {
    onChange({
      ...value,
      boundary: newBoundary
    });
  }, [value, onChange]);

  const onValueChange = useCallback((newValue: Expression<unknown>) => {
    onChange({
      ...value,
      value: newValue
    });
  }, [value, onChange]);

  return (
    <div className="gs-boundary-input">
      <NumberExpressionInput
        onChange={onBoundaryChante}
        onCancel={() => onChange(undefined)}
        value={value?.boundary}
      />
      <Input
        onChange={onValueChange}
        value={value?.value as any}
      />
    </div>
  );
};

export default StepInput;
