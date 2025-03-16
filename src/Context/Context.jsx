import { createContext } from "react";

const AuthContext = createContext(null);

const Context = () => {

    const userInfo = {
        name: "John"
        
    };

    return (
        <AuthContext.Provider value={userInfo}>
            
        </AuthContext.Provider>
    );
};

export default Context;