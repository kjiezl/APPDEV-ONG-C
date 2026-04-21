import { uploadImage, uploadMultipleImages } from './storageService';
import { syncImageToSymfony, syncMultipleImagesToSymfony } from '../api/imageSync';
import { getAuthToken } from '../../app/api/auth';

interface UploadOptions {
    isPrivate?: boolean;
    albumId?: string | null;
    fileName?: string | null;
}

export async function uploadAndSyncImage(localUri: string, options: UploadOptions = {}) {
    const firebaseResult = await uploadImage(localUri, options);

    const token = await getAuthToken();
    const symfonyResult = await syncImageToSymfony(firebaseResult, token ?? null);

    return {
        firebase: firebaseResult,
        symfony: symfonyResult,
    };
}

export async function uploadAndSyncMultipleImages(localUris: string[], options: UploadOptions = {}) {
    const { results: firebaseResults, errors: uploadErrors } = await uploadMultipleImages(
        localUris,
        options
    );

    if (firebaseResults.length === 0) {
        return {
            success: [],
            errors: uploadErrors,
        };
    }

    try {
        const token = await getAuthToken();
        const symfonyResult = await syncMultipleImagesToSymfony(firebaseResults, token ?? null);

        return {
            success: firebaseResults.map((fb, index) => ({
                firebase: fb,
                symfony: symfonyResult.images?.[index] || symfonyResult,
            })),
            errors: uploadErrors,
        };
    } catch (syncError: any) {
        return {
            success: firebaseResults.map((fb) => ({
                firebase: fb,
                symfony: null,
                syncError: syncError.message,
            })),
            errors: uploadErrors,
        };
    }
}
