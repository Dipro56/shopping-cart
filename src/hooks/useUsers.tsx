// hooks/useCurrentUser.ts
import { useGetCurrentUserQuery } from '@/lib/slices/userApiSlice'
import { useState, useEffect, useCallback } from 'react'


export function useUser() {
    const [user, setUser] = useState<User | null>(null)
    const { data, error, isLoading, refetch } = useGetCurrentUserQuery(undefined, {
        refetchOnMountOrArgChange: true, // This will refetch when the component mounts or query args change
    })

    // console.log('error', error)

    useEffect(() => {
        if (data) {
            setUser(data)
        } else {
            // console.log("error", error)
        }
    }, [data])

    // Revalidate function
    const revalidate = useCallback(() => {
        refetch()
    }, [refetch])

    return { user, error, isLoading, revalidate }
}