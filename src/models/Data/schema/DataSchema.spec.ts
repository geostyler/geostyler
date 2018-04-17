import DataSchema from './DataSchema';

it('is defined', () => {
  expect(DataSchema).toBeDefined();
});

describe('Constructor', () => {
  it('can be created with title, type and properties', () => {
    const testTitle = 'foo';
    const testType = 'bar';
    const testProps = {};
    const schema = new DataSchema(testType, testProps, testTitle);
    expect(schema).toBeDefined();
    expect(schema.type).toBe(testType);
    expect(schema.title).toBe(testTitle);
    expect(schema.properties).toBe(testProps);
  });

  it('can be created with just type and properties', () => {
    const testType = 'bar';
    const testProps = {};
    const schema = new DataSchema(testType, testProps);
    expect(schema).toBeDefined();
    expect(schema.type).toBe(testType);
    expect(schema.title).toEqual('');
    expect(schema.properties).toBe(testProps);
  });
});
