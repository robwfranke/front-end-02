import React, {useState, useEffect, useRef} from "react";
import styles from "./LeighHalliday.module.css"

function LeighHalliday() {

    const fileInputRef=useRef<HTMLInputElement>("");


    return (

        <>
            <h4>React Leigh Halliday </h4>

            <div className={styles["container"]}>
                <form>
                    <button
                        className={styles["button"]}
                        onClick={(event)=>{
                            event.preventDefault();
                            fileInputRef().click();

                        }}


                    >
                        add image
                    </button>

                    <input type="file" style={{display: "none"}}/>

                </form>


            </div>

        </>
    );


}


export default LeighHalliday;