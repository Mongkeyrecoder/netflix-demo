import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const UpcomingMovieApi=()=>{
    return api.get('/3/movie/upcoming?language=en-US&page=1')
}

const useUpcomingMovie=()=>{
    return useQuery({
        queryKey:['upcomingMovie'],
        queryFn:UpcomingMovieApi,
        retry:3,
        staleTime:60000,
        select:(result)=>result.data.results
    })
}
export default useUpcomingMovie