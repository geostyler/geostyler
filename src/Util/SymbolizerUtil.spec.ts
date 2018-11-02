import SymbolizerUtil from './SymbolizerUtil';
import { MarkSymbolizer, IconSymbolizer, FillSymbolizer, LineSymbolizer, TextSymbolizer } from 'geostyler-style';

describe('Style', () => {

  describe('generateSymbolizer', () => {
    it('generates symbolizer as expected', () => {
      const markSymbolizer: MarkSymbolizer = {
        kind: 'Mark',
        wellKnownName: 'Circle',
        color: '#0E1058'
      };
      const iconSymbolizer: IconSymbolizer = {
        kind: 'Icon',
        image: 'img/GeoStyler.png'
      };
      const fillSymbolizer: FillSymbolizer = {
        kind: 'Fill',
        color: '#0E1058'
      };
      const lineSymbolizer: LineSymbolizer = {
        kind: 'Line',
        color: '#0E1058',
        width: 3
      };
      const textSymbolizer: TextSymbolizer = {
        kind: 'Text',
        label: 'Your Label',
        size: 12
      };

      const noKind = SymbolizerUtil.generateSymbolizer();
      const mark = SymbolizerUtil.generateSymbolizer('Mark');
      const icon = SymbolizerUtil.generateSymbolizer('Icon');
      const fill = SymbolizerUtil.generateSymbolizer('Fill');
      const line = SymbolizerUtil.generateSymbolizer('Line');
      const text = SymbolizerUtil.generateSymbolizer('Text');

      expect(noKind).toEqual(markSymbolizer);
      expect(mark).toEqual(markSymbolizer);
      expect(icon).toEqual(iconSymbolizer);
      expect(fill).toEqual(fillSymbolizer);
      expect(line).toEqual(lineSymbolizer);
      expect(text).toEqual(textSymbolizer);

    });
  });

});
