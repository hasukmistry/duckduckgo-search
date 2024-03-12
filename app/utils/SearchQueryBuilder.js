export default class SearchQueryBuilder {
  constructor() {
    this.query = '';
  }

  /**
   * Add given term to the query
   *
   * @param {string} term The given term
   *
   * @returns {SearchQueryBuilder}
   */
  addTerm(term) {
    this.query += term;
    return this;
  }

  /**
   * Add given site to the query
   *
   * @param {string} site The given site
   *
   * @returns {SearchQueryBuilder}
   */
  addSite(site) {
    // Prefix site when this.query is empty
    if (this.query.length === 0) {
      this.query += `site:${site} `;
    } else {
      this.query += ` site:${site}`;
    }

    return this;
  }

  /**
   * Get the built query
   *
   * @returns {string} The built query
   */
  getBuildQuery() {
    return this.query;
  }
}
