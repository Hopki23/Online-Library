const baseUrl = "https://localhost:3000/api"

export const getAllAuthors = async () => {
    const response = await fetch(`${baseUrl}/Author`);
    const result = await response.json();

    return result;
};

export const createAuthor = async (author, token) => {
    const response = await fetch(`${baseUrl}/Author`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(author)
    });

    const result = await response.json();
    
    return result;
};