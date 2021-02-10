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

import URLSearchParams from '@ungap/url-search-params';

export type PostOptions = {
  url: string;
  params: any;
  additionalHeaders?: any;
  additionalFetchOptions?: any;
  sameOriginCredentials?: boolean;
  asForm?: boolean;
};

/**
 * A Helper class which simplifies some complex request setups as like fetch
 * with POST and Content-Type 'application/x-www-form-urlencoded'.
 *
 * @class HTTPUtil
 */
class HTTPUtil {

  /**
   * A method that performs a fetch request with some predefined configs.
   *
   * @param {Object} Options The options object to configure the post request.
   *  It can contain theses keys:
   *    {String} url The url we want to send the post to.
   *    {Object} params The post params we want to send.
   *      Default is {}.
   *    {Object} additionalHeaders An object with additional headers as kvp.
   *      Default is {}.
   *    {Object} additionalFetchOptions An object containing additional options
   *      for the fetch API. Compare https://mdn.io/fetch Default is {}.
   *    {Boolean} sameOriginCredentials A flag to wether set the credentials
   *      option to 'same-origin' or let it undefined. Default is true.
   *    {Boolean} asForm A flag to set the Content-Type header to
   *      'application/x-www-form-urlencoded'. Default is true.
   */
  static async post(optionsObject: PostOptions) {
    const {
      url,
      params = {},
      additionalHeaders = {},
      additionalFetchOptions = {},
      sameOriginCredentials = true,
      asForm = true
    } = optionsObject;
    const headers = new Headers();
    if (asForm) {
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }
    Object.keys(additionalHeaders).forEach(headerKey => {
      const headerValue = additionalHeaders[headerKey];
      headers.set(headerKey, headerValue);
    });

    const options = {
      method: 'POST',
      credentials: sameOriginCredentials ? 'same-origin' : undefined,
      body: asForm ? new URLSearchParams(params) : params,
      headers,
      ...additionalFetchOptions
    };

    return fetch(url, options);
  }

}

export default HTTPUtil;
