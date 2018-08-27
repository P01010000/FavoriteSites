import htmlToElement from 'html-to-element';
import './resultList.scss';
import { SHOW_MORE, NOTHING_FOUND } from '../../constants/texts';
import ResultListItem from './resultListItem';

export default class ResultList {
  constructor(loadMore) {
    this.data = [];
    this.reachedEnd = true;
    this.loadMore = loadMore;
    this.element = htmlToElement(`
      <div class="accordion__body">
        <div class="accordion__content">
          <div style="text-align: right">
            <a href="#">${SHOW_MORE}</a>
          </div>
        </div>
      </div>
    `);
  }

  addData(result, append = false) {
    this.data = append ? this.data.concat(result.sites) : result.sites;
    this.reachedEnd = result.reachedEnd;
    this.render();
  }

  render() {
    this.element.innerHTML = '';
    this.data.forEach(entry => this.element.appendChild(ResultListItem(entry)));
    if (!this.reachedEnd) {
      const more = htmlToElement(`
        <div class="accordion__content">
          <div style="text-align: right">
            <a href="#">${SHOW_MORE}</a>
          </div>
        </div>
      `);
      more.querySelector('a').addEventListener('click', this.loadMore);
      this.element.appendChild(more);
    }
    if (this.data.length === 0) {
      this.element.appendChild(htmlToElement(`
        <div class="accordion__content">
          ${NOTHING_FOUND}
        </div>
      `));
    }
  }
}
