"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { useEffect, useState } from "react"
import axios from "axios"

export function CreateTodo({ editData }) {
    const [nodeCreate, setNodeCreate] = useState({
        title: "",
        content: "",
        isCommplete: false
    })
    useEffect(() => {
        if (editData) {
            setNodeCreate({
                title: editData.title || "",
                content: editData.content || "",
                isCommplete: editData.isCommplete || Boolean(editData.isCommplete)
            })
        }
    }, [editData])

    const [loading, setLoading] = useState(false)
    const onsubmit = async () => {
        if (editData?.isEdit) {
            try {
                setLoading(true)
                const response = await axios.put(`/api/update/${editData._id}`, nodeCreate)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                const response = await axios.post("/api/create", nodeCreate)
                // console.log(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
                setNodeCreate({
                    title: "",
                    content: "",
                    isCommplete: false
                })
            }
        }
    }
    return (
        <div className="flex my-12 items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>
                        {editData?.isEdit ? "Edit Todo" : "Create a new Todo"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Task title"
                                    value={nodeCreate.title}
                                    onChange={(e) =>
                                        setNodeCreate({ ...nodeCreate, title: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="description">Description</Label>
                                </div>
                                <Textarea id="description" placeholder="Task description" value={nodeCreate.content} onChange={(e) => setNodeCreate({ ...nodeCreate, content: e.target.value })} required />
                            </div>
                            <div className="grid gap-2">
                                <Label className="hover:bg-accent/50 flex items-start cursor-pointer gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                    <Checkbox
                                        id="toggle-2"
                                        checked={nodeCreate.isCommplete}
                                        onCheckedChange={(checked) =>
                                            setNodeCreate({ ...nodeCreate, isCommplete: checked })
                                        }
                                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    />
                                    <div className="grid gap-1.5 font-normal">
                                        <p className="text-sm leading-none font-medium">
                                            is Completed
                                        </p>
                                    </div>
                                </Label>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    {editData?.isEdit ? <Button onClick={onsubmit} className="w-full cursor-pointer" disabled={loading}>
                        {loading ? "Updating..." : "Update Todo"}
                    </Button> : <Button onClick={onsubmit} className="w-full cursor-pointer" disabled={loading}>
                        {loading ? "Creating..." : "Create Todo"}
                    </Button>}
                </CardFooter>
            </Card>
        </div>
    )
}
