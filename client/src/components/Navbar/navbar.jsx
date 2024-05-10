import React, { useState } from "react";
import './navbar.css'
import Logo from '../../assets/img/database.png'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer"; 
import { getFiles, searchFiles } from "../../action/file";
import { showLoader } from "../../reducers/appReducer";
import avatarLogo from '../../assets/img/user.png'
import { API_URL } from "../../config";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.file.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    
 
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
    console.log(currentUser.avatar)


    const searchHandler = (e) => {
        setSearchName(e.target.value)
        if(searchTimeout != false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value != '') {
            setSearchTimeout(setTimeout((value) => {
            dispatch(searchFiles(e.target.value))
        }, 500, e.target.value))
      } else {
        dispatch(getFiles(currentDir))
      }
    }

    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="" className="navbar_logo" />
                <NavLink to="/">
                    <div className="navbar__header">CLOUD STORAGE</div>
                </NavLink>
                {isAuth && <input 
                    value={searchName}
                    onChange={e => searchHandler((e))}
                    className="navbar__search" 
                    type="text" 
                    placeholder="Search files..."/>}
                {!isAuth && <div className="navbar__login"><NavLink to='/login'>Sign In</NavLink></div>}
                {!isAuth && <div className="navbar__register"><NavLink to='/register'>Sign Up</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Logout</div>}
                {isAuth && <NavLink to="/profile">
                <img className="navbar__avatar" src={avatar} alt=""/>
                      </NavLink>}
            </div>
        </div>
    )
}

export default Navbar