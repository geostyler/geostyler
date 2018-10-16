import ParserDesc from './ParserDesc';
import { DataParser } from 'geostyler-data';

/**
 * DataProvider acting as translator between input data and the internal data representation.
 */
class DataProvider {

  /**
   * The parser descriptions
   * @type {ParserDesc[]}
   */
  private _parsers: ParserDesc[];

  constructor(parsers: ParserDesc[]) {
    this._parsers = parsers;

    if (this._parsers.length === 0) {
      new Console().error('The DataProvider was instanciated with an empty "parsers" configuration. ' +
        'The data import will not work - was this intentionally?');
    }
  }

  /**
   * Imports the given data and transforms it into the internal data structure. Therefore an appropriate parser is
   * detected by the given format.
   *
   * @param inputData
   * @param format
   */
  importData(inputData: any, format: string) {

    let parserInstance: DataParser;
    parserInstance = this.getMatchingParser(format);

    const internalDataPromise = parserInstance.readData(inputData);

    return internalDataPromise;
  }

  /**
   * Returns the correct parser for the given format (or undefined).
   */
  getMatchingParser(format: string): any {
    let prsr;
    this.parsers.forEach(parser => {
      if (parser.format.toLowerCase === format.toLowerCase) {
        prsr = <DataParser> parser.instance;
      }
    });

    return prsr;
  }

  /**
   * Getter parsers
   * @return {ParserDesc[]}
   */
  public get parsers(): ParserDesc[] {
    return this._parsers;
  }

    /**
     * Setter parsers
     * @param {ParserDesc[]} value
     */
  public set parsers(value: ParserDesc[]) {
    this._parsers = value;
  }

}

export default DataProvider;
