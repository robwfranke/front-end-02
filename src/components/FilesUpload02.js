import React, { useState, useEffect, useRef } from "react";
import UploadService from "../services/FileUploadService";

function UploadFiles_02 ()  {
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [progressInfos, setProgressInfos] = useState({ val: [] });
    const [message, setMessage] = useState([]);
    const [fileInfos, setFileInfos] = useState([]);
    const progressInfosRef = useRef(null)

    useEffect(() => {
        UploadService.getFilesFromBackend().then((response) => {
            setFileInfos(response.data);
        });
    }, []);

    function selectFiles  (event) {
        setSelectedFiles(event.target.files);
        setProgressInfos({ val: [] });
    };

    function upload (idx, file)  {
        let _progressInfos = [...progressInfosRef.current.val];
        return UploadService.uploadToBackend(file, (event) => {
            _progressInfos[idx].percentage = Math.round(
                (100 * event.loaded) / event.total
            );
            setProgressInfos({ val: _progressInfos });
        })
            .then(() => {
                setMessage((prevMessage) => ([
                    ...prevMessage,
                    "Uploaded the file successfully: " + file.name,
                ]));
            })
            .catch(() => {
                _progressInfos[idx].percentage = 0;
                setProgressInfos({ val: _progressInfos });

                setMessage((prevMessage) => ([
                    ...prevMessage,
                    "Could not uploadToBackend the file: " + file.name,
                ]));
            });
    };


    function uploadFilesTest  ()  {
        const files = Array.from(selectedFiles);

        let _progressInfos = files.map(file => ({ percentage: 0, fileName: file.name }));

        progressInfosRef.current = {
            val: _progressInfos,
        }

        const uploadPromises = files.map((file, i) => upload(i, file));

        Promise.all(uploadPromises)
            .then(() => UploadService.getFilesFromBackend())
            .then((files) => {
                setFileInfos(files.data);
            });

        setMessage([]);
    };

    return (
        <div>
            <h4>FileUpload_02</h4>

            <div className="row my-3">
                <div className="col-8">
                    <label className="btn btn-default p-0">
                        <input type="file" multiple onChange={selectFiles} />
                    </label>
                </div>

                <div className="col-4">
                    <button
                        className="btn btn-success btn-sm"
                        disabled={!selectedFiles}
                        onClick={uploadFilesTest}
                    >
                        Upload
                    </button>
                </div>
            </div>

            {message.length > 0 && (
                <div className="alert alert-secondary" role="alert">
                    <ul>
                        {message.map((item, i) => {
                            return <li key={i}>{item}</li>;
                        })}
                    </ul>
                </div>
            )}

            <div className="card">
                <div className="card-header">List of Files</div>
                <ul className="list-group list-group-flush">

                    {fileInfos &&
                    fileInfos.map((file, index) => (
                        <li className="list-group-item" key={index}>
                            <a href={file.url}>{file.name}</a>
                            {/*<img className="preview" src={file.url} alt="" />*/}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UploadFiles_02;
