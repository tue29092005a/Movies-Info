// src/config.js hoặc nơi bạn test
const API_URL = import.meta.env.VITE_API_URL; // Đã đổi tên
const TOKEN_AUTH = import.meta.env.VITE_TOKEN_AUTH; // Thêm tiền tố VITE_

export async function GET_movies(page, limit) {
  try {
    const res = await fetch(
      `${API_URL}/movies?page=${page}&limit=${limit}`,
      {
        headers: {
          accept: "application/json",
          "x-app-token":
            TOKEN_AUTH,
        },
      }
    )
    if(!res.ok){
        throw new Error(`${res.status}`)
    }
    const movies = await res.json();
    return movies;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
