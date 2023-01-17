import axios from 'axios';
import { KEY, BASE_URL } from 'constants/themoviedb';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: KEY,
};

const themoviedbApi = axios.create();

export default themoviedbApi;
