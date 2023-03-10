export async function fetchImages(query, page) {

    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '32948391-41e06186a421161778854822b';

    const response = await fetch(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);

    if(!response.ok) {
        throw new Error(response.status);        
    }
    return await response.json();
}
