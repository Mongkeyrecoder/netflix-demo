import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchApi=()=>{
    return api.get('/3/movie/top_rated?language=en-US&page=1')
}

const useTopRatedQuery=()=>{
    return useQuery({
        queryKey:['top'],
        queryFn:fetchApi,
        retry:3,
        staleTime:60000,
        select:(result)=>result.data.results
    })
}
export default useTopRatedQuery