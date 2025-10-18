"use client";

import { CreateTodo } from "@/components/createTodo";
import { Todo } from "@/components/todo";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/all");
        console.log(response.data.data);
        setTodos(response.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();

  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <CreateTodo />
      <div className="w-full flex flex-wrap items-center justify-center gap-4">
        {
          todos?.map((todo) => (
            <div key={todo._id} >
              <Todo todo={todo} />
            </div>
          ))
        }
      </div>
    </div>
  );
}