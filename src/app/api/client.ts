import { navigateToLogin } from '../../navigations/navigationRef';

const API_BASE = 'http://192.168.118.186:8000';

let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
    authToken = token;
}

export function getAuthToken(): string | null {
    return authToken;
}

export function clearAuthToken(): void {
    authToken = null;
}

export async function api(endpoint: string, options: RequestInit = {}): Promise<any> {
    const headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            authToken = null;
            navigateToLogin();
        }
        const error: any = new Error(data.message || `Request failed with status ${response.status}`);
        error.status = response.status;
        throw error;
    }

    return data;
}
