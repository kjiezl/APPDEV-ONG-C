import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogleSignIn(webClientId) {
    GoogleSignin.configure({
        webClientId,
        offlineAccess: true,
    });
}

export async function signInWithGoogle() {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        const signInResult = await GoogleSignin.signIn();

        const idToken = signInResult.data?.idToken;
        if (!idToken) {
            throw new Error('No ID token found');
        }

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        const userCredential = await auth().signInWithCredential(googleCredential);

        return {
            user: userCredential.user,
            idToken,
        };
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        throw error;
    }
}

export async function signOut() {
    try {
        await GoogleSignin.signOut();
        await auth().signOut();
    } catch (error) {
        console.error('Sign-Out Error:', error);
        throw error;
    }
}

export function getCurrentUser() {
    return auth().currentUser;
}

export function onAuthStateChanged(callback) {
    return auth().onAuthStateChanged(callback);
}
