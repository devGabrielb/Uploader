/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import Button from '../../../../components/Button';
import FileUpladedStyles from './style/file_uploaded.module.css';
import logo from '../../../../assets/images/svg/csv.svg';
import ballon from '../../../../assets/images/svg/blip-balloon.svg';

const FileUploaded = ({ uploadedFile, sendFile, onDelete }) => {
    const [isLoaded, setLoaded] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoaded(false), 3000);
    }, []);
    return isLoaded ? (
        <div className={FileUpladedStyles.loading}>
            <img src={ballon} className="App-logo" alt="logo" />
        </div>
    ) : (
        <>
            <div className={FileUpladedStyles.container}>
                <div>
                    <div className={FileUpladedStyles.fileinfo}>
                        <img
                            src={logo}
                            className={FileUpladedStyles.preview}
                        ></img>
                        <div>
                            <strong>{uploadedFile.name}</strong>
                            <span>
                                {uploadedFile.readablesize}
                                <button onClick={onDelete}>Excluir</button>
                            </span>
                        </div>
                    </div>
                    {uploadedFile.progress > 0 ? (
                        <div className={FileUpladedStyles.container}>
                            <CircularProgressbar
                                styles={{
                                    root: { width: 24 },
                                    path: { stroke: '#4786F1' }
                                }}
                                strokeWidth={10}
                                value={uploadedFile.progress}
                            />
                        </div>
                    ) : (
                        <div className={FileUpladedStyles.submit}>
                            <Button
                                onClick={sendFile}
                                variant="ghost"
                                text={'Enviar'}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FileUploaded;
