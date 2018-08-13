import React from 'react';
import { connect } from 'react-redux';

class ErrorCodeHelp extends React.Component {
  constructor(props) {
    super(props);
    console.log('errorcodehelp', props);
  }
  getErrorCodeDescription(errorCode) {
    let errorDescription = 'no data found';
    this.props.errorCodesData.map((data, index) => {
      if (data.errorDescriptor.errorCode === errorCode) {
        errorDescription = data.errorDescriptor.errorDescription;
      }
      return index;
    });
    return (errorDescription);
  }
  render() {
    return (
      <div>
        Error Code: {this.props.params.article}
        <p>
          {this.getErrorCodeDescription(this.props.params.article)}
        </p>
      </div>
    );
  }
}
function mapErrorCodesToProps(state) {
  console.log('errorCodes', state.masterData.errorCodes);
  return { errorCodes: state.masterData.errorCodes, errorCodesData: state.masterData.errorCodesData };
}
export default connect(mapErrorCodesToProps)(ErrorCodeHelp);
