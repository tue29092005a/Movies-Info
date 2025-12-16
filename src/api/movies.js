// src/config.js hoặc nơi bạn test
const API_URL = import.meta.env.VITE_API_URL; // Đã đổi tên
const TOKEN_AUTH = import.meta.env.VITE_TOKEN_AUTH; // Thêm tiền tố VITE_

export async function GET_movies(page, limit) {
  try {
    const res = await fetch(`${API_URL}/movies?page=${page}&limit=${limit}`, {
      headers: {
        accept: "application/json",
        "x-app-token": TOKEN_AUTH,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    const movies = await res.json();
    return movies;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

/**
 * Lấy danh sách phim Top Rated
 * @param {string} category - Loại danh mục (VD: 'IMDB_TOP_50')
 * @param {number} page - Trang hiện tại
 * @param {number} limit - Số lượng phim mỗi trang
 */
export async function GET_topRatedMovies(
  category = "IMDB_TOP_50",
  page = 1,
  limit = 10
) {
  try {
    const res = await fetch(
      `${API_URL}/movies/top-rated?category=${category}&page=${page}&limit=${limit}`,
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
 * Lấy danh sách phim phổ biến nhất
 * @param {number} page
 * @param {number} limit
 */
export async function GET_mostPopularMovies(page = 1, limit = 9) {
  try {
    const res = await fetch(
      `${API_URL}/movies/most-popular?page=${page}&limit=${limit}`,
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
 * Lấy thông tin chi tiết phim theo ID
 * @param {string} movieId - ID của phim (VD: 'tt0012349')
 */
export async function GET_movieDetail(movieId) {
  try {
    const res = await fetch(`${API_URL}/movies/${movieId}`, {
      headers: {
        accept: "application/json",
        "x-app-token": TOKEN_AUTH,
      },
    });

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
 * Lấy review của một phim cụ thể
 * @param {string} movieId - ID của phim
 * @param {number} page
 * @param {number} limit
 * @param {string} sort - Sắp xếp (VD: 'newest')
 */
export async function GET_movieReviews(
  movieId,
  page = 1,
  limit = 10,
  sort = "newest"
) {
  try {
    const res = await fetch(
      `${API_URL}/movies/${movieId}/reviews?page=${page}&limit=${limit}&sort=${sort}`,
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

export async function GET_searchMovies(query, page = 1, limit = 12) {
  try {
    const res = await fetch(
      `${API_URL}/movies/search?q=${query}&page=${page}&limit=${limit}`,
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
