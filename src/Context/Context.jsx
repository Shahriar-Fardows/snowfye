import { createContext } from "react";

const AuthContext = createContext(null);

const Context = ({children}) => {

    const userInfo = {
        name: "John"
        
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Context;