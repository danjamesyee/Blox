import React from 'react';
import Comment from './comment';
import CreateComment from './create_comment';

export default class Comments extends React.Component {
  componentDidMount(){
    this.props.fetchTrackComments(this.props.trackId)
  }

  render() {
    const {
      comments,
      currentUser, 
      destroyComment, 
      createComment, 
      updateComment,
      fetchTrackComments,
      trackId
    } = this.props;

    const allComments = comments.map((comment) => 
      <Comment 
        comment={comment} 
        fetchTrackComments={fetchTrackComments}
        trackId={trackId}
        destroyComment={destroyComment}
        updateComment={updateComment} 
        key={comment._id} />
    )
    return (
      <div className='comments'>
        <CreateComment 
          currentUser={currentUser} 
          createComment={createComment} 
          fetchTrackComments={fetchTrackComments}
          trackId={trackId} 
        />
        
        {allComments}
      </div>
    )
  }
  
}