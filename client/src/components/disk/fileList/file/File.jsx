import React from "react";
import './file.css'
import FolderLogo from '../../../../assets/img/folder.png'
import FileLogo from '../../../../assets/img/file.png'
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, download } from "../../../../action/file";
import sizeFormat from "../../../../utils/sizeFormat";

const File = ({ file }) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    const view = useSelector(state => state.file.view)

    const openHandler = () => {
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }
    const dowloadClickHandler = (event) => {
        event.stopPropagation()
        download(file)
    }

    const deleteClickHandler = (event) => {
        event.stopPropagation()
        dispatch(deleteFile(file))
    }

    if (view === 'list') {
        return (

            <div className="file" onClick={file.type === 'dir' ? () => openHandler() : ''}>
                <img src={file.type === 'dir' ? FolderLogo : FileLogo} alt="" className="file__img" />
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' && <button onClick={(event) => dowloadClickHandler(event)} className="file__btn file__download">Download</button>}
                <button onClick={(event) => deleteClickHandler(event)} className="file__btn file__delete">Delete</button>
            </div>
        )
    }
    if (view === 'plate') {
        return (

            <div className="file-plate" onClick={file.type === 'dir' ? () => openHandler() : ''}>
                <img src={file.type === 'dir' ? FolderLogo : FileLogo} alt="" className="file-plate__img" />
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' && <button onClick={(event) => dowloadClickHandler(event)} className="file-plate__btn file-plate__download">Download</button>}
                    <button onClick={(event) => deleteClickHandler(event)} className="file-plate__btn file-plate__delete">Delete</button>
                </div>
            </div>
        )
    }

}

export default File