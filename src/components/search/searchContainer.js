import htmlToElement from 'html-to-element';
import SearchHead from './searchHead';
import './searchContainer.scss';
import { SHOW_MORE, OVERVIEW, NOTHING_FOUND } from '../../constants/texts';

export default class SearchContainer {
  constructor(defaultSearch, placeholder) {
    this.element = htmlToElement(`
      <div class="accordion" data-group="site" style="overflow: hidden; margin-top: 30px;">
        <div class="accordion__body" id="tappOverview">
          <div class="accordion__content">
            <div style="text-align: right">
              <a href="#">${SHOW_MORE}</a>
            </div>
          </div>
        </div>
      </div>
    `);
    this.element.prepend(new SearchHead(placeholder, this.handleSearch.bind(this)).render());
  }

  handleSearch(searchString) {
    console.log(searchString);
  }

  render() {
    return this.element;
  }
}
