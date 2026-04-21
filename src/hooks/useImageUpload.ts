import { useState } from 'react';
import { uploadAndSyncImage, uploadAndSyncMultipleImages } from '../services/firebase';

interface UploadOptions {
    isPrivate?: boolean;
    albumId?: string | null;
    fileName?: string | null;
}

export function useImageUpload() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const upload = async (localUri: string, options: UploadOptions = {}) => {
        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const result = await uploadAndSyncImage(localUri, options);
            setProgress(100);
            return result;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setUploading(false);
        }
    };

    const uploadMultiple = async (localUris: string[], options: UploadOptions = {}) => {
        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            const result = await uploadAndSyncMultipleImages(localUris, options);
            setProgress(100);
            return result;
        } catch (err: any) {
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
