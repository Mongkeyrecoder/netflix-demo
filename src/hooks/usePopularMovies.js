import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies=()=>{
    return api.get('/3/movie/popular?language=en-US&page=1')
}

export const usePopularMoviesQuery=()=>{
    return useQuery({
        queryKey:['movie-popular'],
        queryFn:fetchPopularMovies,
        retry:3,
        staleTime:6000,
        select:(result)=>result.data
    })
}