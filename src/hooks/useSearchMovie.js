import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../utils/api";

const fetchSearchMovie = (keyword, page) => {
  
    return keyword ? api.get(`/3/search/movie?query=${keyword}&page=${page}`) : api.get(`/3/movie/popular?language=en-US&page=1&page=${page}`)
}

export const useSearchMovieQuery = ({ keyword, page, UD,genId }) => {
    
    return useQuery({
        queryKey: ['movie-search', keyword, page],
        queryFn: () => fetchSearchMovie(keyword, page),
        retry:3,
        
        select: (result) => {
            let copy = [...result.data.results];
            let copy2=[]
            if(genId!=0){
               copy.map((item)=>{
                item.genre_ids.map((genid)=>{
                    if(genid==genId){
                        copy2.push(item)
                    }
                })
               })
               copy=[...copy2]
               if (UD == 'Down') {
                copy = copy.sort((a, b) => {
                    return a.popularity - b.popularity
                })
                result.data.results=copy
                return result.data
            }
            else {
               copy = copy = copy.sort((a,b)=>{
                    return b.popularity-a.popularity
                })
                result.data.results=copy
                return result.data
            }
            }
            else {
                
                if (UD == 'Down') {
                    copy = copy.sort((a, b) => {
                        return a.popularity - b.popularity
                    })
                    result.data.results=copy
                    return result.data
                }
                else {
                   copy = copy = copy.sort((a,b)=>{
                        return b.popularity-a.popularity
                    })
                    result.data.results=copy
                    return result.data
                }
                
            }
          
        }
    })
}