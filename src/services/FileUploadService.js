import http from "../http-common";

function upload (file, onUploadProgress)  {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("http://localhost:8080/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",

                "Content-type": "application/json",


        },

        onUploadProgress,
    });
};

function getFiles ()  {
    return http.get("http://localhost:8080/files");
};

const FileUploadService = {
    upload,
    getFiles,
};

export default FileUploadService;