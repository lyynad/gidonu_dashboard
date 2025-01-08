import { useState } from "react";

const useLoadingState = () => {
  const [loading, setLoading] = useState(false);
  return { loading, setLoading };
};

export default useLoadingState;
