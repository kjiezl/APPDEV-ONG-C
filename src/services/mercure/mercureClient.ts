import SSE from 'react-native-sse';
import { MERCURE_HUB_URL } from './config';

export interface MercureMessage {
  event: string;
  data: any;
  id?: string;
  topic?: string;
}

type MessageHandler = (message: MercureMessage) => void;
type ErrorHandler = (error: any) => void;

let eventSource: SSE | null = null;

/**
 * Connect to the Mercure hub and subscribe to the given topics.
 * Uses the subscriber JWT obtained from the Symfony backend.
 */
export function connect(
  topics: string[],
  subscriberToken: string,
  onMessage: MessageHandler,
  onError?: ErrorHandler,
): void {
  disconnect();

  // Build URL manually to avoid any trailing slash issues
  const hubUrl = MERCURE_HUB_URL.replace(/\/$/, ''); // Remove any trailing slash
  const queryString = topics.map(t => `topic=${encodeURIComponent(t)}`).join('&');
  const fullUrl = `${hubUrl}?${queryString}`;

  if (__DEV__) {
    console.log('[Mercure] Connecting to:', fullUrl);
    console.log('[Mercure] Topics:', topics);
  }

  eventSource = new SSE(fullUrl, {
    headers: {
      Authorization: `Bearer ${subscriberToken}`,
    },
    pollingInterval: 0,
    debug: __DEV__,
  });

  eventSource.addEventListener('message', (event: any) => {
    if (__DEV__) {
      console.log('[Mercure] Raw message received:', event.data);
    }
    try {
      const parsed: MercureMessage = JSON.parse(event.data);
      if (__DEV__) {
        console.log('[Mercure] Parsed message:', parsed);
      }
      onMessage(parsed);
    } catch {
      // If the data is not JSON, wrap it
      if (__DEV__) {
        console.warn('[Mercure] Failed to parse message as JSON:', event.data);
      }
      onMessage({ event: 'unknown', data: event.data });
    }
  });

  eventSource.addEventListener('error', (event: any) => {
    if (__DEV__) {
      console.warn('[Mercure] SSE error:', event);
    }
    onError?.(event);
  });

  eventSource.addEventListener('open', () => {
    if (__DEV__) {
      console.log('[Mercure] Connected to hub');
    }
  });
}

/**
 * Close the current Mercure SSE connection.
 */
export function disconnect(): void {
  if (eventSource) {
    eventSource.removeAllEventListeners();
    eventSource.close();
    eventSource = null;

    if (__DEV__) {
      console.log('[Mercure] Disconnected from hub');
    }
  }
}

/**
 * Returns true if there is an active connection.
 */
export function isConnected(): boolean {
  return eventSource !== null;
}
