import * as React from 'react';
import { Button } from 'antd';

// default props
interface DefaultRemoveButtonProps {
  text: string;
}
// non default props
interface RemoveButtonProps extends Partial<DefaultRemoveButtonProps> {
  ruleIdx: number;
  onClick: ((ruleIdx: number) => void);
}

/**
 * Button to remove a rule.
 */
class RemoveButton extends React.Component<RemoveButtonProps, any> {

  public static defaultProps: DefaultRemoveButtonProps = {
    text: 'Remove Rule'
  };

  render() {

    return (
      <div className="gs-rule-removebutton" style={{ float: 'inherit' }} >

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
