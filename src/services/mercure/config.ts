import { API_BASE } from '../../app/api/client';
import Config from 'react-native-config';

// Determine Mercure URL based on environment
let MERCURE_HUB_URL: string;

if (API_BASE.includes('onrender.com')) {
  // Production: Use Render Mercure service
  MERCURE_HUB_URL = 'https://qwepic-mercure.onrender.com/.well-known/mercure';
} else {
  // Local development: Use local Docker Mercure on port 3001
  const MERCURE_HOST = API_BASE.replace(':8000', ':3001');
  MERCURE_HUB_URL = `${MERCURE_HOST}/.well-known/mercure`;
}

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

export { MERCURE_HUB_URL };