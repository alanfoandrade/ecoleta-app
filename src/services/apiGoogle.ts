import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCrcTIDgo7GRhc0kUe0CyNbt-LyFXx5ndA',
});

export default api;
