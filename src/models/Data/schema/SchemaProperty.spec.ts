import SchemaProperty from './SchemaProperty';

it('is defined', () => {
  expect(SchemaProperty).toBeDefined();
});

describe('Constructor', () => {
  it('can be created with type', () => {
    const testType = 'foo';
    const schemaProp = new SchemaProperty(testType);
    expect(schemaProp).toBeDefined();
    expect(schemaProp.type).toBe(testType);
  });
  
  it('can be created with type and minimum', () => {
    const testType = 'foo';
    const testMin = 1;
    const schemaProp = new SchemaProperty(testType, testMin);
    expect(schemaProp).toBeDefined();
    expect(schemaProp.type).toBe(testType);
    expect(schemaProp.minimum).toBe(testMin);
    expect(schemaProp.maximum).toBe(undefined);
  });
  
  it('can be created with type, minimum and maximum', () => {
    const testType = 'foo';
    const testMin = 1;
    const testMax = 2;
    const schemaProp = new SchemaProperty(testType, testMin, testMax);
    expect(schemaProp).toBeDefined();
    expect(schemaProp.type).toBe(testType);
    expect(schemaProp.minimum).toBe(testMin);
    expect(schemaProp.maximum).toBe(testMax);
  });
});
