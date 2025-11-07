"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
import { useUser } from "@/contexts/userContext"

const page = () => {
  const [loginDetails, setLoginDetails] = useState({
    email : "",
    password : ""
  })
  const [loading, setLoading] = useState(false)
  const { user, setUser } = useUser()
  const router = useRouter();
  const handleLoginRedirect = () => {
    router.push('/register');
  }
  const onsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/login", loginDetails);
      setUser({
        user : response.data.data.user,
        isAuthenticated: true
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardAction>
            <Button variant="link" onClick={handleLoginRedirect} className={"cursor-pointer"}>Sign Up</Button>
          </CardAction>
        </CardHeader>
        <form onSubmit={onsubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={loginDetails.email}
                  onChange={(e) =>
                    setLoginDetails({ ...loginDetails, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2 mb-8">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required value={loginDetails.password} onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                } />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full cursor-pointer">
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default page