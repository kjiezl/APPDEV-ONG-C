import { api } from './client';

export async function getPhotographers(): Promise<any> {
    return api('/api/customer/photographers');
}

export async function getPhotographer(id: number): Promise<any> {
    return api(`/api/customer/photographers/${id}`);
}
