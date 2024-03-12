import cheerio from 'cheerio';
import SearchQueryBuilder from '../utils/SearchQueryBuilder.js';
import SiteMapper from '../utils/SiteMapper.js';
import DuckDuckGo from '../utils/DuckDuckGo.js';

export default class SearchController {
  /**
   * Get mapped value of given site
   *
   * @param {string} site The site name
   *
   * @returns {string} The site url
   */
  static getSiteUrl(site) {
    const siteMapper = new SiteMapper();
    return siteMapper.getSiteUrl(site);
  }

  /**
   * Get search results from DuckDuckGo for given query and site
   *
   * @param {string} siteUrl The site url
   * @param {string} query   The search query
   * @returns {Promise<string>} The search results
   */
  static getSearchResults(siteUrl, query) {
    const searchQueryBuilder = new SearchQueryBuilder()
      .addTerm(query)
      .addSite(siteUrl);

    const duckDuckGo = new DuckDuckGo();
    return duckDuckGo.getSearchResults(searchQueryBuilder);
  }

  /**
   * Parse the first result from the given search results
   *
   * @param {string} searchResults The search results
   *
   * @returns {object} The parsed result
   */
  static parseFirstResult(searchResults) {
    const $ = cheerio.load(searchResults);

    const firstResult = $('div.results .results_links').first();

    const resultElement = firstResult.find('.result__title > a.result__a');
    let resultLink = resultElement.attr('href');
    const resultText = resultElement.text().trim();

    if (!resultLink.startsWith('http://') && !resultLink.startsWith('https://')) {
      resultLink = `https://${resultLink}`;
    }

    const url = new URL(resultLink);
    const uddg = url.searchParams.get('uddg');

    return { link: uddg, text: resultText };
  }

  /**
   * Search for given query
   *
   * @param {Request} req The request object
   * @param {Response} res The response object
   *
   * @returns {Promise<void>}
   */
  static async get(req, res) {
    const { site, query } = req.params;

    if (!site || !query) {
      res.status(400).json({ error: 'Missing site or query' });
      return;
    }

    try {
      const siteUrl = this.getSiteUrl(site);
      const searchResults = await this.getSearchResults(siteUrl, query);
      const firstResult = this.parseFirstResult(searchResults);

      res.json([firstResult]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
