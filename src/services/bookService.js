const baseUrl = "https://localhost:3000/api"

export const getAll = async () => {
    const response = await fetch(`${baseUrl}/Book/all-books`);
    const result = await response.json();

    return result;
}

export const getMostLiked = async () => {
    const response = await fetch(`${baseUrl}/Book/most-liked`);
    const result = await response.json();

    return result;
}

export const getById = async (id) => {
    const response = await fetch(`${baseUrl}/Book/${id}`);
    const result = await response.json();

    return result;
};

export const createBook = async (book, token) => {
    const response = await fetch(`${baseUrl}/Book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(book)
    });

    const result = await response.json();
    return result;
};  