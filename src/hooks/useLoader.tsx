import React, { useState } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLoading = () => {
    setIsLoading(!isLoading);
  };
  return {
    isLoading,
    handleLoading,
  };
};

export default useLoader;
