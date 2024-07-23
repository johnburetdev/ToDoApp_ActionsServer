"use client";
import toast from "react-hot-toast";
import { useRef } from "react";
import { createTodo } from "../actions/todo.actions";
import ButtonForm from "./button-form.todo";

const FormTodo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string;

    if (!title || !title.trim()) {
      return toast.error("El titulo es obligatorio");
    }

    const res = await createTodo(title);

    if (res?.error) {
      return toast.error(res.error);
    }
    formRef.current?.reset();

    toast.success("To Do añadido");
  };

  return (
    <div>
      <form ref={formRef} action={handleSubmit} className="flex">
        <input
          type="text"
          name="title"
          className="border rounded border-gray-400 mr-2 p-2 w-full"
        ></input>
        <ButtonForm />
      </form>
    </div>
  );
};
export default FormTodo;
