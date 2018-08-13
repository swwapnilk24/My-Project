import { hashHistory } from 'react-router';


// export function setlang(lang) {
//   return function (dispatch) {
//     // dispatch(setActiveLanguage(lang));
//     console.log(lang);
//     dispatch(getActiveLanguage());
//   };
// }

export function chooseLang(data) {
  const respIntent = data;
  const resp = {};
  resp.respChat = 'Please specify a langauge to change like English, German, French, etc..';
  resp.setLang = '';

  if (data.name !== undefined) {
    switch (respIntent.name[0].value) {
      case 'english':
        // store.dispatch(setActiveLanguage('en'));
        resp.setLang = 'en';
        resp.respChat = '';
        break;

      case 'german':
        // store.dispatch(setActiveLanguage('de'));
        resp.setLang = 'de';
        resp.respChat = '';
        break;

      case 'french':
        // store.dispatch(setActiveLanguage('fr'));
        resp.setLang = 'fr';
        resp.respChat = '';
        break;

      default:
        resp.respChat = 'Sorry, the language specified is not supported.';
        break;
    }
  }

  return resp;
}

export function chatResponse(data) {
  const respIntent = data;
  let resp = {};
  resp.setLang = '';
  resp.respChat = 'Sorry i did not understand.';
  if (data.entities.intent !== undefined) {
    switch (respIntent.entities.intent[0].value) {
      case 'greeting':
        resp.respChat = 'Hi, How can i help you.';
        break;

      case 'farewell':
        resp.respChat = 'Good Bye.';
        break;

      case 'company':
        hashHistory.push('CompanyInfo');
        resp.respChat = '';
        break;

      case 'employee':
        hashHistory.push('AddEmployee');
        resp.respChat = '';
        break;

      case 'home':
        hashHistory.push('/');
        resp.respChat = '';
        break;

      case 'language':
        resp = chooseLang(respIntent.entities);
        break;

      default:
        resp.respChat = 'Sorry i did not understand.';
        break;
    }
  }

  return resp;
}

