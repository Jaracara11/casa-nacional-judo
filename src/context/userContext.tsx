import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

const UserContext = createContext<string | any>(null);

const UserContextProvider = ({ children }: any) => {
    const [user, setUser] = useState({});

    const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser!);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return <UserContext.Provider value={{ signIn, user }}>{children}</UserContext.Provider>;
};

const UserAuth = () => {
    return useContext(UserContext);
};

export { UserContextProvider, UserAuth };
