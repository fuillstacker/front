import axios from 'axios'
import { setUser } from '../reducers/userReducer'
import { API_URL } from '../config'
import { hideLoader, showLoader } from '../reducers/appReducer'

export const register = async (email, password) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.post('https://back-2-sw8c.onrender.com/api/register', {
                email,
                password
            })
            console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.post('https://back-2-sw8c.onrender.com/api/login', {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.get('https://back-2-sw8c.onrender.com/api/auth',
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )

            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log(response.data)
        } catch (e) {
            console.log(e.response.data.msg)
            localStorage.removeItem('token')
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`https://back-2-sw8c.onrender.com/api/files/avatar`, formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.delete(`https://back-2-sw8c.onrender.com/api/files/avatar`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )

            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(hideLoader())
        }
    }
}