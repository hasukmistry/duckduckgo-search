import superagent from 'superagent';
import SearchQueryBuilder from './SearchQueryBuilder.js';

export default class DuckDuckGo {
  constructor() {
    this.primaryUrl = 'https://duckduckgo.com';

    this.url = 'https://html.duckduckgo.com/html/';

    this.request = superagent.agent();

    // super agent default configuration for DuckDuckGo
    this.request.use((req) => {
      req.set('authority', 'html.duckduckgo.com')
        .set('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7')
        .set('accept-language', 'en-GB,en-US;q=0.9,en;q=0.8')
        .set('cache-control', 'no-cache')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('origin', 'https://html.duckduckgo.com')
        .set('pragma', 'no-cache')
        .set('referer', 'https://html.duckduckgo.com/')
        .set('sec-fetch-dest', 'document')
        .set('sec-fetch-mode', 'navigate')
        .set('sec-fetch-site', 'same-origin')
        .set('sec-fetch-user', '?1')
        .set('upgrade-insecure-requests', '1');

      return req;
    });
  }

  /**
   * Get search results from DuckDuckGo
   *
   * @param {SearchQueryBuilder} query The search query builder object
   *
   * @returns {Promise<string>} The search results
   *
   * @throws {Error} When query is not an instance of SearchQueryBuilder
   */
  getSearchResults(query) {
    // throw error when query is not an instance of SearchQueryBuilder
    if (!(query instanceof SearchQueryBuilder)) {
      throw new Error('Invalid query');
    }

    const queryString = query.getBuildQuery();

    return this.request
      .get(this.url)
      .query({ q: queryString })
      .then((res) => res.text);
  }
}
