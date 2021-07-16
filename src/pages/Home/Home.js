import React, { useState, useCallback } from 'react';
import fileSize from 'filesize';
import Upload from './components/upload';
import HomeStyles from './styles/home_styles.module.css';
import FileUploaded from './components/fileUploaded';
import 'react-circular-progressbar/dist/styles.css';

const Home = () => {
    const [isUploadedFile, setUploadedFile] = useState(null);

    const handleUpload = useCallback((file) => {
        console.log(file);
        const newFile = {
            file,
            name: file[0].name,
            readablesize: fileSize(file[0].size),
            progress: false,
            uploaded: false,
            error: false
        };

        console.log(newFile);
        setUploadedFile(newFile);
    }, []);

    return (
        <div className={HomeStyles.container}>
            <div className={HomeStyles.content}>
                {isUploadedFile ? (
                    <FileUploaded uploadedFile={isUploadedFile} />
                ) : (
                    <Upload onUpload={handleUpload} />
                )}
            </div>
        </div>
    );
};

Home.propTypes = {};

export default Home;
