export { firebase, auth, storage } from './config';
export {
    configureGoogleSignIn,
    signInWithGoogle,
    signOut,
    getCurrentUser,
    onAuthStateChanged,
} from './googleAuth';
export {
    uploadImage,
    uploadMultipleImages,
    getPrivateImageUrl,
    deleteImage,
} from './storageService';
export { uploadAndSyncImage, uploadAndSyncMultipleImages } from './uploadService';
