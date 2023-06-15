import { GeoStylerBooleanFunction, GeoStylerNumberFunction, GeoStylerStringFunction } from 'geostyler-style';
import FunctionUtil from './FunctionUtil';
import { Feature } from 'geojson';

describe('FunctionUtil', () => {

  const feat: Feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0,0]
    },
    properties: {
      name: 'Peter'
    }
  };

  it('FunctionUtil is defined', () => {
    expect(FunctionUtil).toBeDefined();
  });


  describe('#evaluateFunction', () => {

    it('is defined', () => {
      expect(FunctionUtil.evaluateFunction).toBeDefined();
    });

    describe('Boolean Function', () => {

      it('"between"', () => {
        const fn: GeoStylerBooleanFunction = {
          name: 'between',
          args: [12, 10, 14]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(true);
      });

      it('"doubl2bool"', () => {
        const fn: GeoStylerBooleanFunction = {
          name: 'double2bool',
          args: [1]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(true);
      });

      it('"in"', () => {
        const fn: GeoStylerBooleanFunction = {
          name: 'in',
          args: ['peter', 'hilde', 'peter', 'mareike']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(true);
      });

      it('"parseBoolean"', () => {
        const fn: GeoStylerBooleanFunction = {
          name: 'parseBoolean',
          args: ['true']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(true);
      });

      it('"strEndsWith"', () => {
        const fn: GeoStylerBooleanFunction = {
          name: 'strEndsWith',
          args: ['peter', 'er']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(true);
      });

      it('"strEqualsIgnoreCase"', () => {
        const fn: GeoStylerBooleanFunction = {
          name: 'strEqualsIgnoreCase',
          args: ['peter', 'peter']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(true);
      });

      it('"strStartsWith"', () => {
        const fn: GeoStylerBooleanFunction = {
          name: 'strStartsWith',
          args: ['peter', 'pe']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(true);
      });

      it('"strMatches" can handle regex', () => {
        const regExFn: GeoStylerBooleanFunction = {
          name: 'strMatches', args: [{
            name: 'property',
            args: ['name']
          }, '/(Peter|Paul)/']
        };

        const match = FunctionUtil.evaluateFunction(regExFn, feat);
        expect(match).toEqual(true);
      });

      it('"strMatches" can handle regex with flag', () => {
        const regExFn: GeoStylerBooleanFunction = {
          name: 'strMatches', args: [{
            name: 'property',
            args: ['name']
          }, '/(Peter|Paul)/i']
        };

        const match = FunctionUtil.evaluateFunction(regExFn, feat);
        expect(match).toEqual(true);
      });

    });

    describe('Number Function', () => {
      it('"pi"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'pi'
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(3.141592653589793);
      });

      it('"random"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'random'
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toBeGreaterThanOrEqual(0);
        expect(match).toBeLessThanOrEqual(1);
      });

      it('"abs"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'abs',
          args: [-0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(0.1337);
      });

      it('"acos"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'acos',
          args: [0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(1.4366947581319587);
      });

      it('"asin"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'asin',
          args: [0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(0.134101568662938);
      });

      it('"atan"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'atan',
          args: [0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(0.13291177698549314);
      });

      it('"ceil"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'ceil',
          args: [0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(1);
      });

      it('"cos"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'cos',
          args: [0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(0.9910754612480681);
      });

      it('"exp"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'exp',
          args: [0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(1.1430498532462856);
      });

      it('"floor"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'floor',
          args: [0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(0);
      });

      it('"log"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'log',
          args: [0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(-2.0121567948742394);
      });

      it('"max"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'max',
          args: [12, 1337, 0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(1337);
      });

      it('"min"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'min',
          args: [12, 1337, 0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(0.1337);
      });

      it('"modulo"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'modulo',
          args: [1337, 12]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(5);
      });

      it('"pow"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'pow',
          args: [1337, 2]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(1787569);
      });

      it('"round"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'round',
          args: [0.1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(0);
      });

      it('"sin"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'sin',
          args: [45]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(0.8509035245341184);
      });

      it('"sqrt"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'sqrt',
          args: [1337]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(36.565010597564445);
      });

      it('"strIndexOf"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'strIndexOf',
          args: ['Peter hat tierischen Durst', 'tier']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(10);
      });

      it('"strLastIndexOf"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'strLastIndexOf',
          args: ['Peter hat tierischen Durst', 'er']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(12);
      });

      it('"strLength"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'strLength',
          args: ['Peter hat tierischen Durst']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(26);
      });

      it('"tan"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'tan',
          args: [45]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(1.6197751905438615);
      });

      it('"toDegree"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'toDegrees',
          args: [0.7853981633974483]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(45);
      });

      it('"toRadians"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'toRadians',
          args: [45]
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual(0.7853981633974483);
      });

    });

    describe('Unknown Function', () => {

      it('"property"', () => {
        const fn: GeoStylerNumberFunction = {
          name: 'property',
          args: ['name']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual('Peter');
      });

    });

    describe('String Function', () => {

      it('"strCapitalize"', () => {
        const fn: GeoStylerStringFunction = {
          name: 'strCapitalize',
          args: ['Peter hat tierischen Durst']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual('Peter Hat Tierischen Durst');
      });

      it('"strConcat"', () => {
        const fn: GeoStylerStringFunction = {
          name: 'strConcat',
          args: ['Peter', ' ', 'hat', ' ', 'tierischen', ' ', 'Durst']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual('Peter hat tierischen Durst');
      });

      it('"strDefaultIfBlank"', () => {
        const fn: GeoStylerStringFunction = {
          name: 'strDefaultIfBlank',
          args: [{
            name: 'property',
            args: ['age']
          }, '49']
        };

        const match = FunctionUtil.evaluateFunction(fn, feat);
        expect(match).toEqual('49');
      });

      it('"strReplace"', () => {
        const fnTrue: GeoStylerStringFunction = {
          name: 'strReplace',
          args: ['Peter hat tierischen Durst', 'er', 'ra', true]
        };
        const fnFalse: GeoStylerStringFunction = {
          name: 'strReplace',
          args: ['Peter hat tierischen Durst', 'er', 'ra', false]
        };

        const matchTrue = FunctionUtil.evaluateFunction(fnTrue, feat);
        expect(matchTrue).toEqual('Petra hat tiraischen Durst');
        const matchFalse = FunctionUtil.evaluateFunction(fnFalse, feat);
        expect(matchFalse).toEqual('Petra hat tierischen Durst');
      });

      it('"strStripAccents"', () => {
        const fn: GeoStylerStringFunction = {
          name: 'strStripAccents',
          args: ['Crème Brulée']
        };

        const matchTrue = FunctionUtil.evaluateFunction(fn, feat);
        expect(matchTrue).toEqual('Creme Brulee');
      });

      it('"strSubstring"', () => {
        const fn: GeoStylerStringFunction = {
          name: 'strSubstring',
          args: ['Peter hat tierischen Durst', 10, 14]
        };

        const matchTrue = FunctionUtil.evaluateFunction(fn, feat);
        expect(matchTrue).toEqual('tier');
      });

      it('"strSubstringStart"', () => {
        const fn: GeoStylerStringFunction = {
          name: 'strSubstringStart',
          args: ['Peter hat tierischen Durst', 10]
        };

        const matchTrue = FunctionUtil.evaluateFunction(fn, feat);
        expect(matchTrue).toEqual('tierischen Durst');
      });

      it('"strToLowerCase"', () => {
        const fn: GeoStylerStringFunction = {
          name: 'strToLowerCase',
          args: ['Peter hat tierischen Durst']
        };

        const matchTrue = FunctionUtil.evaluateFunction(fn, feat);
        expect(matchTrue).toEqual('peter hat tierischen durst');
      });

      it('"strToUpperCase"', () => {
        const fn: GeoStylerStringFunction = {
          name: 'strToUpperCase',
          args: ['Peter hat tierischen Durst']
        };

        const matchTrue = FunctionUtil.evaluateFunction(fn, feat);
        expect(matchTrue).toEqual('PETER HAT TIERISCHEN DURST');
      });

      it('"strTrim"', () => {
        const fn: GeoStylerStringFunction = {
          name: 'strTrim',
          args: ['      Peter hat tierischen Durst           ']
        };

        const matchTrue = FunctionUtil.evaluateFunction(fn, feat);
        expect(matchTrue).toEqual('Peter hat tierischen Durst');
      });

    });

  });
});
