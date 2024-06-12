import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAddTodo from "./hooks/useAddTodo";


const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useAddTodo(() => ref.current!.value = "")
 

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
