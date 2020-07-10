import axios from 'axios';

export const searchRequest = query => (
  axios.get('/api/search/', { query })
);