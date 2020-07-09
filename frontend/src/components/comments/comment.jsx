import React from 'react';
import { Link } from 'react-router-dom';
// import {Image} from 'react-bootstrap';

// Random Color function
function randomColor() {
  const color='rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
  return color;
}

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      edit: false,
      text: props.comment.text
    };
    this.randomColor = randomColor()
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  
  handleEdit (e) {
    e.preventDefault();
    this.setState({ edit: true });
  }

  // event handlers when edit is true
  handleChange(e) {
    e.preventDefault();
    this.setState({ text: e.currentTarget.value })
  }

  // if create set back to empty, if edit return back to original comment
  handleCancel(e) {
    e.preventDefault();
    this.setState({ 
      text: this.props.comment.text,
      edit: false
    })
  }

  handleSave(e) {
    e.preventDefault();
    let comment = this.props.comment;
    comment.text = this.state.text;
    this.props.updateComment(comment)
      .then(() => this.setState({ edit: false }))
      .then(() => this.props.fetchTrackComments(this.props.trackId));
  }

  render(){
    const { comment, destroyComment, currentUser } = this.props;

    let renderButtons;
    if (currentUser.id === comment.user._id) {
      renderButtons = <div className="show-page-comment-buttons">
        <div className="comment-button" onClick={this.handleEdit}>Edit</div>&nbsp;
          <div className="comment-button" onClick={() => destroyComment(comment._id)}>Delete</div>
      </div>
    }

    return !this.state.edit ? (
      <li>
        <div className='profile-pic'>
          <div className= 'circle' style={{backgroundColor: this.randomColor}}></div>
        </div>

        <div className='comment-content'>
          <Link to={`/users/${comment.user._id}`}>{comment.user.handle}</Link>
          <div className="comment-text">
            <p>{comment.text}</p>
          </div>
          {renderButtons}
        </div>
      </li>
    ) : (
      <li>  
        <form className="edit-comment-form">
          <input className="comment-box"
            type="text"
            placeholder="Edit your comment..."
            value={this.state.text}
            onChange={this.handleChange}
          />
          <hr/>
          <div className="show-page-comment-buttons">
            <div className="comment-button" onClick={this.handleCancel}>Cancel</div>&nbsp;
            <div className="comment-button" onClick={this.handleSave}>Save</div>
          </div>
        </form>
      </li>
    );
  }
}