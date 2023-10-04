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
