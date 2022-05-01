import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import Navbar from "../../components/navbar/Navbar";
import { Navigate } from 'react-router-dom';

import 'stream-chat-react/dist/css/index.css';

const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZGF3bi1ib2F0LTEifQ.VmJcbPiUlq8bCevXO7HfiE0iS5LU9pzKuGDNjPRNdaY';

const filters = { type: 'messaging', members: { $in: ['dawn-boat-1'] } };
const sort = { last_message_at: -1 };

const Messages = ({ signIn, signUp, setisAuthenticated, isAuthenticated, chatClient }) => {

  if (!chatClient) {
    return <Navigate to="/" />;
  }

  return (
    <div>

      <div>
    <Navbar
        signIn={signIn}
        signUp={signUp}
        setisAuthenticated={setisAuthenticated}
        isAuthenticated={isAuthenticated}
      />
    <Chat client={chatClient} theme='messaging light'>
      <ChannelList filters={filters} sort={sort} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
    </div>

    </div>
  );
};

export default Messages;