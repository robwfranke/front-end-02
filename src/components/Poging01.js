import React, {useState, useEffect} from "react";
import axios from "axios";
import {useForm} from 'react-hook-form';
import styles from "./Components.module.css"


function Poging01() {

    const {handleSubmit} = useForm();
    const [message, setMessage] = useState();
    const [fileInfos, setFileInfos] = useState([]);
    const [length, setLength] = useState(0);
    const [fileName, setFileName] = useState();
    const [fileUrl, setFileUrl] = useState()
    const [fileID, setFileID] = useState()
    const [showFileFromKeepName, setShowFileFromKeepName] = useState(false)
    const [fileToUpload, setFileToUpload] = useState();
    const [nameFileToUpload, setNameFileToUpload] = useState()
    const [updateFiles, setupdateFiles] = useState(false)


    // *******************UseEffect********************

    useEffect(() => {
        getFilesFromBackend()

        // setupdateFiles(true)
    }, []);

    //
    useEffect(() => {
        console.log("UseEffect updateFiles")
        if (updateFiles) {
            getFilesFromBackend()
            setupdateFiles(false)
        }

    }, [updateFiles]);


    // ***********************************************************

    function keepName(file) {

        console.log("file in keepName: ", file)

        setFileName(file.name)
        setFileUrl(file.url);
        setFileID(file.id);
        setShowFileFromKeepName(true)


    }


    async function deletePicture() {
        setFileUrl("")
        setShowFileFromKeepName(false)
        console.log("FILE ID:", fileID)
        try {
            // const response = await axios.delete(`http://localhost:8080/orders/delete/ordername/${orderName}`, {

            const response = await axios.delete(`http://localhost:8080/files/${fileID}`, {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${jwtToken}`, /*BACK TICK!!!!!*/
                }
            })
            setupdateFiles(true)

            console.log("PLAATJE WEG")


        } catch (error) {
            console.log("PLAATJE NIET WEG")
        }

    }


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
            let formData = new FormData()

            console.log("TRY fileToUpload:", fileToUpload)

            // LET OP!!!! name: "file"  DIT MOET DUS "file" blijven
            formData.append("file", fileToUpload);

            console.log("FormData:", formData)


            const response = await axios.post("http://localhost:8080/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",

                    "Content-type": "application/json",


                },
            });

            setupdateFiles(true)
            console.log("response", response)
        } catch (error) {

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


            <fieldset>

                <div className={styles.invoer}>
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
                            SAVE!
                        </button>
                    </form>
                </div>


            </fieldset>


            {showFileFromKeepName &&
            <div>fileName uit keepName: {fileName}
                <div>
                    fileUrl uit keepName: {fileUrl}
                    fileID uit keepName:{fileID}
                </div>

            </div>

            }


            {/**************************************************************************************/}

            {fileInfos.length > 0 &&
            <fieldset>

                <h3>Hier komt eerste file te staan</h3>
                <h4>{fileInfos[0].name}</h4>
                <h4>{fileInfos[0].url}</h4>
                <h4>{fileInfos[0].id}</h4>

                <div>
                    <img
                        className={styles.plaatje}
                        alt={"Eerste file in fileinfos"}
                        src={fileInfos[0].url}
                    />
                    <h3>{fileInfos[0].name}</h3>
                </div>

            </fieldset>
            }

            {/**************************************************************************************/}


            {fileInfos.length > 0 &&
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

                    {showFileFromKeepName &&
                    <fieldset className={styles.plaatjeContainer}>


                        <img
                            className={styles.plaatje}
                            alt={"Eerste file in fileinfos"}

                            src={fileUrl}
                        />
                        <h3>{fileName}</h3>
                        <button
                            onClick={deletePicture}
                        >
                            delete plaatje
                        </button>


                    </fieldset>
                    }

                </div>


            </fieldset>

            }


        </>

    )


}

export default Poging01;