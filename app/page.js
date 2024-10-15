'use client';

import Todo from "@/Components/Todo";
import { TodoContext } from "@/context/TodoContext";
import { useContext, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  // console.log("env var:",process.env.MONGODB_URL);

  const [formData, setFormData] = useState({
    title:"",
    description:""
  });

    const {todos, addTodo, delTodo, compTodo} = useContext(TodoContext);

  const deleteTodo = async (id) => {
    delTodo(id);
    toast.success("Todo Delete Successfully");
  }

  const CompleteTodo = async (id) => {
    compTodo(id);
    toast.success("Todo Completed");
  }

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev, [name]:value,
    }));
  }

  const submitHandler = async (e) => {

    e.preventDefault();
    console.log('data',formData);

    if( formData.title=="" || formData.description=="" ){
      toast.error("please fill all required fields");
      return;
    }

    addTodo(formData);

    setFormData({
      title:"",
      description:""
    });

    toast.success("Todo Added Successfully");
  }

  return (
    <div className="">

    <ToastContainer
      theme="dark"
    />

      <form className=" flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-12 px-2 mx-auto"
      onSubmit={submitHandler}>
        <input
          type="text"
          name="title"
          onChange={onChangeHandler}
          value={formData.title}
          placeholder="Enter Title"
          className=" px-3 py-2 border-2 w-full"
        />

        <textarea
          name="description"
          onChange={onChangeHandler}
          value={formData.description}
          placeholder="Enter Description"
          className=" px-3 py-2 border-2 w-full"
        ></textarea>

        <button
          type="submit"
          className=" bg-orange-600 py-3 px-11 text-white hover:bg-orange-700 rounded-sm"
        >
          Add Todo
        </button>
      </form>

      

<div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            
           {
            todos.map((todo,index) => (
              <Todo key={todo.id} item={todo} index={index} deleteTodo={deleteTodo} CompleteTodo={CompleteTodo}></Todo>
            ))
           }
            
        </tbody>
    </table>
</div>

    </div>
  );
}
