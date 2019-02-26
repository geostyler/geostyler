import { StyleLoader, StyleLoaderProps } from './StyleLoader';
import SldStyleParser from 'geostyler-sld-parser';
import TestUtil from '../../../Util/TestUtil';

describe('StyleLoader', () => {
  let wrapper: any;
  beforeEach(() => {
    const props: StyleLoaderProps = {
      parsers: [SldStyleParser]
    };
    wrapper = TestUtil.shallowRenderComponent(StyleLoader, props);
  });

  it('is defined', () => {
    expect(StyleLoader).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('parseStyle', () => {
    it('returns undefined if no active parser is set', async () => {
      const got = await wrapper.instance().parseStyle();
      expect(got).toBeUndefined();
    });
    it('calls readFile and onError with the expected arguments', async () => {
      wrapper.setState({
        activeParser: SldStyleParser
      });
      wrapper.instance().readFile = jest.fn();
      const onErrorMock = jest.fn();
      const onSuccessMock = jest.fn();
      const got = await wrapper.instance().parseStyle({
        file: 'peter',
        onError: onErrorMock,
        onSuccess: onSuccessMock
      });
      expect(wrapper.instance().readFile).toHaveBeenCalledWith('peter');
      expect(onErrorMock).toHaveBeenCalled();
      expect(onSuccessMock).not.toHaveBeenCalled();
      jest.restoreAllMocks();
    });
  });

  describe('readFile', () => {
    it('resolves with the filecontent', async () => {
      const fakeFile = new File(['abc123'], 'peter.sld');
      await expect(wrapper.instance().readFile(fakeFile)).resolves.toBe('abc123');
    });
    it('rejects on error', async () => {
      await expect(wrapper.instance().readFile()).rejects.toThrowError();
    });
  });

  describe('onSelect', () => {
    it('sets the parser as active', () => {
      const parserTitle = 'SLD Style Parser';
      expect(wrapper.state('activeParser')).toBeUndefined();
      wrapper.instance().onSelect(parserTitle);
      expect(wrapper.state('activeParser')).toBe(SldStyleParser);
    });
  });
});
