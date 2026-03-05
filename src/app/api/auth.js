export async function login(email, password) {
    const BASE_URL = 'http://127.0.0.1:8000/api';
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(BASE_URL = '/login', options);
    const data = await response.json();

    console.log(data);
}