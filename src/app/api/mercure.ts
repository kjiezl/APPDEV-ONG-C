import { api } from './client';

/**
 * Fetch a short-lived Mercure subscriber JWT from the backend.
 * The backend signs it with the same secret the Mercure hub uses.
 */
export async function getMercureToken(): Promise<{ token: string }> {
    return api('/api/mercure/token');
}
