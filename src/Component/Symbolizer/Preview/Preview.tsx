import * as React from 'react';

// default props
interface DefaultPreviewProps {}
// non default props
interface PreviewProps extends Partial<DefaultPreviewProps> {}

/**
 *
 */
class Preview extends React.Component<PreviewProps, any> {

  render() {

    return (
      <div className="gs-symbolizer-preview" style={{ }} >
        TODO Preview 
      </div>
    );
  }
}

export default Preview;
