import React from 'react';

export default class CreateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
      buttons: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  // componentDidMount() {
  // }

  handleChange(e){
    this.setState({text: e.currentTarget.value, buttons: true });
  }

  // if create set back to empty, if edit return back to original comment
  handleCancel(e){
    e.preventDefault();
    this.setState({ text: '', buttons: false });
  }

  handleComment (e) {
    e.preventDefault();
    const data = { text: this.state.text , trackId: this.props.trackId }
    this.props.createComment(data)
    .then(() => this.setState({ text: '', buttons: false }))
    .then(() => this.props.fetchTrackComments(this.props.trackId));

  }

  render() {
    let buttons;
    if (this.state.buttons) {
      buttons = <div>
        <button onClick={this.handleCancel}>Cancel</button>
        <button onClick={this.handleComment}>Comment</button>
      </div>
    }

    return (
      <form className='create-comment-form'>
        <input 
          type="text"
          placeholder="Add a comment..."
          value={this.state.text}
          onChange={this.handleChange}
        />

        {buttons}
        
      </form>
    )
  }
}