import * as React from 'react';

import {
  Select
} from 'antd';
const Option = Select.Option;

import {
  ContrastEnhancement
} from 'geostyler-style';

// default props
interface ContrastEnhancementFieldDefaultProps {
  contrastEnhancementOptions: ContrastEnhancement['enhancementType'][];
}

// non default props
export interface ContrastEnhancementFieldProps extends Partial<ContrastEnhancementFieldDefaultProps> {
  onChange?: (contrastEnhancement: ContrastEnhancement['enhancementType']) => void;
  contrastEnhancement?: ContrastEnhancement['enhancementType'];
}

/**
 * ContrastEnhancementField to select between different contrast enhancement options
 */
export class ContrastEnhancementField extends React.Component<ContrastEnhancementFieldProps> {

  public static defaultProps: ContrastEnhancementFieldDefaultProps = {
    contrastEnhancementOptions: ['normalize', 'histogram']
  };

  getContrastEnhancementSelectOptions = () => {
    return this.props.contrastEnhancementOptions.map(contrastEnhancementOpt => {
        return (
            <Option
                key={contrastEnhancementOpt}
                value={contrastEnhancementOpt}
            >
            {contrastEnhancementOpt}
            </Option>
        );
    });
  }

  render() {
    const {
      contrastEnhancement,
      onChange
    } = this.props;

    return (
      <Select
        className="editor-field contrastEnhancement-field"
        allowClear={true}
        value={contrastEnhancement}
        onChange={onChange}
      >
        {this.getContrastEnhancementSelectOptions()}
      </Select>
    );
  }
}

export default ContrastEnhancementField;
