import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const [ isValidToken, setIsValidToken ] = useState( () => user ? true : false)

  useEffect(() => {
    let fiveMinutes = 1000 * 60 * 5;
    let interval = setInterval(() => {
      if (token) {
        updateToken()
      }
    }, fiveMinutes)

    return () => clearInterval(interval)
  }, [token])

  const navigate = useNavigate()

  const validateToken = async (user) => {
    try {
      const response = await fetch(`https://back.iqbot.live/api/detail-user/${user?.id}/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setUser(data)
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const login = async (username, password) => {
    // Call API to verify login credentials
    const response = await fetch("https://back.iqbot.live/auth/token/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    // .then((response) => response.json())
    // .then((result) => {
    //   setUser(result);
    //   navigate("/dashboard")
    //   return true;
    // })
    // .catch((error) => {return false});
    
    if (response.status === 200) {
      const data = await response.json();
      setToken(data);
      const result = await validateToken(data);
      if (result) {
        setIsValidToken(true)
        return data;
      }
    }
    return false;
  };

  const logout = () => {
    setIsValidToken(false)
    setToken(null);
    setUser(null);
    navigate("/")
  };

  const updateToken = async () => {
    console.info("Updating token")
    // const response = await fetch("https://back.iqbot.live/auth/token/", {
    //   method: "POST",
    //   body: JSON.stringify({ refreshToken:token?.refreshToken }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    // if(response.status === 200) {
    //   let data = await response.json()
    //   setToken(data);
    //   const result = await validateToken(data);
    //   if (result) {
    //     setIsValidToken(true)
    //     navigate("/dashboard")
    //     return true;
    //   }
    //   logout()
    // } else {
    //   logout()
    // }
  }

  return (
    <AuthContext.Provider value={{ token, isValidToken, user, login, logout, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
}