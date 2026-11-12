import {
  cloneDeep,
  get,
  isBoolean,
  isEmpty,
  isEqual,
  isNil,
  isString,
  set,
  uniqueId
} from './NativeUtil';

describe('NativeUtil', () => {
  it('deep clones values without sharing nested references', () => {
    const value = { nested: [{ value: 1 }] };
    const clone = cloneDeep(value);

    expect(clone).toEqual(value);
    expect(clone).not.toBe(value);
    expect(clone.nested).not.toBe(value.nested);
  });

  it('gets and sets values by dot and bracket paths', () => {
    const object = { rules: [{ symbolizers: [{ kind: 'Mark' }] }] };

    expect(get(object, 'rules[0].symbolizers[0].kind')).toBe('Mark');
    expect(get(object, 'rules[1].symbolizers[0].kind')).toBeUndefined();
    set(object, 'rules[0].symbolizers[0].kind', 'Line');
    expect(object.rules[0].symbolizers[0].kind).toBe('Line');
    expect(get({ 'a.b': true }, '[\'a.b\']')).toBe(true);
  });

  it('does not allow setting prototype properties', () => {
    const object = {};

    set(object, '__proto__.polluted', true);

    expect(Reflect.get(Object.prototype, 'polluted')).toBeUndefined();
    expect(object).toEqual({});
  });

  it('compares nested values, including key-order differences and cycles', () => {
    expect(isEqual({ first: 1, second: [2] }, { second: [2], first: 1 })).toBe(true);
    expect(isEqual({ value: 1 }, { value: 2 })).toBe(false);
    expect(isEqual(new Date(0), new Date(0))).toBe(true);

    const left: any = {};
    const right: any = {};
    left.self = left;
    right.self = right;
    expect(isEqual(left, right)).toBe(true);
  });

  it('checks native primitive types and empty values', () => {
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(Object.create(Boolean.prototype))).toBe(false);
    expect(isString('')).toBe(true);
    expect(isString(Object.create(String.prototype))).toBe(false);
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(0)).toBe(false);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty([undefined])).toBe(false);
    expect(isEmpty({ value: undefined })).toBe(false);
  });

  it('generates distinct IDs with an optional prefix', () => {
    const first = uniqueId('item');
    const second = uniqueId('item');

    expect(first.startsWith('item')).toBe(true);
    expect(second.startsWith('item')).toBe(true);
    expect(first).not.toBe(second);
  });
});
