import {connect} from 'react-redux';
import Search from './search';

import {
  fetchSearch,
  clearSearch
} from '../../actions/search_actions';

const MSP = (state, ownProps) => ({
  users: Object.values(state.users),
  tracks: Object.values(state.tracks)
});

const MDP = (dispatch) => ({
  fetchSearch: searchField => dispatch(fetchSearch(searchField)),
  clearSearch: () => dispatch(clearSearch())
});

export default connect(MSP, MDP)(Search);