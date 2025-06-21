import React, { createContext, useState, useEffect } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {

    const [user, setuser] = useState({})
    const [cards, setCards] = useState([])
    const [shouldRefetch, setShouldRefetch] = useState(true);
    const [tempExcludedIds, setTempExcludedIds] = useState([]);


    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setuser(JSON.parse(user))
        }
    }, [])

  return (
    <div>
        <UserDataContext.Provider value={{user, setuser, cards, setCards, shouldRefetch, setShouldRefetch, tempExcludedIds, setTempExcludedIds}}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext