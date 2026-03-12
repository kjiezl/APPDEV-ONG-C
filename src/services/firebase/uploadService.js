import { uploadImage, uploadMultipleImages } from './storageService';
import { syncImageToSymfony, syncMultipleImagesToSymfony } from '../api/imageSync';

export async function uploadAndSyncImage(localUri, options = {}) {
    const firebaseResult = await uploadImage(localUri, options);

    const symfonyResult = await syncImageToSymfony(firebaseResult);

    return {
        firebase: firebaseResult,
        symfony: symfonyResult,
    };
}

export async function uploadAndSyncMultipleImages(localUris, options = {}) {
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
        const symfonyResult = await syncMultipleImagesToSymfony(firebaseResults);

        return {
            success: firebaseResults.map((fb, index) => ({
                firebase: fb,
                symfony: symfonyResult.images?.[index] || symfonyResult,
            })),
            errors: uploadErrors,
        };
    } catch (syncError) {
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
