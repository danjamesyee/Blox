import { searchRequest } from '../util/search_api_util';

export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_SEARCH_ERRORS = "RECEIVE_SEARCH_ERRORS"

const receiveSearch = (searchResults) => ({
  type: RECEIVE_SEARCH,
  searchResults
});

const receiveSearchErrors = errors => ({
  type: RECEIVE_SEARCH_ERRORS,
  errors
});

export const fetchSearch = query => dispatch => {
  return searchRequest(query)
    .then(res => dispatch(receiveSearch(res.data)))
    .catch(err => dispatch(receiveSearchErrors(err.response.data)))
};
