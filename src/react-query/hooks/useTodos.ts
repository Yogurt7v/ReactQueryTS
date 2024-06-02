import { useQuery } from "@tanstack/react-query";
import axios from "axios"

interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }

const useTodos = () => {
    const todoFetch = () => 
        axios
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        .then((res) => res.data)

        return useQuery<Todo[], Error>({
            queryKey: ['todos'],
            queryFn: () => todoFetch(),
            staleTime: 1000 * 60 * 5,
    })
}


export default useTodos