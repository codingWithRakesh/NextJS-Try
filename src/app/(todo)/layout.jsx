"use client"

import { useUser } from "@/contexts/userContext"
import { useEffect } from "react"
import axios from "axios"
import NavBar from "@/components/navBar"

export default function RootLayout({ children }) {
    const { _, setUser } = useUser()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/currentUser', { withCredentials: true });
                if (response.status === 200) {
                    setUser({
                        user: response.data.data.user,
                        isAuthenticated: true
                    });
                } else {
                    setUser({
                        user: null,
                        isAuthenticated: false
                    });
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser({
                    user: null,
                    isAuthenticated: false
                });
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full flex items-center justify-center mt-4">
                <NavBar />
            </div>
            {children}
        </div>
    )
}