/**
 * @file SPM ChatBot.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import { setActiveLanguage, getTranslate, getActiveLanguage } from 'react-localize-redux';
import { sendChat } from '../../actions/ChatBotAction';
import './ChatBot.scss';

class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatbotText: ''
    };
    this.closeChat = this.closeChat.bind(this);
    this.minimizeChat = this.minimizeChat.bind(this);
    this.chatbotTextChange = this.chatbotTextChange.bind(this);
    this.chatbotKeyKeyEnter = this.chatbotKeyKeyEnter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    setTimeout(() => {
      const div = document.getElementById('chatboxContent');
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }, 50);
    if (nextProps.ChatBot.setLang !== this.props.ChatBot.setLang) {
      if (nextProps.ChatBot.setLang !== '') {
        this.props.dispatch(setActiveLanguage(nextProps.ChatBot.setLang));
      }
    }
  }

  chatbotTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  chatbotKeyKeyEnter(event) {
    if (event.nativeEvent.keyCode === 13 || !event.nativeEvent.keyCode) {
      const chatHistory = this.props.ChatBot.chatbotHistory;
      if (event.target.value.trim() !== '') { chatHistory.push({ message: event.target.value, inChat: true }); }
      this.setState({
        chatbotText: ''
      });
      this
      .props
      .dispatch(sendChat(chatHistory, event.target.value));
    }
  }

  closeChat() {
    const x = document.getElementById('chatBox');
    x.style.display = 'none';
  }
  minimizeChat() {
    const x = document.getElementById('chatboxContent');
    x.classList.toggle('display');
  }

  render() {
    const chatHistory = this.props.ChatBot.chatbotHistory.map((item, i) => (
      <div>
        <Col key={i} lg={11} md={11} sm={11} className={item.inChat ? 'outChatBubble' : 'inChatBubble'}>
          {item.message}
        </Col>
        <br className="spacer" />
      </div>
      ));

    return (
      <div className="ChatBox" id="chatBox">
        <div className="chatHeader">
          <Col xs={2} md={2} className="no-padding chatIcon">
            <img src="/assets/images/icons/ico-comments.svg" alt="" />
          </Col>
          <Col xs={9} md={9} className="no-padding">
            <h1>Chatbot</h1>
          </Col>
          <div className="minimizeButton" onClick={() => this.minimizeChat()}>
            <img src="/assets/images/icons/icon-remove.svg" alt="" />
          </div>
          <div className="box-icon box-icon--close js-box-close" data-checkbox="compare-02" onClick={() => this.closeChat()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.75 27.75">
              <title>icon-close</title>
              <path
                d="M.54,3.44l3-3L13.9,10.79,24.69,0l3.06,3.06L17,13.85,27.48,24.37l-3,3L14,16.85,3.06,27.75,0,24.69l10.9-10.9Z"
                fill="#bdccd4"
              />
            </svg>
          </div>
        </div>
        <div className="chatboxContent" id="chatboxContent">
          {chatHistory}
        </div>
        <div className="chatTextboxWrap">
          <input type="text" name="chatbotText" placeholder="Your Message" onKeyUp={this.chatbotKeyKeyEnter} onChange={this.chatbotTextChange} value={this.state.chatbotText} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
    ChatBot: state.chatbot };
}

export default connect(mapStateToProps)(ChatBot);
