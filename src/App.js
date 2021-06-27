import React from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import FilesUpload from "./components/FilesUpload";
import FilesUpload02 from "./components/FilesUpload02";
import UploadImages from "./components/ImageUpload";
import LeighHalliday from "./components/LeighHalliday";
import Poging01 from "./components/Poging01";

// voor uitleg: https://bezkoder.com/react-hooks-multiple-file-upload/
//https://bezkoder.com/react-image-upload-preview/
//https://www.youtube.com/watch?v=BPUgM1Ig4Po filereader




function App() {
    return (
        <div className="container" style={{width: "600px"}}>
            <div className="my-3">



            </div>

            {/*<UploadImages />*/}
            {/*<FilesUpload/>*/}
            <FilesUpload02/>
            <Poging01/>




        </div>


                );
                }

                export default App;