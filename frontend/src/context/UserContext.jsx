import React, { createContext, useState, useEffect } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {

    const [user, setuser] = useState({})
    const [cards, setCards] = useState([])

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setuser(JSON.parse(user))
        }
    }, [])

  return (
    <div>
        <UserDataContext.Provider value={{user, setuser, cards, setCards}}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext