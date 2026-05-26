import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

const API_BASE_URL = Config.API_BASE_URL || 'https://qwepic.onrender.com';

export function configureGoogleSignIn(webClientId: string): void {
    console.log('Configuring Google Sign-In with webClientId:', webClientId);
    GoogleSignin.configure({
        webClientId,
        offlineAccess: true,
    });
}

export async function signInWithGoogle(): Promise<{ idToken: string; googleUser: { email: string; displayName: string } }> {
    try {
        console.log('Starting Google Sign-In...');

        // Check if Play Services are available
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        console.log('✓ Play Services available');

        // Perform Google Sign-In
        const signInResult = await GoogleSignin.signIn();
        console.log('✓ Google Sign-In successful');
        console.log('Sign-in result:', JSON.stringify(signInResult, null, 2));

        // Extract ID token from sign-in result using type assertion
        const idToken = (signInResult as any)?.idToken || (signInResult as any)?.data?.idToken;
        if (!idToken) {
            throw new Error('No ID token found in sign-in result');
        }
        console.log('✓ ID token retrieved');

        // Extract user info using type assertion
        const userInfo = (signInResult as any)?.user || (signInResult as any)?.data?.user || signInResult;
        const email = userInfo?.email || (signInResult as any)?.email;
        const displayName = userInfo?.name || userInfo?.displayName || email || 'User';

        console.log('User email:', email);
        console.log('User display name:', displayName);

        if (!email) {
            throw new Error('No email found in sign-in result');
        }

        return {
            idToken,
            googleUser: { email, displayName },
        };
    } catch (error: any) {
        console.error('❌ Google Sign-In Error Code:', error.code);
        console.error('❌ Google Sign-In Error Message:', error.message);
        console.error('❌ Full Error:', JSON.stringify(error, null, 2));
        throw error;
    }
}

export async function signOut(): Promise<void> {
    try {
        console.log('Signing out...');
        
        await GoogleSignin.signOut();
        console.log('✓ Google Sign-Out successful');
        
        await auth().signOut();
        console.log('✓ Firebase Sign-Out successful');

        // Remove JWT token from AsyncStorage
        try {
            const AsyncStorage = require('@react-native-async-storage/async-storage').default;
            await AsyncStorage.removeItem('@auth_token');
            console.log('✓ JWT token removed from AsyncStorage');
        } catch (storageError) {
            console.warn('Failed to remove JWT token:', storageError);
        }

        console.log('✓ Sign-out successful');
    } catch (error) {
        console.error('❌ Sign-Out Error:', error);
        throw error;
    }
}

export function getCurrentUser() {
    return auth().currentUser;
}

export function onAuthStateChanged(callback: (user: any) => void) {
    return auth().onAuthStateChanged(callback);
}

/**
 * Get stored JWT token from AsyncStorage
 * Use this token in API calls to authenticate requests to your backend
 */
export async function getStoredJWTToken(): Promise<string | null> {
    try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        const token = await AsyncStorage.getItem('@auth_token');
        return token;
    } catch (error) {
        console.error('Error retrieving JWT token:', error);
        return null;
    }
}

/**
 * Make an authenticated API call to your backend
 * Automatically includes the JWT token in the Authorization header
 */
export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = await getStoredJWTToken();

    const headers = new Headers(options.headers || {});
    
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(url, {
        ...options,
        headers,
    });
}