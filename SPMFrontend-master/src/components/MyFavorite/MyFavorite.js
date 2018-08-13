/**
 * @file SPM MyFavorite.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import './MyFavorite.scss';

class MyFavorite extends React.Component {
  render() {
    return (
      <div className="box" >
        <ul className="box-headings">
          <li className="box-heading active">
            <div className="box-icon box-icon--first">
              <svg className="landing-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.06 43.22"><polygon points="22.53 1.5 29.34 14.31 43.56 16.86 33.54 27.33 35.53 41.72 22.53 35.38 9.53 41.72 11.52 27.33 1.5 16.86 15.72 14.31 22.53 1.5 22.53 1.5" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" /></svg>
            </div>
            <h2 className="box-title">{this.props.translate('MyFavorites')}</h2>
            <div className="box-icons">
              <div className="box-icon">
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.54 40.22"><path d="M24,13a8.16,8.16,0,0,0-3.76-.93,8,8,0,0,0-7.14,4.28,7.92,7.92,0,0,0-.56,6.08,8,8,0,0,0,4,4.77,8.19,8.19,0,0,0,3.76.93,8,8,0,0,0,7.14-4.28A7.92,7.92,0,0,0,28,17.78,8,8,0,0,0,24,13Zm1.53,9.84a6,6,0,0,1-10.93-1A5.76,5.76,0,0,1,15,17.38a6,6,0,0,1,10.93,1A5.76,5.76,0,0,1,25.53,22.84ZM23,40.22l-1.6-3.4a17,17,0,0,1-5.1-.47l-2.17,3L7.84,36.15l1.29-3.52a16.69,16.69,0,0,1-3.28-3.9l-3.72.62L0,22.66l3.42-1.57a16.4,16.4,0,0,1,.45-5L.78,13.9,4,7.7,7.6,9A16.53,16.53,0,0,1,11.5,5.76l-.65-3.69L17.58,0l1.6,3.4a16.9,16.9,0,0,1,5.1.47l2.17-3L32.7,4.07,31.41,7.59a16.7,16.7,0,0,1,3.28,3.9l3.72-.62,2.12,6.69-3.42,1.57a16.41,16.41,0,0,1-.45,5l3.09,2.17-3.27,6.2-3.55-1.29A16.53,16.53,0,0,1,29,34.46l.65,3.69Zm-.34-5.63,1.45,3.08,3.22-1-.59-3.34.67-.36a14.49,14.49,0,0,0,4.42-3.65l.47-.58,3.22,1.17L37,27l-2.8-2,.22-.73A14.33,14.33,0,0,0,35,18.6l-.08-.76L38,16.42l-1-3.18-3.38.56-.36-.65a14.64,14.64,0,0,0-3.71-4.4l-.59-.47L30.1,5.09l-3-1.56-2,2.77-.71-.21a14.87,14.87,0,0,0-5.76-.53l-.74.08L16.46,2.55l-3.22,1,.59,3.35-.67.36a14.48,14.48,0,0,0-4.42,3.65l-.47.58L5,10.3,3.5,13.24l2.8,2-.22.73a14.33,14.33,0,0,0-.51,5.69l.08.76L2.56,23.8l1,3.18,3.38-.56.36.65A14.65,14.65,0,0,0,11,31.47l.59.47-1.17,3.19,3,1.56,2-2.77.71.21a14.91,14.91,0,0,0,5.76.53Z" fill="#f4f7fa" /></svg>
                </a>
              </div>
              <div className="box-icon">
                <a title="Help">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div className="box-tab active">

          <ul className="list-favorites">
            <li>
              <a>My Favorites</a>
            </li>
            <li>
              <a>My Favorites</a>
            </li>
            <li>
              <a>My Favorites</a>
            </li>
            <li>
              <a>My Favorites</a>
            </li>
            <li>
              <a>My Favorites</a>
            </li>
            <li>
              <a>My Favorites</a>
            </li>
          </ul>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code };
}

export default connect(mapStateToProps)(MyFavorite);
