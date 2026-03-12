import { useState } from 'react';
import { uploadAndSyncImage, uploadAndSyncMultipleImages } from '../services/firebase';

export function useImageUpload() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const upload = async (localUri, options = {}) => {
        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const result = await uploadAndSyncImage(localUri, options);
            setProgress(100);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setUploading(false);
        }
    };

    const uploadMultiple = async (localUris, options = {}) => {
        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const result = await uploadAndSyncMultipleImages(localUris, options);
            setProgress(100);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setUploading(false);
        }
    };

    const reset = () => {
        setUploading(false);
        setProgress(0);
        setError(null);
    };

    return {
        upload,
        uploadMultiple,
        uploading,
        progress,
        error,
        reset,
    };
}
