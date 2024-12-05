import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchMovieGenre=()=>{
    return api.get('/3/genre/movie/list')
}

export const useMovieGenreQuery=()=>{
    return useQuery({
        queryKey:['movie-genre'],
        queryFn:fetchMovieGenre,
        retry:1,
        select:(result)=>result.data.genres,
        staleTime:3000000
    })
}