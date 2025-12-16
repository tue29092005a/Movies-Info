const API_URL = import.meta.env.VITE_API_URL; // Đã đổi tên
const TOKEN_AUTH = import.meta.env.VITE_TOKEN_AUTH; // Thêm tiền tố VITE_

export async function POST_register(userData) {
  try {
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
        "x-app-token": TOKEN_AUTH,
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {

      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Lỗi đăng ký: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Register Error:", err.message);
    return null;
  }
}


export async function POST_login(username, password) {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "x-app-token": TOKEN_AUTH,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!res.ok) {
      throw new Error(`Đăng nhập thất bại: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Login Error:", err.message);
    return null;
  }
}



export async function POST_logout() {
  try {
    const res = await fetch(`${API_URL}/users/logout`, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "x-app-token": TOKEN_AUTH,

      },
      body: "", 
    });

    if (!res.ok) {
      throw new Error(`Logout thất bại: ${res.status}`);
    }
    
    return true; 
  } catch (err) {
    console.error("Logout Error:", err.message);
    return false;
  }
}

