export default class SiteMapper {
  constructor() {
    this.sites = {
      ajio: 'ajio.com',
      amazon: 'amazon.in',
      croma: 'croma.com',
      flipkart: 'flipkart.com',
      indiamart: 'indiamart.com',
      infibeam: 'apis.infibeam.com',
      jiomart: 'jiomart.com',
      meesho: 'meesho.com',
      myntra: 'myntra.com',
      nykaa: 'nykaa.com',
      shopclues: 'shopclues.com',
      snapdeal: 'snapdeal.com',
      tatacliq: 'tatacliq.com',
    };
  }

  /**
   * Get the site url from the map
   *
   * @param {string} site The site name
   *
   * @returns {string} The site url
   */
  getSiteUrl(site) {
    // check if site exists in the sites map
    if (!this.sites[site]) {
      throw new Error('Invalid site');
    }

    return this.sites[site];
  }
}
