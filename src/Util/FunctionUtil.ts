/* Released under the BSD 2-Clause License
 *
 * Copyright © 2023-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import { Feature } from 'geojson';
import {
  GeoStylerBooleanFunction,
  GeoStylerFunction,
  GeoStylerNumberFunction,
  GeoStylerStringFunction,
  GeoStylerUnknownFunction,
  isGeoStylerBooleanFunction,
  isGeoStylerFunction,
  isGeoStylerNumberFunction,
  isGeoStylerStringFunction,
  isGeoStylerUnknownFunction
} from 'geostyler-style';

type ReturnType<T> =
  T extends GeoStylerBooleanFunction ? boolean :
  T extends GeoStylerNumberFunction ? number :
  T extends GeoStylerStringFunction ? string :
  T extends GeoStylerUnknownFunction ? any :
  never;

/**
 * @class FunctionUtil
 */
class FunctionUtil {

  public static evaluateFunction<T extends GeoStylerFunction>(func: T, feature?: Feature): ReturnType<T> {
    if (func?.name === 'property') {
      if (!feature) {
        throw new Error(`Could not evalute 'property' function. Feature ${feature} is not defined.`);
      }
      if (isGeoStylerStringFunction(func.args[0]) && feature?.properties) {
        const arg = FunctionUtil.evaluateStringFunction(func.args[0], feature);
        return feature?.properties?.[arg];
      } else {
        const arg = func.args[0] as string;
        return feature?.properties?.[arg];
      }
    }

    if (isGeoStylerStringFunction(func)) {
      return FunctionUtil.evaluateStringFunction(func, feature) as ReturnType<T>;
    }
    if (isGeoStylerNumberFunction(func)) {
      return FunctionUtil.evaluateNumberFunction(func, feature) as ReturnType<T>;
    }
    if (isGeoStylerBooleanFunction(func)) {
      return FunctionUtil.evaluateBooleanFunction(func, feature) as ReturnType<T>;
    }
    if (isGeoStylerUnknownFunction(func)) {
      return FunctionUtil.evaluateUnknownFunction(func, feature) as ReturnType<T>;
    }
    return undefined;
  }

  private static evaluateBooleanFunction(func: GeoStylerBooleanFunction, feature?: Feature): boolean {
    const args = func.args.map(arg => {
      if (isGeoStylerFunction(arg)) {
        return FunctionUtil.evaluateFunction(arg, feature);
      }
      return arg;
    });
    switch (func.name) {
      case 'between':
        return (args[0] as number) >= (args[1] as number) && (args[0] as number) <= (args[2] as number);
      case 'double2bool':
        return Math.round(args[0] as number) === 1;
      case 'in':
        return args.slice(1).includes(args[0]);
      case 'parseBoolean':
        return !!args[0];
      case 'strEndsWith':
        return (args[0] as string).endsWith(args[1] as string);
      case 'strEqualsIgnoreCase':
        return (args[0] as string).toLowerCase() === (args[1] as string).toLowerCase() ;
      case 'strMatches':
        const regEx = (args[1] as string);
        const regexArray = regEx.match(/\/(.*?)\/([gimy]{0,4})$/);
        if (regexArray && regexArray.length === 3){
          return new RegExp(regexArray[1], regexArray[2]).test(args[0] as string);
        } else {
          return false;
        }
      case 'strStartsWith':
        return (args[0] as string).startsWith(args[1] as string);
      default:
        return false;
    }
  }

