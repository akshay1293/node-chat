import React from "react";
import loader from '../gif/ajax-loading.gif';

const Loader = (props) => {

    return (
        <div className="loader-container" style={{ display: props.display ? "flex" : "none", }}>
            <img id="loader"
                src={loader}
                style={
                    {
                        display: props.display ? "block" : "none",
                        height: "100px",
                        width: "100px",
                        position: "absolute"
                    }
                }
                alt="loading..."
            />
        </div>
    );
}

export default Loader;