import axios from 'axios'
import { setFiles, setCurrentDir, addFiles, deleteFileAction } from '../reducers/fileReducer'
import { addUploadFile, changeLoadFile, showUploader } from '../reducers/uploadReducer'
import { hideLoader, showLoader } from '../reducers/appReducer'

export const getFiles = (dirId, sort) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = 'https://back-2-sw8c.onrender.com/api/files'
            if(dirId) {
                url = `https://back-2-sw8c.onrender.com/api/files?parent=${dirId}`
            }
            if(sort) {
                url = `https://back-2-sw8c.onrender.com/api/files?sort=${sort}`
            }
            if (dirId && sort) {
                url = `https://back-2-sw8c.onrender.com/api/files?parent=${dirId}&sort=${sort}`
            }
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e.response.data.msg)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const createDir = (dirId, name) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.post(`https://back-2-sw8c.onrender.com/api/files`, {
                name,
                type: 'dir',
                parent: dirId
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(addFiles(response.data))
        } catch (e) {
            alert(e.response.data.msg)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function upload(file, dirId) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const response = await axios.post(`https://back-2-sw8c.onrender.com/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            });
            dispatch(addFiles(response.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const download = async (file) => {
    const response = await fetch(`https://back-2-sw8c.onrender.com/api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export const deleteFile = (file, dirId) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.delete(`https://back-2-sw8c.onrender.com/api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
        } catch (e) {
            alert(e.response.data.msg)
            console.log(e.response)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const searchFiles = (search) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.get(`https://back-2-sw8c.onrender.com/api/files/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e?.response?.data?.msg)
        } finally {
            dispatch(hideLoader())
        }
    }
}
