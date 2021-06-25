import React, {useState, useEffect, useRef} from "react";
import UploadService from "../services/FileUploadService";
import http from "../http-common";
import axios from "axios";


function Poging01() {


    const [message, setMessage] = useState();
    const [fileInfos, setFileInfos] = useState([]);
    const [filePresent, setFilePresent] = useState(false);
    const [length, setLength] = useState(0);


    useEffect(() => {


        getFilesFromBackend()


    }, []);


    async function getFilesFromBackend() {

        try {
            console.log("IN getFilesFromBackend")

            const response = await axios.get("http://localhost:8080/files")





            setMessage("Upload ok")
            setLength(response.data.length);
            setFileInfos(response.data);


            console.log("response", response)
            console.log("response.data", response.data)
            console.log("fileInfos ", fileInfos)


        } catch (e) {
            setMessage("Upload Fout")
            console.log("Er is iets fout gegaan bij het ophalen")
        }


    }

    return (
        <>
            <div>Hierzo</div>
            <h3>Message {message} aantal files{length}</h3>

            {length>0 &&
            <fieldset>


                <ul>
                    {fileInfos.map((file) => {
                       return<li key={file.url}>
                           <span>naam: {file.name}</span>

                       </li>



                        }
                    )}


                </ul>


            </fieldset>
            }


        </>

    )


}

export default Poging01;