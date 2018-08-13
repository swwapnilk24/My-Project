import React from 'react';
import Dropzone from 'react-dropzone';

class MarksTranscripts extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      uploadedFiles: []
    };
  }
  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({ uploadedFiles: acceptedFiles }, () => {
      console.log(this.state.uploadedFiles, acceptedFiles, rejectedFiles);
    });
  }
  close() {
    this.props.close();
  }
  addDocName(index) {
    const newUploadedFiles = [...this.state.uploadedFiles];
    newUploadedFiles[index].docName = document.getElementById(`docName${index}`).value;
    newUploadedFiles[index].status = 'Pending for approval';
    this.setState({ uploadedFiles: newUploadedFiles }, () => {
      console.log(this.state.uploadedFiles);
    });
  }
  submit() {
    this.props.submit(this.state.uploadedFiles);
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          Marksheets/ Transcripts
          <button type="button" onClick={this.close} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="marksAndTranscripts">
            <div>
              <label className="custom-label" htmlFor="sheetType">Sheet type</label>
              <select className="custom-select" name="sheetType">
                <option value="" disabled selected>Select</option>
                <option value="Marksheets">Marksheets</option>
                <option value="Marksheets">Transcripts</option>
              </select>
            </div>
            <div>
              <Dropzone
                className="dropzone"
                multiple
                onDrop={(acceptedFiles, rejectedFiles) => this.onDrop(acceptedFiles, rejectedFiles)}
              >
                {this.props.formType === 'add' ?
                  <p>Drop files/Click here to upload one or more documents.</p> :
                  <p>Drop a new file to replace the old one.</p>
                }
              </Dropzone>
            </div>
            <div>
              {
                this.state.uploadedFiles.length > 0 ?
                  this.state.uploadedFiles.map((file, index) =>
                    <div>
                      <label className="custom-label">{file.name}</label>
                      <input type="text" id={`docName${index}`} className="entry-input" placeholder="Enter a title for the above document" onBlur={() => this.addDocName(index)} />
                    </div>
                ) :
                  'No files uploaded yet'
              }
            </div>
            <div>
              <input type="button" name="Submit" onClick={this.submit} value="Submit" className="form-control btn-primary custom-submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MarksTranscripts;
