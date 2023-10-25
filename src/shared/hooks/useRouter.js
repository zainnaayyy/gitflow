import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function useRouter() {
  const location = useLocation();
  const previousLocation = useRef(location);

  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  return {
    pathname: location.pathname,
    previousPathname: previousLocation.current.pathname
  };
}

export default useRouter;
