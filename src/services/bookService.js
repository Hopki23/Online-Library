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

export const likeBook = async (data, token) => {
    try {
        const response = await fetch(`${baseUrl}/Book/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Book liked successfully
            return { success: true };
        } else {
            // Failed to like the book, parse error message
            const errorData = await response.json();
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        // Network error or other unexpected issues
        return { success: false, message: 'An error occurred while liking the book.' };
    }
};

export const deleteBook = async (id, token) => {
    try {
        const response = await fetch(`${baseUrl}/Book/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return { success: true };

        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        return error;
    }
};

export const updateBook = async (book, id, token) => {
    try {
        const response = await fetch(`${baseUrl}/Book/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(book)
        });
        console.log(response);
        if (response.ok) {
            return { success: true };

        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message };
        }

    } catch (error) {
        return error;
    }
}