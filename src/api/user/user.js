const API_URL = import.meta.env.VITE_API_URL; // Đã đổi tên
const TOKEN_AUTH = import.meta.env.VITE_TOKEN_AUTH; // Thêm tiền tố VITE_


/**
 * Đăng ký tài khoản mới
 * @param {Object} userData - Object chứa thông tin đăng ký
 * @param {string} userData.username
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} userData.phone
 * @param {string} userData.dob - Định dạng "YYYY-MM-DD"
 */
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
      // Có thể đọc lỗi chi tiết từ server nếu có
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


/**
 * Đăng nhập
 * @param {string} username 
 * @param {string} password 
 */
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


/**
 * Đăng xuất
 * Lưu ý: Sau khi gọi hàm này thành công, nhớ xóa token ở localStorage phía Client
 */
export async function POST_logout() {
  try {
    const res = await fetch(`${API_URL}/users/logout`, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "x-app-token": TOKEN_AUTH,
        // Nếu API cần User Token để xác thực người logout, hãy mở comment dòng dưới:
        // "Authorization": `Bearer ${localStorage.getItem('user_access_token')}`
      },
      body: "", // curl gửi -d '' nghĩa là body rỗng
    });

    if (!res.ok) {
      throw new Error(`Logout thất bại: ${res.status}`);
    }
    
    // Logout thường không trả về data json quan trọng, chỉ cần status 200 là đủ
    return true; 
  } catch (err) {
    console.error("Logout Error:", err.message);
    return false;
  }
}

