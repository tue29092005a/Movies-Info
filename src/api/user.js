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