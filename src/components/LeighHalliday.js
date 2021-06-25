import React, {useState, useEffect, useRef} from "react";
import styles from "./LeighHalliday.module.css"

function LeighHalliday() {

    return (

        <>
            <h4>React Leigh Halliday </h4>

            <div className={styles["container"]}>
                <form>
                    <button
                        className={styles["button"]}
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