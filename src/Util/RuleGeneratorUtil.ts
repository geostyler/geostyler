import { Data } from 'geostyler-data';
import { LevelOfMeasurement } from 'src/Component/RuleGenerator/RuleGenerator';
import { Rule, Filter, MarkSymbolizer } from 'geostyler-style';

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

  static generateRules(
    data: Data,
    levelOfMeasurement: LevelOfMeasurement,
    numberOfClasses: number,
    attributeName: string,
    colors: string[]
  ): Rule[] {
    let rules: Rule[];
    // const attributeType = _get(data, `schema.properties[${attributeName}].type`);
    if (levelOfMeasurement === 'nominal') {
      const distinctValues = RuleGeneratorUtil.getDistinctValues(data, attributeName);
      rules = distinctValues.map((distinctValue, index: number) => {
        const filter: Filter = ['==', attributeName, distinctValue];
        const symbolizer: MarkSymbolizer = {
          kind: 'Mark',
          wellKnownName: 'Square',
          color: colors[index]
        };
        return {
          name: distinctValue,
          filter,
          symbolizers: [symbolizer]
        };
      });
    }
    return rules;
  }

}

export default RuleGeneratorUtil;
