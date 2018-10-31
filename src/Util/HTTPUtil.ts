import 'url-search-params';

type PostOptions = {
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
  static post(optionsObject: PostOptions) {
    const {
      url,
      params = {},
      additionalHeaders = {},
      additionalFetchOptions = {},
      sameOriginCredentials = true,
      asForm = true
    } = optionsObject;
    let headers = new Headers();
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
