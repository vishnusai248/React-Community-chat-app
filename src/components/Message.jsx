import React from "react";
// import { auth } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
import "./styles/Messages.scss";
export default function Message(props) {
    const message = props.message;
    
    return (
        <div >
            <div className="d-flex chat-bubble ">
                <img className="chat-bubble__left"
                    src={message.avatar}
                    alt="user avatar" />
                <div className="chat-bubble__right">
                    <p className="user-name">{message.name}</p>
                    <p className="user-message">{message.text}</p>
                </div>
            </div>
        </div>
    );
}
