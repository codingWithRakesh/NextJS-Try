import React from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useUser } from '@/contexts/userContext'
import { usePathname } from "next/navigation"

const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isEditPage = pathname.startsWith("/edit/");
    const { user, setUser } = useUser()
    const handleLogout = async () => {
        try {
            await axios.get('/api/logout', { withCredentials: true });
            await setUser({
                user: null,
                isAuthenticated: false
            });
            router.push('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
  return (
    <div className={`w-[60%] p-4 flex items-center justify-${isEditPage ? "between" : "end"} border rounded-2xl`}>
        {isEditPage && <Button className={"cursor-pointer"} onClick={() => router.back()}>Back</Button>}
        <Button className={"cursor-pointer"} onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default NavBar