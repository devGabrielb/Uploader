import React, { useState, useCallback } from 'react';
import fileSize from 'filesize';
import Api from './services/api';
import Upload from './components/upload';
import HomeStyles from './styles/home_styles.module.css';
import FileUploaded from './components/fileUploaded';
import { showToast } from '../../services/common-service';
import * as BlipPortalToastTypes from '../../constants/blip-portal-toast-types';

import 'react-circular-progressbar/dist/styles.css';

const Home = () => {
    const [isUploadedFile, setUploadedFile] = useState(null);

    const handleUpload = useCallback(
        (file) => {
            const newFile = {
                file,
                name: file[0].name,
                readablesize: fileSize(file[0].size),
                progress: 0,
                uploaded: false,
                error: false
            };

            setUploadedFile(newFile);
        },
        [setUploadedFile]
    );

    const updateFile = useCallback((data) => {
        setUploadedFile({ ...data });
    }, []);
    const processUpload = useCallback(() => {
        const data = new FormData();
        data.append('file', isUploadedFile.file[0]);
        Api.post('/upload', data, {
            onUploadProgress: (u) => {
                const progress = parseInt(
                    Math.round((u.loaded * 100) / u.total)
                );

                updateFile({ ...isUploadedFile, ...{ progress } });
            }
        })
            .then(() => {
                updateFile({ uploaded: true });
                handleDelete();
                showToast({
                    type: BlipPortalToastTypes.success,
                    message: 'Mensagem de Teste'
                });
            })
            .catch(() => {
                updateFile({ error: true });
                handleDelete();
                showToast({
                    type: BlipPortalToastTypes.danger,
                    message: 'Mensagem de Teste'
                });
            });
    }, [updateFile, isUploadedFile]);

    const handleDelete = () => {
        setUploadedFile(null);
    };
    return (
        <div className={HomeStyles.container}>
            <div className={HomeStyles.content}>
                {isUploadedFile ? (
                    <FileUploaded
                        uploadedFile={isUploadedFile}
                        sendFile={processUpload}
                        onDelete={handleDelete}
                    />
                ) : (
                    <Upload onUpload={handleUpload} />
                )}
            </div>
        </div>
    );
};

Home.propTypes = {};

export default Home;
