/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '../../../../components/Button/Button';
import UploadStyle from './style/upload.module.css';
import { showToast } from '../../../../services/common-service';
import * as BlipPortalToastTypes from '../../../../constants/blip-portal-toast-types';
import uploadIcon from '../../../../assets/images/svg/outline_upload.svg';

const Upload = (props) => {
    const { onUpload } = props;

    const colorClasses = [
        UploadStyle.colorDefault,
        UploadStyle.colorError,
        UploadStyle.colorSuccess
    ];

    const isFileReject = () => {
        console.log('opa');
        showToast({
            type: BlipPortalToastTypes.danger,
            message: 'Mensagem de Teste'
        });
    };

    const dragResult = (isDragActive, isDragReject) => {
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
        onDropRejected: isFileReject
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
                <input {...getInputProps()} />
                {renderDragMessage(isDragActive, isDragReject)}
                <Button
                    icon="upload"
                    variant="ghost"
                    text={'Selecionar um arquivo'}
                />
            </div>
        </div>
    );
};

export default Upload;
