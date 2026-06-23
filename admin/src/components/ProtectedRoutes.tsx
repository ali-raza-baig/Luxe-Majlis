import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const [ok, setOk] = useState(false)
    const [loading, setLoading] = useState(true) // Add loading state

    const isVerified = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/auth/verify`, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (data.success) {
                setOk(true)
            }
        } catch (error) {
            console.log(error)
            setOk(false)
        } finally {
            setLoading(false) // Always set loading to false when done
        }
    }

    useEffect(() => {
        isVerified()
    }, [])

    // Show loading state while verifying
    if (loading) {
        return <div>Loading...</div> // Or a spinner component
    }

    // Redirect only after verification is complete
    if (!ok) {
        return <Navigate to={'/login'} replace />
    }

    return <Outlet />
}

export default ProtectedRoutes