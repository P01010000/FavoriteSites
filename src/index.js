/* eslint-disable no-console */

import Formular from './components/formular/formular';
import SearchContainer from './components/search/searchContainer';

const init = async () => {
    await chayns.ready;

    const root = document.querySelector('.tapp__content');
    const searchContainer = new SearchContainer('chayns', 'Suche', 20);
    root.appendChild(searchContainer.render());
    root.appendChild(new Formular().render());
};

init();
