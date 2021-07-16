/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import Button from '../../../../components/Button';
import FileUpladedStyles from './style/file_uploaded.module.css';
import logo from '../../../../assets/images/svg/csv.svg';
import ballon from '../../../../assets/images/svg/blip-balloon.svg';

const FileUploaded = ({ uploadedFile }) => {
    const [isLoaded, setLoaded] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoaded(false), 6000);
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
                                <button onClick={() => {}}>Excluir</button>
                            </span>
                        </div>
                    </div>
                    {/* <div className={FileUpladedStyles.container}>
                    <CircularProgressbar
                        styles={{
                            root: { width: 24 },
                            path: { stroke: '#4786F1' }
                        }}
                        strokeWidth={10}
                        value={60}
                    />
                </div> */}
                </div>
            </div>
            <div className={FileUpladedStyles.submit}>
                <Button variant="ghost" text={'Enviar'} />
            </div>
        </>
    );
};

export default FileUploaded;
