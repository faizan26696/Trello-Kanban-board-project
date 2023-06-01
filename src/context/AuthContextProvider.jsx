import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const collectionTaskListFromLS = JSON.parse(localStorage.getItem("collectionTaskList")) || []
    const [collectionTaskList, setCollectionTaskList] = useState(collectionTaskListFromLS);
    const [isToggle, setIsToggle] = useState(false)

    const handelAddList = (newObj) => {
        setCollectionTaskList([...collectionTaskList, newObj])
        setIsToggle(true)
    }

    const updatedData = (value, id) =>{
        const updatedData = collectionTaskList.map(taskList=>{
            if(taskList.id === id){
                return value
            }else{
                return taskList
            }
        })
        setCollectionTaskList(updatedData)
    }

    useEffect(() => {
        localStorage.setItem("collectionTaskList", JSON.stringify(collectionTaskList))
    }, [collectionTaskList])

    return (
        <AuthContext.Provider value={{ collectionTaskList, setCollectionTaskList, isToggle, setIsToggle, handelAddList, updatedData }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider