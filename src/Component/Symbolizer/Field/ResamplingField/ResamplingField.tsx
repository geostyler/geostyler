import * as React from 'react';

import {
  Select
} from 'antd';
const Option = Select.Option;

import {
    RasterSymbolizer
} from 'geostyler-style';

// default props
interface ResamplingFieldDefaultProps {
  resamplingOptions: RasterSymbolizer['resampling'][];
}

// non default props
export interface ResamplingFieldProps extends Partial<ResamplingFieldDefaultProps> {
  onChange?: (resamplings: RasterSymbolizer['resampling']) => void;
  resampling?: RasterSymbolizer['resampling'];
}

/**
 * ResamplingField to select between different resampling options
 */
export class ResamplingField extends React.Component<ResamplingFieldProps> {

  public static defaultProps: ResamplingFieldDefaultProps = {
    resamplingOptions: ['linear', 'nearest']
  };

  getResamplingSelectOptions = () => {
    return this.props.resamplingOptions.map(resamplingOpt => {
        return (
            <Option
                key={resamplingOpt}
                value={resamplingOpt}
            >
            {resamplingOpt}
            </Option>
        );
    });
  }

  render() {
    const {
      resampling,
      onChange
    } = this.props;

    return (
      <Select
        className="editor-field resampling-field"
        allowClear={true}
        value={resampling}
        onChange={onChange}
      >
        {this.getResamplingSelectOptions()}
      </Select>
    );
  }
}

export default ResamplingField;
