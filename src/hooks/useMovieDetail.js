import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchApi=(id)=>{
    
    return api.get(`/3/movie/${id}`)
}

export const useMovieDetailQuery=(id)=>{
    return useQuery({
        queryKey:['detail'],
        queryFn:()=>fetchApi(id),
        retry:1,
        select:(results)=>results.data
    })
}