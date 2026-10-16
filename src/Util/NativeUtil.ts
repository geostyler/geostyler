/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
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

export const cloneDeep = <T>(value: T): T => structuredClone(value);

const pathSegments = (path: string | (string | number)[]): string[] => {
  if (Array.isArray(path)) {
    return path.map(String);
  }

  const segments: string[] = [];
  let segment = '';
  let inBracket = false;
  let quote = '';

  for (let index = 0; index < path.length; index++) {
    const character = path[index];

    if (inBracket) {
      if (quote) {
        if (character === '\\' && index + 1 < path.length) {
          segment += path[++index];
        } else if (character === quote) {
          quote = '';
        } else {
          segment += character;
        }
      } else if ((character === '"' || character === '\'') && segment === '') {
        quote = character;
      } else if (character === ']') {
        segments.push(segment);
        segment = '';
        inBracket = false;
      } else {
        segment += character;
      }
    } else if (character === '.') {
      if (segment) {
        segments.push(segment);
      }
      segment = '';
    } else if (character === '[') {
      if (segment) {
        segments.push(segment);
      }
      segment = '';
      inBracket = true;
    } else {
      segment += character;
    }
  }

  if (segment) {
    segments.push(inBracket ? `[${segment}` : segment);
  }
  return segments;
};

export const get = (object: any, path: string | (string | number)[]): any => {
  const segments = pathSegments(path);
  let value = object;

  for (const segment of segments) {
    if (value == null) {
      return undefined;
    }
    value = value[segment];
  }

  return value;
};

export const set = (object: any, path: string | (string | number)[], value: any): any => {
  const segments = pathSegments(path);
  if (segments.some(segment => ['__proto__', 'constructor', 'prototype'].includes(segment))) {
    return object;
  }
  let current = object;

  for (let index = 0; index < segments.length - 1; index++) {
    const segment = segments[index];
    const nextSegment = segments[index + 1];
    if (current[segment] == null) {
      current[segment] = /^\d+$/.test(nextSegment) ? [] : {};
    }
    current = current[segment];
  }

  if (segments.length > 0) {
    current[segments[segments.length - 1]] = value;
  }

  return object;
};

export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isNil = (value: unknown): value is null | undefined => value === null || value === undefined;

export const isEmpty = (value: any): boolean => {
  if (value == null) {
    return true;
  }
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }
  if (typeof value !== 'object' && typeof value !== 'function') {
    return true;
  }
  return Reflect.ownKeys(value).length === 0;
};

export const isEqual = (left: any, right: any, seen = new WeakMap<object, object>()): boolean => {
  if (Object.is(left, right)) {
    return true;
  }
  if (left == null || right == null || typeof left !== 'object' || typeof right !== 'object') {
    return false;
  }
  if (Object.getPrototypeOf(left) !== Object.getPrototypeOf(right)) {
    return false;
  }
  if (seen.get(left) === right) {
    return true;
  }
  seen.set(left, right);

  if (left instanceof Date) {
    return left.getTime() === right.getTime();
  }
  if (left instanceof RegExp) {
    return left.source === right.source && left.flags === right.flags;
  }
  if (left instanceof Map || left instanceof Set) {
    if (left.size !== right.size) {
      return false;
    }
    const leftValues = Array.from(left instanceof Map ? left.entries() : left.values());
    const rightValues = Array.from(right instanceof Map ? right.entries() : right.values());
    return leftValues.every((leftValue: any) => {
      const matchIndex = rightValues.findIndex((rightValue: any) =>
        left instanceof Map
          ? isEqual(leftValue[0], rightValue[0]) && isEqual(leftValue[1], rightValue[1])
          : isEqual(leftValue, rightValue)
      );
      if (matchIndex === -1) {
        return false;
      }
      rightValues.splice(matchIndex, 1);
      return true;
    });
  }

  const leftKeys = Reflect.ownKeys(left);
  const rightKeys = Reflect.ownKeys(right);
  return leftKeys.length === rightKeys.length &&
    leftKeys.every(key =>
      Object.prototype.hasOwnProperty.call(right, key) &&
      isEqual(left[key], right[key], seen)
    );
};

let uniqueIdCounter = 0;

export const uniqueId = (prefix = ''): string => {
  const id = globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${uniqueIdCounter++}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}${id}`;
};
