import React, { useState } from "react";
import Input from "../../utils/input/Input";
import './disk.css'
import { useDispatch, useSelector } from "react-redux";
import { set_popup_display } from "../../reducers/fileReducer";
import { createDir } from "../../action/file";

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.file.popupDisplay)
    const currentDir = useSelector(state => state.file.currentDir)
    const dispatch = useDispatch()

    const createHandler = () => {
       dispatch(createDir(currentDir, dirName))
       setDirName('')
       dispatch(set_popup_display('none'))
    }

    return (
        <div className="popup" onClick={() => dispatch(set_popup_display('none'))} style={{display: popupDisplay}}>
           <div className="popup__content" onClick={(event => event.stopPropagation())}>
             <div className="popup__header">
                <div className="popup__title">Create new folder</div>
                <button className="popup__close" onClick={() => dispatch(set_popup_display('none'))} >X</button>
             </div>
             <Input type="text" placeholder="Enter name for folder...." value={dirName} setValue={setDirName}/>
             <button className="popup__create" onClick={() => createHandler()}>Create</button>
           </div>
        </div>
    )
}

export default Popup