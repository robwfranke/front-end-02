import http from "../http-common";

function uploadToBackend (file, onUploadProgress)  {
    let formData = new FormData();

    formData.append("file", file);

    console.log("FileUploadService file:", file)
    console.log("formData: ",formData)

    return http.post("http://localhost:8080/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",

                "Content-type": "application/json",


        },

        onUploadProgress,
    });
};

function getFilesFromBackend ()  {
    return http.get("http://localhost:8080/files");
};

const FileUploadService = {
    uploadToBackend,
    getFilesFromBackend
};

export default FileUploadService;