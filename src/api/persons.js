const API_URL = import.meta.env.VITE_API_URL; // Đã đổi tên
const TOKEN_AUTH = import.meta.env.VITE_TOKEN_AUTH; // Thêm tiền tố VITE_


/**
 * Lấy danh sách Persons có phân trang
 * @param {number} page - Trang hiện tại (mặc định 1)
 * @param {number} limit - Số lượng item mỗi trang (mặc định 10)
 */
export async function GET_persons(page = 1, limit = 10) {
  try {
    const res = await fetch(
      `${API_URL}/persons?page=${page}&limit=${limit}`,
      {
        headers: {
          accept: "application/json",
          "x-app-token": TOKEN_AUTH,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}


/**
 * Lấy thông tin chi tiết của một Person theo ID
 * @param {string} personId - ID của person (VD: 'nm0000122')
 */
export async function GET_personDetail(personId) {
  try {
    const res = await fetch(
      `${API_URL}/persons/${personId}`,
      {
        headers: {
          accept: "application/json",
          "x-app-token": TOKEN_AUTH,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}