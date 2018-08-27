import htmlToElement from 'html-to-element';
import SearchHead from './searchHead';
import './searchContainer.scss';
import ResultList from '../result/resultList';
import fetchSites from '../../utils/fetchSites';

export default class SearchContainer {
  constructor(defaultSearch, placeholder, itemsPerRequest) {
    this.itemsPerRequest = itemsPerRequest;
    this.start = 0;
    this.searchString = defaultSearch;
    this.element = htmlToElement(`
      <div class="accordion" data-group="site" style="overflow: hidden; margin-top: 30px;">
      </div>
    `);
    this.element.appendChild(new SearchHead(placeholder, this.handleSearch.bind(this)).render());
    this.resultList = new ResultList(this.handleMore.bind(this));
    this.element.appendChild(this.resultList.element);
    this.handleMore();
  }

  handleSearch(searchString) {
    this.searchString = searchString;
    this.start = 0;

    this.loadSiteData(false);
  }

  handleMore() {
    this.loadSiteData(true);
  }

  async loadSiteData(append) {
    const result = await fetchSites(this.searchString, this.start, this.itemsPerRequest);
    this.resultList.addData(result, append);
    this.start += result.sites.length;
    this.element.classList.add('accordion--open');
  }


  render() {
    return this.element;
  }
}
