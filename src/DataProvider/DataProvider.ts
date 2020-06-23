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

import ParserDesc from './ParserDesc';
import { DataParser, Data } from 'geostyler-data';

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
      throw new Error('The DataProvider was instanciated with an empty "parsers" configuration. ' +
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
  importData(inputData: any, format: string): Promise<Data> {

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
