import * as React from 'react';

import {
  InputNumber, Button
} from 'antd';

import './LineDashField.css';

// default props
interface LineDashFieldDefaultProps {
  dashArray: number[];
}

// non default props
export interface LineDashFieldProps extends Partial<LineDashFieldDefaultProps> {
  onChange?: (dashArray: number[]) => void;
}

/**
 * LineDashField to edit dashes for LineSymbolizers
 */
export class LineDashField extends React.Component<LineDashFieldProps> {

  public static defaultProps: LineDashFieldDefaultProps = {
    dashArray: []
  };

  onAddDash = () => {
    const {
      onChange,
      dashArray
    } = this.props;
    // add a new dash (UI)
    let newDashArray = [...dashArray];
    newDashArray.push(1);
    if (onChange) {
      onChange(newDashArray);
    }
  }

  onRemoveDash = () => {
    const {
      onChange,
      dashArray
    } = this.props;
    // remove last dash (UI)
    let newDashArray = [...dashArray];
    newDashArray.splice(newDashArray.length - 1, 1);
    if (onChange) {
      onChange(newDashArray);
    }
  }

  render() {
    const {
      onChange,
      dashArray
    } = this.props;

    return (
      <div className="editor-field linedash-field">
        {
          dashArray.map((dash, idx) => <InputNumber
            key={idx}
            value={dash}
            min={1}
            step={1}
            style={{ width: 55 }}
            onChange={(value: number) => {
              // replace current dash value
              let newDashArray = [...dashArray];
              newDashArray[idx] = value;
              if (onChange) {
                onChange(newDashArray);
              }
            }}
          />)
        }
        <Button
          className="gs-add-dash-button"
          icon="plus"
          onClick={this.onAddDash}
        />
        <Button
          className="gs-rm-dash-button"
          icon="minus"
          onClick={this.onRemoveDash}
        />
      </div>
    );
  }
}

export default LineDashField;
