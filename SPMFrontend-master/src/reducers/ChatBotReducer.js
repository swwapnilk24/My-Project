import { ChatBotType, ErrorType } from '../actions/ActionType';

const initialState = {
  chatbotHistory: [],
  message: null,
  setLang: ''
};

export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case ChatBotType.INCHAT: {
      st = {
        ...state,
        chatbotHistory: action.chatHistory
      };

      break;
    }

    case ChatBotType.SETLANG: {
      st = {
        ...state,
        setLang: action.setLang
      };

      break;
    }

    case ErrorType.ERROR_LOG: {
      st = {
        ...state,
        message: action.message
      };
      break;
    }

    default: {
      return st;
    }
  }
  return st;
}
