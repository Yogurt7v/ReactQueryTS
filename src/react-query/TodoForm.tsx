import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface addTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);

  const addTodo = useMutation<Todo, Error, Todo, addTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onMutate: async (newTodo: Todo) => {
      
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);
      ref.current!.value = "";
      return {previousTodos}
    },
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (err, newTodo, context) => {
      if (!context){
        return
      }
      queryClient.setQueryData<Todo[]>(["todos"], context?.previousTodos);
    },
  });

  return (
    <>
      {addTodo.error ? (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      ) : null}
      <form
        className="row mb-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current && ref.current.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current!.value,
              completed: false,
              userId: 1,
            });
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addTodo.isPending}>
            {addTodo.isPending ? "Adding..." : "Add Todo"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
