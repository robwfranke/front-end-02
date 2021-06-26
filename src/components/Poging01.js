import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {useForm} from 'react-hook-form';
function Poging01() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [message, setMessage] = useState();
    const [fileInfos, setFileInfos] = useState([]);
    const [length, setLength] = useState(0);
    const [fileName, setFileName] = useState();
    const [fileUrl, setFileUrl] = useState()
    const [showFileFromKeepName, setShowFileFromKeepName] = useState(false)
    const [fileToUpload, setFileToUpload] = useState(null);
    const [nameFileToUpload, setNameFileToUpload] = useState("")

    function keepName(file) {


        setFileName(file.name)
        setFileUrl(file.url);
        setShowFileFromKeepName(true)


        console.log("fileNameP: ", fileName)
        console.log("fileUrlP: ", fileUrl)

    }


    useEffect(() => {
        getFilesFromBackend()
    }, []);


    async function getFilesFromBackend() {

        try {
            console.log("IN getFilesFromBackend")

            const response = await axios.get("http://localhost:8080/files")


            setMessage("Files goed opgehaald uit de backend")
            setLength(response.data.length);
            setFileInfos(response.data);


        } catch (e) {
            setMessage("Upload Fout")
            console.log("Er is iets fout gegaan bij het ophalen")
        }


    }


    function FileToUploadFunction() {

        console.log("IN FileToUploadFunction() ")


    }


    function onSubmit(data) {

        console.log("IN onSubmit")
        console.log("NameFileToUpload: ", nameFileToUpload)
        console.log("FileToUpload: ", fileToUpload)

    }


    return (
        <>
            <h2>Poging01</h2>
            <h3>Message {message} aantal files{length}</h3>

            {showFileFromKeepName &&
            <div>fileName uit keepName: {fileName}
                <div>
                    fileUrl uit keepName: {fileUrl}
                </div>

            </div>

            }

            {length > 0 &&
            <fieldset>


                <ul>
                    {fileInfos.map((file) => {
                            return <li key={file.url}>
                           <span
                               onClick={() => keepName(file)}
                           >naam bij opklikken worden de gegevens doorgestuurd naar keepName: <h3>{file.name}</h3>
                           </span>
                            </li>
                        }
                    )}
                </ul>

                <div>
                    <img src={fileUrl}/>

                </div>





            </fieldset>

            }


            <fieldset>


                <div className="App">
                    <h1>File kiezen en versturen naar Backend</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            // value={nameFileToUpload}
                            onChange={(e) => setNameFileToUpload(e.target.value)}
                        />

                        <input
                            type="file"
                            // value={nameFileToUpload}
                            onChange={(e) => setNameFileToUpload(e.target.files[0])}
                        />
                        <input type="submit"/>
                    </form>
                </div>


            </fieldset>






        </>

    )


}

export default Poging01;