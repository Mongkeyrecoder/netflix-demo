import axios from "axios";
   const api = axios.create({
    baseURL: 'https://api.themoviedb.org',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjgwNGE2NTBiZmU2MTg5NTJmOWU1Y2RmODU2YmI1NCIsIm5iZiI6MTY4NTQ1MjQxOC42NjgsInN1YiI6IjY0NzVmNjgyNjc0M2ZhMDBkZjg2YjVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QJ-Nx2L_QPjUnx8nMuH99wWNMeh3ZSQzmFrm4k3p4RM',
        Accept:'application/json'
    }
})
export default api