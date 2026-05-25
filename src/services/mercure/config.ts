import { API_BASE } from '../../app/api/client';

// Mercure Hub runs on Docker port 3001 (mapped from container port 3000)
// Symfony app runs on port 8000 via `symfony serve`
const MERCURE_HOST = API_BASE.replace(':8000', ':3001');
// Note: No trailing slash - the URL constructor in mercureClient will add ?topic=...
export const MERCURE_HUB_URL = `${MERCURE_HOST}/.well-known/mercure`;

// Topic prefixes used by the Symfony backend
export const TOPICS = {
  USER_BOOKINGS: (userId: number | string) =>
    `${API_BASE}/api/users/${userId}/bookings`,
  BOOKING: (bookingId: number | string) =>
    `${API_BASE}/api/bookings/${bookingId}`,
  PHOTOGRAPHERS: `${API_BASE}/api/photographers`,
  PHOTOGRAPHER: (photographerId: number | string) =>
    `${API_BASE}/api/photographers/${photographerId}`,
  PROFILE: (userId: number | string) =>
    `${API_BASE}/api/users/${userId}/profile`,
};
