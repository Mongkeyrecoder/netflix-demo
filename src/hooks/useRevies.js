import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchApi=(id)=>{
    return api.get(`/3/movie/${id}/reviews`)
}

export const useReviewsQuery=(id)=>{
    return useQuery({
        queryKey:['reveiws'],
        queryFn:()=>fetchApi(id),
        retry:3,
        staleTime:6000,
        
    })
}