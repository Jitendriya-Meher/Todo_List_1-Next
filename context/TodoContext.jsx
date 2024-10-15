"use client";

import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

const TodoContextProvider = (props) => {

    const [todos, setTodos] = useState([]);

    const addTodo = (data) => {

        const todo = {
            ...data,
            id : Date.now(),
            isCompleted : false
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        localStorage.setItem("nextTodos", JSON.stringify(newTodos));

    }

    const delTodo = (id) => {

        const newTodos = todos.filter((item) => (item.id !== id));

        setTodos(newTodos);
        localStorage.setItem("nextTodos", JSON.stringify(newTodos));
        
    }

    const compTodo = (id) => {

        const newTodos = todos.map((item) => {
            if( item.id === id ){
                return {...item, isCompleted : !item.isCompleted};
            }
            else{
                return item;
            }
        });

        setTodos(newTodos);
        localStorage.setItem("nextTodos", JSON.stringify(newTodos));

    }

    useEffect(() => {

        const nextTodo = localStorage.getItem("nextTodos") ? JSON.parse(localStorage.getItem("nextTodos")) : [];
        setTodos(nextTodo);

    },[]);

    const value = {
        todos,
        addTodo,
        delTodo,
        compTodo
    }

    return (
        <TodoContext.Provider value={value}>
            {props.children}
        </TodoContext.Provider>
    )

}

export default TodoContextProvider;