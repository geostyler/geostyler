import DataParser from './DataParser';

describe('DataParser interface', () => {
  // create a mock implementation of the interface
  const Mock = jest.fn<DataParser>(() => ({
    sourceProjection: 'EPSG:4326',
    targetProjection: 'EPSG:3857',
    readData: jest.fn(),
  }));
  // get instance
  const dataParser = new Mock();

  it('has a the correct memebers "sourceProjection" and "targetProjection"', () => {
    expect(dataParser.sourceProjection).toBe('EPSG:4326');
    expect(dataParser.targetProjection).toBe('EPSG:3857');
  });
  it('has a function "readData"', () => {
    dataParser.readData({});
    expect(dataParser.readData).toHaveBeenCalled();
  });
});
