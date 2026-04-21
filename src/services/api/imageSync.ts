const BASE_URL = 'http://192.168.148.187:8000/api';

interface ImageData {
    storagePath: string;
    downloadUrl: string | null;
    fileName: string;
    isPrivate: boolean;
    albumId: string | null;
    uploadedAt: string;
}

interface AlbumData {
    name: string;
    description?: string;
    isPrivate?: boolean;
}

function getAuthHeaders(token: string | null): Record<string, string> {
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

export async function syncImageToSymfony(imageData: ImageData, token: string | null = null): Promise<any> {
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

export async function syncMultipleImagesToSymfony(imagesData: ImageData[], token: string | null = null): Promise<any> {
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

export async function createAlbum(albumData: AlbumData, token: string | null = null): Promise<any> {
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

export async function deleteImageFromSymfony(imageId: string, token: string | null = null): Promise<{ deleted: boolean }> {
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

export async function updateImagePrivacy(imageId: string, isPrivate: boolean, token: string | null = null): Promise<any> {
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
