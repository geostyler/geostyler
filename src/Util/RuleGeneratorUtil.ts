import { Data } from 'geostyler-data';
import { LevelOfMeasurement } from 'src/Component/RuleGenerator/RuleGenerator';
import {
  Rule,
  Filter,
  SymbolizerKind,
  Symbolizer,
  WellKnownName
} from 'geostyler-style';
import SymbolizerUtil from './SymbolizerUtil';

const generateColormap = require('colormap');
// Unsure if we can rely on this file in future releases
export const colorScales = require('colormap/colorScale');

const _get = require('lodash/get');

/**
 * @class RuleUtil
 */
class RuleGeneratorUtil {

  static getDistinctValues(data: Data, attributeName: string): any[] {
    let distinctValues: any[] = [];
    const attributeType = _get(data, `schema.properties[${attributeName}].type`);
    const features = _get(data, 'exampleFeatures.features');
    if (features) {
      if (attributeType === 'string') {
        features.forEach((feature: any) => {
          const value = _get(feature, `properties[${attributeName}]`);
          if (value && !distinctValues.includes(value)) {
            distinctValues.push(value);
          }
        });
        return distinctValues;
      }
      // TODO Implement logic for others then string. Maybe we don't even want to
      // allow this
      return distinctValues;
    }
    return distinctValues;
  }

  static guessSymbolizerFromData(data: Data): SymbolizerKind {
    const firstFeatureGeometryType: GeoJSON.GeoJsonGeometryTypes
      = _get(data, 'exampleFeatures.features[0].geometry.type');

    switch (firstFeatureGeometryType) {
      case 'Point':
      case 'MultiPoint':
        return 'Mark';
      case 'LineString':
      case 'MultiLineString':
        return 'Line';
      case 'Polygon':
      case 'MultiPolygon':
        return 'Fill';
      default:
        return 'Mark';
    }
  }

  static generateRules(
    data: Data,
    levelOfMeasurement: LevelOfMeasurement,
    numberOfClasses: number,
    attributeName: string,
    colors: string[] = [],
    symbolizerKind: SymbolizerKind,
    wellKnownName?: WellKnownName
  ): Rule[] {
    let rules: Rule[];
    if (levelOfMeasurement === 'nominal') {
      const distinctValues = RuleGeneratorUtil.getDistinctValues(data, attributeName);
      distinctValues.splice(numberOfClasses, distinctValues.length - 2);
      rules = distinctValues.map((distinctValue, index: number) => {
        const filter: Filter = ['==', attributeName, distinctValue];
        const symbolizer: Symbolizer = SymbolizerUtil.generateSymbolizer(symbolizerKind, {
          color: colors[index],
          wellKnownName
        });
        return {
          name: distinctValue,
          filter,
          symbolizers: [symbolizer]
        };
      });
    }
    return rules;
  }

  static getColorRamp(colormap: string, nshades: number) {
    const minClasses = _get(colorScales, `[${colormap}].length`);
    if (nshades > minClasses) {
      return generateColormap({colormap, nshades});
    }
  }

}

export default RuleGeneratorUtil;
