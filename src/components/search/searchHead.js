import htmlToElement from 'html-to-element';
import { OVERVIEW, SEARCH } from '../../constants/texts';


export default class SearchHead {
  constructor(placeholder, callback) {
    this.placeholder = placeholder || SEARCH;
    this.timeout = undefined;
    this.callback = callback;
  }

  handleChange(ev) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.callback(ev.target.value), 400);
  }

  set onChange(callback) {
    this.callback = callback;
  }

  render() {
    const element = htmlToElement(`
      <div class="accordion__head search">
        <div class="accordion--trigger accordion__head--search--wrapper">
          <div class="accordion--trigger accordion__head--search">
            ${OVERVIEW}
          </div>
        </div>
        <div class="Suche Suche--accordion chayns__border-color--50">
          <input type="text" placeholder="${this.placeholder}" value="">
          <label><i class="fa fa-search"></i></label>
        </div>
      </div>
    `);

    element.querySelector('input').addEventListener('keyup', this.handleChange.bind(this));
    return element;
  }
}
