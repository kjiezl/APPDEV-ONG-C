import { api } from './client';

export async function getBookings(): Promise<any> {
    return api('/api/customer/bookings');
}

export async function getBooking(id: number): Promise<any> {
    return api(`/api/customer/bookings/${id}`);
}

export async function createBooking(bookingData: {
    photographer_id: number;
    start_at: string;
    end_at: string;
    location?: string;
    notes?: string;
}): Promise<any> {
    return api('/api/customer/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
    });
}

export async function cancelBooking(id: number): Promise<any> {
    return api(`/api/customer/bookings/${id}/cancel`, {
        method: 'PATCH',
    });
}