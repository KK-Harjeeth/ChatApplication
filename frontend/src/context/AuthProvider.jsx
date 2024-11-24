import React, { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'
export const AuthContext = createContext();
export default function AuthProvider({children}) {
    const initialUserState = Cookies.get("jwt");
    console.log(initialUserState);
    // parse the user data and storing in the state
    // const [authUser, setAuthUser] = useState(initialUserState?JSON.parse(initialUserState):undefined);
    const [authUser, setAuthUser] = useState(undefined);
  return (
    <>
      <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export const useAuth=()=> useContext(AuthContext)
