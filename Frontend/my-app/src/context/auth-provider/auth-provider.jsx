import { createContext, useState } from "react";

export const contexto = createContext()
const { Provider } = contexto

const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(undefined);
    const [token, setToken] = useState(undefined);

    const logIn = (usuario,token) => { 
        setUsuario(usuario);
        setToken(token);
    }


    const logOut = () => { 
    setUsuario(undefined);
    setToken(undefined);
    }

    const valorDelContexto = {
        usuario,
        token,
        logOut,
        logIn
    }

    return (
        <Provider value={valorDelContexto}>
            {children}
        </Provider>
    )
}

export default AuthProvider