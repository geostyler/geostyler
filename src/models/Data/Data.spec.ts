import Data from './Data';
import DataSchema from './schema/DataSchema';
import ExampleFeatures from './example/ExampleFeatures';

it('is defined', () => {
  expect(Data).toBeDefined();
});

describe('Constructor', () => {
  it('can be created with schema and exampleFeatures', () => {
    const explFeats = new ExampleFeatures([]);
    const schema = new DataSchema('test', {});
    const data = new Data(schema, explFeats);
    expect(data).toBeDefined();
    expect(data.schema).toBe(schema);
    expect(data.exampleFeatures).toBe(explFeats);
  });
});
