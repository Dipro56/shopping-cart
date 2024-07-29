import { useGetCurrentUserQuery } from '@/redux/api/user/userApiSlice';
import { useState, useEffect, useCallback } from 'react';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const { data, error, isLoading, refetch } = useGetCurrentUserQuery();

  useEffect(() => {
    if (data) {
      setUser(data);
    } 
  }, [data]);


  const revalidate = useCallback(() => {
    refetch();
  }, [refetch]);

  return { user, error, isLoading, revalidate };
}
