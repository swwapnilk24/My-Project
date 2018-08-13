import React, { Component } from 'react';
//import Modal from 'react-modal';
import Modal from 'react-responsive-modal';
//import CompensationForm from './componentFormForCompensation';
class CustomModal extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      showing: true
    };
  }
  close() {
    this.props.close();
  }
  submit(data) {
    this.props.callMe(data);
  }
  toggle() {
    this.setState({ showing: true });
  }
  render() {
    // const styles = {
    //   overlay: {
    //     position: 'fixed',
    //     top: 50,
    //     left: 380,
    //     right: 380,
    //     bottom: 50
    //   },
    //   content: {
    //     position: 'absolute',
    //     top: '40px',
    //     left: '40px',
    //     right: '40px',
    //     bottom: '80px',
    //     border: '1px solid #ccc',
    //     background: '#fff',
    //     overflow: 'hidden',
    //     // WebkitOverflowScrolling: 'touch',
    //     borderRadius: '4px',
    //     outline: 'none',
    //     padding: '10px'
    //   }
    // };
    return (
      <div>
        <Modal
          open={this.props.show}
          onClose={false}
        >
          {/* <CompensationForm closeEvent={this.close} submitEvent={this.submit} /> */}
          {this.props.Form}
        </Modal>
      </div>
    );
  }
 }
export default CustomModal;
