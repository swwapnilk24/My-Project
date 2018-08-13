import React, { Component } from 'react';
// import Modal from 'react-modal';
import Modal from 'react-responsive-modal';

class CustomModal extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    // this.close = this.close.bind(this);
    // this.submit = this.submit.bind(this);
    // this.state = {
    //   showing: true
    // };
  }
  // close() {
  //   this.props.close();
  // }
  // submit(data) {
  //   this.props.callMe(data);
  // }
  // toggle() {
  //   this.setState({ showing: true });
  // }
  render() {
    return (
      <div>
        <Modal
          open={this.props.show}
        >
          {this.props.Form}
        </Modal>
      </div>
    );
  }
}
export default CustomModal;
