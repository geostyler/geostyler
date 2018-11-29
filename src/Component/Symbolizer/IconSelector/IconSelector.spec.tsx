import { IconSelector, IconSelectorProps, IconLibrary } from './IconSelector';
import TestUtil from '../../../Util/TestUtil';

describe('IconSelector', () => {

  let wrapper: any;
  let dummyLibraries: IconLibrary[] = TestUtil.getDummyGsIconLibraries();

  beforeEach(() => {
    const props: IconSelectorProps = {
      iconLibraries: dummyLibraries
    };
    wrapper = TestUtil.shallowRenderComponent(IconSelector, props);
  });

  it('is defined', () => {
    expect(IconSelector).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  describe('getSelectedIconFromSrc', () => {
    it('returns an object with undefined vals if no match was found', () => {
      const nonMatchSrc = 'not.included';
      const match = IconSelector.getSelectedIconFromSrc(nonMatchSrc, dummyLibraries);
      expect(match.libIndex).toBeUndefined();
      expect(match.iconIndex).toBeUndefined();
    });

    it('returns the index of the matching object', () => {
      const expecLibIndex = 0;
      const expecIconIndex = 1;
      const matchSrc = dummyLibraries[expecLibIndex].icons[expecIconIndex].src;
      const match = IconSelector.getSelectedIconFromSrc(matchSrc, dummyLibraries);
      expect(match.libIndex).toBeCloseTo(expecLibIndex);
      expect(match.iconIndex).toBeCloseTo(expecIconIndex);
    });
  });
});
