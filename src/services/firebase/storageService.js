import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export async function uploadImage(localUri, options = {}) {
    const {
        isPrivate = false,
        albumId = null,
        fileName = null,
    } = options;

    const user = auth().currentUser;
    if (!user) {
        throw new Error('User must be authenticated to upload images');
    }

    const timestamp = Date.now();
    const generatedFileName = fileName || `${timestamp}_${Math.random().toString(36).substring(7)}`;
    const extension = localUri.split('.').pop() || 'jpg';
    const fullFileName = `${generatedFileName}.${extension}`;

    const visibility = isPrivate ? 'private' : 'public';
    const albumPath = albumId ? `albums/${albumId}/` : '';
    const storagePath = `users/${user.uid}/${visibility}/${albumPath}${fullFileName}`;

    const reference = storage().ref(storagePath);

    const metadata = {
        customMetadata: {
            uploadedBy: user.uid,
            uploadedAt: new Date().toISOString(),
            isPrivate: String(isPrivate),
            albumId: albumId || '',
        },
    };

    const task = reference.putFile(localUri, metadata);

    return new Promise((resolve, reject) => {
        task.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload progress: ${progress.toFixed(2)}%`);
            },
            (error) => {
                console.error('Upload error:', error);
                reject(error);
            },
            async () => {
                try {
                    const downloadUrl = isPrivate ? null : await reference.getDownloadURL();

                    resolve({
                        storagePath,
                        downloadUrl,
                        fileName: fullFileName,
                        isPrivate,
                        albumId,
                        uploadedAt: metadata.customMetadata.uploadedAt,
                    });
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
}

export async function uploadMultipleImages(localUris, options = {}) {
    const results = [];
    const errors = [];

    for (const uri of localUris) {
        try {
            const result = await uploadImage(uri, options);
            results.push(result);
        } catch (error) {
            errors.push({ uri, error: error.message });
        }
    }

    return { results, errors };
}

export async function getPrivateImageUrl(storagePath) {
    const user = auth().currentUser;
    if (!user) {
        throw new Error('User must be authenticated to access private images');
    }

    if (!storagePath.includes(`users/${user.uid}/private/`)) {
        throw new Error('Access denied: This is not your private image');
    }

    const reference = storage().ref(storagePath);
    return await reference.getDownloadURL();
}

export async function deleteImage(storagePath) {
    const user = auth().currentUser;
    if (!user) {
        throw new Error('User must be authenticated to delete images');
    }

    if (!storagePath.startsWith(`users/${user.uid}/`)) {
        throw new Error('Access denied: You can only delete your own images');
    }

    const reference = storage().ref(storagePath);
    await reference.delete();

    return { deleted: true, storagePath };
}
