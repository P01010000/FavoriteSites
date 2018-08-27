import htmlToElement from 'html-to-element';
import Login from '../../utils/login';
import './formular.scss';

export default class Formular {
  async handleSubmit(ev) {
    ev.preventDefault();
    try {
      await Login();
      await chayns.intercom.sendMessageToPage({ text: [...new FormData(ev.target).entries()].map(([k, v]) => `${k} = ${v}`).join('\n') });
      chayns.dialog.alert("Site wird in Kürze hinzugefügt");
    } catch (err) {
      chayns.dialog.alert('Du musst dich vorher einloggen');
    }
  }

  html() {
    const element = htmlToElement(`
      <div class="accordion" data-group="site" id="request">
          <div class="accordion__head">Site hinzufügen
              <div class="badge right">
                  <i class="fa fa-plus"></i>
              </div>
          </div>
          <div class="accordion__body">
              <form id="requestTapp">
                  <div class="grid">
                      <div class="grid__item col-1-1-desktop col-1-1-mobile">
                          <input class="input" name="name" type="text" placeholder="Name" required="">
                      </div>
                      <div class="grid__item col-1-1-desktop col-1-1-mobile">
                          <input class="input" name="address" type="text" placeholder="Adresse" required="">
                      </div>
                      <div class="grid__item col-1-2-desktop col-1-1-mobile">
                          <input class="input" name="zip" type="text" placeholder="PLZ" required="">
                      </div>
                      <div class="grid__item col-1-2-desktop col-1-1-mobile">
                          <input class="input"name="place" type="text" placeholder="Ort" required="">
                      </div>
                      <div class="grid__item col-1-1-desktop col-1-1-mobile">
                          <input class="input" name="email" type="email" placeholder="E-Mail" required="">
                      </div>
                      <div class="grid__item col-1-1-desktop col-1-1-mobile">
                          <textarea class="input" name="comment" type="text" placeholder="Kommentar" rows="1" style="height: 33px; overflow: hidden;"></textarea>
                      </div>
                      <div class="grid__item col-1-1-desktop col-1-1-mobile" style="text-align: center; margin: 15px 0;">
                          <input type="submit" class="button" value="Hinzufügen">
                      </div>
                  </div>
              </form>
          </div>
      </div>
      `);
    element.querySelector('form').onsubmit = this.handleSubmit.bind(this);
    return element;
  }
}
