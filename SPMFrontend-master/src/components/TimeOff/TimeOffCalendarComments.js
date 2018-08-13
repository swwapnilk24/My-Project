import React from 'react';
import './TimeOff.scss';

class TimeOffCalendarComments extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }
  close() {
    this.props.close();
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          Comments
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {
          this.props.data.map(comment =>
            <div className="card-footer no-border-top">
              <div className="chatBubbleWrap">
                {
                  comment.comment !== '' ?
                    <div>
                      <div className={comment.role !== 'Manager' ? 'userName txt-align-right' : 'userName'}>{comment.role}: </div>
                      <div className={comment.role === 'Manager' ? 'inChatBubble' : 'outChatBubble'}>{comment.comment}</div>
                    </div>
                      :
                        'No comments to display'
                }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default TimeOffCalendarComments;
