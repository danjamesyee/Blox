import axios from 'axios';

export default searchRequest = query => (
  axios.get('/api/search/', { query })
);