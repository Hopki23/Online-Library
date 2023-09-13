const baseUrl = "https://localhost:3000/api"

export const getAll = async () =>{
    const response = await fetch(`${baseUrl}/book`);
    const result = await response.json();

    return result;
}