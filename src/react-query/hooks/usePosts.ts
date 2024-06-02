import { useQuery, keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

interface PostQuery {
    pageSize: number,
}

const usePosts = (query: PostQuery) => 
    useInfiniteQuery<Post[], Error>({
        
        queryKey: ['posts', query],
        queryFn: ({pageParam = 1}) => axios
        .get('https://jsonplaceholder.typicode.com/posts', 
        { params: {
            _start: (pageParam - 1) * query.pageSize, 
            _limit: query.pageSize
        } })
        .then((res) => res.data),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length >0 ?pages.length+1 : undefined
        }
    });


export default usePosts