import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, configureGoogleSignIn } from '../services/firebase';

const GOOGLE_WEB_CLIENT_ID = '433662515048-guhfhvrh72t0gp618itftrq9qqef2oks.apps.googleusercontent.com';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        configureGoogleSignIn(GOOGLE_WEB_CLIENT_ID);

        const unsubscribe = onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
