import React, {useState, createContext} from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [code, setCode] = useState(null)

  return (
    <AuthContext.Provider value={{user, setUser, code, setCode}} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext