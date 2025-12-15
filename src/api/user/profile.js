const API_URL = import.meta.env.VITE_API_URL; // Đã đổi tên
const TOKEN_AUTH = import.meta.env.VITE_TOKEN_AUTH; // Thêm tiền tố VITE_

/**
 * Lấy thông tin cá nhân người dùng hiện tại
 * Yêu cầu: Phải đăng nhập trước (có token trong localStorage)
 */
export async function GET_userProfile() {
  try {
    // 1. Lấy User Token từ localStorage
    const userToken = localStorage.getItem("user_access_token");
    
    // Nếu không có token -> Chưa đăng nhập -> Dừng luôn
    if (!userToken) {
      console.warn("Chưa đăng nhập: Không tìm thấy user token");
      return null;
    }

    const res = await fetch(`${API_URL}/users/profile`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "x-app-token": TOKEN_AUTH, // App Token cố định
        "Authorization": `Bearer ${userToken}` // User Token động
      },
    });

    if (!res.ok) {
      throw new Error(`Lỗi lấy Profile: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}


/**
 * Lấy danh sách phim yêu thích của User
 */
export async function GET_userFavorites() {
  try {
    const userToken = localStorage.getItem("user_access_token");

    if (!userToken) {
      console.warn("Chưa đăng nhập: Không tìm thấy user token");
      return null;
    }

    const res = await fetch(`${API_URL}/users/favorites`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "x-app-token": TOKEN_AUTH,
        "Authorization": `Bearer ${userToken}`
      },
    });

    if (!res.ok) {
      throw new Error(`Lỗi lấy Favorites: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}