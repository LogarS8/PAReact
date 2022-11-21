import React, {useState, createContext} from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  return (
    <AuthContext.Provider value={{user, setUser, token, setToken}} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext