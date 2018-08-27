import htmlToElement from 'html-to-element';


const ResultListItem = ({ appstoreName, siteId, locationId }) => {
  const element = htmlToElement(`
    <div class="accordion__item">
      <div class="ListItem ListItem--clickable ListItem__Image">
        <div class="ListItem__head">
          <div class="ListItem__Image" style="background-image: url(https://sub60.tobit.com/l/${locationId})"></div>
          <div class="ListItem__Title">
            <div class="ListItem__Title--headline">${appstoreName}</div>
            <div class="ListItem__Title--description">${siteId}</div>
         </div>
        </div>
      </div>
    </div>
  `);

  element.addEventListener('click', () => chayns.openUrlInBrowser(`https://chayns.net/${siteId}`));
  return element;
};

export default ResultListItem;
