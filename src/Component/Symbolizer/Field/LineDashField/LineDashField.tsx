import * as React from 'react';

import {
  InputNumber, Button
} from 'antd';

import './LineDashField.css';

// default props
interface LineDashFieldDefaultProps {
  label: string;
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
    label: 'Dash Pattern',
    dashArray: []
  };

  render() {
    const {
      label,
      onChange,
      dashArray
    } = this.props;

    return (
      <div className="editor-field linedash-field">
        <span className="label">{`${label}:`}</span>
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
          onClick={() => {
            // add a new dash (UI)
            let newDashArray = [...dashArray];
            newDashArray.push(1);
            if (onChange) {
              onChange(newDashArray);
            }
          }}
        />
        <Button
          className="gs-rm-dash-button"
          icon="minus"
          onClick={() => {
            // remove last dash (UI)
            let newDashArray = [...dashArray];
            newDashArray.splice(newDashArray.length - 1, 1);
            if (onChange) {
              onChange(newDashArray);
            }
          }}
        />
      </div>
    );
  }
}

export default LineDashField;