  private static evaluateNumberFunction(func: GeoStylerNumberFunction, feature?: Feature): number {
    if (func.name === 'pi') {
      return Math.PI;
    }
    if (func.name === 'random') {
      return Math.random();
    }
    const args = func.args.map(arg => {
      if (isGeoStylerFunction(arg)) {
        return FunctionUtil.evaluateFunction(arg, feature);
      }
      return arg;
    });
    switch (func.name) {
      case 'abs':
        return Math.abs(args[0] as number);
      case 'acos':
        return Math.acos(args[0] as number);
      case 'asin':
        return Math.asin(args[0] as number);
      case 'atan':
        return Math.atan(args[0] as number);
      case 'atan2':
        // TODO: evaluate this correctly
        return args[0] as number;
      case 'ceil':
        return Math.ceil(args[0] as number);
      case 'cos':
        return Math.cos(args[0] as number);
      case 'exp':
        return Math.exp(args[0] as number);
      case 'floor':
        return Math.floor(args[0] as number);
      case 'log':
        return Math.log(args[0] as number);
      case 'max':
        return Math.max(...(args as number[]));
      case 'min':
        return Math.min(...(args as number[]));
      case 'modulo':
        return (args[0] as number) % (args[1] as number);
      case 'pow':
        return Math.pow(args[0] as number, args[1] as number);
      case 'rint':
        // TODO: evaluate this correctly
        return args[0] as number;
      case 'round':
        return Math.round(args[0] as number);
      case 'sin':
        return Math.sin(args[0] as number);
      case 'sqrt':
        return Math.sqrt(args[0] as number);
      case 'strIndexOf':
        return (args[0] as string).indexOf(args[1] as string);
      case 'strLastIndexOf':
        return (args[0] as string).lastIndexOf(args[1] as string);
      case 'strLength':
        return (args[0] as string).length;
      case 'tan':
        return Math.tan(args[0] as number);
      case 'toDegrees':
        return (args[0] as number) * (180/Math.PI);
      case 'toRadians':
        return (args[0] as number) * (Math.PI/180);
      default:
        return args[0] as number;
    }
  }

  private static evaluateUnknownFunction(func: GeoStylerUnknownFunction, feature?: Feature): unknown {
    const args = func.args.map(arg => {
      if (isGeoStylerFunction(arg)) {
        return FunctionUtil.evaluateFunction(arg, feature);
      }
      return arg;
    });
    switch (func.name) {
      case 'property':
        return feature?.properties?.[args[0] as string];
      default:
        return args[0];
    }
  }

  private static evaluateStringFunction(func: GeoStylerStringFunction, feature?: Feature): string {
    const args = func.args.map(arg => {
      if (isGeoStylerFunction(arg)) {
        return FunctionUtil.evaluateFunction(arg, feature);
      }
      return arg;
    });
    switch (func.name) {
      case 'numberFormat':
        // TODO: evaluate this correctly
        return args[0] as string;
      case 'strAbbreviate':
        // TODO: evaluate this correctly
        return args[0] as string;
      case 'strCapitalize':
        // https://stackoverflow.com/a/32589289/10342669
        var words = (args[0] as string).toLowerCase().split(' ');
        var capitalizedWords = [];
        for (let word of words) {
          capitalizedWords.push(word.charAt(0).toUpperCase() + word.substring(1));
        }
        return capitalizedWords.join(' ');
      case 'strConcat':
        return args.join('');
      case 'strDefaultIfBlank':
        return (!args[0] || (args[0] as string)?.length < 1) ? args[1] as string : args[0] as string;
      case 'strReplace':
        if (args[3] === true) {
          return (args[0] as string).replaceAll(args[1] as string, args[2] as string);
        } else {
          return (args[0] as string).replace(args[1] as string, args[2] as string);
        }
      case 'strStripAccents':
        // https://stackoverflow.com/a/37511463/10342669
        return (args[0] as string).normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
      case 'strSubstring':
        return (args[0] as string).substring(args[1] as number, args[2] as number);
      case 'strSubstringStart':
        return (args[0] as string).substring(args[1] as number);
      case 'strToLowerCase':
        return (args[0] as string).toLowerCase();
      case 'strToUpperCase':
        return (args[0] as string).toUpperCase();
      case 'strTrim':
        return (args[0] as string).trim();
      default:
        return args[0] as string;
    }
  }
}

export default FunctionUtil;
