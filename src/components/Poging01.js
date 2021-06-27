import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {useForm} from 'react-hook-form';
import http from "../http-common";
import styles from "./Components.module.css"


function Poging01() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [message, setMessage] = useState();
    const [fileInfos, setFileInfos] = useState([]);
    const [length, setLength] = useState(0);
    const [fileName, setFileName] = useState();
    const [fileUrl, setFileUrl] = useState()
    const [fileID,setFileID]=useState()
    const [showFileFromKeepName, setShowFileFromKeepName] = useState(false)
    const [fileToUpload, setFileToUpload] = useState();
    const [nameFileToUpload, setNameFileToUpload] = useState()
    const[imagePreview,setImagePreview]=useState(null)


    function keepName(file) {

        console.log("file in keepName: ",file)
        setFileName(file.name)
        setFileUrl(file.url);
        setFileID(file.id);
        setShowFileFromKeepName(true)




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


    async function sendFileToBackend() {

        console.log("IN sendFileToBackend() ")
        console.log("NameFileToUpload: ", nameFileToUpload)
        console.log("FileToUpload: ", fileToUpload)




        try {
            let formData= new FormData()

            console.log("TRY fileToUpload:", fileToUpload)

            // LET OP!!!! name: "file"  DIT MOET DUS "file" blijven
            formData.append("file", fileToUpload);

            console.log("FormData:",formData)


            const response = await axios.post("http://localhost:8080/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",

                    "Content-type": "application/json",


                },
            });



            console.log("response",response)
        }catch (error){

            console.log("Foutje bij het versturen naar backend")



        }

    }


    function onSubmit() {

        console.log("IN onSubmit")
        console.log("NameFileToUpload: ", nameFileToUpload)
        console.log("FileToUpload: ", fileToUpload)
        sendFileToBackend();
    }


    return (
        <>
            <h2>Poging01</h2>
            <h3>Message {message} aantal files{length}</h3>

            {showFileFromKeepName &&
            <div>fileName uit keepName: {fileName}
                <div>
                    fileUrl uit keepName: {fileUrl}
                    fileID uit keepName:{fileID}
                </div>

            </div>

            }

            {length > 0 &&
            <fieldset>


                <ul>
                    {fileInfos.map((file) => {
                            return <li key={file.url}>
                           <span
                               onClick={

                                   () => keepName(file)}
                           >naam bij opklikken worden de gegevens doorgestuurd naar keepName: <h3>{file.name}</h3>
                           </span>
                            </li>
                        }
                    )}
                </ul>

                <div>

                    <img
                        className={styles.plaatje}
                        src={fileUrl}/>

                </div>


            </fieldset>

            }


            <fieldset>


                <div className="App">
                    <h1>File kiezen en versturen naar Backend</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"

                            onChange={(e) => setNameFileToUpload(e.target.value)}
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFileToUpload(e.target.files[0])}
                        />
                        <button
                            type="submit"
                        >
                            Voeg toe!
                        </button>
                    </form>
                </div>


            </fieldset>





        </>

    )


}

export default Poging01;