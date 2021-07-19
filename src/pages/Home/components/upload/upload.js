/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import UploadStyle from './style/upload.module.css';

const Upload = (props) => {
    const { onUpload } = props;

    const colorClasses = [
        UploadStyle.colorDefault,
        UploadStyle.colorError,
        UploadStyle.colorSuccess
    ];

    const dragResult = (isDragActive, isDragReject, acceptedFiles) => {
        if (isDragActive) {
            return UploadStyle.dragActive;
        }
        if (isDragReject && !isDragActive) {
            return UploadStyle.dragReject;
        }
        return UploadStyle.dragDefault;
    };

    const renderDragMessage = (isDragActive, isDragReject) => {
        if (isDragActive) {
            return (
                <p
                    className={`${UploadStyle.uploadMessage} ${colorClasses[2]}`}
                >
                    Solte os arquivos aqui
                </p>
            );
        }
        if (isDragReject && !isDragActive) {
            return (
                <p
                    className={`${UploadStyle.uploadMessage} ${colorClasses[1]}`}
                >
                    Arquivo não suportado
                </p>
            );
        }

        return (
            <p className={`${UploadStyle.uploadMessage} ${colorClasses[0]}`}>
                Arraste e solte um arquivo CSV aqui
            </p>
        );
    };
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        acceptedFiles,
        isDragReject
    } = useDropzone({
        accept: '.csv',
        onDropAccepted: onUpload,
        maxFiles: 1,
        onDropRejected: () => {}
    });

    return (
        <div>
            <div
                {...getRootProps()}
                className={`${UploadStyle.dropzone} ${dragResult(
                    isDragActive,
                    isDragReject,
                    acceptedFiles
                )}`}
            >
                <button></button>
                <input {...getInputProps()} />
                {renderDragMessage(isDragActive, isDragReject)}
            </div>
        </div>
    );
};

export default Upload;
