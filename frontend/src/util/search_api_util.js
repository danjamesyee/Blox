import axios from 'axios';

export const searchRequest = search => (
  axios.get(`/api/search/?`, { params: {search} })
);