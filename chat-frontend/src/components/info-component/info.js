import React, { Component } from 'react';




const Info = () => {

    return (

        <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <i class="fas fa-envelope" style={{ fontSize: 200 }}></i>
            <h2 style={{ marginTop: 0 }}>Welcome</h2>
            <p>This is a chat platform , you can select any user from left side to start chat.</p>
            <h4 style={{ marginTop: 0 }}>Have fun ;)</h4>
        </div>
    );
}

export default Info;