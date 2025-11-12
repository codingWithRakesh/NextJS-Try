"use client"

import { CreateTodo } from '@/components/createTodo'
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import axios from 'axios';

const page = () => {
    const { todoID } = useParams();
    const [todo, setTodo] = useState({})

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`/api/findById/${todoID}`);
                // console.log("Fetched todo:", response.data.data);
                setTodo({...response.data.data, isEdit : true});
            } catch (error) {
                console.error("Error fetching todo:", error);
            }
        }
        fetchTodo();
    }, [])
    

    return (
        <div className="flex flex-col min-h-screen">
            <CreateTodo editData={todo} />

        </div>
    )
}

export default page