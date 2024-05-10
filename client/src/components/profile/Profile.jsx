import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { deleteAvatar, uploadAvatar } from "../../action/user";
import ProfileInfo from "./profileInfo/ProfileInfo";
import avatarLogo from '../../assets/img/user.png'
import './profile.css'
import { API_URL } from "../../config";


const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)

    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
    

    const changeHandler = (e) => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }
    return (
        <div className="register">
            <img className="avatar" src={avatar}/>
            <input className="profile__change" accept="image/*" onChange={e => changeHandler(e)} type="file" placeholder="Upload avatar"/>
            <button className="profile__delete" onClick={() => dispatch(deleteAvatar())}>Delete avatar</button>
            <ProfileInfo users={currentUser}/>
        </div>
    )
}

export default Profile