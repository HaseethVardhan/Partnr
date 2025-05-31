import React, { createContext, useState, useEffect } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {

    const [user, setuser] = useState({})

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setuser(JSON.parse(user))
        }
    }, [])

  return (
    <div>
        <UserDataContext.Provider value={{user, setuser}}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext