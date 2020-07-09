import { connect } from 'react-redux';
import Comments from './comments';
import { 
  fetchTrackComments,  
  createComment,
  updateComment,
  destroyComment
} from '../../actions/comments_actions';

const MSTP = (state, ownProps) => ({
  comments: Object.values(state.comments),
  trackId: ownProps.trackId,
});
// trackId is present since we are on the track show page
// pass trackID like this >>> <CommentsContainer trackId={track.id}/>

const MDTP = dispatch => ({
  fetchTrackComments: (trackId) => dispatch(fetchTrackComments(trackId)),
  destroyComment: (commentId) => dispatch(destroyComment(commentId)),
  createComment: (comment) => dispatch(createComment(comment)),
  updateComment: (comment) => dispatch(updateComment(comment)),
});

export default connect(MSTP, MDTP)(Comments);