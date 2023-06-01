import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';
import { AiOutlinePlus } from "react-icons/ai";
import "./addList.css";

const AddList = () => {
    const { setIsToggle } = useContext(AuthContext)
    return (
        <div>
            <div className='pluse__icon__with__txt' onClick={() => setIsToggle(true)}>
                <AiOutlinePlus />
                <span>Add a List</span>
            </div>
        </div>
    )
}

export default AddList