import { WfsParserInput, WfsParserInputProps } from './WfsParserInput';
import TestUtil from '../../../Util/TestUtil';

describe('WfsParserInput', () => {
  let wrapper: any;
  let dummyOnClick: jest.Mock;
  beforeEach(() => {
    dummyOnClick = jest.fn();
    const props: WfsParserInputProps = {
      onClick: dummyOnClick
    };
    wrapper = TestUtil.shallowRenderComponent(WfsParserInput, props);
  });

  it('is defined', () => {
    expect(WfsParserInput).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('onUrlChange', () => {
    it('sets the url in the state', () => {
      const fakeEvent = {
        target: {
          value: 'www.terrestris.de'
        }
      };
      const onUrlChange = wrapper.instance().onUrlChange;
      onUrlChange(fakeEvent);
      expect(wrapper.state().url).toEqual('www.terrestris.de');
    });
    it('sets an error in the state if url is to short', () => {
      const fakeEvent = {
        target: {
          value: ''
        }
      };
      const onUrlChange = wrapper.instance().onUrlChange;
      onUrlChange(fakeEvent);
      expect(wrapper.state().url).toEqual('');
      expect(wrapper.state().validation.url).toEqual({
        status: 'error',
        message: 'Url is required'
      });
    });
  });

  describe('onTypeNameChange', () => {
    it('sets the typeName in the state', () => {
      const typeName = 'my:typeName';
      const fakeEvent = {
        target: {
          value: typeName
        }
      };
      const onTypeNameChange = wrapper.instance().onTypeNameChange;
      onTypeNameChange(fakeEvent);
      expect(wrapper.state().typeName).toEqual(typeName);
    });
    it('sets an error in the state typeName url is to short', () => {
      const fakeEvent = {
        target: {
          value: ''
        }
      };
      const onTypeNameChange = wrapper.instance().onTypeNameChange;
      onTypeNameChange(fakeEvent);
      expect(wrapper.state().typeName).toEqual('');
      expect(wrapper.state().validation.typeName).toEqual({
        status: 'error',
        message: 'TypeName is required'
      });
    });
  });

  describe('onVersionChange', () => {
    it('sets the typeName in the state', () => {
      const version = '2.1.0';
      const onVersionChange = wrapper.instance().onVersionChange;
      onVersionChange(version);
      expect(wrapper.state().version).toEqual(version);
    });
    it('sets an error in the state typeName url is to short', () => {
      const onVersionChange = wrapper.instance().onVersionChange;
      onVersionChange('');
      expect(wrapper.state().version).toEqual('');
      expect(wrapper.state().validation.version).toEqual({
        status: 'error',
        message: 'Version is required'
      });
    });
  });

  describe('onFeatureIDChange', () => {
    it('sets the featureID in the state', () => {
      const featureID = '12';
      const fakeEvent = {
        target: {
          value: featureID
        }
      };
      const onFeatureIDChange = wrapper.instance().onFeatureIDChange;
      onFeatureIDChange(fakeEvent);
      expect(wrapper.state().featureID).toEqual(featureID);
    });
  });

  describe('onPropertyNameChange', () => {
    it('sets the featureID in the state', () => {
      const propertyName = ['name', 'age'];
      const onPropertyNameChange = wrapper.instance().onPropertyNameChange;
      onPropertyNameChange(propertyName);
      expect(wrapper.state().propertyName).toEqual(propertyName);
    });
  });

  describe('onMaxFeaturesChange', () => {
    it('sets the featureID in the state', () => {
      const maxFeatures = 1337;
      const onMaxFeaturesChange = wrapper.instance().onMaxFeaturesChange;
      onMaxFeaturesChange(maxFeatures);
      expect(wrapper.state().maxFeatures).toEqual(maxFeatures);
    });
  });

  describe('onClick', () => {
    it('calls the passed method with the current state', () => {
      const currentState = wrapper.state();
      const onClick = wrapper.instance().onClick;
      onClick();
      expect(dummyOnClick).toBeCalledWith(currentState);
    });
  });

});
