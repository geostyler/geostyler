import { CodeEditor, CodeEditorProps } from './CodeEditor';
import TestUtil from '../../Util/TestUtil';

import SldStyleParser from 'geostyler-sld-parser';

describe('CodeEditor', () => {
  let wrapper: any;
  let dummyStyle = TestUtil.getMarkStyle();
  let onStyleChangeDummy: jest.Mock;
  const delay = 1337;
  beforeEach(() => {
    onStyleChangeDummy = jest.fn();
    const props: CodeEditorProps = {
      style: dummyStyle,
      onStyleChange: onStyleChangeDummy,
      parsers: [
        SldStyleParser
      ],
      delay
    };
    wrapper = TestUtil.shallowRenderComponent(CodeEditor, props);
  });

  it('is defined', () => {
    expect(CodeEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('updateValueFromStyle', () => {
    it('sets the value to the geostyler-style if no activeparser is set', () => {
      const updateValueFromStyle = wrapper.instance().updateValueFromStyle;
      updateValueFromStyle(dummyStyle);
      const value = wrapper.state().value;
      expect(value).toEqual(JSON.stringify(dummyStyle, null, 2));
    });
    // TODO
    // it('sets the value as sld if active parsers is SLD Parser', async () => {
    //   await new Promise((resolve) => {
    //     const sldParser = new SldStyleParser();
    //     sldParser.writeStyle(dummyStyle)
    //       .then(async (sld: string) => {
    //         wrapper.setState({
    //           activeParser: SldStyleParser
    //         });
    //         const updateValueFromStyle = wrapper.instance().updateValueFromStyle;
    //         await updateValueFromStyle(dummyStyle);
    //         const value = wrapper.state().value;
    //         expect(value).toEqual(sld);
    //         resolve();
    //       });
    //   });
    // });
  });

  describe('valueFromStyleInput', () => {
    it('returns geostyler-style if no activeparser is set', async () => {
      const valueFromStyleInput = wrapper.instance().valueFromStyleInput;
      const value = await valueFromStyleInput(dummyStyle);
      expect(value).toEqual(JSON.stringify(dummyStyle, null, 2));
    });
    it('returns  the value as sld if active parsers is SLD Parser', async () => {
      wrapper.setState({
        activeParser: SldStyleParser
      });
      await new Promise((resolve) => {
        const sldParser = new SldStyleParser();
        sldParser.writeStyle(dummyStyle)
          .then(async (sld: string) => {
            const valueFromStyleInput = wrapper.instance().valueFromStyleInput;
            const value = await valueFromStyleInput(dummyStyle);
            expect(value).toEqual(sld);
            resolve();
          });
      });
    });
  });

  describe('getModeByParser', () => {
    it('returns "application/json" if activeParser is NOT "SLD Style Parser"', () => {
      const getModeByParser = wrapper.instance().getModeByParser;
      const value = getModeByParser();
      expect(value).toEqual('application/json');
    });
    it('returns "application/xml" if activeParser is "SLD Style Parser"', () => {
      wrapper.setState({
        activeParser: SldStyleParser
      });
      const getModeByParser = wrapper.instance().getModeByParser;
      const value = getModeByParser();
      expect(value).toEqual('application/xml');
    });
  });

  describe('styleFromValue', () => {
    it('returns geostyler-style if no activeparser is set', async () => {
      const styleFromValue = wrapper.instance().styleFromValue;
      const value = await styleFromValue(JSON.stringify(dummyStyle));
      expect(value).toEqual(dummyStyle);
    });
    it('returns geostyler-style if active parsers is SLD Parser and value is SLD string', async () => {
      wrapper.setState({
        activeParser: SldStyleParser
      });
      await new Promise((resolve) => {
        const sldParser = new SldStyleParser();
        sldParser.writeStyle(dummyStyle)
          .then(async (sld: string) => {
            const styleFromValue = wrapper.instance().styleFromValue;
            const value = await styleFromValue(sld);
            expect(value).toEqual(dummyStyle);
            resolve();
          });
      });
    });
  });

  describe('onChange', () => {
    it('sets the passed value in the state', () => {
      const onChange = wrapper.instance().onChange;
      const value = JSON.stringify(dummyStyle);
      onChange(null, null, value);
      expect(wrapper.state().value).toBe(value);
    });
    it('tries to parse the passed value', () => {
      const onChange = wrapper.instance().onChange;
      const value = JSON.stringify(dummyStyle);
      const styleFromValueDummy = wrapper.instance().styleFromValue = jest.fn();
      onChange(null, null, value);
      expect(styleFromValueDummy).toBeCalledWith(value);
    });
    // TODO
    // it('calls a passed onStyleChange method with the parsed style', async () => {
    //   const onChange = wrapper.instance().onChange;
    //   wrapper.setState({
    //     activeParser: SldStyleParser
    //   });
    //   await new Promise((resolve) => {
    //     const sldParser = new SldStyleParser();
    //     sldParser.writeStyle(dummyStyle)
    //     .then(async (sld: string) => {
    //         await onChange(null, null, sld);
    //         expect(onStyleChangeDummy).toBeCalledWith(dummyStyle);
    //         resolve();
    //       });
    //   });
    // });
  });

  describe('onSelect', () => {
    it('sets select parser as active parser', () => {
      const onSelect = wrapper.instance().onSelect;
      onSelect(SldStyleParser.title);
      expect(wrapper.state().activeParser).toBe(SldStyleParser);
    });
    it('calls "updateValueFromStyle"', () => {
      const updateValueFromStyleDummy = wrapper.instance().updateValueFromStyle = jest.fn();
      const onSelect = wrapper.instance().onSelect;
      onSelect(SldStyleParser.title);
      expect(updateValueFromStyleDummy).toBeCalledWith(dummyStyle);
    });
  });

  describe('handleOnChange', () => {
    it('calls "onChange" after [props.delay] milliseconds', () => {
      jest.useFakeTimers();
      const handleOnChange = wrapper.instance().handleOnChange;
      const onChangeDummy = wrapper.instance().onChange = jest.fn();
      handleOnChange(null, null, dummyStyle);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay);
      jest.runOnlyPendingTimers();
      expect(onChangeDummy).toBeCalledWith(null, null, dummyStyle);
      jest.clearAllTimers();
    });
  });

  describe('getParserOptions', () => {
    it('returns a Select.Option for every passed parser', () => {
      const getParserOptions = wrapper.instance().getParserOptions;
      const gots = getParserOptions();
      gots.forEach((got: any, index: number) => {
        expect(got.type.name).toBe('Option');
      });
    });
  });

  // TODO
  // describe('onDownloadButtonClick', () => {
  //   it('calls saveAs', () => {
  //     const spy = jest.spyOn(fileSaver, 'saveAs');
  //     const onDownloadButtonClick = wrapper.instance().onDownloadButtonClick;
  //     onDownloadButtonClick();
  //     expect(spy).toBeCalled();
  //   });
  // });

});
