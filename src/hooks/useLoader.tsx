import React, { useState } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);


  const handleStartLoading = () => {
    setIsLoading(true);
  };

  const handleStopLoading = () => {
    setIsLoading(false);
  };
  return {
    isLoading,
    handleStartLoading,
    handleStopLoading
  };
};

export default useLoader;
