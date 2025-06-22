const BASE_URL = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
 // your backend URL

export const loginUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const registerUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("Register error:", error);
  }
};
