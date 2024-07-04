import React, { useCallback } from 'react';
import { Expression, FStepParameter } from 'geostyler-style';
import './StepInput.less';
import NumberExpressionInput from '../../ExpressionInput/NumberExpressionInput/NumberExpressionInput';
import UnknownInput from '../UnknownInput/UnknownInput';
import { Type } from '../FunctionUI';

export type StepInputProps = {
  value?: FStepParameter;
  onChange: (newValue: FStepParameter) => void;
  type?: Type;
};

export const StepInput: React.FC<StepInputProps> = ({
  value,
  onChange,
  type
}) => {

  const onBoundaryChange = useCallback((newBoundary: Expression<number>) => {
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
    <div className="gs-step-input">
      <NumberExpressionInput
        onChange={onBoundaryChange}
        onCancel={() => onChange(undefined)}
        value={value?.boundary}
        inputProps={{
          prefix: '>'
        }}
      />
      <UnknownInput
        forcedType={type}
        onChange={onValueChange}
        value={value?.value as any}
      />
    </div>
  );
};

export default StepInput;
