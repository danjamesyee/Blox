import {connect} from 'react-redux';
import Search from './search';

import {
  fetchSearch
} from '../../actions/search_actions';

const MSP = (state, ownProps) => ({
  users: state.users,
  tracks: state.tracks
});

const MDP = (dispatch) => ({
  fetchSearch: searchField => dispatch(fetchSearch(searchField))
});

export default connect(MSP, MDP)(Search);