import { CometChatConversationListWithMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { Navigate, Link } from 'react-router-dom';
import { useState } from "react";
import Navbar from '../../components/navbar/Navbar';

const Messages = ({signIn, signUp, setisAuthenticated, isAuthenticated, chatWith}) => {

    if (!isAuthenticated) {
        return (
            <Navigate to="/" />
        )
    }
    return (
        <div>
            <Navbar signIn={signIn} signUp={signUp} setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated}/>
            <div style={{width: '100vw', height:'80vh' }}>
            { chatWith ? <CometChatConversationListWithMessages chatWithUser={chatWith} /> : <CometChatConversationListWithMessages />}
            </div>
       </div>
    )
};

export default Messages;