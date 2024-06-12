import { useQuery, keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostQuery {
    page?: number,
    pageSize?: number,
}



const usePosts = (query: PostQuery) => useQuery<Post[], Error>({
    queryKey: ['posts', query],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/posts',
        {
            params: {
                _start: (query.page - 1) * query.pageSize,
                _limit: query.pageSize
            }
        })
        .then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined
    },
    initialPageParam: 1
});


export default usePosts