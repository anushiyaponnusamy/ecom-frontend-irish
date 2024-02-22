import React, { useState } from 'react';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const ChatList = styled('div')({
    width: '25%',
    borderRight: '1px solid #ccc',
    boxSizing: 'border-box',
    overflowY: 'auto',
});

const ChatContainer = styled('div')({
    width: '75%',
    boxSizing: 'border-box',
    overflowY: 'auto',
});

const StartConversation = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
});

const ChatApp = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <Grid container>
            <ChatList>
                {/* Your chat list content goes here */}
                <div onClick={() => setSelectedChat(1)}>Chat 1</div>
                <div onClick={() => setSelectedChat(2)}>Chat 2</div>
                {/* Add more chat items as needed */}
            </ChatList>

            <ChatContainer component={Paper}>
                {selectedChat ? (
                    // Render chat content based on the selected chat
                    <div>
                        {/* Display messages or other chat-related content */}
                        Chat Content for Chat {selectedChat}
                    </div>
                ) : (
                    // Render start conversation input box
                    <StartConversation>
                        <TextField
                            id="outlined-basic"
                            label="Start a Conversation"
                            variant="outlined"
                        />
                    </StartConversation>
                )}
            </ChatContainer>
        </Grid>
    );
};

export default ChatApp;
