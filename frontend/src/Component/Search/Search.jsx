import { Button, Typography } from '@mui/material'
import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../../Actions/User'
import './Search.css'
import Loader from '../Loader/Loader'
import User from '../User/User'
const Search = () => {
    const dispatch = useDispatch()

    const {users,loading} = useSelector((state)=>state.allUsers)

    const [name,setName] = useState("")

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(allUsers(name))
    }

    return (
        loading ? <Loader/> :
        <div className="search">
            <form className="searchForm" onSubmit={submitHandler}>
                <Typography variant = "h4">Facebook</Typography>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className = "updateProfileInputs"
                    placeholder="Enter Name"
                    required
                />
                 <Button type = "submit">Search</Button>

                 <div className="searchResults">
                     {users && users.map((user)=>(
                         <User
                            key = {user._id}
                            name = {user.name}
                            avatar = {user.avatar.url}
                            userId = {user._id}
                         />
                     ))}
                 </div>
            </form>
        </div>
    )
}

export default Search
