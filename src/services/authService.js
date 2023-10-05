const baseUrl = "https://localhost:3000/api";

export const login = async (email, password) => {
    return await fetch(`${baseUrl}/Authentication/Login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
};

export const register = async (username, email, password) => {
    return await fetch(`${baseUrl}/Authentication/Register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password })
    });
};