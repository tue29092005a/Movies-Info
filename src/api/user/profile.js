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




/**
 * Thêm phim vào danh sách yêu thích
 * @param {string} movieId - ID phim (VD: tt0012349)
 */
export async function POST_addToFavorites(movieId) {
  try {
    const userToken = localStorage.getItem("user_access_token");
    if (!userToken) {
        alert("Bạn cần đăng nhập để thực hiện chức năng này!");
        return false;
    }

    const res = await fetch(`${API_URL}/users/favorites/${movieId}`, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "x-app-token": TOKEN_AUTH,
        "Authorization": `Bearer ${userToken}`
      },
      body: "" // Curl gửi -d '' (body rỗng)
    });

    if (!res.ok) {
        // Nếu đã tồn tại hoặc lỗi khác
        const errorText = await res.text(); 
        throw new Error(errorText || res.status);
    }

    return true; // Thành công
  } catch (err) {
    console.error("Lỗi thêm Favorite:", err.message);
    return false;
  }
}

/**
 * Xóa phim khỏi danh sách yêu thích
 * @param {string} movieId - ID phim (VD: tt0012349)
 */
export async function DELETE_removeFromFavorites(movieId) {
  try {
    const userToken = localStorage.getItem("user_access_token");
    if (!userToken) return false;

    const res = await fetch(`${API_URL}/users/favorites/${movieId}`, {
      method: "DELETE",
      headers: {
        "accept": "*/*",
        "x-app-token": TOKEN_AUTH,
        "Authorization": `Bearer ${userToken}`
      },
    });

    if (!res.ok) throw new Error(res.status);
    return true;
  } catch (err) {
    console.error("Lỗi xóa Favorite:", err.message);
    return false;
  }
}