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
    this.resultList = new ResultList(this.loadMore.bind(this));
    this.element.appendChild(this.resultList.element);
  }

  async handleSearch(searchString) {
    this.searchString = searchString;
    this.start = 0;

    const result = await fetchSites(searchString, 0, this.itemsPerRequest);
    this.resultList.addData(result);
    this.start += result.sites.length;
  }

  async loadMore() {
    const result = await fetchSites(this.searchString, this.start, this.itemsPerRequest);
    this.resultList.addData(result, true);
    this.start += result.sites.length;
  }


  render() {
    return this.element;
  }
}
