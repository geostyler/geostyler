import { Data } from 'geostyler-data';
import {
  LevelOfMeasurement,
  ClassificationMethod
} from 'src/Component/RuleGenerator/RuleGenerator';
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

export interface RuleGenerationParams {
  data: Data;
  levelOfMeasurement: LevelOfMeasurement;
  numberOfRules: number;
  attributeName: string;
  colorRamp: string[];
  symbolizerKind: SymbolizerKind;
  wellKnownName?: WellKnownName;
  classificationMethod?: ClassificationMethod;
}

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

  static generateRules(params: RuleGenerationParams): Rule[] {
    const {
      data,
      levelOfMeasurement,
      numberOfRules,
      attributeName,
      colorRamp,
      symbolizerKind,
      wellKnownName,
      classificationMethod
    } = params;

    let rules: Rule[] = [];
    if (levelOfMeasurement === 'nominal') {
      const distinctValues = RuleGeneratorUtil.getDistinctValues(data, attributeName);
      distinctValues.splice(numberOfRules, distinctValues.length - 2);
      rules = distinctValues.map((distinctValue, index: number) => {
        const filter: Filter = ['==', attributeName, distinctValue];
        const symbolizer: Symbolizer = SymbolizerUtil.generateSymbolizer(symbolizerKind, {
          color: colorRamp[index],
          wellKnownName
        });
        return {
          name: distinctValue,
          filter,
          symbolizers: [symbolizer]
        };
      });
    } else if (levelOfMeasurement === 'cardinal') {
      if (!classificationMethod) {
        // TODO Add feedback
      } else {
        const features = _get(data, 'exampleFeatures.features');
        const values = features ? features.map((feature: any) => {
            return _get(feature, `properties[${attributeName}]`);
          }) : [];
        let ranges: number[][] = [];

        switch (classificationMethod) {
          case 'equalInterval':
            ranges = RuleGeneratorUtil.getEqualIntervalRanges(values, numberOfRules);
            break;
            case 'quantile':
            ranges = RuleGeneratorUtil.getQuantileRanges(values, numberOfRules);
            break;
          default:
            break;
        }

        rules = ranges.map((range, index: number) => {
          const isLast = index === ranges.length - 1;
          const filter: Filter = [
            '&&',
            ['>=', attributeName, range[0]],
            [isLast ? '<=' : '<', attributeName,  range[1]],
          ];
          const symbolizer: Symbolizer = SymbolizerUtil.generateSymbolizer(symbolizerKind, {
            color: colorRamp[index],
            wellKnownName
          });
          return {
            name: `${attributeName} ${range[0]} - ${range[1]}`,
            filter,
            symbolizers: [symbolizer]
          };
        });
      }
    }
    return rules;
  }

  static getColorRamp(colormap: string, nshades: number) {
    const minClasses = _get(colorScales, `[${colormap}].length`);
    if (nshades > minClasses) {
      return generateColormap({colormap, nshades});
    }
  }

  /**
   * Inspired by GeoStats.js: http://www.intermezzo-coop.eu/mapping/geostats/
   *
   * @param {number[]} series The data values.
   * @param {number} numberOfClasses The number of classes to generate.
   * @param {number} forceMin An optional forced minimum value.
   * @param {number} forceMax An optional forced maximum value.
   */
  static getEqualIntervalRanges(series: number[], numberOfClasses: number, forceMin?: number, forceMax?: number) {

    const min = !forceMin ? Math.min(...series) : forceMin;
    const max = !forceMax ? Math.max(...series) : forceMax;
    const bounds = [];
    let val = min;
    const interval = (max - min) / numberOfClasses;

    for (let i = 0; i <= numberOfClasses; i++) {
        bounds[i] = val;
        val += interval;
    }

    // -> Fix last bound to Max of values
    bounds[numberOfClasses] = max;

    return RuleGeneratorUtil.boundsToRanges(bounds);
  }

  /**
   * Inspired by GeoStats.js: http://www.intermezzo-coop.eu/mapping/geostats/
   *
   * @param {number[]} series The data values.
   * @param {number} numberOfClasses The number of classes to generate.
   */
  static getQuantileRanges(series: number[], numberOfClasses: number) {
    const bounds: number[] = [-Infinity];
    const sortedValues = series.sort((a, b) => a === b ? 0 : a < b ? -1 : 1);
    const valuesPerClass = Math.floor(series.length / numberOfClasses);
    bounds[0] = sortedValues[0];

    for (let i = 1; i <= numberOfClasses; i++) {
      if (i < numberOfClasses) {

        const value = sortedValues[(i * valuesPerClass)];
        bounds[i] = value;
      } else {
        bounds[i] = sortedValues[(sortedValues.length - 1)];
      }
    }

    return RuleGeneratorUtil.boundsToRanges(bounds);
  }

  /**
   * Inspired by GeoStats.js: http://www.intermezzo-coop.eu/mapping/geostats/
   *
   * @param {number[]} bounds An array of class boundary values.
   */
  static boundsToRanges(bounds: number[]): number[][] {
    let ranges = [];
    for (let i = 0; i < (bounds.length - 1); i++) {
      ranges[i] = [bounds[i], bounds[i + 1]];
    }
    return ranges;
  }

}

export default RuleGeneratorUtil;
