import { IconSelectorWindow, IconSelectorWindowProps, IconLibrary } from './IconSelectorWindow';
// import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import TestUtil from '../../../Util/TestUtil';
// import { IconSymbolizer } from 'geostyler-style';

describe('IconSelectorWindow', () => {

  let wrapper: any;
  let dummyLibraries: IconLibrary[] = TestUtil.getDummyGsIconLibraries();
  // let dummySymbolizer: IconSymbolizer = SymbolizerUtil.generateSymbolizer('Icon') as IconSymbolizer;

  beforeEach(() => {
    const props: IconSelectorWindowProps = {
      iconLibraries: dummyLibraries
    };
    wrapper = TestUtil.shallowRenderComponent(IconSelectorWindow, props);
  });

  it('is defined', () => {
    expect(IconSelectorWindow).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('getSelectedIconFromSrc', () => {
    it('returns an object with undefined vals if no match was found', () => {
      const nonMatchSrc = 'not.included';
      const match = IconSelectorWindow.getSelectedIconFromSrc(nonMatchSrc, dummyLibraries);
      expect(match.libIndex).toBeUndefined();
      expect(match.iconIndex).toBeUndefined();
    });

    it('returns the index of the matching object', () => {
      const expecLibIndex = 0;
      const expecIconIndex = 1;
      const matchSrc = dummyLibraries[expecLibIndex].icons[expecIconIndex].src;
      const match = IconSelectorWindow.getSelectedIconFromSrc(matchSrc, dummyLibraries);
      expect(match.libIndex).toBeCloseTo(expecLibIndex);
      expect(match.iconIndex).toBeCloseTo(expecIconIndex);
    });
  });
});
