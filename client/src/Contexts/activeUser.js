import React, { createContext, useState } from 'react';


const UserContext = createContext();


const UserProvider = ({ children }) => {
    const [Receiver, setReceiver] = useState(null);
    const [sender, setSender] = useState(null);

    return (
        <UserContext.Provider value={{ Receiver, setReceiver ,sender,setSender }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
