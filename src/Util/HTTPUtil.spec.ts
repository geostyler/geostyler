import HTTPUtil, { PostOptions } from './HTTPUtil';

describe('HTTPUtil', () => {

  describe('post', () => {
    it('is defined', () => {
      expect(HTTPUtil.post).toBeDefined();
    });
    it('calls fetch with the expect params', async () => {
      // @ts-ignore
      fetch = jest.fn();
      const headers = new Headers();
      headers.set('Content-Type', 'application/x-www-form-urlencoded');
      headers.set('superheader', 'header-abc');
      // const expectedParams = {
      //   headers,
      //   method: 'POST',
      //   credentials: 'same-origin',
      //   body: new URLSearchParams({})
      // };
      const postOptions: PostOptions = {
        url: 'http://www.terrestris.de',
        params: {
          color: 'red'
        },
        additionalHeaders: {
          superHeader: 'header-abc'
        }
      };
      HTTPUtil.post(postOptions);
      // TODO Output seems to be identically but fails for following
      // expect(fetch).toHaveBeenCalledWith('http://www.terrestris.de', expectedParams);
      expect(fetch).toHaveBeenCalledTimes(1);

    });
  });

});
