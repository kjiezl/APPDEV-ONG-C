const BASE_URL = 'http://192.168.148.187:8000/api';

function getAuthHeaders(token) {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

export async function syncImageToSymfony(imageData, token = null) {
    const {
        storagePath,
        downloadUrl,
        fileName,
        isPrivate,
        albumId,
        uploadedAt,
    } = imageData;

    const headers = getAuthHeaders(token);

    const response = await fetch(`${BASE_URL}/images`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            firebase_path: storagePath,
            download_url: downloadUrl,
            file_name: fileName,
            is_private: isPrivate,
            album_id: albumId,
            uploaded_at: uploadedAt,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to sync image with server');
    }

    return data;
}

export async function syncMultipleImagesToSymfony(imagesData, token = null) {
    const headers = getAuthHeaders(token);

    const images = imagesData.map((img) => ({
        firebase_path: img.storagePath,
        download_url: img.downloadUrl,
        file_name: img.fileName,
        is_private: img.isPrivate,
        album_id: img.albumId,
        uploaded_at: img.uploadedAt,
    }));

    const response = await fetch(`${BASE_URL}/images/batch`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ images }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to sync images with server');
    }

    return data;
}

export async function createAlbum(albumData, token = null) {
    const { name, description, isPrivate = false } = albumData;

    const headers = getAuthHeaders(token);

    const response = await fetch(`${BASE_URL}/albums`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name,
            description,
            is_private: isPrivate,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to create album');
    }

    return data;
}

export async function deleteImageFromSymfony(imageId, token = null) {
    const headers = getAuthHeaders(token);

    const response = await fetch(`${BASE_URL}/images/${imageId}`, {
        method: 'DELETE',
        headers,
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete image');
    }

    return { deleted: true };
}

export async function updateImagePrivacy(imageId, isPrivate, token = null) {
    const headers = getAuthHeaders(token);

    const response = await fetch(`${BASE_URL}/images/${imageId}/privacy`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ is_private: isPrivate }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to update image privacy');
    }

    return data;
}
