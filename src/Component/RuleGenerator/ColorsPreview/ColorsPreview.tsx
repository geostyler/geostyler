import * as React from 'react';

import './ColorsPreview.css';

import RuleGeneratorUtil from '../../../Util/RuleGeneratorUtil';

const _isEqual = require('lodash/isEqual');

// non default props
export interface ColorsPreviewProps {
  colors: string[];
}

/**
 *
 */
export class ColorsPreview extends React.Component<ColorsPreviewProps> {

  public shouldComponentUpdate(nextProps: ColorsPreviewProps): boolean {
    return !_isEqual(this.props, nextProps);
  }

  static componentName: string = 'ColorsPreview';

  render() {
    const {
      colors
    } = this.props;

    const style = RuleGeneratorUtil.generateBackgroundStyleFromColors(colors);

    return (
      <div
        className="colors-preview"
        style={style}
      />
    );
  }
}

export default ColorsPreview;
