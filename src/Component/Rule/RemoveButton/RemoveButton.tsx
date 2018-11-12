import * as React from 'react';
import { Button } from 'antd';

import './RemoveButton.css';

// default props
interface RemoveButtonDefaultProps {
  /** Button text */
  text: string;
}
// non default props
export interface RemoveButtonProps extends Partial<RemoveButtonDefaultProps> {
  /** Index of the correspondig Rule object */
  ruleIdx: number;
  /** Callback for onClick */
  onClick: ((ruleIdx: number) => void);
}

/**
 * Button to remove a rule.
 */
export class RemoveButton extends React.Component<RemoveButtonProps> {

  public static defaultProps: RemoveButtonDefaultProps = {
    text: 'Remove Rule'
  };

  render() {

    return (
      <div className="gs-rule-removebutton" >
        <Button
          style={{}}
          type="danger"
          icon="close-circle-o"
          size="large"
          onClick={() => this.props.onClick(this.props.ruleIdx)}
        > {this.props.text}
        </Button>

      </div>
    );
  }
}

export default RemoveButton;
