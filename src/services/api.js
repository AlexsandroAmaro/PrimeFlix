//https://api.themoviedb.org/3/movie/now_playing?api_key=99b0972e25c630604ec2bb107b22bbcb&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;