import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, upload } from "../../action/file";
import FileList from './fileList/FileList'
import './disk.css'
import Popup from "./Popup";
import { setCurrentDir, setFileView, set_popup_display } from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    const loader = useSelector(state => state.app.loader)
    const dirStack = useSelector(state => state.file.dirStack)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    const showPopupHandler = () => {
        dispatch(set_popup_display('flex'))
    }
    const backClickHandler = () => {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }
    const fileUploadHandler = (event) => {
        const files = [...event.target.files]
        files.forEach(file => dispatch(upload(file, currentDir)))
    }
    const dragEnterHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    const dragLeaveHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = (event) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(upload(file, currentDir)))
        setDragEnter(false)
    }

    if (loader == true) {
        return (
            <div className="loader1">
                <span class="loader"></span>

            </div>
        )
    }

    return (!dragEnter ?
        <div className="disk" onDragEnter={(event) => dragEnterHandler(event)} onDragLeave={(event) => dragLeaveHandler(event)} onDragOver={(event) => dragEnterHandler(event)}>
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backClickHandler()}>Back</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Create</button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Upload file</label>
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input" />
                </div>
                <select value={sort} onChange={(e) => setSort(e.target.value)}
                    className="disk__select">
                    <option value="name">on name</option>
                    <option value="type">on type</option>
                    <option value="date">on date</option>
                </select>
                <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))}/>
                <button className="disk__list" onClick={() => dispatch(setFileView('list'))}/>
            </div>
            <FileList />
            <Popup />
        </div>
        :
        <div className="drop__area" onDrop={(event) => dropHandler(event)} onDragEnter={(event) => dragEnterHandler(event)} onDragLeave={(event) => dragLeaveHandler(event)} onDragOver={(event) => dragEnterHandler(event)}>
            Drop the file
        </div>

    )
}
export default Disk

