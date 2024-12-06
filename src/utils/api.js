import axios from "axios";

const API_KEY=process.env.REACT_APP_API_KEY;

   const api = axios.create({
    baseURL: 'https://api.themoviedb.org',
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept:'application/json'
    }
})
export default api