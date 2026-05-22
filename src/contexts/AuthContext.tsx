import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, configureGoogleSignIn } from '../services/firebase';

const GOOGLE_WEB_CLIENT_ID = '185214544147-1jo57fq69jb5tpn07t6qbcstp6ok2j3u.apps.googleusercontent.com';

interface AuthContextType {
    user: any;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        configureGoogleSignIn(GOOGLE_WEB_CLIENT_ID);

        const unsubscribe = onAuthStateChanged((firebaseUser: any) => {
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

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}